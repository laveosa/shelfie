import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./SupplierConfigurationCard.module.scss";
import CreateSupplierForm from "@/components/forms/create-supplier-form/CreateSupplierForm.tsx";
import { ICreateSupplierCard } from "@/const/interfaces/complex-components/custom-cards/ICreateSupplierCard.ts";

export default function SupplierConfigurationCard({
  isLoading,
  countryList,
  managedSupplier,
  onAction,
}: ICreateSupplierCard) {
  return (
    <SheProductCard
      loading={isLoading}
      title="Create Supplier"
      className={cs.createSupplierCard}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeSupplierConfigurationCard")}
    >
      <div className={cs.createSupplierCardContent}>
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
      </div>
    </SheProductCard>
  );
}
