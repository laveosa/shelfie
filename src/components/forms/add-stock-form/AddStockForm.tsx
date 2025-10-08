import { zodResolver } from "@hookform/resolvers/zod";
import React, { JSX, useEffect } from "react";

import cs from "./AddStockForm.module.scss";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { IAddStockForm } from "@/const/interfaces/forms/IAddStockForm.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import {
  StockUnitModel,
  StockUnitModelDefaultModel,
} from "@/const/models/StockUnitModel.ts";
import addStockFormScheme from "@/utils/validation/schemes/AddStockFormScheme.ts";

export default function AddStockForm({
  data,
  taxTypes,
  currencyTypes,
  onSubmit,
  onCancel,
  onHandleUpData,
}: IAddStockForm): JSX.Element {
  // ==================================================================== UTILITIES
  const form = useAppForm<StockUnitModel>({
    mode: ReactHookFormMode.CHANGE,
    resolver: zodResolver(addStockFormScheme),
    defaultValues: StockUnitModelDefaultModel,
  });

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    form.reset(data);
  }, [data]);

  // ==================================================================== EVENT HANDLERS
  function onFormChangeHandler(model: StockUnitModel) {
    onHandleUpData?.({
      unitsAmount: model.unitAmount,
      nettoPrice: model.priceModel.price,
      taxTypeId: model.priceModel.taxTypeId,
      currencyId: model.priceModel.currencyId,
    });
  }

  function onErrorHandler(model) {
    console.log(model);
  }

  // ==================================================================== PRIVATE
  function convertTaxTypesToSelectItems(
    data: TaxTypeModel[],
  ): ISheSelectItem<number>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.id,
        text: item.name,
      }),
    );
  }

  function convertCurrencyTypesToSelectItems(
    data: CurrencyModel[],
  ): ISheSelectItem<number>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.id,
        text: item.name,
      }),
    );
  }

  // ==================================================================== LAYOUT
  return (
    <SheForm<StockUnitModel>
      className={cs.addStockForm}
      form={form}
      defaultValues={StockUnitModelDefaultModel}
      view={ComponentViewEnum.STANDARD}
      hideSecondaryBtn
      hidePrimaryBtn
      onSubmit={onSubmit}
      onChange={onFormChangeHandler}
      onError={onErrorHandler}
      onCancel={onCancel}
    >
      <div className={cs.addStockFormRow}>
        <SheFormField
          name="priceModel.price"
          render={({ field }) => (
            <SheInput
              label="Purchase Price"
              labelTransKey="PurchaseForm.Labels.PurchasePrice"
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
