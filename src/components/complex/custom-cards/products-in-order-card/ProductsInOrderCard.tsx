import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

import { DndGridDataTable } from "@/components/complex/grid/SheGrid.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ProductsInOrderCard.module.scss";
import { IProductsInOrderCard } from "@/const/interfaces/complex-components/custom-cards/IProductsInOrderCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import ProductsInOrderForm from "@/components/forms/products-in-order-form/PrductsInOrderForm.tsx";
import { ProductsInOrderGridColumns } from "@/components/complex/grid/custom-grids/products-in-order-grid/ProductsInOrderGridColums.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

export default function ProductsInOrderCard({
  isLoading,
  isGridLoading,
  stockActions,
  onAction,
}: IProductsInOrderCard) {
  const { t } = useTranslation();
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
      title={t("CardTitles.ProductsInOrder")}
      width="485px"
      minWidth="485px"
      className={cs.productsInOrderCard}
    >
      <div className={cs.productsInOrderCardContent}>
        <div className={cs.addProductBlock}>
          <span className="she-text">
            {t("OrderMessages.NoOrderCompleteWithoutProduct")}
          </span>
          <SheButton
            variant="secondary"
            value={t("OrderActions.AddProduct")}
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
            <span className="she-text">
              {t("OrderForm.Labels.ProductsTotal")}
            </span>
            <span className="she-text"></span>
          </div>
        </div>
      </div>
    </SheProductCard>
  );
}
