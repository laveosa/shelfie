import { CirclePlus } from "lucide-react";
import React, { useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductBrandCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import useCreateProductPageService from "@/pages/products-section/create-product-page/useCreateProductPageService.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";

export default function CreateProductBrandCard({ ...props }) {
  const service = useCreateProductPageService();

  const [brand, setBrand] = useState<BrandModel>({});

  function handleFileUpload(event) {
    const files = event.target.files;
    console.log(files);
  }

  function onAction() {
    service.createBrandHandler(brand); // Pass the category to the handler
  }

  const handleInputChange = (event) => {
    setBrand({ ...brand, brandName: event });
  };

  return (
    <div>
      <SheProductCard
        title="Create Product Brand"
        view="card"
        showPrimaryButton={true}
        primaryButtonTitle="Add Brand"
        showSecondaryButton={true}
        secondaryButtonTitle="Cancel"
        className={cs.createProductBrandCard}
        onPrimaryButtonClick={onAction}
        {...props}
      >
        <div className={cs.productBrandInput}>
          <SheInput
            label="Brand Name"
            placeholder="enter brand name..."
            value={brand.brandName || ""}
            onDelay={handleInputChange}
          />
        </div>
        <div
          className={cs.productBrandFileUploader}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <CirclePlus />
          <div className={`${cs.text} she-text`}>
            Drag & drop or click to choose brand logo
          </div>
          <input type="file" id="fileInput" onChange={handleFileUpload} />
        </div>
      </SheProductCard>
    </div>
  );
}
