import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Check, Trash2 } from "lucide-react";

import { IPurchaseProductsForm } from "@/const/interfaces/forms/IPurchaseProductsForm.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import cs from "@/components/forms/manage-products-for-purchase-form/ManageProductsForPurchaseForm.module.scss";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import PurchaseProductsFormScheme from "@/utils/validation/schemes/PurchaseProductsFormScheme.ts";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";

export const DefaultPurchaseProductsForm = {
  nettoPrice: null,
  currencyId: null,
  taxTypeId: null,
  unitsAmount: null,
};

export default function ManageProductsForPurchaseForm({
  data,
  currencies,
  taxes,
  activeTab,
  onSubmit,
  onDelete,
}: IPurchaseProductsForm) {
  const form = useAppForm<any>({
    mode: "onSubmit",
    resolver: zodResolver(PurchaseProductsFormScheme),
    defaultValues: data || DefaultPurchaseProductsForm,
  });

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

  useEffect(() => {
    form.reset(data);
  }, [data]);

  return (
    <div className={cs.purchaseProducts}>
      <SheForm
        className={cs.purchaseProductsForm}
        form={form}
        defaultValues={DefaultPurchaseProductsForm}
        formPosition={DirectionEnum.CENTER}
        view={ComponentViewEnum.STANDARD}
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
            <SheFormItem className={cs.purchaseFormInput}>
              <SheInput
                label="Price"
                value={field.value}
                type="number"
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
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxTypeId"
          render={({ field }) => (
            <SheFormItem className={cs.purchaseFormItem} label="Tax">
              <SheSelect
                placeholder=" "
                className={
                  activeTab === "connectProducts"
                    ? field.value
                      ? cs.formItemsValid
                      : ""
                    : ""
                }
                selected={field.value}
                items={convertTaxesToSelectItems(taxes)}
                hideFirstOption
                minWidth="70px"
                maxWidth="70px"
                onSelect={(value) => {
                  field.onChange(value);
                  void form.trigger("taxTypeId");
                }}
              />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currencyId"
          render={({ field }) => (
            <SheFormItem className={cs.purchaseFormItem} label="Currency">
              <SheSelect
                selected={field?.value}
                className={
                  activeTab === "connectProducts"
                    ? field.value
                      ? cs.formItemsValid
                      : ""
                    : ""
                }
                placeholder=" "
                items={convertCurrenciesToSelectItems(currencies)}
                hideFirstOption
                minWidth="80px"
                maxWidth="80px"
                onSelect={(value) => {
                  field.onChange(value);
                  void form.trigger("currencyId");
                }}
              />
            </SheFormItem>
          )}
        />
        <SheFormField
          name="unitsAmount"
          render={({ field }) => (
            <SheFormItem className={cs.purchaseFormInput}>
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
            </SheFormItem>
          )}
        />
      </SheForm>
    </div>
  );
}
