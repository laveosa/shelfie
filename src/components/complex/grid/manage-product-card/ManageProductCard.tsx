import { Cog, GalleryThumbnails, Plus, TableProperties } from "lucide-react";

import { IManageProductCard } from "@/const/interfaces/complex-components/custom-cards/IManageProductCard.ts";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import cs from "./ManageProductCard.module.scss";
import { formatDate } from "@/utils/helpers/quick-helper.ts";

export default function ManageProductCard({
  isLoading,
  purchase,
  product,
  traits,
  onAction,
}: IManageProductCard) {
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
              <img
                src={product?.productCategory?.thumbnail}
                alt={product?.productCategory?.categoryName}
              />
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
              onClick={() => onAction("manageProductPhotos")}
            />
          </div>
        </div>
        <Separator />
        <div className={cs.productDataBlock}>
          <div className={cs.productDataRow}>
            <span className={`${cs.productDataCell} she-title`}>
              {traits?.length > 0
                ? "Product Traits"
                : "Configure traits to create variant"}
            </span>
            <div className={`${cs.productDataCell} ${cs.traitsDataCell}`}>
              {traits?.length > 0 && (
                <span className="she-text">{`The product is described by following traits: ${traits?.map(
                  (trait) => (
                    <span className="she-text">{trait?.traitName}</span>
                  ),
                )}`}</span>
              )}
              <SheButton
                icon={TableProperties}
                value={"Manage Traits"}
                variant="secondary"
                onClick={() => onAction("manageProductTraits")}
              />
            </div>
          </div>
        </div>
        {traits?.length > 0 && (
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
                    onClick={() => onAction("createProductVariants")}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </SheProductCard>
  );
}
