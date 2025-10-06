import React, { useRef, useState } from "react";

import cs from "./CreateProductCategoryCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import {
  SheFileUploader,
  SheFileUploaderRef,
} from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import { ICreateProductCategoryCard } from "@/const/interfaces/complex-components/custom-cards/ICreateProductCategoryCard.ts";

export default function CreateProductCategoryCard({
  isLoading,
  isPhotoUploaderLoading,
  category,
  onAction,
}: ICreateProductCategoryCard) {
  // ==================================================================== STATE MANAGEMENT
  const [submissionData, setSubmissionData] = useState<any>({});

  // ==================================================================== REF
  const imageUploaderRef = useRef<SheFileUploaderRef>(null);

  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== EVENT HANDLERS
  function onSubmitHandler() {
    const selectedFiles = imageUploaderRef.current?.getSelectedFiles() || [];
    const uploadModels = imageUploaderRef.current?.getUploadModels() || [];
    const completeData = {
      categoryName: category.categoryName,
      images: selectedFiles,
      uploadModels: uploadModels,
    };

    setSubmissionData(completeData);
    onAction?.("createProductCategory", completeData);
  }

  function onCloseHandler() {
    onAction?.("closeCreateProductCategoryCard");
  }

  // ==================================================================== PRIVATE
  const getCurrentImages = () => {
    if (isLoading && submissionData?.images) {
      return submissionData.images;
    }
    return imageUploaderRef.current?.getSelectedFiles() || [];
  };

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.createProductCategoryCard}
      title="Create Product Category"
      titleTransKey="CardTitles.CreateProductCategory"
      isLoading={isLoading}
      showCloseButton
      onSecondaryButtonClick={onCloseHandler}
    >
      <div className={cs.cardContent}>
        <SheInput
          label="Category Name"
          labelTransKey="ProductForm.Labels.CategoryName"
          placeholder="enter category name..."
          placeholderTransKey="ProductForm.Placeholders.CategoryName"
          errorMessage={category?.error}
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
                        {file.name ||
                          `${translate("ProductForm.Labels.Image")} ${index + 1}`}
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
          value="Add Category"
          valueTransKey="ProductActions.AddCategory"
          disabled={!category?.categoryName || !!category?.error}
          onClick={onSubmitHandler}
        />
      </div>
    </SheCard>
  );
}
