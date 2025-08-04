import cs from "@/pages/sales-section/orders-page/OrdersPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import React from "react";
import { useParams } from "react-router-dom";

export function OrderShipmentPage() {
  const { orderId } = useParams();
  return (
    <div className={cs.ordersPage}>
      <ProductMenuCard
        title="Order"
        itemsCollection="order"
        itemId={Number(orderId)}
      />
    </div>
  );
}
