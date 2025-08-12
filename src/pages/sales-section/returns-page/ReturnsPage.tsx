import cs from "@/pages/sales-section/orders-page/OrdersPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import React from "react";

export function ReturnsPage() {
  return (
    <div className={cs.ordersPage}>
      <ProductMenuCard title="Sales" itemsCollection="sales" />
    </div>
  );
}
