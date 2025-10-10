import React, { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

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
import { AppFormType } from "@/const/types/AppFormType.ts";
import { AddressRequestModel } from "@/const/models/AddressRequestModel.ts";

export default function CreateCompanyCard({
  isLoading,
  isPhotoUploaderLoading,
  countryCodes,
  onAction,
}: ICreateCompanyCard) {
  // ==================================================================== STATE MANAGEMENT
  const [companyFormData, setCompanyFormData] =
    useState<UseFormReturn<AppFormType<CompanyModel>>>(null);
  const [addressFormData, setAddressFormData] =
    useState<UseFormReturn<AppFormType<AddressRequestModel>>>(null);
  const [submissionData, setSubmissionData] = useState(null);
  const [isValid, setIsValid] = useState<boolean>(null);

  // ==================================================================== REF
  const imageUploaderRef = useRef<SheFileUploaderRef>(null);

  // ==================================================================== UTILITIES

  // ==================================================================== EVENT HANDLERS
  function onCompanyFormChange(_, form) {
    setCompanyFormData(form);
    _checkIsValid();
  }

  function onAddressFormChange(_, form) {
    setAddressFormData(form);
    _checkIsValid();
  }

  function onSubmitHandler() {
    const selectedFiles = imageUploaderRef.current?.getSelectedFiles() || [];
    const uploadModels = imageUploaderRef.current?.getUploadModels() || [];
    const completeData = {
      company: companyFormData.getValues(),
      address: addressFormData.getValues(),
      image: {
        images: selectedFiles,
        uploadModels: uploadModels,
      },
    };

    setSubmissionData(completeData);
    onAction("createCompany", completeData);
  }

  // ==================================================================== PRIVATE
  function _getCurrentImages() {
    return isLoading && submissionData?.images
      ? submissionData.images
      : imageUploaderRef.current?.getSelectedFiles() || [];
  }

  function _checkIsValid() {
    if (!companyFormData || !addressFormData) {
      setIsValid(false);
      return;
    }

    setIsValid(
      companyFormData.formState.isValid && addressFormData.formState.isValid,
    );
  }

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.createCompanyCard}
      title="Create Company"
      showCloseButton
      isLoading={isLoading}
      onSecondaryButtonClick={() => onAction("closeCreateCompanyCard")}
    >
      <div className={cs.createCompanyCardContent}>
        <CreateCompanyForm
          countryCodes={countryCodes}
          onChange={onCompanyFormChange}
        />
        {isPhotoUploaderLoading ? (
          <div>
            {_getCurrentImages().map((file: any, index) => {
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
          countryList={countryCodes}
          isCreate
          showFooter={false}
          onChange={onAddressFormChange}
          onSubmit={(data) => onAction("createCompany", data)}
          onCancel={() => onAction("closeCreateCompanyCard")}
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
          disabled={!isValid}
          onClick={onSubmitHandler}
        />
      </div>
    </SheCard>
  );
}
