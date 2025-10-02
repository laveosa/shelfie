import React from "react";

import cs from "./ProductConfigurationCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import ProductConfigurationForm from "@/components/forms/product-configuration-form/ProductConfigurationForm.tsx";
import { IProductConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IProductConfigurationCard.ts";

export default function ProductConfigurationCard({
  isLoading,
  product,
  productId,
  brandsList,
  categoriesList,
  countryCodesList,
  productCode,
  showSecondaryButton,
  onSecondaryButtonClick,
  onAction,
}: IProductConfigurationCard) {
  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.productConfigurationFormCard}
      title={productId ? "Basic Product Data" : "Create Product"}
      titleTransKey={
        productId ? "CardTitles.BasicProductData" : "CardTitles.CreateProduct"
      }
      isLoading={isLoading}
      showHeader
      showCloseButton={showSecondaryButton}
      onSecondaryButtonClick={onSecondaryButtonClick}
    >
      <div className={cs.productConfigurationForm}>
        <ProductConfigurationForm
          data={product}
          brands={brandsList}
          categories={categoriesList}
          countryCodes={countryCodesList}
          productCode={productCode}
          onAction={onAction}
          onSubmit={(data) => onAction("submitProductData", data)}
          onCancel={() => onAction("gotoProductsPage")}
        />
      </div>
    </SheCard>
  );
}
