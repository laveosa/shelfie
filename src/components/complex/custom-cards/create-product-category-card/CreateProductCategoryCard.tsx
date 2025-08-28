import React, { useRef, useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductCategoryCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import {
  SheFileUploader,
  SheFileUploaderRef,
} from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ICreateProductCategoryCard } from "@/const/interfaces/complex-components/custom-cards/ICreateProductCategoryCard.ts";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";

export default function CreateProductCategoryCard({
  isLoading,
  isPhotoUploaderLoading,
  category,
  onAction,
}: ICreateProductCategoryCard) {
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
      categoryName: category.categoryName,
      images: selectedFiles,
      uploadModels: uploadModels,
    };

    setSubmissionData(completeData);
    onAction("createProductCategory", completeData);
  }

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
            errorMessage={category?.error}
            placeholder="enter category name..."
            fullWidth
            onDelay={(value) => onAction("checkCategoryName", value)}
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
                          {file.name || `Image ${index + 1}`}
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
              contextName="category"
              contextId={category?.categoryId}
              fullWidth
              hideUploadButton={true}
            />
          )}
          <SheButton
            onClick={() => handleSubmit()}
            value="Add Category"
            disabled={!category?.categoryName || !!category?.error}
          />
        </div>
      </SheProductCard>
    </div>
  );
}
