import { Plus } from "lucide-react";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ProductsInOrderCard.module.scss";
import { IProductsInOrderCard } from "@/const/interfaces/complex-components/custom-cards/IProductsInOrderCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { findProductGridColumns } from "@/components/complex/grid/find-product-grid/FindProductGridColumns.tsx";
import { ColumnDef } from "@tanstack/react-table";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";

export default function ProductsInOrderCard({
  isLoading,
  isGridLoading,
  stockActions,
  gridModel,
  gridRequestModel,
  onAction,
}: IProductsInOrderCard) {
  return (
    <SheProductCard
      loading={isLoading}
      title="Products in order"
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
          isLoading={isGridLoading}
          columns={
            findProductGridColumns({
              onAction,
            }) as ColumnDef<DataWithId>[]
          }
          data={stockActions}
          gridModel={gridModel}
          skeletonQuantity={gridRequestModel.pageSize}
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
