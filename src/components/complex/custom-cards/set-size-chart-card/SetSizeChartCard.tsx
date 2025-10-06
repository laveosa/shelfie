import React from "react";

import cs from "./SetSizeChartCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";

export default function SetSizeChartCard({ ...props }) {
  return (
    <SheCard
      className={cs.setSizeChartCard}
      title="Create Product Brand"
      showFooter
      primaryButtonTitle="Add Brand"
      secondaryButtonTitle="Cancel"
      {...props}
    >
      <div className={`${cs.setSizeChartText} she-text`}>
        Fill in the size options for the product
      </div>
    </SheCard>
  );
}
