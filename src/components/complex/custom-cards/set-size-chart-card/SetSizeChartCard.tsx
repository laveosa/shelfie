import cs from "./SetSizeChartCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import React from "react";

export default function SetSizeChartCard({ ...props }) {
  return (
    <div>
      <SheProductCard
        title="Create Product Brand"
        view="card"
        showPrimaryButton={true}
        primaryButtonTitle="Add Brand"
        showSecondaryButton={true}
        secondaryButtonTitle="Cancel"
        className={cs.setSizeChartCard}
        {...props}
      >
        <div className={`${cs.setSizeChartText} she-text`}>
          Fill in the size options for the product
        </div>
      </SheProductCard>
    </div>
  );
}
