import cs from "./OrdersPage.module.scss";
import useOrdersPageService from "@/pages/orders-section/orders-page/useOrdersPageService.ts";

export function OrdersPage() {
  const service = useOrdersPageService();

  return <div id={cs.OrdersPage}>Orders Page</div>;
}
