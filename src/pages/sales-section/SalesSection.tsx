import { Outlet } from "react-router-dom";

import cs from "./SalesSection.module.scss";

export function SalesSection() {
  return (
    <div id={cs.SalesSection}>
      <Outlet />
    </div>
  );
}
