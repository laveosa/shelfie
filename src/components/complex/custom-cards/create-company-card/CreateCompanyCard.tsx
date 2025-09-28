import React, { useRef, useState } from "react";

import {
  SheFileUploader,
  SheFileUploaderRef,
} from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateCompanyCard.module.scss";
import { ICreateCompanyCard } from "@/const/interfaces/complex-components/custom-cards/ICreateCompanyCard.ts";
import CreateCompanyForm from "@/components/forms/create-company-form/CreateCompanyForm.tsx";
import AddressForm from "@/components/forms/address-form/AddressForm.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { CompanyModel } from "@/const/models/CompanyModel.ts";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import { Plus } from "lucide-react";

export default function CreateCompanyCard({
  isLoading,
  isPhotoUploaderLoading,
  countryCodes,
  onAction,
}: ICreateCompanyCard) {
  const [companyFormData, setCompanyFormData] = useState<CompanyModel>(null);
  const [addressFormData, setAddressFormData] = useState<CompanyModel>(null);
  const [submissionData, setSubmissionData] = useState(null);
  const imageUploaderRef = useRef<SheFileUploaderRef>(null);
  const isFormValid = companyFormData !== null && addressFormData !== null;
  const getCurrentImages = () => {
    if (isLoading && submissionData?.images) {
      return submissionData.images;
    }
    return imageUploaderRef.current?.getSelectedFiles() || [];
  };

  function handleFormSubmit() {
    const selectedFiles = imageUploaderRef.current?.getSelectedFiles() || [];
    const uploadModels = imageUploaderRef.current?.getUploadModels() || [];
    const completeData = {
      company: companyFormData,
      address: addressFormData,
      image: {
        images: selectedFiles,
        uploadModels: uploadModels,
      },
    };

    setSubmissionData(completeData);
    onAction("createCompany", completeData);
  }

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.createCompanyCard}
      title="Create Company"
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeCreateCompanyCard")}
    >
      <div className={cs.createCompanyCardContent}>
        <CreateCompanyForm
          isLoading={isLoading}
          className={cs.supplierConfigurationCardForm}
          countryCodes={countryCodes}
          onSubmit={(data) => onAction("createCompany", data)}
          onCancel={() => onAction("closeCreateCompanyCard")}
          onHandleUpData={(data) => setCompanyFormData(data)}
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
            contextName="company"
            contextId={undefined}
            fullWidth
            hideUploadButton={true}
          />
        )}
        <AddressForm
          isCreate={true}
          onSubmit={(data) => onAction("createCompany", data)}
          onCancel={() => onAction("closeCreateCompanyCard")}
          countryList={countryCodes}
          showFooter={false}
          onHandleUpData={(data) => setAddressFormData(data)}
        />
      </div>
      <div className={cs.createCompanyCardButtonBlock}>
        <SheButton
          value="Cancel"
          variant="secondary"
          onClick={() => onAction("closeCreateCompanyCard")}
        />
        <SheButton
          icon={Plus}
          value="Create Company"
          variant="info"
          disabled={!isFormValid}
          onClick={handleFormSubmit}
        />
      </div>
    </SheProductCard>
  );
}
