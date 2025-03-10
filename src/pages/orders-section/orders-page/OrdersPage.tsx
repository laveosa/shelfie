import cs from "./OrdersPage.module.scss";
import useOrdersPageService from "@/pages/orders-section/orders-page/useOrdersPageService.ts";
import { useToast } from "@/hooks/useToast.ts";

export function OrdersPage() {
  const service = useOrdersPageService();

  const { addToast } = useToast();

  const handleSuccess = () => {
    addToast({
      text: "Your action was successful.",
      type: "success",
    });
  };

  const handleError = () => {
    addToast({
      text: "There was an error processing your request.",
      type: "error",
    });
  };

  const handleWarning = () => {
    addToast({
      text: "There was an error processing your request.",
      type: "warning",
    });
  };

  const handleInfo = () => {
    addToast({
      text: "There was an error processing your request.",
      type: "info",
    });
  };

  return <div id={cs.OrdersPage}>Orders Page</div>;
}
