import cs from "./SupportSection.module.scss";
import { Outlet } from "react-router-dom";

export function SupportSection() {
  return (
    <div id={cs.SupportSection}>
      <Outlet />
    </div>
  );
}
