import { useParams } from "react-router-dom";
import React from "react";

import cs from "./ReturnsPage.module.scss";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";

export function ReturnsPage() {
  // ==================================================================== UTILITIES
  const { orderId } = useParams();

  // ==================================================================== LAYOUT
  return (
    <div className={cs.returnsPage}>
      <SheContextSidebar
        menuCollectionType="sales"
        menuTitle="Sales"
        itemId={Number(orderId)}
      >
        <h1>Return Page</h1>
      </SheContextSidebar>
    </div>
  );
}
