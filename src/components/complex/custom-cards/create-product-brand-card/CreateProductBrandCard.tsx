import React, { useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductBrandCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import useCreateProductPageService from "@/pages/products-section/create-product-page/useCreateProductPageService.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheImageUploader } from "@/components/complex/she-images-file-uploader/SheImageUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { useToast } from "@/hooks/useToast.ts";

export default function CreateProductBrandCard({ ...props }) {
  const service = useCreateProductPageService();
  const [brand, setBrand] = useState<BrandModel>({});
  const [contextId, setContextId] = useState<number | null>(null);
  const { addToast } = useToast();

  const handleInputChange = (event) => {
    const brandName = event;
    setBrand({ ...brand, brandName });
    service.checkBrandNameHandler({ brandName }).then((res) => {
      if (res.error) {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
    });
  };

  function onCreateBrandHandler() {
    service.createBrandHandler(brand).then((res) => {
      if (res.data) {
        setContextId(res.data.brandId);
        addToast({
          text: "Brand created successfully",
          type: "success",
        });
      } else {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
    });
  }

  function handleFileUpload(uploadModel: UploadPhotoModel) {
    service.uploadPhotoHandler(uploadModel).then((res) => {
      if (res.data.photoId) {
        addToast({
          text: "Photos added successfully",
          type: "success",
        });
      } else {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
    });
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
