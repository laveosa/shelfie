import { Outlet } from "react-router-dom";

import cs from "./ProductsSection.module.scss";

export function ProductsSection() {
  return (
    <div className={cs.ProductsSection}>
      <Outlet />
    </div>
  );
}
