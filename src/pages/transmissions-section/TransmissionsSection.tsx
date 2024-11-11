import { Outlet } from "react-router-dom";

import cs from "./TransmissionsSection.module.scss";

export function TransmissionsSection() {
  return (
    <div id={cs.TransmissionsSection}>
      <Outlet />
    </div>
  );
}
