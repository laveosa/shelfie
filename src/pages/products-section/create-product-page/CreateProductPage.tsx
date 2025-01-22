import cs from "./CreateProductPage.module.scss";
import useCreateProductPageService from "@/pages/products-section/create-product-page/useCreateProductPageService.ts";
import { ProductsFakeData } from "@/components/complex/grid/products-grid/FakeData.ts";
import React, { useState } from "react";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import CreateProductCard from "@/components/complex/custom-cards/create-product-card/CreateProductCard.tsx";
import CreateProductFormCard from "@/components/complex/custom-cards/create-product-form-card/CreateProductFormCard.tsx";
import CreateProductCategoryCard from "@/components/complex/custom-cards/create-product-category-card/CreateProductCategoryCard.tsx";

export function CreateProductPage() {
  const service = useCreateProductPageService();
  const productsData = ProductsFakeData;
  const [activeCards, setActiveCards] = useState([]); // State to track active card

  const handleAction = (identifier) => {
    setActiveCards((prev) => {
      if (prev.includes(identifier)) {
        // If the card is already active, remove it
        return prev.filter((card) => card !== identifier);
      } else {
        // Otherwise, add it to the active cards
        return [...prev, identifier];
      }
    });
  };

  return (
    <div className={cs.createProductPage}>
      <ItemsCard data={productsData.items} />
      <CreateProductCard onAction={handleAction} />
      {activeCards.includes("basicData") && <CreateProductFormCard />}
      {activeCards.includes("gallery") && <CreateProductCategoryCard />}
      {activeCards.includes("variants") && <div>Variants Card Content</div>}
    </div>
  );
}
