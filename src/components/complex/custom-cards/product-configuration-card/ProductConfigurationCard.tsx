import React from "react";
import { useTranslation } from "react-i18next";

import cs from "./ProductConfigurationCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { IProductConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IProductConfigurationCard.ts";
import ProductConfigurationForm from "@/components/forms/product-configuration-form/ProductConfigurationForm.tsx";

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
  const { t } = useTranslation();

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.productConfigurationFormCard}
      title={
        productId
          ? t("CardTitles.BasicProductData")
          : t("CardTitles.CreateProduct")
      }
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
    </SheProductCard>
  );
}
