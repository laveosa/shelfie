import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateSupplierCard.module.scss";
import CreateSupplierForm from "@/components/forms/create-supplier-form/CreateSupplierForm.tsx";
import { ICreateSupplierCard } from "@/const/interfaces/complex-components/custom-cards/ICreateSupplierCard.ts";

export default function CreateSupplierCard({
  countryList,
  onAction,
}: ICreateSupplierCard) {
  return (
    <SheProductCard
      title="Create Supplier"
      className={cs.createSupplierCard}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeCreateSupplierCard")}
    >
      <div className={cs.createSupplierCardContent}>
        <CreateSupplierForm
          countryList={countryList}
          onSubmit={(data) => onAction("createSupplier", data)}
          onImageUpload={(data) => onAction("uploadSupplierPhoto", data)}
          onCancel={() => onAction("closeCreateSupplierCard")}
        />
      </div>
    </SheProductCard>
  );
}
