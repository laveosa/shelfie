import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import cs from "./ProductsInOrderCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import ProductsInOrderForm from "@/components/forms/products-in-order-form/PrductsInOrderForm.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { ProductsInOrderGridColumns } from "@/components/complex/grid/custom-grids/products-in-order-grid/ProductsInOrderGridColums.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { IProductsInOrderCard } from "@/const/interfaces/complex-components/custom-cards/IProductsInOrderCard.ts";

export default function ProductsInOrderCard({
  isLoading,
  isGridLoading,
  stockActions,
  onAction,
}: IProductsInOrderCard) {
  // ==================================================================== STATE MANAGEMENT
  const [stockActionsData, setStockActionsData] = useState(null);
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (!stockActions) return;

    setStockActionsData(
      stockActions.map((stockAction) => ({
        ...stockAction,
        id: stockAction.variantId,
        expandableRows:
          stockAction.variantStockActions?.length > 0
            ? stockAction.variantStockActions
            : [
                {
                  brutto: null,
                  unitsAmount: null,
                },
              ],
      })),
    );
  }, [stockActions]);

  // ==================================================================== PRIVATE
  function renderExpandedContent(row) {
    return (
      <ProductsInOrderForm
        data={row.original}
        onSubmit={(formData) =>
          onAction("updateStockAction", { formData, row })
        }
        onDelete={() => onAction("removeStockAction", row)}
      />
    );
  }

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.productsInOrderCard}
      title="Products in order"
      titleTransKey="CardTitles.ProductsInOrder"
      maxWidth="485px"
      minWidth="485px"
      isLoading={isLoading}
    >
      <div className={cs.productsInOrderCardContent}>
        <div className={cs.addProductBlock}>
          <span className="she-text">
            {translate("OrderMessages.NoOrderCompleteWithoutProduct")}
          </span>
          <SheButton
            value="Add Product"
            valueTransKey="OrderActions.AddProduct"
            icon={Plus}
            variant="secondary"
            onClick={() => onAction("addProduct")}
          />
        </div>
        <SheGrid
          key={stockActionsData?.length}
          isLoading={isGridLoading}
          showHeader={false}
          columns={ProductsInOrderGridColumns({
            onAction,
          })}
          data={stockActionsData}
          skeletonQuantity={10}
          enableExpansion={true}
          renderExpandedContent={renderExpandedContent}
        />
        <div className={cs.productsSummaryBlock}>
          <span className="she-title"></span>
          <div className={cs.productsSummary}>
            <span className="she-text">
              {translate("OrderForm.Labels.ProductsTotal")}
            </span>
            <span className="she-text"></span>
          </div>
        </div>
      </div>
    </SheCard>
  );
}
