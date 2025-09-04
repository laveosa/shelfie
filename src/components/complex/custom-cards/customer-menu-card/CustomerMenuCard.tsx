import { useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  FileText,
  ShoppingCart,
  ShoppingBag,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge.tsx";
import cs from "./CustomerMenuCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";

type ICustomerMenuCard = any;
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export default function CustomerMenuCard({
  isLoading,
  title,
  customerId,
  counter,
}: ICustomerMenuCard) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const customerMenuItems = [
    {
      id: "basic_data",
      counterId: "basic_data",
      icon: <FileText />,
      label: t("CustomerMenu.BasicData"),
      path: NavUrlEnum.CUSTOMER_BASIC_DATA,
    },
    {
      id: "addresses",
      counterId: "addressesAmount",
      icon: <MapPin />,
      label: t("CustomerMenu.Addresses"),
      path: NavUrlEnum.CUSTOMER_ADDRESSES,
    },
    {
      id: "open_cart",
      counterId: "openCartsAmount",
      icon: <ShoppingBag />,
      label: t("CustomerMenu.OpenCart"),
      path: NavUrlEnum.CUSTOMER_OPEN_CART,
    },
    {
      id: "orders",
      counterId: "ordersAmount",
      icon: <ShoppingCart />,
      label: t("CustomerMenu.Orders"),
      path: NavUrlEnum.CUSTOMER_ORDERS,
    },
  ];

  function handleMenuItemClick(path: string) {
    navigate(`${NavUrlEnum.CUSTOMERS}/${path}/${customerId ? customerId : ""}`);
  }

  const renderMenuItem = ({ id, counterId, icon, label, path }) => {
    const pathBase = `${NavUrlEnum.CUSTOMERS}/${path}`;
    const isSelected = location.pathname.startsWith(pathBase);
    const hasDynamicId = /\d+/.test(location.pathname);

    let isDisabled = false;

    if (hasDynamicId) {
      isDisabled = isSelected;
    } else {
      isDisabled = id !== "basic_data";
    }

    return (
      <div
        className={`${cs.customerMenuItem} ${isSelected ? cs.selected : ""} ${isDisabled ? cs.disabled : ""}`}
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
        className={cs.customerMenuCard}
      >
        <div className={cs.customerMenuItems}>
          {customerMenuItems.map(renderMenuItem)}
        </div>
      </SheProductCard>
    </div>
  );
} 