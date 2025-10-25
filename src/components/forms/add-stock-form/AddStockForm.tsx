import React, { JSX } from "react";

import cs from "./AddStockForm.module.scss";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import addStockFormScheme from "@/utils/validation/schemes/AddStockFormScheme.ts";
import { IAddStockForm } from "@/const/interfaces/forms/IAddStockForm.ts";
import {
  StockUnitModel,
  StockUnitModelDefaultModel,
} from "@/const/models/StockUnitModel.ts";

export default function AddStockForm({
  taxTypes,
  currencyTypes,
  onChange,
}: IAddStockForm): JSX.Element {
  // ==================================================================== UTILITIES
  const { form } = useAppForm<StockUnitModel>({
    defaultValues: StockUnitModelDefaultModel,
    scheme: addStockFormScheme,
    mode: ReactHookFormMode.CHANGE,
  });

  // ==================================================================== EVENT HANDLERS
  function onChangeHandler(model: StockUnitModel, form) {
    setTimeout(() => {
      onChange?.(
        {
          unitsAmount: model.unitAmount,
          nettoPrice: model.priceModel.price,
          taxTypeId: model.priceModel.taxTypeId,
          currencyId: model.priceModel.currencyId,
        },
        form,
      );
    });
  }

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT
  return (
    <SheForm<StockUnitModel>
      form={form}
      className={cs.addStockForm}
      hideFooter
      onChange={onChangeHandler}
    >
      <div className={cs.addStockFormRow}>
        <SheFormField
          name="priceModel.price"
          render={({ field }) => (
            <SheInput
              value={field.value}
              label="Purchase Price"
              labelTransKey="PurchaseForm.Labels.PurchasePrice"
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
              items={currencyTypes}
              selected={field.value}
              label="Currency"
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
              items={taxTypes}
              selected={field.value}
              label="VAT"
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
            value={field.value}
            label="Units"
            type="number"
            placeholder="enter unit amount..."
            fullWidth
          />
        )}
      />
    </SheForm>
  );
}
