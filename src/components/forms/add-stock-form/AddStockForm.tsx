import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import React, { JSX, useEffect } from "react";

import {
  StockUnitModel,
  StockUnitModelDefaultModel,
} from "@/const/models/StockUnitModel.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import cs from "./AddStockForm.module.scss";
import { IAddStockForm } from "@/const/interfaces/forms/IAddStockForm.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import addStockFormScheme from "@/utils/validation/schemes/AddStockFormScheme.ts";
import { useWatch } from "react-hook-form";

export default function AddStockForm({
  data,
  taxTypes,
  currencyTypes,
  onSubmit,
  onCancel,
  onHandleUpData,
}: IAddStockForm): JSX.Element {
  const { t } = useTranslation();
  const form = useAppForm<StockUnitModel>({
    mode: ReactHookFormMode.CHANGE,
    resolver: zodResolver(addStockFormScheme),
    defaultValues: StockUnitModelDefaultModel,
  });

  function convertTaxTypesToSelectItems(
    data: TaxTypeModel[],
  ): ISheSelectItem<any>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.id,
        text: item.name,
      }),
    );
  }

  function convertCurrencyTypesToSelectItems(
    data: CurrencyModel[],
  ): ISheSelectItem<any>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.id,
        text: item.name,
      }),
    );
  }

  useEffect(() => {
    form.reset(data);
  }, [data]);

  function onErrorHandler(model) {
    console.log(model);
  }

  const watchedValues = useWatch({
    control: form.control,
    name: [
      "unitAmount",
      "priceModel.price",
      "priceModel.taxTypeId",
      "priceModel.currencyId",
    ],
  });

  useEffect(() => {
    if (!form.formState.isValid) return;

    const updatedData: any = {
      unitsAmount: watchedValues[0],
      nettoPrice: watchedValues[1],
      taxTypeId: watchedValues[2],
      currencyId: watchedValues[3],
    };

    onHandleUpData(updatedData);
  }, [watchedValues, form.formState.isValid, data]);

  return (
    <SheForm<StockUnitModel>
      className={cs.addStockForm}
      form={form}
      defaultValues={StockUnitModelDefaultModel}
      view={ComponentViewEnum.STANDARD}
      hideSecondaryBtn
      hidePrimaryBtn
      onSubmit={onSubmit}
      onError={onErrorHandler}
      onCancel={onCancel}
    >
      <div className={cs.addStockFormRow}>
        <SheFormField
          name="priceModel.price"
          render={({ field }) => (
            <SheInput
              label={t("PurchaseForm.Labels.PurchasePrice")}
              value={field.value}
              placeholder="enter price netto..."
              type="number"
              minWidth="150px"
            />
          )}
        />
        <SheFormField
          name="priceModel.currencyId"
          render={({ field }) => (
            <SheSelect
              label="Currency"
              items={convertCurrencyTypesToSelectItems(currencyTypes)}
              selected={field.value}
              placeholder=" "
              hideFirstOption
              minWidth="140px"
            />
          )}
        />
        <SheFormField
          name="priceModel.taxTypeId"
          render={({ field }) => (
            <SheSelect
              label="VAT"
              items={convertTaxTypesToSelectItems(taxTypes)}
              selected={field.value}
              placeholder=" "
              hideFirstOption
              minWidth="40px"
            />
          )}
        />
      </div>
      <SheFormField
        name="unitAmount"
        render={({ field }) => (
          <SheInput
            label="Units"
            value={field.value}
            type="number"
            placeholder="enter unit amount..."
            fullWidth
          />
        )}
      />
    </SheForm>
  );
}
