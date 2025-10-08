import { zodResolver } from "@hookform/resolvers/zod";
import { useWatch } from "react-hook-form";
import React from "react";
import _ from "lodash";

import cs from "./DisposeStockCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import disposeStockFormScheme from "@/utils/validation/schemes/DisposeStockFormScheme.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import { DisposeStockModel } from "@/const/models/DisposeStockModel.ts";
import { IDisposeStockCard } from "@/const/interfaces/complex-components/custom-cards/IDisposeStockCard.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

const reasons: ISheSelectItem<number>[] = [
  { value: 1, text: "Damaged", textTransKey: "StockForm.Labels.Damaged" },
  { value: 2, text: "Lost", textTransKey: "StockForm.Labels.Lost" },
  { value: 3, text: "Broken", textTransKey: "StockForm.Labels.Broken" },
];

export default function DisposeStockCard({
  isLoading,
  variant,
  onAction,
  onSecondaryButtonClick,
  ...props
}: IDisposeStockCard) {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();
  const disposeStockDefaultModel: DisposeStockModel = {
    reason: reasons[0].value,
    unitAmount: 0,
  };
  const form = useAppForm<DisposeStockModel>({
    mode: ReactHookFormMode.CHANGE,
    resolver: zodResolver(disposeStockFormScheme),
    defaultValues: disposeStockDefaultModel,
  });

  const watchedUnitAmount = useWatch({
    control: form.control,
    name: "unitAmount",
  });

  // ==================================================================== EVENT HANDLERS
  function onSubmitHandler(data: DisposeStockModel) {
    const formattedData = {
      ...data,
      unitAmount: Number(data.unitAmount),
    };
    onAction?.("disposeFromStock", { variant, formattedData });
  }

  return (
    <SheCard
      className={cs.disposeStockCard}
      title={`${translate("StockActions.Dispose")} ${variant?.variantName} ${translate("SectionTitles.Product")}`}
      isLoading={isLoading}
      showCloseButton
      showFooter
      primaryButtonTitle="Dispose"
      primaryButtonTitleTransKey="StockActions.Dispose"
      primaryButtonDisabled={
        !form.formState.isValid ||
        _.isEqual(disposeStockDefaultModel, form.getValues()) ||
        Number(watchedUnitAmount) > Number(variant?.stockAmount)
      }
      onPrimaryButtonClick={form.handleSubmit(onSubmitHandler)}
      onSecondaryButtonClick={onSecondaryButtonClick}
      {...props}
    >
      <SheForm<DisposeStockModel>
        form={form}
        defaultValues={disposeStockDefaultModel}
        text={translate(
          "StockForm.Labels.CurrentlyInStock",
          { stockAmount: variant?.stockAmount || 0 },
          "Currently in stock",
        )}
        headerPosition={DirectionEnum.LEFT}
        hideFooter
      >
        <SheFormField
          name="unitAmount"
          render={({ field }) => (
            <SheInput
              value={field.value}
              label="Units"
              labelTransKey="PurchaseForm.Labels.Units"
              placeholder="enter amount of units..."
              placeholderTransKey="PurchaseForm.Placeholders.Units"
              min={0}
              errorMessage={
                watchedUnitAmount > variant?.stockAmount &&
                "You try to dispose more units the you have in stock"
              }
              type="number"
              fullWidth
            />
          )}
        />
        <SheFormField
          name="reason"
          render={({ field }) => (
            <SheSelect
              items={reasons}
              selected={field.value || reasons[0].value}
              label="Reason"
              labelTransKey="StockForm.Labels.Reason"
              fullWidth
              hideFirstOption
            />
          )}
        />
      </SheForm>
    </SheCard>
  );
}
