import React, { Fragment, JSX, useEffect, useState } from "react";

import { Cog, GalleryThumbnails, Plus, TableProperties } from "lucide-react";

import cs from "./ManageProductCard.module.scss";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import ManageProductsForPurchaseForm from "@/components/forms/manage-products-for-purchase-form/ManageProductsForPurchaseForm.tsx";
import { PurchaseProductVariantsGridColumns } from "@/components/complex/grid/custom-grids/purchase-product-variants-grid/PurchaseProductVariantsGridColumns.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { formatDate } from "@/utils/helpers/quick-helper.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { StockActionDefaultModel } from "@/const/models/StockActionModel.ts";
import { IManageProductCard } from "@/const/interfaces/complex-components/custom-cards/IManageProductCard.ts";

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
  // ==================================================================== STATE MANAGEMENT
  const [variantsData, setVariantsData] = useState([]);

  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (!variants || variants.length === 0) return;

    setVariantsData(
      variants.map((variant) => ({
        ...variant,
        id: variant.variantId,
        expandableRows:
          variant.variantStockActions?.length > 0
            ? variant.variantStockActions
            : [StockActionDefaultModel],
      })),
    );
  }, [variants]);

  // ==================================================================== EVENT HANDLERS
  function onActionHandler(action: string, rowData?: any) {
    switch (action) {
      case "addRow":
        setVariantHandler(rowData.variantId);
        break;
      case "manageVariant":
        onAction("manageVariant", rowData);
        break;
      case "addStockAction":
        rowData.stockAction.stockActionId
          ? onAction("updateStockAction", rowData)
          : onAction("addStockAction", rowData);
        break;
    }
  }

  // ==================================================================== PRIVATE
  function setVariantHandler(variantId: string | number) {
    setVariantsData((prev) => {
      return prev.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              expandableRows: [
                ...(variant.expandableRows || []),
                StockActionDefaultModel,
              ],
            }
          : variant,
      );
    });
  }

  // ==================================================================== LAYOUT
  function renderExpandedContent(
    row,
    stockAction,
    _stockActionIndex,
  ): JSX.Element {
    return (
      <div className={cs.productsForPurchaseForm}>
        <ManageProductsForPurchaseForm
          data={stockAction}
          taxes={taxes}
          currencies={currencies}
          isVariantGrid={true}
          onSubmit={(formData) => {
            onActionHandler("addStockAction", {
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
  }

  return (
    <SheCard
      className={cs.manageProductCard}
      title={translate("CardTitles.ManageProductForPurchase", {
        date: formatDate(purchase?.date, "date"),
      })}
      minWidth="560px"
      maxWidth="560px"
      isLoading={isLoading}
      showFooter
      showPrimaryButton={false}
      secondaryButtonTitle="Back to Product list"
      secondaryButtonTitleTransKey="ProductActions.BackToProductList"
      onSecondaryButtonClick={() => onAction("openPurchaseProductsCard")}
    >
      <div className={cs.manageProductCardContent}>
        <div className={`${cs.productDataBlock} ${cs.productDataBlockManage}`}>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-title`}>
              {translate("SectionTitles.Product")}
            </span>
            <SheButton
              className={cs.productDataCell}
              value="Manage Product"
              valueTransKey="ProductActions.ManageProduct"
              icon={Cog}
              variant="secondary"
              maxWidth="160px"
              onClick={() => onAction("manageProductData")}
            />
          </div>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-text`}>
              {translate("ProductForm.Labels.ProductName")}
            </span>
            <span className={`${cs.productDataCell} she-text`}>
              {product?.productName}
            </span>
          </div>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-text`}>
              {translate("ProductForm.Labels.ProductCode")}
            </span>
            <span className={`${cs.productDataCell} she-text`}>
              {product?.productCode}
            </span>
          </div>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-text`}>
              {translate("SectionTitles.Category")}
            </span>
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
            <span className={`${cs.productDataCell} she-text`}>
              {translate("SectionTitles.Brand")}
            </span>
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
              {translate("CardTitles.ProductPhotos")}
            </span>
            <SheButton
              className={cs.productDataCell}
              icon={GalleryThumbnails}
              value="Manage Photos"
              valueTransKey="CardTitles.ManagePhotos"
              variant="secondary"
              maxWidth="160px"
              onClick={() => onAction("manageProductPhotos")}
            />
          </div>
        </div>
        <Separator />
        <div className={cs.productDataBlock}>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-title`}>
              {productTraits?.length > 0
                ? translate("ProductForm.Labels.ProductTraits")
                : translate(
                    "ProductForm.Labels.ConfigureTraitsToCreateVariant",
                  )}
            </span>
            <div className={`${cs.productDataCell} ${cs.traitsDataCell}`}>
              {productTraits?.length > 0 && (
                <span className="she-text">
                  {translate("ProductForm.Labels.ProductDescribedByTraits")}{" "}
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
                value="Manage Traits"
                valueTransKey="ProductActions.ManageTraits"
                variant="secondary"
                minWidth="160px"
                maxWidth="160px"
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
                  {translate("ProductActions.ManageVariants")}
                </span>
                <div className={cs.productDataCell}>
                  <SheButton
                    icon={Plus}
                    value="Create Variant"
                    valueTransKey="ProductActions.CreateVariant"
                    variant="secondary"
                    minWidth="160px"
                    maxWidth="160px"
                    onClick={() => onAction("openAddVariantCard", product)}
                  />
                </div>
              </div>
            </div>
            <div>
              <SheGrid
                key={variantsData.length}
                isLoading={isVariantGridLoading}
                data={variantsData}
                columns={PurchaseProductVariantsGridColumns(onActionHandler)}
                enableExpansion={true}
                renderExpandedContent={renderExpandedContent}
                createEmptyExpandableRow={() => StockActionDefaultModel}
                showHeader={false}
                onAction={onActionHandler}
              />
            </div>
          </>
        )}
      </div>
    </SheCard>
  );
}
