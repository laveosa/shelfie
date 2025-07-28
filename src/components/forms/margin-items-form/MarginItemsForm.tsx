import { ArrowBigRight, Check, CheckCheck, Lock, Undo2 } from "lucide-react";
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
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { IMarginItemsForm } from "@/const/interfaces/forms/IMarginItemsForm.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import {
  MarginItemModel,
  MarginItemModelDefault,
} from "@/const/models/MarginItemModel.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";

export default function MarginItemsForm<T>({
  data,
  taxes,
  onMarginItemChange,
  onApply,
}: IMarginItemsForm<MarginItemModel>) {
  // const [isDisabled, setIsDisabled] = useState(true);
  // const [isInputChanged, setIsInputChanged] = useState(false);
  // const [isSelectChanged, setIsSelectChanged] = useState(false);
  const form = useAppForm<any>({
    mode: "onSubmit",
    resolver: zodResolver(MarginItemsFormScheme),
    defaultValues: data || MarginItemModelDefault,
  });

  // const watchedMarginPrice = useWatch({
  //   control: form.control,
  //   name: "marginPrice",
  // });
  // const watchedTaxTypeId = useWatch({
  //   control: form.control,
  //   name: "taxTypeId",
  // });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  // useEffect(() => {
  //   setIsInputChanged(data?.marginPrice !== Number(watchedMarginPrice));
  //   if (watchedTaxTypeId === null || undefined) {
  //     setIsSelectChanged(false);
  //   } else {
  //     setIsSelectChanged(data?.taxTypeId !== watchedTaxTypeId);
  //   }
  // }, [watchedMarginPrice, watchedTaxTypeId]);
  //
  // useEffect(() => {
  //   const watchedMargin = Number(form.watch("marginPrice") ?? 0);
  //   if (
  //     data.currentPrice !== watchedMargin ||
  //     isInputChanged ||
  //     isSelectChanged
  //   ) {
  //     setIsDisabled(false);
  //   } else {
  //     setIsDisabled(true);
  //   }
  // }, [isInputChanged, isSelectChanged]);

  function convertTaxesToSelectItems(data: TaxTypeModel[]): ISheSelectItem[] {
    return data?.map(
      (item): ISheSelectItem => ({
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
      <SheForm<T>
        className={cs.marginItemsForm}
        form={form}
        defaultValues={MarginItemModelDefault}
        formPosition={DirectionEnum.CENTER}
        view={ComponentViewEnum.STANDARD}
        fullWidth
        hidePrimary
        hideSecondary
        onSubmit={onApplyHandler}
      >
        <FormField
          control={form.control}
          name="taxTypeId"
          render={({ field }) => (
            <SheFormItem
              className={`${cs.marginItemsFormItem} ${cs.marginItemsFormInput}`}
            >
              {/*//TODO: WHEN NEW SheSelect COMPONENT WILL BE UPLOADED - SET SELECTED ITEM!!!*/}
              <SheSelect
                className={data?.taxTypeChanged ? cs.selectChanged : ""}
                placeholder=" "
                // selected={field.value || data?.taxTypeId}
                items={convertTaxesToSelectItems(taxes)}
                hideFirstOption
                minWidth="70px"
                maxWidth="70px"
                onSelect={(value) => {
                  field.onChange(value);
                  void form.trigger("taxTypeId");
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
                  defaultValue={data?.marginPrice}
                  className={data?.marginPriceChanged ? cs.inputChanged : ""}
                  minWidth="70px"
                  maxWidth="70px"
                  onDelay={() => {
                    onMarginItemChange(form.getValues());
                  }}
                />
              </SheFormItem>
            );
          }}
        />
        <div
          className={`${cs.marginItemsFormItem} ${cs.marginItemsFormIcon} ${cs.lockIcon}`}
          onClick={() =>
            onMarginItemChange({
              ...data,
              locked: !data?.locked,
            })
          }
        >
          <SheIcon icon={Lock} color={data.locked ? "#007AFF" : "#E4E4E7"} />
        </div>
        <div
          className={`${cs.marginItemsFormItem} ${cs.marginItemsFormIcon} ${data.isChanged ? cs.undoIconActive : cs.undoIcon}`}
          onClick={() =>
            onMarginItemChange({
              ...data,
              isChanged: false,
            })
          }
        >
          <SheIcon
            icon={Undo2}
            color={data.isChanged ? "#EF4343" : "#E4E4E7"}
          />
        </div>
        <span
          className={`${cs.marginItemsFormText} she-text`}
        >{`${data.unitsAmount} units`}</span>
        <SheButton
          className={data?.needApply ? cs.formButtonActive : ""}
          value={"Apply"}
          icon={data?.needApply ? Check : CheckCheck}
          txtColor={data?.needApply ? "" : "#38BF5E"}
          variant={data?.needApply ? "secondary" : "ghost"}
          type="submit"
          // disabled={isDisabled}
        />
      </SheForm>
    </div>
  );
}
