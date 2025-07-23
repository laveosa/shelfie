import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import cs from "@/components/forms/margin-items-form/MarginItemsForm.module.scss";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import MarginItemsFormScheme from "@/utils/validation/schemes/MarginItemsFormScheme.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { IMarginItemsForm } from "@/const/interfaces/forms/IMarginItemsForm.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { Check, Lock, Undo2 } from "lucide-react";

export const DefaultMarginItemsForm = {
  marginPrice: null,
  taxTypeId: null,
};

export default function MarginItemsForm<T>({
  data,
  taxes,
  onSubmit,
  onCancel,
}: IMarginItemsForm<T>) {
  const form = useAppForm<any>({
    mode: "onSubmit",
    resolver: zodResolver(MarginItemsFormScheme),
    defaultValues: data || DefaultMarginItemsForm,
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  const isFormValid = true;
  // form.formState.isValid &&
  // form.getValues("marginName") &&
  // form.getValues("desiredProfit") &&
  // form.getValues("plannedDiscount") &&
  // form.getValues("fixedCosts");

  function convertTaxesToSelectItems(data: TaxTypeModel[]): ISheSelectItem[] {
    return data?.map(
      (item): ISheSelectItem => ({
        value: item.id,
        text: item.name,
      }),
    );
  }

  return (
    <div className={cs.marginItemsFormWrapper}>
      <SheForm<T>
        className={cs.marginItemsForm}
        form={form}
        defaultValues={DefaultMarginItemsForm}
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
          name="taxTypeId"
          render={({ field }) => (
            <SheFormItem className={cs.marginItemsFormItem}>
              <SheSelect
                placeholder=" "
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
        {/*<SheIcon*/}
        {/*  className={cs.marginItemsFormItem}*/}
        {/*  icon={ArrowBigRight}*/}
        {/*  color="#E4E4E7"*/}
        {/*/>*/}
        <FormField
          control={form.control}
          name="marginPrice"
          defaultValue={data?.marginName}
          render={({ field }): React.ReactElement => (
            <SheFormItem className={cs.marginItemsFormItem}>
              <SheInput
                {...field}
                minWidth="70px"
                maxWidth="70px"
                placeholder="Enter margin price..."
              />
            </SheFormItem>
          )}
        />
        <SheIcon
          className={cs.marginItemsFormItem}
          icon={Lock}
          color="#E4E4E7"
        />
        <SheIcon
          className={cs.marginItemsFormItem}
          icon={Undo2}
          color="#E4E4E7"
        />
        <span className="she-text">{`${data.quantity} units`}</span>
        <SheButton
          value={"Apply"}
          variant="secondary"
          icon={Check}
          type="submit"
          disabled={!isFormValid}
        />
      </SheForm>
    </div>
  );
}
