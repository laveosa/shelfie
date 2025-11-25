import { Plus, X } from "lucide-react";
import React from "react";

import cs from "./CartsWithSpecificProductCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { ICartsWithThisProductCard } from "@/const/interfaces/complex-components/custom-cards/ICartsWithThisProductCard.ts";
import { Separator } from "@/components/ui/separator.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import VariantInfoLayout from "@/components/layouts/variant-info-layout/VariantInfoLayout.tsx";
import { CartsWithSpecificProductGridColumns } from "@/components/complex/grid/custom-grids/carts-with-specific-product-grid/CartsWithSpecificProductGridColumns.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export default function CartsWithSpecificProductCard({
  isLoading,
  isGridLoading,
  variant,
  cartsList,
  onAction,
}: ICartsWithThisProductCard) {
  const additionalActionsList = [
    { description: "Select product action", actionId: "1" },
    { description: "Remove product from cart", actionId: "2" },
    { description: "Convert product to reservation", actionId: "3" },
    { description: "Leave product as out of stock", actionId: "4" },
  ];

  function convertAdditionalActionsToSelectItems(): ISheSelectItem<string>[] {
    return Object.values(additionalActionsList).map((action) => ({
      value: action.actionId,
      text: action.description,
    }));
  }

  return (
    <SheCard
      isLoading={isLoading}
      className={cs.cartsWithSpecificProductCard}
      title="Carts with this product"
      showCloseButton
      onSecondaryButtonClick={() =>
        onAction("closeCartsWithSpecificProductCard")
      }
    >
      <div className={cs.cartsWithSpecificProductCardContent}>
        <VariantInfoLayout isFullWidth variant={variant} />
        <Separator />
        <span className="she-text">
          On the below list there are customers with this product in cart. If
          you want to manually transfer the product from one of them, please
          select the customer and confirm the transfer.
        </span>
        <div className={cs.cartsGridBlock}>
          <SheInput
            fullWidth
            isSearch
            placeholder="search customer..."
            onDelay={(value) =>
              onAction("searchCartsWithSpecificProduct", value)
            }
          />
          <SheGrid
            isLoading={isGridLoading}
            showHeader={false}
            data={cartsList}
            columns={CartsWithSpecificProductGridColumns(onAction)}
            customMessage="There is no carts with this product"
          />
          <span className="she-text">Additional action</span>
          <SheSelect
            items={convertAdditionalActionsToSelectItems()}
            fullWidth
            hideFirstOption
            placeholder="select action..."
          />
        </div>
        <div className={cs.cardFooter}>
          <SheButton
            icon={X}
            variant="secondary"
            value="Cancel"
            onClick={() => onAction("closeCartsWithSpecificProductCard")}
          />
          <SheButton
            icon={Plus}
            variant="default"
            value="Confirm"
            onClick={() => {}}
          />
        </div>
      </div>
    </SheCard>
  );
}
