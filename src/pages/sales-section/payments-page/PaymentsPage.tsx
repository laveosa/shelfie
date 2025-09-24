import { useParams } from "react-router-dom";
import React from "react";

import cs from "./PaymentsPage.module.scss";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";

export function PaymentsPage() {
  // ==================================================================== UTILITIES
  const { orderId } = useParams();

  // ==================================================================== LAYOUT
  return (
    <div className={cs.paymentsPage}>
      <SheContextSidebar
        menuCollectionType="sales"
        menuTitle="Sales"
        itemId={Number(orderId)}
      >
        <h1>Payments Page</h1>
      </SheContextSidebar>
    </div>
  );
}
