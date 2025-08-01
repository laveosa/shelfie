import cs from "./SalesSection.module.scss";
import { Outlet } from "react-router-dom";

export function SalesSection() {
  return (
    <div id={cs.SalesSection}>
      <Outlet />
    </div>
  );
}
