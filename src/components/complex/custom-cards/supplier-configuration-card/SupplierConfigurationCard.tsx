import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./SupplierConfigurationCard.module.scss";
import CreateSupplierForm from "@/components/forms/create-supplier-form/CreateSupplierForm.tsx";
import { ICreateSupplierCard } from "@/const/interfaces/complex-components/custom-cards/ICreateSupplierCard.ts";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";

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

  return (
    <SheProductCard
      loading={isLoading}
      title={managedSupplier ? t("CardTitles.ManageSupplier") : t("CardTitles.CreateSupplier")}
      className={cs.supplierConfigurationCard}
      showCloseButton
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
        {managedSupplier && (
          <div>
            {!managedSupplier?.isDeleted ? (
              <SheCardNotification
                title={t("CardTitles.DeleteSupplier")}
                text={t("ConfirmationMessages.DeleteSupplier")}
                buttonIcon={Trash2}
                buttonVariant="outline"
                buttonText={t("CommonButtons.Delete")}
                buttonColor="#EF4343"
                onClick={() => onAction("deleteSupplier", managedSupplier)}
              />
            ) : (
              <SheCardNotification
                title={t("CardTitles.RestoreSupplier")}
                text={t("ConfirmationMessages.RestoreSupplier")}
                buttonIcon={Plus}
                buttonVariant="outline"
                buttonText={t("CommonButtons.Restore")}
                buttonColor="#38BF5E"
                onClick={() => onAction("restoreSupplier", managedSupplier)}
              />
            )}
          </div>
        )}
      </div>
    </SheProductCard>
  );
}
