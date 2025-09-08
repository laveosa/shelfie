import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CompanyConfigurationCard.module.scss";
import CreateSupplierForm from "@/components/forms/create-supplier-form/CreateSupplierForm.tsx";
import { ICreateSupplierCard } from "@/const/interfaces/complex-components/custom-cards/ICreateSupplierCard.ts";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";

export default function CompanyConfigurationCard({
  isLoading,
  isSupplierPhotosGridLoading,
  isPhotoUploaderLoading,
  countryList,
  managedSupplier,
  onAction,
}: ICreateSupplierCard) {
  const { t } = useTranslation();

  function onDeletePhoto(_actionType, table) {
    onAction("deleteCompanyPhoto", table);
  }

  function onDndPhoto(data) {
    onAction("dndCompanyPhoto", data);
  }

  return (
    <SheProductCard
      loading={isLoading}
      title={managedSupplier ? "Manage Company" : "Create Company"}
      className={cs.companyConfigurationCard}
      showCloseButton
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
        {managedSupplier && (
          <div>
            {!managedSupplier?.isDeleted ? (
              <SheCardNotification
                title="Delete Company"
                text="The company will be deleted and it will no longer be available. The past purchases and labels will remain available."
                buttonIcon={Trash2}
                buttonVariant="outline"
                buttonText={t("CommonButtons.Delete")}
                buttonColor="#EF4343"
                onClick={() => onAction("deleteCompany", managedSupplier)}
              />
            ) : (
              <SheCardNotification
                title="Restore Company"
                text="The company was deleted and is not available for management. if that was a mistake, you can restore the company"
                buttonIcon={Plus}
                buttonVariant="outline"
                buttonText={t("CommonButtons.Restore")}
                buttonColor="#38BF5E"
                onClick={() => onAction("restoreCompany", managedSupplier)}
              />
            )}
          </div>
        )}
      </div>
    </SheProductCard>
  );
}
