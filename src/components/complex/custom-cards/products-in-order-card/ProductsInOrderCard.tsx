import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ProductsInOrderCard.module.scss";
import { IProductsInOrderCard } from "@/const/interfaces/complex-components/custom-cards/IProductsInOrderCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ProductsInOrderGridColumns } from "@/components/complex/grid/products-in-order-grid/ProductsInOrderGridColums.tsx";
import ProductsInOrderForm from "@/components/forms/products-in-order-form/PrductsInOrderForm.tsx";

export default function ProductsInOrderCard({
  isLoading,
  isGridLoading,
  stockActions,
  onAction,
}: IProductsInOrderCard) {
  const createEmptyStockAction = () => ({
    brutto: null,
    unitsAmount: null,
  });
  const [stockActionsData, setStockActionsData] = useState([]);

  useEffect(() => {
    if (!stockActions || stockActions.length === 0) return;

    setStockActionsData(
      stockActions.map((stockAction) => ({
        ...stockAction,
        id: stockAction.variantId,
        expandableRows:
          stockAction.variantStockActions?.length > 0
            ? stockAction.variantStockActions
            : [createEmptyStockAction()],
      })),
    );
  }, [stockActions]);

  const renderExpandedContent = (row) => {
    return (
      <ProductsInOrderForm
        onSubmit={(formData) =>
          onAction("updateStockAction", { formData, row })
        }
        onDelete={() => onAction("removeStockAction", row)}
      />
    );
  };

  return (
    <SheProductCard
      loading={isLoading}
      title="Products in order"
      width="485px"
      minWidth="485px"
      className={cs.productsInOrderCard}
    >
      <div className={cs.productsInOrderCardContent}>
        <div className={cs.addProductBlock}>
          <span className="she-text">
            No order is complete without a product! Add some!
          </span>
          <SheButton
            variant="secondary"
            value="Add Product"
            icon={Plus}
            onClick={() => onAction("addProduct")}
          />
        </div>
        <DndGridDataTable
          key={stockActionsData.length}
          isLoading={isGridLoading}
          showHeader={false}
          columns={
            ProductsInOrderGridColumns({
              onAction,
            }) as ColumnDef<DataWithId>[]
          }
          data={stockActionsData}
          skeletonQuantity={10}
          enableExpansion={true}
          renderExpandedContent={renderExpandedContent}
        />
        <div className={cs.productsSummaryBlock}>
          <span className="she-title"></span>
          <div className={cs.productsSummary}>
            <span className="she-text">Products Total</span>
            <span className="she-text"></span>
          </div>
        </div>
      </div>
    </SheProductCard>
  );
}
