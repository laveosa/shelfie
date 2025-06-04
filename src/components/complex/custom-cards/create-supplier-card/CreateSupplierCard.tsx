import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateSupplierCard.module.scss";
import CreateSupplierForm from "@/components/forms/create-supplier-form/CreateSupplierForm.tsx";

export default function CreateSupplierCard() {
  return (
    <SheProductCard
      title="Create Supplier"
      view="card"
      className={cs.createSupplierCard}
      showCloseButton
      showPrimaryButton
      primaryButtonTitle="Create Supplier"
      showSecondaryButton
      secondaryButtonTitle="Cancel"
    >
      <div className={cs.createSupplierCardContent}>
        <CreateSupplierForm />
      </div>
    </SheProductCard>
  );
}
