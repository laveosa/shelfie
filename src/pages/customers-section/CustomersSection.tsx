import React from "react";
import { Outlet } from "react-router-dom";

import cs from "./CustomersSection.module.scss";

export function CustomersSection() {
  return (
    <div id={cs["CustomersSection"]}>
      <Outlet />
    </div>
  );
}
