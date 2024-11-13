import cs from "./OrdersSection.module.scss";
import { Outlet } from "react-router-dom";

export function OrdersSection() {
  return (
    <div id={cs.OrdersSection}>
      <Outlet />
    </div>
  );
}
