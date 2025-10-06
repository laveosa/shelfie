import React from "react";

import cs from "./SupplierConfigurationCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import CreateSupplierForm from "@/components/forms/create-supplier-form/CreateSupplierForm.tsx";
import { ICreateSupplierCard } from "@/const/interfaces/complex-components/custom-cards/ICreateSupplierCard.ts";

export default function SupplierConfigurationCard({
  isLoading,
  isSupplierPhotosGridLoading,
  isPhotoUploaderLoading,
  countryList,
  managedSupplier,
  onAction,
}: ICreateSupplierCard) {
  // ==================================================================== EVENT HANDLER
  function onDeletePhoto(_actionType, table) {
    onAction("deleteSupplierPhoto", table);
  }

  function onDndPhoto(data) {
    onAction("dndSupplierPhoto", data);
  }

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.supplierConfigurationCard}
      title={managedSupplier ? "Manage Supplier" : "Create Supplier"}
      titleTransKey={
        managedSupplier
          ? "CardTitles.ManageSupplier"
          : "CardTitles.CreateSupplier"
      }
      showCloseButton
      showFooter
      isLoading={isLoading}
      showNotificationCard={!!managedSupplier}
      notificationCardProps={{
        title: "Delete Supplier",
        titleTransKey: "CardTitles.DeleteSupplier",
        text: "This variant will be deleted, it will no longer be available for sale but you will still see it in the orders where it sold",
        textTransKey: "ConfirmationMessages.DeleteVariant",
        onClick: () => onAction("deleteSupplier", managedSupplier),
      }}
      onSecondaryButtonClick={() => onAction("closeSupplierConfigurationCard")}
    >
      <div className={cs.supplierConfigurationCardContent}>
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
          onImageUpload={(data) => onAction("uploadSupplierPhoto", data)}
          onCancel={() => onAction("closeSupplierConfigurationCard")}
          onSubmit={(data) => {
            managedSupplier
              ? onAction("updateSupplier", data)
              : onAction("createSupplier", data);
          }}
        />
      </div>
    </SheCard>
  );
}
