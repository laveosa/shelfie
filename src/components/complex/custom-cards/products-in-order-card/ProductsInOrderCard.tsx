import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import cs from "./ProductsInOrderCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import ProductsInOrderForm
  from "@/components/forms/products-in-order-form/PrductsInOrderForm.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import {
  ProductsInOrderGridColumns
} from "@/components/complex/grid/custom-grids/products-in-order-grid/ProductsInOrderGridColums.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import {
  IProductsInOrderCard
} from "@/const/interfaces/complex-components/custom-cards/IProductsInOrderCard.ts";

export default function ProductsInOrderCard({
  isLoading,
  isGridLoading,
  stockActions,
  onAction,
}: IProductsInOrderCard) {
  // ==================================================================== STATE MANAGEMENT
  const [stockActionsData, setStockActionsData] = useState(null);
  const [productsTotal, setProductsTotal] = useState({
    total: 0,
    currency: "",
  });
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

  useEffect(() => {
    if (!stockActionsData?.length) {
      setProductsTotal({ total: 0, currency: "" });
      return;
    }

    const computedProductsTotal = stockActionsData.reduce(
      (acc, item) => {
        const brutto = Number(item.stockDocumentPrice?.brutto) || 0;
        const units = Number(item.unitsAmount) || 0;
        const currency = item.stockDocumentPrice?.currencyName || acc.currency;

        return {
          total: acc.total + brutto * units,
          currency,
        };
      },
      { total: 0, currency: "" },
    );
    setProductsTotal(computedProductsTotal);
  }, [stockActionsData]);

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
          <div className={cs.productsSummary}>
            <span className={cs.productsSummaryTitle}>Summary</span>
            <div className={cs.productsSummaryTextBlock}>
              <span className={`${cs.productsSummaryText} she-text`}>
                {translate("OrderForm.Labels.ProductsTotal")}
              </span>
              <span className={`${cs.productsSummaryText} she-text`}>
                {productsTotal.total.toFixed(2) || 0}
                {productsTotal.currency}
              </span>
            </div>
          </div>
        </div>
      </div>
    </SheCard>
  );
}
