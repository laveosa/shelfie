import { Trash2 } from "lucide-react";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CompanyConfigurationCard.module.scss";
import CreateSupplierForm from "@/components/forms/create-supplier-form/CreateSupplierForm.tsx";
import { ICreateSupplierCard } from "@/const/interfaces/complex-components/custom-cards/ICreateSupplierCard.ts";

export default function CompanyConfigurationCard({
  isLoading,
  isSupplierPhotosGridLoading,
  isPhotoUploaderLoading,
  countryList,
  managedSupplier,
  onAction,
}: ICreateSupplierCard) {
  function onDeletePhoto(_actionType, table) {
    onAction("deleteCompanyPhoto", table);
  }

  function onDndPhoto(data) {
    onAction("dndCompanyPhoto", data);
  }

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.companyConfigurationCard}
      title={managedSupplier ? "Manage Company" : "Create Company"}
      showCloseButton
      showNotificationCard={!managedSupplier?.isDeleted}
      notificationCardProps={{
        title: "Delete Company",
        titleTransKey: "",
        text: "The company will be deleted and it will no longer be available. The past purchases and labels will remain available.",
        textTransKey: "",
        buttonText: "Delete",
        buttonTextTransKey: "CommonButtons.Delete",
        buttonColor: "#EF4343",
        buttonIcon: Trash2,
        onClick: () => onAction("deleteCompany", managedSupplier),
      }}
      onSecondaryButtonClick={() => onAction("closeCompanyConfigurationCard")}
    >
      <div className={cs.companyConfigurationCardContent}>
        <CreateSupplierForm
          isLoading={isLoading}
          isGridLoading={isSupplierPhotosGridLoading}
          isPhotoUploaderLoading={isPhotoUploaderLoading}
          className={cs.supplierConfigurationCardForm}
          countryList={countryList}
          data={managedSupplier}
          photos={managedSupplier?.photos}
          onDndPhoto={onDndPhoto}
          onDeletePhoto={onDeletePhoto}
          onSubmit={(data) => {
            managedSupplier
              ? onAction("updateSupplier", data)
              : onAction("createSupplier", data);
          }}
          onImageUpload={(data) => onAction("uploadSupplierPhoto", data)}
          onCancel={() => onAction("closeSupplierConfigurationCard")}
        />
      </div>
    </SheProductCard>
  );
}
