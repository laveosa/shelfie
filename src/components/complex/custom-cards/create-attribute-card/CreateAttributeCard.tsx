import React from "react";

import cs from "./CreateAttributeCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";

export default function CreateAttributeCard({ data, ...props }) {
  // ==================================================================== UTILITIES

  // ==================================================================== EVENT HANDLERS

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.createAttributeCard}
      title="Connect image to product variants"
      titleTransKey="CardTitles.CreateProductAttribute"
      showFooter
      primaryButtonTitle="Create"
      primaryButtonTitleTransKey="CommonButtons.Create"
      secondaryButtonTitle="Cancel"
      secondaryButtonTitleTransKey="CommonButtons.Cancel"
      {...props}
    >
      <div className={cs.createAttributeCardContent}>
        <h1>form...</h1>
      </div>
    </SheCard>
  );
}
