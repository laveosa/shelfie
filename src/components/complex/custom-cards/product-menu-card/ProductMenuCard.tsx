import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Boxes,
  FileSpreadsheet,
  FileText,
  ImagesIcon,
  Layers2,
  ReceiptEuro,
  ReceiptEuroIcon,
  Ruler,
  Shirt,
  SlidersHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge.tsx";
import cs from "./ProductMenuCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { IProductMenuCard } from "@/const/interfaces/complex-components/custom-cards/IProductMenuCard.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

const productMenuItems = [
  {
    id: "basic_data",
    counterId: "basic_data",
    icon: <FileText />,
    label: "Basic Data",
    path: NavUrlEnum.PRODUCT_BASIC_DATA,
  },
  {
    id: "gallery",
    counterId: "gallery",
    icon: <ImagesIcon />,
    label: "Gallery",
    path: NavUrlEnum.PRODUCT_GALLERY,
  },
  {
    id: "variants",
    counterId: "variants",
    icon: <Layers2 />,
    label: "Variants",
    path: NavUrlEnum.MANAGE_VARIANTS,
  },
  {
    id: "attributes",
    counterId: "attributes",
    icon: <SlidersHorizontal />,
    label: "Attributes",
    path: NavUrlEnum.ATTRIBUTES,
  },
  {
    id: "size_chart",
    icon: <Ruler />,
    label: "Size Chart",
    path: NavUrlEnum.SIZE_CHART,
  },
  {
    id: "purchase",
    icon: <ReceiptEuroIcon />,
    label: "Purchase",
    path: NavUrlEnum.SUPPLIER,
  },
];

const purchaseMenuItems = [
  {
    id: "supplier",
    icon: <Boxes />,
    label: "Supplier",
    path: NavUrlEnum.SUPPLIER,
  },
  {
    id: "purchase_products",
    counterId: "productsAmount",
    icon: <Shirt />,
    label: "Purchase Products",
    path: NavUrlEnum.PURCHASE_PRODUCTS,
  },
  {
    id: "margins",
    icon: <ReceiptEuro />,
    label: "Margins",
    path: NavUrlEnum.MARGINS,
  },
  {
    id: "invoices",
    counterId: "invoicesAmount",
    icon: <FileSpreadsheet />,
    label: "Invoices",
    path: NavUrlEnum.INVOICES,
  },
];

export default function ProductMenuCard({
  isLoading,
  title,
  productId,
  itemsCollection,
  counter,
  ...props
}: IProductMenuCard) {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("counter", counter);

  function handleMenuItemClick(path: string) {
    navigate(`${NavUrlEnum.PRODUCTS}${path}/${productId ? productId : ""}`);
  }

  const renderMenuItem = ({ id, counterId, icon, label, path }) => {
    const pathBase = `${NavUrlEnum.PRODUCTS}${path}/`;
    const isSelected = location.pathname.startsWith(pathBase);
    const isDisabled =
      itemsCollection === "products"
        ? isSelected || (!productId && id !== "basicData")
        : isSelected || (!productId && id !== "supplier");

    return (
      <div
        className={`${cs.productMenuItem} ${isSelected ? cs.selected : ""} ${isDisabled ? cs.disabled : ""}`}
        onClick={() => !isDisabled && handleMenuItemClick(path)}
        key={id}
      >
        <div className={cs.iconContainer}>{icon}</div>
        <div className={cs.textContainer}>
          <span className="she-text">{label}</span>
          {counter && counter[counterId] !== undefined && (
            <Badge className={cs.itemBadge}>{counter[counterId] ?? 0}</Badge>
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
        view="borderless"
        width="300px"
        minWidth="300px"
        showToggleButton={true}
        className={cs.productMenuCard}
        {...props}
      >
        <div className={cs.productMenuItems}>
          {itemsCollection === "products"
            ? productMenuItems.map(renderMenuItem)
            : purchaseMenuItems.map(renderMenuItem)}
        </div>
      </SheProductCard>
    </div>
  );
}
