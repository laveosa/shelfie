import { ArrowBigRight, Check, Lock, Undo2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

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
import { MarginItemModelDefault } from "@/const/models/MarginItemModel.ts";

export default function MarginItemsForm<T>({
  data,
  taxes,
  currentPrice,
  onSubmit,
  onCancel,
}: IMarginItemsForm<T>) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isInputChanged, setIsInputChanged] = useState(false);
  const [isSelectChanged, setIsSelectChanged] = useState(false);
  const form = useAppForm<any>({
    mode: "onSubmit",
    resolver: zodResolver(MarginItemsFormScheme),
    defaultValues: data || MarginItemModelDefault,
  });

  const watchedMarginPrice = useWatch({
    control: form.control,
    name: "marginPrice",
  });
  const watchedTaxTypeId = useWatch({
    control: form.control,
    name: "taxTypeId",
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  useEffect(() => {
    setIsInputChanged(data?.marginPrice !== Number(watchedMarginPrice));
    if (watchedTaxTypeId === null || undefined) {
      setIsSelectChanged(false);
    } else {
      setIsSelectChanged(data?.taxTypeId !== watchedTaxTypeId);
    }
  }, [watchedMarginPrice, watchedTaxTypeId]);

  useEffect(() => {
    const watchedMargin = Number(form.watch("marginPrice") ?? 0);
    if (currentPrice !== watchedMargin || isInputChanged || isSelectChanged) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isInputChanged, isSelectChanged]);

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
        defaultValues={MarginItemModelDefault}
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
            <SheFormItem
              className={`${cs.marginItemsFormItem} ${cs.marginItemsFormInput}`}
            >
              <SheSelect
                className={isSelectChanged ? cs.selectChanged : ""}
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
        <SheIcon
          className={`${cs.marginItemsFormItem} ${cs.marginItemsFormIcon}`}
          icon={ArrowBigRight}
          color="#E4E4E7"
        />
        <FormField
          control={form.control}
          name="marginPrice"
          render={({ field }): React.ReactElement => {
            return (
              <SheFormItem
                className={`${cs.marginItemsFormItem} ${cs.marginItemsFormInput}`}
              >
                <SheInput
                  {...field}
                  className={isInputChanged ? cs.inputChanged : ""}
                  minWidth="70px"
                  maxWidth="70px"
                />
              </SheFormItem>
            );
          }}
        />
        <SheIcon
          className={`${cs.marginItemsFormItem} ${cs.marginItemsFormIcon}`}
          icon={Lock}
          color="#E4E4E7"
        />
        <SheIcon
          className={`${cs.marginItemsFormItem} ${cs.marginItemsFormIcon}`}
          icon={Undo2}
          color="#E4E4E7"
        />
        <span
          className={`${cs.marginItemsFormText} she-text`}
        >{`${data.quantity} units`}</span>
        <SheButton
          className={!isDisabled ? cs.formButton : cs.disabledFormButton}
          value={"Apply"}
          icon={Check}
          type="submit"
          disabled={isDisabled}
        />
      </SheForm>
    </div>
  );
}
