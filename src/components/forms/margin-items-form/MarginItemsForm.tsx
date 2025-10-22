import { ArrowBigRight, Check, CheckCheck, Lock, Undo2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef } from "react";

import {
  MarginItemModel,
  MarginItemModelDefault,
} from "@/const/models/MarginItemModel.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import cs from "@/components/forms/margin-items-form/MarginItemsForm.module.scss";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import MarginItemsFormScheme from "@/utils/validation/schemes/MarginItemsFormScheme.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { IMarginItemsForm } from "@/const/interfaces/forms/IMarginItemsForm.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";

export default function MarginItemsForm({
  data,
  taxes,
  onMarginItemChange,
  onApply,
}: IMarginItemsForm) {
  const form = useAppForm<MarginItemModel>({
    mode: ReactHookFormMode.CHANGE,
    resolver: zodResolver(MarginItemsFormScheme),
    defaultValues: data || MarginItemModelDefault,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    form.reset(data);
  }, [data]);

  useEffect(() => {
    if (data?.selectedItem && inputRef.current) {
      inputRef.current.focus();
    }
  }, [data?.selectedItem]);

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

  function onApplyHandler() {
    onApply(data.marginItemId);
  }

  return (
    <div className={cs.marginItemsFormWrapper}>
      <SheForm
        className={cs.marginItemsForm}
        form={form}
        defaultValues={MarginItemModelDefault}
        formPosition={DirectionEnum.CENTER}
        view={ComponentViewEnum.STANDARD}
        fullWidth
        hidePrimaryBtn
        hideSecondaryBtn
        onSubmit={onApplyHandler}
      >
        <SheFormField
          name="taxTypeId"
          className={`${cs.marginItemsFormItem} ${cs.marginItemsFormInput}`}
          render={({ field }) => (
            <SheFormItem className={cs.formItem}>
              <SheSelect
                className={data?.taxTypeChanged ? cs.selectChanged : ""}
                placeholder=" "
                selected={field?.value || data?.taxTypeId}
                items={convertTaxesToSelectItems(taxes)}
                hideFirstOption
                minWidth="70px"
                maxWidth="70px"
                onSelect={() => {
                  onMarginItemChange(form.getValues());
                }}
              />
            </SheFormItem>
          )}
        />
        <div
          className={`${cs.marginItemsFormItem} ${cs.marginItemsFormIcon} ${data.taxTypeChanged ? cs.arrowIconActive : cs.arrowIcon}`}
        >
          <SheIcon
            icon={ArrowBigRight}
            color="#007AFF"
            onClick={() => {
              onMarginItemChange({
                ...data,
                taxChangesNotApplied: true,
              });
            }}
          />
        </div>
        <SheFormField
          name="marginPrice"
          className={`${cs.marginItemsFormItem} ${cs.marginItemsFormInput}`}
          render={({ field }) => (
            <SheFormItem className={cs.formItem}>
              <SheInput
                ref={inputRef}
                value={field.value}
                className={data?.marginPriceChanged ? cs.inputChanged : ""}
                minWidth="70px"
                maxWidth="70px"
                autoFocus={data.selectedItem}
                delayTime={1500}
                onDelay={() => {
                  onMarginItemChange({
                    ...form.getValues(),
                  });
                }}
              />
            </SheFormItem>
          )}
        />
        <SheIcon
          icon={Lock}
          color={data.locked ? "#007AFF" : "#E4E4E7"}
          className={`${cs.marginItemsFormItem} ${cs.marginItemsFormIcon} ${cs.lockIcon}`}
          onClick={() =>
            onMarginItemChange({
              ...data,
              locked: !data?.locked,
            })
          }
        />
        <SheIcon
          icon={Undo2}
          color={data.isChanged ? "#EF4343" : "#E4E4E7"}
          className={`${cs.marginItemsFormItem} ${cs.marginItemsFormIcon} ${data.isChanged ? cs.undoIconActive : cs.undoIcon}`}
          onClick={() =>
            onMarginItemChange({
              ...data,
              isChanged: false,
            })
          }
        />
        <span className={`${cs.marginItemsFormText} she-text`}>
          {data.unitsAmount} {data.unitsAmount === 1 ? "unit" : "units"}
        </span>
        <SheButton
          className={!data?.marginPriceApplied ? "" : cs.formButtonNotActive}
          value={!data?.marginPriceApplied ? "Apply" : "Applied"}
          icon={!data?.marginPriceApplied ? Check : CheckCheck}
          txtColor={!data?.marginPriceApplied ? "" : "#38BF5E"}
          variant={!data?.marginPriceApplied ? "secondary" : "ghost"}
          type="submit"
        />
      </SheForm>
    </div>
  );
}
