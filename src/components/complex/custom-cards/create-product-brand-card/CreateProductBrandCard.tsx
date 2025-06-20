import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductBrandCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheImageUploader } from "@/components/complex/she-images-uploader/SheImageUploader.tsx";
import { ICreateProductBrandCard } from "@/const/interfaces/complex-components/custom-cards/ICreateProductBrandCard.ts";

export default function CreateProductBrandCard({
  isLoading,
  brand,
  onAction,
}: ICreateProductBrandCard) {
  return (
    <div>
      <SheProductCard
        loading={isLoading}
        title="Create Product Brand"
        showCloseButton
        className={cs.createProductBrandCard}
        onSecondaryButtonClick={() => onAction("closeCreateProductBrandCard")}
      >
        <div className={cs.cardContent}>
          <SheInput
            className={cs.productCategoryInput}
            label="Brand Name"
            placeholder="enter brand name..."
            fullWidth
            onDelay={(value) => onAction("checkBrandName", value)}
          />
          <SheButton
            onClick={() => onAction("createProductBrand", brand.brandName)}
            value="Add Brand"
          />
          <div>
            <SheImageUploader
              contextName={"brand"}
              contextId={brand.brandId}
              onUpload={(model) =>
                onAction("uploadCategoryOrBrandPhoto", model)
              }
            />
          </div>
        </div>
      </SheProductCard>
    </div>
  );
}
