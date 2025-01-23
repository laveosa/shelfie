import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductCategoryCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { Plus } from "lucide-react";
import React from "react";

export default function CreateProductCategoryCard({ ...props }) {
  function handleFileUpload(event) {
    const files = event.target.files;
    console.log(files);
  }

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
        {...props}
      >
        <div className={cs.productCategoryInput}>
          <SheInput
            label="Category Name"
            placeholder="enter category name..."
          />
        </div>
        <div
          className={cs.productCategoryFileUploader}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <Plus />
          <div className={`${cs.text} she-text`}>
            Drag & drop or click to choose category icon
          </div>
          <input type="file" id="fileInput" onChange={handleFileUpload} />
        </div>
      </SheProductCard>
    </div>
  );
}
