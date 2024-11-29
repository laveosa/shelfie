import cs from "./TransmissionsPage.module.scss";
import useTransmissionsPageService from "@/pages/transmissions-section/transmissions-page/useTransmissionsPageService.ts";

export function TransmissionsPage() {
  const service = useTransmissionsPageService();

  return <div id={cs.TransmissionsPage}>Transmissions Page</div>;
}
