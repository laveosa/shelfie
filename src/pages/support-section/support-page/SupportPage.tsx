import cs from "./SupportPage.module.scss";
import useSupportPageService from "@/pages/support-section/support-page/useSupportPageService.ts";

export function SupportPage() {
  const service = useSupportPageService();

  return <div id={cs.SupportPage}>Support Page</div>;
}
