import { Outlet } from "react-router-dom";

import cs from "./MessengerSection.module.scss";

export function MessengerSection() {
  return (
    <div id={cs.MessengerSection}>
      <Outlet />
    </div>
  );
}
