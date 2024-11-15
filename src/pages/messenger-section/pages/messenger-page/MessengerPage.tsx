import cs from "./MessengerPage.module.scss";
import useMessengerPageService from "@/pages/messenger-section/pages/messenger-page/useMessengerPageService.ts";

export function MessengerPage() {
  const service = useMessengerPageService();

  return <div id={cs.MessengerPage}>Messenger Page</div>;
}
