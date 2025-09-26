import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateCompanyCard.module.scss";
import { ICreateCompanyCard } from "@/const/interfaces/complex-components/custom-cards/ICreateCompanyCard.ts";
import CreateCompanyForm from "@/components/forms/create-company-form/CreateCompanyForm.tsx";
import AddressForm from "@/components/forms/address-form/AddressForm.tsx";

export default function CreateCompanyCard({
  isLoading,
  isCompanyPhotosGridLoading,
  isPhotoUploaderLoading,
  images,
  countryCodes,
  onAction,
}: ICreateCompanyCard) {
  function onDeletePhoto(_actionType, table) {
    onAction("deleteCompanyPhoto", table);
  }

  function onDndPhoto(data) {
    onAction("dndCompanyPhoto", data);
  }

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.createCompanyCard}
      title="Create Company"
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeCompanyConfigurationCard")}
    >
      <div className={cs.createCompanyCardContent}>
        <CreateCompanyForm
          isLoading={isLoading}
          isGridLoading={isCompanyPhotosGridLoading}
          isPhotoUploaderLoading={isPhotoUploaderLoading}
          className={cs.supplierConfigurationCardForm}
          countryCodes={countryCodes}
          photos={images}
          onDndPhoto={onDndPhoto}
          onDeletePhoto={onDeletePhoto}
          onSubmit={(data) => onAction("createCompany", data)}
          onImageUpload={(data) => onAction("uploadSupplierPhoto", data)}
          onCancel={() => onAction("closeCreateCompanyCard")}
        />
        <AddressForm
          isCreate={true}
          onSubmit={(data) => onAction("createCompany", data)}
          onCancel={() => onAction("closeCreateCompanyCard")}
          countryList={countryCodes}
        />
      </div>
    </SheProductCard>
  );
}
