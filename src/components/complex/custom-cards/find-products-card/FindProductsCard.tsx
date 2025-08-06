import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./FindProductsCard.module.scss";
import { IFindProductsCard } from "@/const/interfaces/complex-components/custom-cards/IFindProductsCard.ts";

export default function FindProductsCard({
  isLoading,
  onAction,
}: IFindProductsCard) {
  return (
    <SheProductCard
      loading={isLoading}
      title="Find Products"
      className={cs.findProductsCard}
    >
      <div className={cs.findProductsCardContent}></div>
    </SheProductCard>
  );
}
