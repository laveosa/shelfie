import React, { JSX } from "react";

import { Check, Trash2 } from "lucide-react";

import cs from "@/components/forms/manage-products-for-purchase-form/ManageProductsForPurchaseForm.module.scss";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import PurchaseProductsFormScheme from "@/utils/validation/schemes/PurchaseProductsFormScheme.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { IPurchaseProductsForm } from "@/const/interfaces/forms/IPurchaseProductsForm.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
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
  onCancel,
}: IPurchaseProductsForm): JSX.Element {
  // ==================================================================== UTILITIES
  const { form } = useAppForm<PurchaseProductsModel>({
    values: data,
    defaultValues: PurchaseProductsModelDefault,
    scheme: PurchaseProductsFormScheme,
    mode: ReactHookFormMode.SUBMIT,
  });

  // ==================================================================== PRIVATE
  function convertCurrenciesToSelectItems(
    data: CurrencyModel[],
  ): ISheSelectItem<any>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.id,
        text: item.briefName,
      }),
    );
  }

  function convertTaxesToSelectItems(
    data: TaxTypeModel[],
  ): ISheSelectItem<any>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.id,
        text: item.name,
      }),
    );
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.purchaseProducts}>
      <SheForm
        className={cs.purchaseProductsForm}
        form={form}
        fullWidth
        hidePrimaryBtn
        hideSecondaryBtn
        onSubmit={onSubmit}
        onCancel={onCancel}
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
              minWidth="80px"
              maxWidth="80px"
              placeholder=" "
            />
          )}
        />
        <SheFormField
          name="taxTypeId"
          render={({ field }) => (
            <SheFormItem className={cs.purchaseFormItem}>
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
                selected={field.value || data?.taxTypeId}
                items={convertTaxesToSelectItems(taxes)}
                hideFirstOption
                minWidth="70px"
                maxWidth="70px"
              />
            </SheFormItem>
          )}
        />
        <SheFormField
          name="currencyId"
          render={({ field }) => (
            <SheFormItem className={cs.purchaseFormItem}>
              <SheSelect
                selected={data?.currencyId || field?.value}
                items={convertCurrenciesToSelectItems(currencies)}
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
            </SheFormItem>
          )}
        />
        <SheFormField
          name="unitsAmount"
          className={cs.purchaseFormItem}
          render={({ field }) => (
            <SheInput
              label="Quantity"
              value={field.value}
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
        <div className={cs.variantGridButtonBlock}>
          <SheButton icon={Check} variant="secondary" value="Save" />
          <SheButton
            icon={Trash2}
            type="button"
            variant="outline"
            disabled={!data.stockActionId}
            onClick={onDelete}
          />
        </div>
      </SheForm>
    </div>
  );
}
