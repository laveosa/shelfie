import React, { JSX } from "react";

import cs from "./ProductConfigurationCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import ProductConfigurationForm from "@/components/forms/product-configuration-form/ProductConfigurationForm.tsx";
import { convertToSelectItems } from "@/utils/converters/primitive-components/she-select-convertors.ts";
import { IProductConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IProductConfigurationCard.ts";

export default function ProductConfigurationCard({
  isLoading,
  product,
  productId,
  categoriesList,
  brandsList,
  countryCodesList,
  productCode,
  showSecondaryButton,
  onSecondaryButtonClick,
  onAction,
}: IProductConfigurationCard): JSX.Element {
  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.productConfigurationFormCard}
      title={productId ? "Basic Product Data" : "Create Product"}
      titleTransKey={
        productId ? "CardTitles.BasicProductData" : "CardTitles.CreateProduct"
      }
      isLoading={isLoading}
      showCloseButton={showSecondaryButton}
      onSecondaryButtonClick={onSecondaryButtonClick}
    >
      <div className={cs.productConfigurationForm}>
        <ProductConfigurationForm
          data={product}
          categories={convertToSelectItems(categoriesList, {
            text: "categoryName",
            value: "categoryId",
          })}
          brands={convertToSelectItems(brandsList, {
            text: "brandName",
            value: "brandId",
          })}
          countryCodes={convertToSelectItems(countryCodesList, {
            text: "countryName",
            value: "countryId",
            icon: "flagIcon",
          })}
          productCode={productCode}
          onAction={onAction}
          onSubmit={(data) => onAction("submitProductData", data)}
          onCancel={() => onAction("gotoProductsPage")}
        />
      </div>
    </SheCard>
  );
}
