import { Trash2 } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./SupplierConfigurationCard.module.scss";
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
  const { t } = useTranslation();

  function onDeletePhoto(_actionType, table) {
    onAction("deleteSupplierPhoto", table);
  }

  function onDndPhoto(data) {
    onAction("dndSupplierPhoto", data);
  }

  console.log(managedSupplier);

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.supplierConfigurationCard}
      title={
        managedSupplier
          ? t("CardTitles.ManageSupplier")
          : t("CardTitles.CreateSupplier")
      }
      showCloseButton
      showNotificationCard={!!managedSupplier}
      notificationCardProps={{
        title: "Delete Supplier",
        titleTransKey: "CardTitles.DeleteSupplier",
        text: "This variant will be deleted, it will no longer be available for sale but you will still see it in the orders where it sold",
        textTransKey: "ConfirmationMessages.DeleteVariant",
        buttonText: "Delete",
        buttonTextTransKey: "CommonButtons.Delete",
        buttonColor: "#FF0000",
        buttonIcon: Trash2,
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
