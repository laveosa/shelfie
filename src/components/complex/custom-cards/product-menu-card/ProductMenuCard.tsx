import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

const menuItems = [
  { id: "basic_data", icon: <FileText />, label: "Basic Data" },
  { id: "gallery", icon: <ImagesIcon />, label: "Gallery" },
  { id: "variants", icon: <Layers2 />, label: "Variants" },
  { id: "attributes", icon: <SlidersHorizontal />, label: "Attributes" },
  { id: "size_chart", icon: <Ruler />, label: "Size Chart" },
  { id: "purchase", icon: <ReceiptEuroIcon />, label: "Purchase" },
];

export default function ProductMenuCard({
  isLoading,
  title,
  productId,
  productCounter,
  ...props
}: IProductMenuCard) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleMenuItemClick(itemId: string) {
    const path = `${NavUrlEnum.PRODUCTS}${NavUrlEnum[`PRODUCT_${itemId.toUpperCase()}`]}/${productId}`;
    navigate(path);
  }

  const renderMenuItem = ({ id, icon, label }) => {
    const pathBase = `${NavUrlEnum.PRODUCTS}${NavUrlEnum[`PRODUCT_${id.toUpperCase()}`]}/`;
    const isSelected = location.pathname.startsWith(pathBase);
    const isDisabled = isSelected || (!productId && id !== "basicData");

    return (
      <div
        className={`${cs.productMenuItem} ${isSelected ? cs.selected : ""} ${isDisabled ? cs.disabled : ""}`}
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
        loading={isLoading}
        title={title}
        width="300px"
        minWidth="300px"
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
