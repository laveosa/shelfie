import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Check, Trash2, X } from "lucide-react";

import { IPurchaseProductsForm } from "@/const/interfaces/forms/IPurchaseProductsForm.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import cs from "@/components/forms/purchase-products-form/PurchaseProductsForm.module.scss";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import PurchaseProductsFormScheme from "@/utils/validation/schemes/PurchaseProductsFormScheme.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import {
  PurchaseProductsModel,
  PurchaseProductsModelDefault,
} from "@/const/models/PurchaseProductsModel.ts";

export default function PurchaseProductsForm({
  data,
  currencies,
  taxes,
  activeTab,
  isVariantGrid = false,
  onSubmit,
  onDelete,
  onCancel,
}: IPurchaseProductsForm) {
  const form = useAppForm<PurchaseProductsModel>({
    mode: ReactHookFormMode.CHANGE,
    resolver: zodResolver(PurchaseProductsFormScheme),
    defaultValues: data || PurchaseProductsModelDefault,
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

  const isFormValid =
    form.formState.isValid &&
    form.getValues("nettoPrice") &&
    form.getValues("currencyId") &&
    form.getValues("taxTypeId") &&
    form.getValues("unitsAmount");

  return (
    <div className={cs.purchaseProducts}>
      <SheForm<PurchaseProductsModel>
        form={form}
        className={cs.purchaseProductsForm}
        defaultValues={PurchaseProductsModelDefault}
        fullWidth
        hidePrimaryBtn
        hideSecondaryBtn
        onSubmit={onSubmit}
        onCancel={onCancel}
      >
        <SheFormField
          name="nettoPrice"
          className={cs.purchaseFormItemNettoPrice}
          render={({ field }) => (
            <SheFormItem className={cs.purchaseFormItemNettoPrice}>
              <SheInput
                value={field.value}
                className={
                  activeTab === "connectProducts"
                    ? field.value
                      ? cs.formItemsValid
                      : ""
                    : ""
                }
                type="number"
                min={0}
                minWidth="100px"
                maxWidth="100px"
                placeholder="0"
              />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currencyId"
          render={({ field }) => (
            <SheFormItem className={cs.purchaseFormItemTaxCurrency}>
              <SheSelect
                selected={data?.currencyId || field?.value}
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
            <SheFormItem className={cs.purchaseFormItemTaxCurrency}>
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
        <SheFormField
          name="unitsAmount"
          className={cs.purchaseFormItemTaxCurrency}
          render={({ field }): React.ReactElement => (
            <SheFormItem className={cs.purchaseFormItemQuantity}>
              <SheInput
                value={field.value}
                className={
                  activeTab === "connectProducts"
                    ? field.value
                      ? cs.formItemsValid
                      : ""
                    : ""
                }
                type="number"
                min={0}
                hideErrorMessage
                width="80px"
                minWidth="80px"
                maxWidth="80px"
                placeholder="0"
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
            style={{
              marginLeft: "10px",
            }}
            value={activeTab === "connectProducts" ? "Add" : "Update"}
            variant="ghost"
            type="submit"
            disabled={activeTab === "connectProducts" ? !isFormValid : false}
          />
        ) : (
          <div className={cs.variantGridButtonBlock}>
            <SheButton icon={Check} variant="secondary" value="Save" />
            <SheButton
              icon={Trash2}
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
