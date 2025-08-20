import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import {
  Banknote,
  Boxes,
  FileSpreadsheet,
  FileText,
  ImagesIcon,
  Layers2,
  ReceiptEuro,
  ReceiptEuroIcon,
  RotateCcwSquare,
  Ruler,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Truck,
} from "lucide-react";

import {
  CollectionConfig,
  IProductMenuCard,
  MenuItem,
} from "@/const/interfaces/complex-components/custom-cards/IProductMenuCard.ts";
import { Badge } from "@/components/ui/badge.tsx";
import cs from "./ProductMenuCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

const productMenuItems: MenuItem[] = [
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
    path: NavUrlEnum.SIZE_CHART,
  },
];

const purchaseMenuItems: MenuItem[] = [
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

const salesMenuItems: MenuItem[] = [
  {
    id: "orders",
    icon: <ShoppingCart />,
    label: "Orders",
    path: NavUrlEnum.ORDERS,
  },
  {
    id: "open_carts",
    icon: <ShoppingBag />,
    label: "Open Carts",
    path: NavUrlEnum.OPEN_CARTS,
  },
  {
    id: "shipments",
    icon: <Truck />,
    label: "Shipments",
    path: NavUrlEnum.SHIPMENTS,
  },
  {
    id: "returns",
    icon: <RotateCcwSquare />,
    label: "Returns",
    path: NavUrlEnum.RETURNS,
  },
  {
    id: "payments",
    icon: <Banknote />,
    label: "Payments",
    path: NavUrlEnum.PAYMENTS,
  },
];

const orderMenuItems: MenuItem[] = [
  {
    id: "details",
    icon: <ShoppingCart />,
    label: "Details",
    path: NavUrlEnum.ORDER_DETAILS,
  },
  {
    id: "products",
    counterId: "products",
    icon: <ShoppingBag />,
    label: "Products",
    path: NavUrlEnum.ORDER_PRODUCTS,
  },
  {
    id: "shipment",
    icon: <Truck />,
    label: "Shipment",
    path: NavUrlEnum.ORDER_SHIPMENT,
  },
  {
    id: "payment",
    icon: <Banknote />,
    label: "Payment",
    path: NavUrlEnum.ORDER_PAYMENT,
  },
];

const collectionConfigs: Record<string, CollectionConfig> = {
  products: {
    menuItems: productMenuItems,
    defaultEnabledItem: "basic_data",
    pathBase: NavUrlEnum.PRODUCTS,
    urlBuilder: (path: string, itemId?: string) =>
      `${NavUrlEnum.PRODUCTS}${path}/${itemId || ""}`,
    disableItemsWithoutId: true,
  },
  purchases: {
    menuItems: purchaseMenuItems,
    defaultEnabledItem: "supplier",
    pathBase: NavUrlEnum.PRODUCTS,
    urlBuilder: (path: string, itemId?: string) =>
      `${NavUrlEnum.PRODUCTS}${path}/${itemId || ""}`,
    disableItemsWithoutId: true,
  },
  sales: {
    menuItems: salesMenuItems,
    pathBase: NavUrlEnum.ORDERS,
    urlBuilder: (path: string) => `${NavUrlEnum.SALES}${path}`,
    disableItemsWithoutId: false,
  },
  order: {
    menuItems: orderMenuItems,
    defaultEnabledItem: "order",
    pathBase: NavUrlEnum.ORDER_DETAILS,
    urlBuilder: (path: string, itemId?: string) =>
      `${NavUrlEnum.SALES}${NavUrlEnum.ORDERS}${path}/${itemId || ""}`,
    disableItemsWithoutId: false,
  },
};

export default function ProductMenuCard({
  isLoading,
  title,
  itemId,
  itemsCollection,
  counter,
  collectionConfig,
  ...props
}: IProductMenuCard) {
  const navigate = useNavigate();
  const location = useLocation();

  const config = collectionConfig || collectionConfigs[itemsCollection];

  if (!config) {
    console.warn(`No configuration found for collection: ${itemsCollection}`);
    return null;
  }

  function handleMenuItemClick(path: string) {
    const url = config.urlBuilder(path, itemId);
    navigate(url);
  }

  const renderMenuItem = ({ id, counterId, icon, label, path }: MenuItem) => {
    const fullPath = config.urlBuilder(path, "");
    const pathBase = fullPath.replace(/\/$/, "");
    const currentPath = location.pathname.replace(/\/$/, "");
    const isSelected =
      currentPath.startsWith(pathBase) || currentPath === pathBase;

    const hasDynamicId = /\d+/.test(location.pathname);

    let isDisabled = false;

    if (config.disableItemsWithoutId) {
      if (hasDynamicId) {
        isDisabled = isSelected;
      } else {
        isDisabled = config.defaultEnabledItem
          ? id !== config.defaultEnabledItem
          : false;
      }
    }

    return (
      <div
        className={`${cs.productMenuItem} ${isSelected ? cs.selected : ""} ${isDisabled ? cs.disabled : ""}`}
        onClick={() => !isDisabled && handleMenuItemClick(path)}
        key={id}
      >
        <div className={cs.iconContainer}>{icon}</div>
        <div className={cs.textContainer}>
          <span className="she-text">{label}</span>
          {counter && counterId && counter[counterId] !== undefined && (
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
          {config.menuItems.map(renderMenuItem)}
        </div>
      </SheProductCard>
    </div>
  );
}
