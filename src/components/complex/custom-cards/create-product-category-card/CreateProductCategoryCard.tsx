import React, { useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductCategoryCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import useCreateProductPageService from "@/pages/products-section/create-product-page/useCreateProductPageService.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { SheImageUploader } from "@/components/complex/she-images-file-uploader/SheImageUploader.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export default function CreateProductCategoryCard({ ...props }) {
  const service = useCreateProductPageService();
  const [category, setCategory] = useState<CategoryModel>({});
  const [contextId, setContextId] = useState<number | null>(null);

  const handleInputChange = (event) => {
    const categoryName = event;
    setCategory({ ...category, categoryName });
    service.checkCategoryNameHandler({ categoryName }).then(() => {});
  };

  function onCreateCategoryHandler() {
    service.createNewCategoryHandler(category).then((res) => {
      setContextId(res.categoryId);
    });
  }

  function handleFileUpload(uploadModel: UploadPhotoModel) {
    service.uploadPhotoHandler(uploadModel);
  }

  return (
    <div>
      <SheProductCard
        title="Create Product Category"
        view="card"
        primaryButtonTitle="Add Category"
        showSecondaryButton={true}
        secondaryButtonTitle="Close"
        className={cs.createProductCategoryCard}
        {...props}
      >
        <div className={cs.cardContent}>
          <SheInput
            className={cs.productCategoryInput}
            label="Category Name"
            placeholder="enter category name..."
            value={category.categoryName || ""}
            onDelay={handleInputChange}
          />
          <SheButton onClick={onCreateCategoryHandler}>
            Create Category
          </SheButton>
          <div>
            <div className={`${cs.imageUploaderLabel} she-text`}>
              Category images
            </div>
            <SheImageUploader
              contextName={"category"}
              contextId={contextId}
              onUpload={handleFileUpload}
            />
          </div>
        </div>
      </SheProductCard>
    </div>
  );
}
