import { IPurchaseProductsForm } from "@/const/interfaces/forms/IPurchaseProductsForm.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import React, { useEffect } from "react";
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
import { X } from "lucide-react";

export const DefaultPurchaseProductsForm = {
  price: "",
  currencies: 1,
  taxes: 5,
  quantity: "",
};

export default function PurchaseProductsForm<T>({
  data,
  currencies,
  taxes,
  activeTab,
  onSubmit,
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
    form.getValues("price") &&
    form.getValues("currencies") &&
    form.getValues("taxes") &&
    form.getValues("quantity");

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
          name="price"
          render={({ field }): React.ReactElement => (
            <SheFormItem className={cs.purchaseProductsFormItem}>
              <SheInput
                {...field}
                type="number"
                className={field.value ? cs.formItemsValid : ""}
                minWidth="70px"
                maxWidth="70px"
                placeholder=""
              />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currencies"
          render={({ field }) => (
            <SheFormItem className={cs.purchaseProductsFormItem}>
              <SheSelect
                selected={field.value}
                className={field.value ? cs.formItemsValid : ""}
                placeholder=" "
                items={convertCurrenciesToSelectItems(currencies)}
                hideFirstOption
                minWidth="70px"
                maxWidth="70px"
                onSelect={(value) => {
                  field.onChange(value);
                  void form.trigger("currencies");
                }}
              />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxes"
          render={({ field }) => (
            <SheFormItem className={cs.purchaseProductsFormItem}>
              <SheSelect
                placeholder=" "
                className={field.value ? cs.formItemsValid : ""}
                selected={field.value}
                items={convertTaxesToSelectItems(taxes)}
                hideFirstOption
                minWidth="70px"
                maxWidth="70px"
                onSelect={(value) => {
                  field.onChange(value);
                  void form.trigger("taxes");
                }}
              />
            </SheFormItem>
          )}
        />
        <SheIcon className={cs.purchaseProductsFormIcon} icon={X} />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }): React.ReactElement => (
            <SheFormItem className={cs.purchaseProductsFormItem}>
              <SheInput
                {...field}
                type="number"
                className={field.value ? cs.formItemsValid : ""}
                minWidth="50px"
                maxWidth="50px"
                placeholder=""
              />
            </SheFormItem>
          )}
        />
        <SheButton
          className={isFormValid ? cs.buttonValid : ""}
          value={activeTab === "connectProducts" ? "Add" : "Update"}
          type="submit"
          disabled={!isFormValid}
        />
      </SheForm>
    </div>
  );
}
