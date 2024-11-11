import { Outlet } from "react-router-dom";

import cs from "./UsersSection.module.scss";

export function UsersSection() {
  return (
    <div id={cs.UsersSection}>
      <Outlet />
    </div>
  );
}
