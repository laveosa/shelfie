import { Plus, Trash2 } from "lucide-react";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./SupplierConfigurationCard.module.scss";
import CreateSupplierForm from "@/components/forms/create-supplier-form/CreateSupplierForm.tsx";
import { ICreateSupplierCard } from "@/const/interfaces/complex-components/custom-cards/ICreateSupplierCard.ts";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";

export default function SupplierConfigurationCard({
  isLoading,
  isSupplierPhotosGridLoading,
  countryList,
  managedSupplier,
  onAction,
}: ICreateSupplierCard) {
  function onDeletePhoto(
    _actionType,
    _row,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?,
  ) {
    onAction("deleteSupplierPhoto", row);
  }

  function onDndPhoto(data) {
    onAction("dndSupplierPhoto", data);
  }

  return (
    <SheProductCard
      loading={isLoading}
      title={managedSupplier ? "Manage Supplier" : "Create Supplier"}
      className={cs.supplierConfigurationCard}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeSupplierConfigurationCard")}
    >
      <div className={cs.supplierConfigurationCardContent}>
        <CreateSupplierForm
          isLoading={isLoading}
          isGridLoading={isSupplierPhotosGridLoading}
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
                title="Delete Supplier"
                text="The supplier will remain connected to the purchases, but will not be manageable or available for connection to additional purchases"
                buttonIcon={Trash2}
                buttonVariant="outline"
                buttonText="Delete"
                buttonColor="#EF4343"
                onClick={() => onAction("deleteSupplier", managedSupplier)}
              />
            ) : (
              <SheCardNotification
                title="Restore Supplier"
                text="The supplier was deleted and is not available for management. if that was a mistake, you can restore the supplier"
                buttonIcon={Plus}
                buttonVariant="outline"
                buttonText="Restore"
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
