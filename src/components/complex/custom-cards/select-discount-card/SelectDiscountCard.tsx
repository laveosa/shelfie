import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import React from "react";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import cs from "./SelectDiscountCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { ISelectDiscountCard } from "@/const/interfaces/complex-components/custom-cards/ISelectDiscountCard.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { DiscountsListGridColumns } from "@/components/complex/grid/discounts-list-grid/DiscountsListGridColumns.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export default function SelectDiscountCard({
  isLoading,
  isGridLoading,
  discounts,
  onAction,
}: ISelectDiscountCard) {
  const [discount, setDiscount] = React.useState(null);

  const discountType = [
    { discountType: "Percentage" },
    { discountType: "Amount" },
  ];

  function convertStatusesToSelectItems<T>(data: any[]): ISheSelectItem<T>[] {
    return data?.map(
      (item): ISheSelectItem<T> => ({
        value: item.discountType,
        text: item.discountType,
      }),
    );
  }

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.selectDiscountCard}
      title="Select Discount"
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeSelectDiscountCard")}
    >
      <div className={cs.selectDiscountCardContent}>
        <span className={`${cs.selectDiscountText} she-text`}>
          Reuse standard discounts or create one!
        </span>
        <div className={cs.createDiscountBlock}>
          <div className={cs.inputBlock}>
            <SheInput
              label="Discount rate"
              placeholder="enter discount rate..."
              onDelay={(value: number) =>
                setDiscount({
                  ...discount,
                  discountRate: Number(value).toFixed(2),
                })
              }
            />
            <SheSelect
              label="Type (Currency / %)"
              placeholder="select discount type..."
              hideFirstOption
              selected={discount?.discountType}
              items={convertStatusesToSelectItems(discountType)}
              onSelect={(value: string) =>
                setDiscount({ ...discount, discountType: value })
              }
            />
          </div>
          <SheButton
            icon={Plus}
            value={"Create and Apply"}
            variant="secondary"
            maxWidth="165px"
            onClick={() => onAction("createDiscount", discount)}
          />
        </div>
        <DndGridDataTable
          isLoading={isGridLoading}
          showHeader={false}
          columns={
            DiscountsListGridColumns({ onAction }) as ColumnDef<DataWithId>[]
          }
          data={discounts}
          skeletonQuantity={10}
          customMessage="There are no discounts created yet"
        />
      </div>
    </SheProductCard>
  );
}
