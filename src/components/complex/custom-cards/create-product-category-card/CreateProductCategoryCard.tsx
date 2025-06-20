import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductCategoryCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { SheImageUploader } from "@/components/complex/she-images-uploader/SheImageUploader.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ICreateProductCategoryCard } from "@/const/interfaces/complex-components/custom-cards/ICreateProductCategoryCard.ts";

export default function CreateProductCategoryCard({
  isLoading,
  category,
  onAction,
}: ICreateProductCategoryCard) {
  return (
    <div>
      <SheProductCard
        loading={isLoading}
        title="Create Product Category"
        showCloseButton
        primaryButtonTitle="Add Category"
        className={cs.createProductCategoryCard}
        onSecondaryButtonClick={() =>
          onAction("closeCreateProductCategoryCard")
        }
      >
        <div className={cs.cardContent}>
          <SheInput
            className={cs.productCategoryInput}
            label="Category Name"
            placeholder="enter category name..."
            fullWidth
            onDelay={(value) => onAction("checkCategoryName", value)}
          />
          <SheButton
            onClick={() =>
              onAction("createProductCategory", category.categoryName)
            }
            value="Add Category"
          />
          <div>
            <SheImageUploader
              contextName={"category"}
              contextId={category.categoryId}
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
