import { Plus, Trash2 } from "lucide-react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./SupplierConfigurationCard.module.scss";
import CreateSupplierForm from "@/components/forms/create-supplier-form/CreateSupplierForm.tsx";
import { ICreateSupplierCard } from "@/const/interfaces/complex-components/custom-cards/ICreateSupplierCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export default function SupplierConfigurationCard({
  isLoading,
  countryList,
  managedSupplier,
  onAction,
}: ICreateSupplierCard) {
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
          countryList={countryList}
          data={managedSupplier}
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
              <div className={cs.deleteSupplierBlock}>
                <div className={cs.deleteSupplierTextBlock}>
                  <span className={`${cs.deleteSupplierTitle} she-text`}>
                    Delete Supplier
                  </span>
                  <span className="she-subtext">
                    The supplier will remain connected to the purchases, but
                    will not be manageable or available for connection to
                    additional purchases
                  </span>
                </div>
                <SheButton
                  className={cs.deleteSupplierButton}
                  icon={Trash2}
                  variant={"outline"}
                  value="Delete"
                  onClick={() => onAction("deleteSupplier", managedSupplier)}
                />
              </div>
            ) : (
              <div className={cs.restoreSupplierBlock}>
                <div className={cs.restoreSupplierTextBlock}>
                  <span className={`${cs.restoreSupplierTitle} she-text`}>
                    Restore Supplier
                  </span>
                  <span className="she-subtext">
                    The supplier was deleted and is not available for
                    management. if that was a mistake, you can restore the
                    supplier
                  </span>
                </div>
                <SheButton
                  className={cs.restoreSupplierButton}
                  icon={Plus}
                  variant={"outline"}
                  value="Restore"
                  onClick={() => onAction("restoreSupplier", managedSupplier)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </SheProductCard>
  );
}
