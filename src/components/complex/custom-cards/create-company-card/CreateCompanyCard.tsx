import React, { useRef, useState } from "react";

import { Plus } from "lucide-react";

import cs from "./CreateCompanyCard.module.scss";
import {
  SheFileUploader,
  SheFileUploaderRef,
} from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import CreateCompanyForm from "@/components/forms/create-company-form/CreateCompanyForm.tsx";
import AddressForm from "@/components/forms/address-form/AddressForm.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { ICreateCompanyCard } from "@/const/interfaces/complex-components/custom-cards/ICreateCompanyCard.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";

export default function CreateCompanyCard({
  isLoading,
  isPhotoUploaderLoading,
  countryCodes,
  onAction,
}: ICreateCompanyCard) {
  // ==================================================================== STATE MANAGEMENT
  const [companyFormData, setCompanyFormData] = useState<CompanyModel>(null);
  const [addressFormData, setAddressFormData] = useState<CompanyModel>(null);
  const [submissionData, setSubmissionData] = useState(null);

  // ==================================================================== REF
  const imageUploaderRef = useRef<SheFileUploaderRef>(null);

  // ==================================================================== UTILITIES
  const isFormValid = companyFormData !== null && addressFormData !== null;

  // ==================================================================== EVENT HANDLERS
  function onSubmitHandler() {
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
      className={cs.createCompanyCard}
      title="Create Company"
      showHeader
      showCloseButton
      isLoading={isLoading}
      onSecondaryButtonClick={() => onAction("closeCreateCompanyCard")}
    >
      <div className={cs.createCompanyCardContent}>
        <CreateCompanyForm
          countryCodes={countryCodes}
          isLoading={isLoading}
          onSubmit={(data) => onAction("createCompany", data)}
          onCancel={() => onAction("closeCreateCompanyCard")}
          onHandleUpData={(data) => setCompanyFormData(data)}
        />
        {isPhotoUploaderLoading ? (
          <div>
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
                    className={` flex relative items-center justify-between p-2 pl-4`}
                  >
                    <div>
                      <img
                        src={imageUrl}
                        alt={`uploading-${file.name || `image-${index}`}`}
                        onLoad={() => {
                          if (file instanceof File) {
                            URL.revokeObjectURL(imageUrl);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <p className="truncate text-sm">
                        {file.name || `Image ${index + 1}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {((file.size || 0) / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <SheLoading />
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
          countryList={countryCodes}
          showFooter={false}
          onSubmit={(data) => onAction("createCompany", data)}
          onCancel={() => onAction("closeCreateCompanyCard")}
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
          onClick={onSubmitHandler}
        />
      </div>
    </SheCard>
  );
}
