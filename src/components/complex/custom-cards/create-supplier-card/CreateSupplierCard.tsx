import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateSupplierCard.module.scss";

export default function createSupplierCard() {
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
      <div className={cs.creteSupplierCadContent}></div>
    </SheProductCard>
  );
}
