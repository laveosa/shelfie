import cs from "./CreateProductPage.module.scss";
import useCreateProductPageService from "@/pages/products-section/create-product-page/useCreateProductPageService.ts";
import React, { useState } from "react";
import CreateProductFormCard from "@/components/complex/custom-cards/create-product-form-card/CreateProductFormCard.tsx";
import CreateProductCategoryCard from "@/components/complex/custom-cards/create-product-category-card/CreateProductCategoryCard.tsx";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import CreateProductCard from "@/components/complex/custom-cards/create-product-card/CreateProductCard.tsx";
import CreateProductBrandCard from "@/components/complex/custom-cards/create-product-brand-card/CreateProductBrandCard.tsx";
import ProductPhotosCard from "@/components/complex/custom-cards/product-photos-card/ProductPhotosCard.tsx";
import { ProductsFakeData } from "@/components/complex/grid/products-grid/FakeData.ts";

export function CreateProductPage() {
  const service = useCreateProductPageService();
  const productsData = ProductsFakeData;
  const [activeCards, setActiveCards] = useState([]); // State to track active card

  const handleAction = (identifier) => {
    setActiveCards((prev) => {
      if (prev.includes(identifier)) {
        return prev.filter((card) => card !== identifier);
      } else {
        return [...prev, identifier];
      }
    });
  };

  return (
    <div className={cs.createProductPage}>
      {productsData.items.length > 0 && <ItemsCard data={productsData.items} />}
      <CreateProductCard onAction={handleAction} />
      {activeCards.includes("basicData") && (
        <CreateProductFormCard
          onSecondaryButtonClick={() => handleAction("basicData")}
          onOpenCreateProductCategoryCard={() =>
            handleAction("openCreateProductCategoryCard")
          }
          onOpenCreateProductBrandCard={() =>
            handleAction("openCreateBrandCategoryCard")
          }
        />
      )}
      {activeCards.includes("openCreateProductCategoryCard") && (
        <CreateProductCategoryCard
          onSecondaryButtonClick={() =>
            handleAction("openCreateProductCategoryCard")
          }
        />
      )}
      {activeCards.includes("openCreateBrandCategoryCard") && (
        <CreateProductBrandCard
          onSecondaryButtonClick={() =>
            handleAction("openCreateBrandCategoryCard")
          }
        />
      )}
      {activeCards.includes("gallery") && (
        <ProductPhotosCard
          width={"400px"}
          onSecondaryButtonClick={() => handleAction("gallery")}
          data={productsData}
        />
      )}
      {activeCards.includes("variants") && <div>Variants Card Content</div>}
    </div>
  );
}
