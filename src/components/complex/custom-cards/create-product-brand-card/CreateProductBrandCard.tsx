import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  SheFileUploader,
  SheFileUploaderRef,
} from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductBrandCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ICreateProductBrandCard } from "@/const/interfaces/complex-components/custom-cards/ICreateProductBrandCard.ts";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";

export default function CreateProductBrandCard({
  isLoading,
  isPhotoUploaderLoading,
  brand,
  onAction,
}: ICreateProductBrandCard) {
  const { t } = useTranslation();
  const imageUploaderRef = useRef<SheFileUploaderRef>(null);
  const [submissionData, setSubmissionData] = useState<any>({});

  const getCurrentImages = () => {
    if (isLoading && submissionData?.images) {
      return submissionData.images;
    }
    return imageUploaderRef.current?.getSelectedFiles() || [];
  };

  function handleSubmit() {
    const selectedFiles = imageUploaderRef.current?.getSelectedFiles() || [];
    const uploadModels = imageUploaderRef.current?.getUploadModels() || [];
    const completeData = {
      brandName: brand.brandName,
      images: selectedFiles,
      uploadModels: uploadModels,
    };

    setSubmissionData(completeData);
    onAction("createProductBrand", completeData);
  }

  return (
    <div>
      <SheProductCard
        loading={isLoading}
        title={t("CardTitles.CreateProductBrand")}
        showCloseButton
        className={cs.createProductBrandCard}
        onSecondaryButtonClick={() => onAction("closeCreateProductBrandCard")}
      >
        <div className={cs.cardContent}>
          <SheInput
            className={cs.productCategoryInput}
            label={t("ProductForm.Labels.BrandName")}
            errorMessage={brand?.error}
            placeholder={t("ProductForm.Placeholders.BrandName")}
            fullWidth
            onDelay={(value) => onAction("checkBrandName", value)}
          />
          {isPhotoUploaderLoading ? (
            <div className={cs.uploadingBlockContainer}>
              {getCurrentImages().map((file: any, index) => {
                const imageUrl =
                  file instanceof File
                    ? URL.createObjectURL(file)
                    : file.result || file.path;

                return (
                  <div
                    className="overflow-hidden rounded-md bg-secondary p-0 shadow-sm"
                    key={file.name || index}
                  >
                    <div
                      className={`${cs.uploadingItem} flex relative items-center justify-between p-2 pl-4`}
                    >
                      <div className={cs.uploadingImageContainer}>
                        <img
                          src={imageUrl}
                          alt={`uploading-${file.name || `image-${index}`}`}
                          className={cs.uploadingItemImage}
                          onLoad={() => {
                            if (file instanceof File) {
                              URL.revokeObjectURL(imageUrl);
                            }
                          }}
                        />
                      </div>
                      <div className={cs.uploadingItemTextBlock}>
                        <p className="truncate text-sm">
                          {file.name || `${t("ProductForm.Labels.Image")} ${index + 1}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {((file.size || 0) / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <SheLoading className={cs.loadingBlock} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <SheFileUploader
              isLoading={isPhotoUploaderLoading}
              ref={imageUploaderRef}
              contextName="brand"
              contextId={brand?.brandId}
              fullWidth
              hideUploadButton={true}
            />
          )}
          <SheButton
            onClick={() => handleSubmit()}
            value={t("ProductActions.AddBrand")}
            disabled={!brand?.brandName || !!brand?.error}
          />
        </div>
      </SheProductCard>
    </div>
  );
}
