import React, { useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductBrandCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import useCreateProductPageService from "@/pages/products-section/create-product-page/useCreateProductPageService.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheImageUploader } from "@/components/complex/she-images-file-uploader/SheImageUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";

export default function CreateProductBrandCard({ ...props }) {
  const service = useCreateProductPageService();
  const [brand, setBrand] = useState<BrandModel>({});
  const [contextId, setContextId] = useState<number | null>(null);

  const handleInputChange = (event) => {
    const brandName = event;
    setBrand({ ...brand, brandName });
    service.checkBrandNameHandler({ brandName }).then(() => {});
  };

  function onCreateBrandHandler() {
    service.createBrandHandler(brand).then((res) => {
      setContextId(res.brandId);
    });
  }

  function handleFileUpload(uploadModel: UploadPhotoModel) {
    service.uploadPhotoHandler(uploadModel);
  }

  return (
    <div>
      <SheProductCard
        title="Create Product Brand"
        view="card"
        showSecondaryButton={true}
        secondaryButtonTitle="Close"
        className={cs.createProductBrandCard}
        {...props}
      >
        <div className={cs.cardContent}>
          <SheInput
            className={cs.productCategoryInput}
            label="Brand Name"
            placeholder="enter brand name..."
            value={brand.brandName || ""}
            onDelay={handleInputChange}
          />
          <SheButton onClick={onCreateBrandHandler}>Create Brand</SheButton>
          <div>
            <div className={`${cs.imageUploaderLabel} she-text`}>
              Brand images
            </div>
            <SheImageUploader
              contextName={"brand"}
              contextId={contextId}
              onUpload={handleFileUpload}
            />
          </div>
        </div>
      </SheProductCard>
    </div>
  );
}
