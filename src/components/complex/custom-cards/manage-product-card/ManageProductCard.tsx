import React, { Fragment, useEffect, useState } from "react";
import { Cog, GalleryThumbnails, Plus, TableProperties } from "lucide-react";

import { IManageProductCard } from "@/const/interfaces/complex-components/custom-cards/IManageProductCard.ts";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import cs from "./ManageProductCard.module.scss";
import { formatDate } from "@/utils/helpers/quick-helper.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { PurchaseProductVariantsGridColumns } from "@/components/complex/grid/purchase-product-variants-grid/PurchaseProductVariantsGridColumns.tsx";
import PurchaseProductsForm from "@/components/forms/purchase-products-form/PurchaseProductsForm.tsx";
import { ColumnDef } from "@tanstack/react-table";

export default function ManageProductCard({
  isLoading,
  purchase,
  product,
  variants,
  currencies,
  taxes,
  isVariantGridLoading,
  productTraits,
  onAction,
}: IManageProductCard) {
  const createEmptyStockAction = () => ({
    currencyId: null,
    nettoPrice: null,
    taxTypeId: null,
    unitsAmount: null,
  });

  const [variantsData, setVariantsData] = useState([]);

  useEffect(() => {
    if (!variants || variants.length === 0) return;

    setVariantsData(
      variants.map((variant) => ({
        ...variant,
        id: variant.variantId,
        expandableRows:
          variant.variantStockActions?.length > 0
            ? variant.variantStockActions
            : [createEmptyStockAction()],
      })),
    );
  }, [variants]);

  const handleAddStockAction = (variantId: string | number) => {
    const newStockAction = createEmptyStockAction();
    setVariantsData((prev) => {
      const updated = prev.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              expandableRows: [
                ...(variant.expandableRows || []),
                newStockAction,
              ],
            }
          : variant,
      );
      return updated;
    });
  };

  const renderExpandedContent = (row, stockAction, _stockActionIndex) => {
    return (
      <div>
        <PurchaseProductsForm
          data={stockAction}
          taxes={taxes}
          currencies={currencies}
          isVariantGrid={true}
          onSubmit={(formData) => {
            handleAction("addStockAction", {
              purchase,
              row,
              formData,
              stockAction,
            });
          }}
          onDelete={() => onAction("deleteStockAction", stockAction)}
        />
      </div>
    );
  };

  const handleAction = (action: string, rowData?: any) => {
    switch (action) {
      case "addRow":
        handleAddStockAction(rowData.variantId);
        break;
      case "addStockAction":
        rowData.stockAction.stockActionId
          ? onAction("updateStockAction", rowData)
          : onAction("addStockAction", rowData);
        break;
    }
  };

  return (
    <SheProductCard
      width="550px"
      loading={isLoading}
      className={cs.manageProductCard}
      title={`Manage Product for Purchase ${formatDate(purchase?.date, "date")}`}
      showSecondaryButton={true}
      secondaryButtonTitle="Back to Product list"
      onSecondaryButtonClick={() => onAction("openPurchaseProductsCard")}
    >
      <div className={cs.manageProductCardContent}>
        <div className={cs.productDataBlock}>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-title`}>Product</span>
            <SheButton
              className={cs.productDataCell}
              icon={Cog}
              value={"Manage Product"}
              variant="secondary"
              fullWidth
              onClick={() => onAction("manageProductData")}
            />
          </div>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-text`}>Name</span>
            <span className={`${cs.productDataCell} she-text`}>
              {product?.productName}
            </span>
          </div>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-text`}>
              Product Code
            </span>
            <span className={`${cs.productDataCell} she-text`}>
              {product?.productCode}
            </span>
          </div>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-text`}>Category</span>
            <div className={cs.productDataCell}>
              {product?.productCategory?.thumbnail && (
                <img
                  src={product?.productCategory?.thumbnail}
                  alt={product?.productCategory?.categoryName}
                />
              )}
              <span className="she-text">
                {product?.productCategory?.categoryName}
              </span>
            </div>
          </div>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-text`}>Brand</span>
            <div className={cs.productDataCell}>
              {product?.brand?.thumbnail && (
                <img
                  src={product?.brand?.thumbnail}
                  alt={product?.brand?.brandName}
                />
              )}
              <span className="she-text">{product?.brand?.brandName}</span>
            </div>
          </div>
        </div>
        <Separator />
        <div className={cs.productDataBlock}>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-title`}>
              Product Photos
            </span>
            <SheButton
              className={cs.productDataCell}
              icon={GalleryThumbnails}
              value={"Manage Photos"}
              variant="secondary"
              fullWidth
              onClick={() => onAction("manageProductPhotos")}
            />
          </div>
        </div>
        <Separator />
        <div className={cs.productDataBlock}>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-title`}>
              {productTraits?.length > 0
                ? "Product Traits"
                : "Configure traits to create variant"}
            </span>
            <div className={`${cs.productDataCell} ${cs.traitsDataCell}`}>
              {productTraits?.length > 0 && (
                <span className="she-text">
                  The product is described by following traits:{" "}
                  {productTraits.map((trait: TraitModel, index: number) => (
                    <Fragment key={trait.traitId}>
                      <b>{trait.traitName}</b>
                      {index < productTraits.length - 1 ? ", " : ""}
                    </Fragment>
                  ))}
                </span>
              )}
              <SheButton
                icon={TableProperties}
                value={"Manage Traits"}
                variant="secondary"
                fullWidth
                onClick={() => onAction("manageProductTraits")}
              />
            </div>
          </div>
        </div>
        {productTraits?.length > 0 && (
          <>
            <Separator />
            <div className={cs.productDataBlock}>
              <div className={cs.productDataRow}>
                <span className={`${cs.productDataCell} she-title`}>
                  Manage variants
                </span>
                <div className={cs.productDataCell}>
                  <SheButton
                    icon={Plus}
                    value={"Create Variant"}
                    variant="secondary"
                    fullWidth
                    onClick={() => onAction("openAddVariantCard", product)}
                  />
                </div>
              </div>
            </div>
            <div>
              <DndGridDataTable
                key={variantsData.length}
                isLoading={isVariantGridLoading}
                data={variantsData}
                columns={
                  PurchaseProductVariantsGridColumns(
                    handleAction,
                  ) as ColumnDef<DataWithId>[]
                }
                enableExpansion={true}
                renderExpandedContent={renderExpandedContent}
                createEmptyExpandableRow={createEmptyStockAction}
                showHeader={false}
                onAction={handleAction}
              />
            </div>
          </>
        )}
      </div>
    </SheProductCard>
  );
}
