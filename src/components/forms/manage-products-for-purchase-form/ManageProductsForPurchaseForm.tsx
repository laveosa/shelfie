import React, { JSX } from "react";

import { Check, Trash2 } from "lucide-react";

import cs from "@/components/forms/manage-products-for-purchase-form/ManageProductsForPurchaseForm.module.scss";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import PurchaseProductsFormScheme from "@/utils/validation/schemes/PurchaseProductsFormScheme.ts";
import { IPurchaseProductsForm } from "@/const/interfaces/forms/IPurchaseProductsForm.ts";
import {
  PurchaseProductsModel,
  PurchaseProductsModelDefault,
} from "@/const/models/PurchaseProductsModel.ts";

export default function ManageProductsForPurchaseForm({
  data,
  currencies,
  taxes,
  activeTab,
  onSubmit,
  onDelete,
}: IPurchaseProductsForm): JSX.Element {
  // ==================================================================== UTILITIES
  const { form } = useAppForm<PurchaseProductsModel>({
    values: data,
    defaultValues: PurchaseProductsModelDefault,
    scheme: PurchaseProductsFormScheme,
    mode: ReactHookFormMode.SUBMIT,
  });

  // ==================================================================== LAYOUT
  return (
    <div className={cs.purchaseProducts}>
      <SheForm
        className={cs.purchaseProductsForm}
        form={form}
        fullWidth
        primaryBtnProps={{
          value: "Save",
          icon: Check,
          variant: "secondary",
          disabled: !form.formState.isValid,
        }}
        primaryBtnTitle="Save"
        secondaryBtnProps={{
          value: null,
          icon: Trash2,
          variant: "outline",
          disabled: !data.stockActionId,
        }}
        onSubmit={onSubmit}
        onCancel={onDelete}
      >
        <SheFormField
          name="nettoPrice"
          render={({ field }) => (
            <SheInput
              label="Price"
              value={field.value}
              className={
                activeTab === "connectProducts"
                  ? field.value
                    ? cs.formItemsValid
                    : ""
                  : ""
              }
              type="number"
              minWidth="80px"
              maxWidth="80px"
              placeholder=" "
            />
          )}
        />
        <SheFormField
          name="taxTypeId"
          render={({ field }) => (
            <SheSelect
              label="Tax"
              placeholder=" "
              className={
                activeTab === "connectProducts"
                  ? field.value
                    ? cs.formItemsValid
                    : ""
                  : ""
              }
              selected={field.value}
              items={taxes}
              hideFirstOption
              minWidth="70px"
              maxWidth="70px"
            />
          )}
        />
        <SheFormField
          name="currencyId"
          render={({ field }) => (
            <SheSelect
              selected={field?.value}
              items={currencies}
              className={
                activeTab === "connectProducts"
                  ? field.value
                    ? cs.formItemsValid
                    : ""
                  : ""
              }
              label="Currency"
              placeholder=" "
              hideFirstOption
              minWidth="80px"
              maxWidth="80px"
            />
          )}
        />
        <SheFormField
          name="unitsAmount"
          render={({ field }) => (
            <SheInput
              label="Quantity"
              value={field.value}
              type="number"
              className={
                activeTab === "connectProducts"
                  ? field.value
                    ? cs.formItemsValid
                    : ""
                  : ""
              }
              width="70px"
              minWidth="70px"
              maxWidth="70px"
              placeholder=" "
            />
          )}
        />
      </SheForm>
    </div>
  );
}
