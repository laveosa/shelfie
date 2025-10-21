import React from "react";

import { Plus } from "lucide-react";

import cs from "./SelectDiscountCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { DiscountsListGridColumns } from "@/components/complex/grid/custom-grids/discounts-list-grid/DiscountsListGridColumns.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ISelectDiscountCard } from "@/const/interfaces/complex-components/custom-cards/ISelectDiscountCard.ts";
import { convertToSelectItems } from "@/utils/converters/primitive-components/she-select-convertors.ts";

export default function SelectDiscountCard({
  isLoading,
  isGridLoading,
  discounts,
  onAction,
}: ISelectDiscountCard) {
  // ==================================================================== STATE MANAGEMENT
  const [discount, setDiscount] = React.useState(null);

  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();
  const discountType = [
    { discountType: "Percentage" },
    { discountType: "Amount" },
  ];

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.selectDiscountCard}
      title="Select Discount"
      titleTransKey="CardTitles.SelectDiscount"
      isLoading={isLoading}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeSelectDiscountCard")}
    >
      <div className={cs.selectDiscountCardContent}>
        <span className={`${cs.selectDiscountText} she-text`}>
          {translate("DiscountForm.Labels.SelectDiscountDescription")}
        </span>
        <div className={cs.createDiscountBlock}>
          <div className={cs.inputBlock}>
            <SheInput
              label="Discount Rate"
              labelTransKey="DiscountForm.Labels.DiscountRate"
              placeholder="Discount rate"
              placeholderTransKey="DiscountForm.Placeholders.DiscountRate"
              onDelay={(value: number) =>
                setDiscount({
                  ...discount,
                  discountRate: Number(value).toFixed(2),
                })
              }
            />
            <SheSelect
              label="Discount Type"
              labelTransKey="DiscountForm.Labels.DiscountType"
              placeholder="select discount type..."
              placeholderTransKey="DiscountForm.Placeholders.SelectDiscountType"
              hideFirstOption
              selected={discount?.discountType}
              items={convertToSelectItems(discountType, {
                value: "discountType",
                text: "discountType",
              })}
              onSelect={(value: string) =>
                setDiscount({ ...discount, discountType: value })
              }
            />
          </div>
          <SheButton
            value="Create and Apply"
            valueTransKey="DiscountActions.CreateAndApply"
            icon={Plus}
            variant="secondary"
            maxWidth="165px"
            onClick={() => onAction("createDiscount", discount)}
          />
        </div>
        <SheGrid
          isLoading={isGridLoading}
          showHeader={false}
          columns={DiscountsListGridColumns({ onAction })}
          data={discounts}
          skeletonQuantity={10}
          customMessage="There are no discounts created yet"
          customMessageTransKey="DiscountMessages.NoDiscountsCreated"
        />
      </div>
    </SheCard>
  );
}
