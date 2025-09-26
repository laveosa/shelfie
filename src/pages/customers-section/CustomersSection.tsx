import { Outlet } from "react-router-dom";

import cs from "./CustomersSection.module.scss";

export function CustomersSection() {
  return (
    <div className={cs.CustomersSection}>
      <Outlet />
    </div>
  );
}
