import React, { JSX } from "react";

import cs from "./ProductConfigurationCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import ProductConfigurationForm from "@/components/forms/product-configuration-form/ProductConfigurationForm.tsx";
import { IProductConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IProductConfigurationCard.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

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
}: IProductConfigurationCard): JSX.Element {
  // ==================================================================== PRIVATE
  function convertCategoriesCodeToSelectItems(
    data: CategoryModel[],
  ): ISheSelectItem<any>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.categoryId,
        text: item.categoryName,
      }),
    );
  }

  function convertBrandsCodeToSelectItems(
    data: BrandModel[],
  ): ISheSelectItem<any>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.brandId,
        text: item.brandName,
      }),
    );
  }

  function convertCountryCodeToSelectItems(
    data: CountryCodeModel[],
  ): ISheSelectItem<any>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.countryId,
        text: item.countryName,
        icon: item.flagIcon,
      }),
    );
  }
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
          categories={convertCategoriesCodeToSelectItems(categoriesList)}
          brands={convertBrandsCodeToSelectItems(brandsList)}
          countryCodes={convertCountryCodeToSelectItems(countryCodesList)}
          productCode={productCode}
          onAction={onAction}
          onSubmit={(data) => onAction("submitProductData", data)}
          onCancel={() => onAction("gotoProductsPage")}
        />
      </div>
    </SheCard>
  );
}
