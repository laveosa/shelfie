import React, { useRef, useState } from "react";

import { CogIcon, Copyright, ImageIcon } from "lucide-react";

import cs from "./CreateProductBrandCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  SheFileUploader,
  SheFileUploaderRef,
} from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ICreateProductBrandCard } from "@/const/interfaces/complex-components/custom-cards/ICreateProductBrandCard.ts";

export default function CreateProductBrandCard({
  isLoading,
  isPhotoUploaderLoading,
  brand,
  selectedCompany,
  onAction,
}: ICreateProductBrandCard) {
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
      brandName: brand.brandName,
      images: selectedFiles,
      uploadModels: uploadModels,
    };

    setSubmissionData(completeData);
    onAction?.("createProductBrand", completeData);
  }

  function onCloseHandler() {
    onAction?.("closeCreateProductBrandCard");
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
      className={cs.createProductBrandCard}
      title="Create Product Brand"
      titleTransKey="CardTitles.CreateProductBrand"
      isLoading={isLoading}
      showCloseButton
      onSecondaryButtonClick={onCloseHandler}
    >
      <div className={cs.cardContent}>
        <SheInput
          label="Brand Name"
          labelTransKey="ProductForm.Labels.BrandName"
          placeholder="enter brand name..."
          placeholderTransKey="ProductForm.Placeholders.BrandName"
          errorMessage={brand?.error}
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
            contextName="brand"
            contextId={brand?.brandId}
            fullWidth
            hideUploadButton={true}
          />
        )}
        <Separator />
        <div className={cs.brandOwnerBlock}>
          <div className={cs.brandOwnerSelect}>
            <span className={`${cs.brandOwnerSelectTitle} she-title`}>
              Brand owner
            </span>
            <SheButton
              variant="secondary"
              icon={Copyright}
              value="Select Company"
              onClick={() => onAction("openSelectEntityCard")}
            />
          </div>
          {selectedCompany && (
            <div className={cs.selectedCompany}>
              <div className={cs.selectedCompanyDetails}>
                <div className={cs.companyPhoto}>
                  {selectedCompany.thumbnailUrl ? (
                    <img
                      src={selectedCompany?.thumbnailUrl}
                      alt={selectedCompany?.companyName}
                    />
                  ) : (
                    <SheIcon icon={ImageIcon} />
                  )}
                </div>
                <div className={cs.companyDesc}>
                  <SheTooltip
                    delayDuration={200}
                    text={selectedCompany?.companyName}
                    className={cs.companyNameTooltip}
                  >
                    <span className={`${cs.companyName} she-text`}>
                      {selectedCompany?.companyName}
                    </span>
                  </SheTooltip>
                  {selectedCompany?.address && (
                    <SheTooltip
                      delayDuration={200}
                      text={selectedCompany?.address}
                      className="max-w-[150px]"
                    >
                      <span className={`${cs.twoLineEllipsis} she-text`}>
                        {selectedCompany?.address}
                      </span>
                    </SheTooltip>
                  )}
                </div>
                <SheButton
                  icon={CogIcon}
                  value="Manage"
                  valueTransKey="CommonButtons.Manage"
                  variant="secondary"
                  onClick={() => onAction("manageCompany", selectedCompany)}
                />
              </div>
            </div>
          )}
        </div>
        <Separator />
        <SheButton
          value="Add Brand"
          valueTransKey="ProductActions.AddBrand"
          disabled={!brand?.brandName || !!brand?.error}
          onClick={onSubmitHandler}
        />
      </div>
    </SheCard>
  );
}
