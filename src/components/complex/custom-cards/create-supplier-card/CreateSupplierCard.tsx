import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateSupplierCard.module.scss";
import CreateSupplierForm from "@/components/forms/create-supplier-form/CreateSupplierForm.tsx";
import { ICreateSupplierCard } from "@/const/interfaces/complex-components/custom-cards/ICreateSupplierCard.ts";

export default function CreateSupplierCard({
  isLoading,
  countryList,
  onAction,
}: ICreateSupplierCard) {
  return (
    <SheProductCard
      loading={isLoading}
      title="Create Supplier"
      className={cs.createSupplierCard}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeCreateSupplierCard")}
    >
      <div className={cs.createSupplierCardContent}>
        <CreateSupplierForm
          countryList={countryList}
          onSubmit={(data) => {
            console.log("CARD", data);
            onAction("createSupplier", data);
          }}
          onImageUpload={(data) => onAction("uploadSupplierPhoto", data)}
          onCancel={() => onAction("closeCreateSupplierCard")}
        />
      </div>
    </SheProductCard>
  );
}
