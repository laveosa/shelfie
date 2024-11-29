import cs from "./SettingsPage.module.scss";
import useSettingsPageService from "@/pages/settings-section/settings-page/useSettingsPageService.ts";

export function SettingsPage() {
  const service = useSettingsPageService();

  return <div id={cs.SettingsPage}>Settings Page</div>;
}
