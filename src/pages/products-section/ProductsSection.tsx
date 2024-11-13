import cs from "./ProductsSection.module.scss";
import { Outlet } from "react-router-dom";

export function ProductsSection() {
  return (
    <div id={cs.ProductsSection}>
      <Outlet />
    </div>
  );
}
