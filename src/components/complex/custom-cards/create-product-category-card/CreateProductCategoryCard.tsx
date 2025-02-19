import React, { useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductCategoryCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import useCreateProductPageService from "@/pages/products-section/create-product-page/useCreateProductPageService.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { SheImagesFileUploader } from "@/components/complex/she-images-file-uploader/SheImagesFileUploader.tsx";

export default function CreateProductCategoryCard({ ...props }) {
  const service = useCreateProductPageService();
  const [category, setCategory] = useState<CategoryModel>({});
  const [contextId, setContextId] = useState<number | null>(null);

  const handleInputChange = (event) => {
    const categoryName = event;
    setCategory({ ...category, categoryName });
    service.checkCategoryNameHandler({ categoryName }).then(() => {
      service
        .createNewCategoryHandler({ categoryName: categoryName })
        .then((res) => {
          setContextId(res.categoryId);
        });
    });
  };

  function handleFileUpload(event) {
    const uploadModel: UploadPhotoModel = {
      contextName: "category",
      contextId,
      file: event.target.files,
    };
    service.uploadPhotoHandler(uploadModel);
  }

  return (
    <div>
      <SheProductCard
        title="Create Product Category"
        view="card"
        primaryButtonTitle="Add Category"
        showSecondaryButton={true}
        secondaryButtonTitle="Cancel"
        className={cs.createProductCategoryCard}
        {...props}
      >
        <div className={cs.productCategoryInput}>
          <SheInput
            label="Category Name"
            placeholder="enter category name..."
            value={category.categoryName || ""}
            onDelay={handleInputChange}
          />
        </div>
        <SheImagesFileUploader
          contextName={"category"}
          contextId={contextId}
          onUpload={handleFileUpload}
        />
      </SheProductCard>
    </div>
  );
}
