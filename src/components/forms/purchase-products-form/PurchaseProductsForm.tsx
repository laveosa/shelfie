import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Check, TrashIcon, X } from "lucide-react";

import { IPurchaseProductsForm } from "@/const/interfaces/forms/IPurchaseProductsForm.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import cs from "@/components/forms/purchase-products-form/PurchaseProductsForm.module.scss";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { UserModelDefault } from "@/const/models/UserModel.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import PurchaseProductsFormScheme from "@/utils/validation/schemes/PurchaseProductsFormScheme.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

export const DefaultPurchaseProductsForm = {
  nettoPrice: null,
  currencyId: null,
  taxTypeId: null,
  unitsAmount: null,
};

export default function PurchaseProductsForm<T>({
  data,
  currencies,
  taxes,
  activeTab,
  isVariantGrid = false,
  onSubmit,
  onDelete,
  onCancel,
}: IPurchaseProductsForm<T>) {
  const form = useAppForm<any>({
    mode: "onSubmit",
    resolver: zodResolver(PurchaseProductsFormScheme),
    defaultValues: data || DefaultPurchaseProductsForm,
  });

  function convertCurrenciesToSelectItems(
    data: CurrencyModel[],
  ): ISheSelectItem[] {
    return data?.map(
      (item): ISheSelectItem => ({
        value: item.id,
        text: item.briefName,
      }),
    );
  }

  function convertTaxesToSelectItems(data: TaxTypeModel[]): ISheSelectItem[] {
    return data?.map(
      (item): ISheSelectItem => ({
        value: item.id,
        text: item.name,
      }),
    );
  }

  useEffect(() => {
    form.reset(data);
  }, [data]);

  const isFormValid =
    form.formState.isValid &&
    form.getValues("nettoPrice") &&
    form.getValues("currencyId") &&
    form.getValues("taxTypeId") &&
    form.getValues("unitsAmount");

  return (
    <div className={cs.purchaseProducts}>
      <SheForm<T>
        className={cs.purchaseProductsForm}
        form={form}
        defaultValues={UserModelDefault}
        formPosition={DirectionEnum.CENTER}
        view={ComponentViewEnum.STANDARD}
        fullWidth
        hidePrimary
        hideSecondary
        onSubmit={onSubmit}
        onCancel={onCancel}
      >
        <FormField
          control={form.control}
          name="nettoPrice"
          render={({ field }): React.ReactElement => (
            <SheFormItem className={cs.purchaseProductsFormItem}>
              <SheInput
                {...field}
                className={
                  activeTab === "connectProducts"
                    ? field.value
                      ? cs.formItemsValid
                      : ""
                    : ""
                }
                minWidth="100px"
                maxWidth="100px"
                placeholder="Netto price"
              />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currencyId"
          render={({ field }) => (
            <SheFormItem className={cs.purchaseProductsFormItem}>
              <SheSelect
                selected={field.value || data?.currencyId}
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
                minWidth="70px"
                maxWidth="70px"
                onSelect={(value) => {
                  field.onChange(value);
                  void form.trigger("currencyId");
                }}
              />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxTypeId"
          render={({ field }) => (
            <SheFormItem className={cs.purchaseProductsFormItem}>
              <SheSelect
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
                onSelect={(value) => {
                  field.onChange(value);
                  void form.trigger("taxTypeId");
                }}
              />
            </SheFormItem>
          )}
        />
        <SheIcon className={cs.purchaseProductsFormIcon} icon={X} />
        <FormField
          control={form.control}
          name="unitsAmount"
          render={({ field }): React.ReactElement => (
            <SheFormItem className={cs.purchaseProductsFormItem}>
              <SheInput
                {...field}
                className={
                  activeTab === "connectProducts"
                    ? field.value
                      ? cs.formItemsValid
                      : ""
                    : ""
                }
                width="80px"
                minWidth="80px"
                maxWidth="80px"
                placeholder="Quantity"
              />
            </SheFormItem>
          )}
        />
        {!isVariantGrid ? (
          <SheButton
            className={
              activeTab === "connectProducts"
                ? isFormValid
                  ? cs.buttonValid
                  : ""
                : ""
            }
            value={activeTab === "connectProducts" ? "Add" : "Update"}
            variant="secondary"
            type="submit"
            disabled={activeTab === "connectProducts" ? !isFormValid : false}
          />
        ) : (
          <div className={cs.variantGridButtonBlock}>
            <SheButton icon={Check} />
            <SheButton
              icon={TrashIcon}
              type="button"
              variant="secondary"
              disabled={!data.stockActionId}
              onClick={onDelete}
            />
          </div>
        )}
      </SheForm>
    </div>
  );
}
