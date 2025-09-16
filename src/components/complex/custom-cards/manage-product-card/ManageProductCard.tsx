import React, { Fragment, useEffect, useState } from "react";
import { Cog, GalleryThumbnails, Plus, TableProperties } from "lucide-react";
import { useTranslation } from "react-i18next";

import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { IManageProductCard } from "@/const/interfaces/complex-components/custom-cards/IManageProductCard.ts";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import cs from "./ManageProductCard.module.scss";
import { formatDate } from "@/utils/helpers/quick-helper.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { ColumnDef } from "@tanstack/react-table";
import ManageProductsForPurchaseForm from "@/components/forms/manage-products-for-purchase-form/ManageProductsForPurchaseForm.tsx";
import { PurchaseProductVariantsGridColumns } from "@/components/complex/grid/custom-grids/purchase-product-variants-grid/PurchaseProductVariantsGridColumns.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

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
  const { t } = useTranslation();

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
        <ManageProductsForPurchaseForm
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
      case "manageVariant":
        onAction("manageVariant", rowData);
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
      width="560px"
      loading={isLoading}
      className={cs.manageProductCard}
      title={t("CardTitles.ManageProductForPurchase", {
        date: formatDate(purchase?.date, "date"),
      })}
      showSecondaryButton={true}
      secondaryButtonTitle={t("ProductActions.BackToProductList")}
      onSecondaryButtonClick={() => onAction("openPurchaseProductsCard")}
    >
      <div className={cs.manageProductCardContent}>
        <div className={cs.productDataBlock}>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-title`}>
              {t("SectionTitles.Product")}
            </span>
            <SheButton
              className={cs.productDataCell}
              icon={Cog}
              value={t("ProductActions.ManageProduct")}
              variant="secondary"
              maxWidth="160px"
              onClick={() => onAction("manageProductData")}
            />
          </div>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-text`}>
              {t("ProductForm.Labels.ProductName")}
            </span>
            <span className={`${cs.productDataCell} she-text`}>
              {product?.productName}
            </span>
          </div>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-text`}>
              {t("ProductForm.Labels.ProductCode")}
            </span>
            <span className={`${cs.productDataCell} she-text`}>
              {product?.productCode}
            </span>
          </div>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-text`}>
              {t("SectionTitles.Category")}
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
              {t("SectionTitles.Brand")}
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
              {t("CardTitles.ProductPhotos")}
            </span>
            <SheButton
              className={cs.productDataCell}
              icon={GalleryThumbnails}
              value={t("CardTitles.ManagePhotos")}
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
                ? t("ProductForm.Labels.ProductTraits")
                : t("ProductForm.Labels.ConfigureTraitsToCreateVariant")}
            </span>
            <div className={`${cs.productDataCell} ${cs.traitsDataCell}`}>
              {productTraits?.length > 0 && (
                <span className="she-text">
                  {t("ProductForm.Labels.ProductDescribedByTraits")}{" "}
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
                value={t("ProductActions.ManageTraits")}
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
                  {t("ProductActions.ManageVariants")}
                </span>
                <div className={cs.productDataCell}>
                  <SheButton
                    icon={Plus}
                    value={t("ProductActions.CreateVariant")}
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
