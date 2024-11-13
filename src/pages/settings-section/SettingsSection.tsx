import cs from "./SettingsSection.module.scss";
import { Outlet } from "react-router-dom";

export function SettingsSection() {
  return (
    <div id={cs.SettingsSection}>
      <Outlet />
    </div>
  );
}
