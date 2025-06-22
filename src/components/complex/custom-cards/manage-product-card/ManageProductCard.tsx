import { Cog, GalleryThumbnails, Plus, TableProperties } from "lucide-react";

import { IManageProductCard } from "@/const/interfaces/complex-components/custom-cards/IManageProductCard.ts";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import cs from "./ManageProductCard.module.scss";
import { formatDate } from "@/utils/helpers/quick-helper.ts";
import React, { Fragment } from "react";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { PurchaseProductVariantsGridColumns } from "@/components/complex/grid/purchase-product-variants-grid/PurchaseProductVariantsGridColumns.tsx";

export default function ManageProductCard({
  isLoading,
  purchase,
  product,
  variants,
  variantsGridModel,
  isVariantGridLoading,
  productTraits,
  onAction,
}: IManageProductCard) {
  function handleAction() {}

  return (
    <SheProductCard
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
                isLoading={isVariantGridLoading}
                columns={PurchaseProductVariantsGridColumns(handleAction)}
                data={variants}
                gridModel={variantsGridModel}
                showHeader={false}
              />
            </div>
          </>
        )}
      </div>
    </SheProductCard>
  );
}
