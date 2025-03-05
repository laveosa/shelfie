import React from "react";
import {
  FileText,
  ImagesIcon,
  Layers2,
  ReceiptEuroIcon,
  Ruler,
  SlidersHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge.tsx";
import cs from "./ProductMenuCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { IProductMenuCard } from "@/const/interfaces/complex-components/custom-cards/IProductMenuCard.ts";

const menuItems = [
  { id: "basicData", icon: <FileText />, label: "Basic Data" },
  { id: "gallery", icon: <ImagesIcon />, label: "Gallery" },
  { id: "variants", icon: <Layers2 />, label: "Variants" },
  { id: "attributes", icon: <SlidersHorizontal />, label: "Attributes" },
  { id: "sizeChart", icon: <Ruler />, label: "Size Chart" },
  { id: "purchase", icon: <ReceiptEuroIcon />, label: "Purchase" },
];

export default function ProductMenuCard({
  title,
  productId,
  productCounter,
  onAction,
  activeCards = [],
  ...props
}: IProductMenuCard) {
  const selectedItem =
    menuItems.find((item) => activeCards.includes(item.id))?.id || "basicData";

  function handleMenuItemClick(item) {
    onAction(item);
  }

  const renderMenuItem = ({ id, icon, label }) => {
    const isDisabled = !productId && id !== "basicData";
    return (
      <div
        className={`${cs.productMenuItem} ${selectedItem === id ? cs.selected : ""} ${isDisabled ? cs.disabled : ""}`}
        onClick={() => !isDisabled && handleMenuItemClick(id)}
        key={id}
      >
        <div className={cs.iconContainer}>{icon}</div>
        <div className={cs.textContainer}>
          <span className="she-text">{label}</span>
          {productCounter && productCounter[id] !== undefined && (
            <Badge className={cs.itemBadge}>{productCounter[id] ?? 0}</Badge>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <SheProductCard
        title={title}
        showToggleButton={true}
        className={cs.productMenuCard}
        {...props}
      >
        <div className={cs.productMenuItems}>
          {menuItems.map(renderMenuItem)}
        </div>
      </SheProductCard>
    </div>
  );
}
