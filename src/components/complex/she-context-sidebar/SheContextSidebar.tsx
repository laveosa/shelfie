import React from "react";

import cs from "./SheContextSidebar.module.scss";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { ISheContextSidebar } from "@/const/interfaces/complex-components/ISheContextSidebar.ts";

export default function SheContextSidebar({
  className = "",
  style,
  children,
}: ISheContextSidebar) {
  const productsForItemsCard = productsService.itemsCardItemsConvertor(
    productsState.products,
    {
      idKey: "productId",
      nameKey: "productName",
      imageKeyPath: "image.thumbnailUrl",
      type: "product",
    },
  );
  const variantsForItemsCard = productsService.itemsCardItemsConvertor(
    productsState.variants,
    {
      idKey: "variantId",
      nameKey: "variantName",
      imageKeyPath: "photo.thumbnailUrl",
      type: "variant",
    },
  );

  return (
    <div
      className={`${cs.sheContextSidebar} ${className}`}
      style={{ ...style }}
    >
      <div>
        <div>
          <ItemsCard
            isLoading={productsState.isItemsCardLoading}
            isItemsLoading={
              productsState.activeTab === "products"
                ? productsState.isProductsLoading
                : productsState.isVariantsLoading
            }
            title={
              productsState.activeTab === "products" ? "Products" : "Variants"
            }
            data={
              productsState.activeTab === "products"
                ? productsForItemsCard
                : variantsForItemsCard
            }
            selectedItem={
              productsState.activeTab === "products"
                ? productId
                : productsState.selectedVariant?.variantId
            }
            skeletonQuantity={
              productsState.activeTab === "products"
                ? productsState.products?.length
                : productsState.variants?.length
            }
            onAction={(item) => onAction("itemsCardClick", item)}
          />
        </div>
        <div>
          <ProductMenuCard
            isLoading={productsState.isProductMenuCardLoading}
            title={productId ? "Manage Product" : "Create Product"}
            itemsCollection="products"
            counter={productsState.productCounter}
            itemId={Number(productId)}
            activeCards={state.activeCards}
          />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
