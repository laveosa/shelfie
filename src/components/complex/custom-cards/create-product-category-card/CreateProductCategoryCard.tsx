import { CirclePlus } from "lucide-react";
import React, { useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductCategoryCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import useCreateProductPageService from "@/pages/products-section/create-product-page/useCreateProductPageService.ts";
import { ProductCategoryModel } from "@/const/models/ProductCategoryModel.ts";

export default function CreateProductCategoryCard({ ...props }) {
  const service = useCreateProductPageService();

  const [category, setCategory] = useState<ProductCategoryModel>({});

  function handleFileUpload(event) {
    const files = event.target.files;
    console.log(files);
  }

  function onAction() {
    service.createNewCategoryHandler(category); // Pass the category to the handler
  }

  const handleInputChange = (event) => {
    setCategory({ ...category, categoryName: event });
  };

  return (
    <div>
      <SheProductCard
        title="Create Product Category"
        view="card"
        showPrimaryButton={true}
        primaryButtonTitle="Add Category"
        showSecondaryButton={true}
        secondaryButtonTitle="Cancel"
        className={cs.createProductCategoryCard}
        onPrimaryButtonClick={onAction}
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
        <div
          className={cs.productCategoryFileUploader}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <CirclePlus />
          <div className={`${cs.text} she-text`}>
            Drag & drop or click to choose category icon
          </div>
          <input type="file" id="fileInput" onChange={handleFileUpload} />
        </div>
      </SheProductCard>
    </div>
  );
}
