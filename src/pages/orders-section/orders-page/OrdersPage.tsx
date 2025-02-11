import cs from "./OrdersPage.module.scss";
import useOrdersPageService from "@/pages/orders-section/orders-page/useOrdersPageService.ts";
import { useToast } from "@/utils/services/ToastService.tsx";

export function OrdersPage() {
  const service = useOrdersPageService();

  const { addToast } = useToast();

  const handleSuccess = () => {
    addToast({
      message: "Your action was successful.",
      type: "success", // Specify type
    });
  };

  const handleError = () => {
    addToast({
      message: "There was an error processing your request.",
      type: "error", // Specify type
    });
  };

  const handleWarning = () => {
    addToast({
      message: "There was an error processing your request.",
      type: "warning", // Specify type
    });
  };

  const handleInfo = () => {
    addToast({
      message: "There was an error processing your request.",
      type: "info", // Specify type
    });
  };

  return (
    <div id={cs.OrdersPage}>
      Orders Page
      <div>
        <div>
          return <button onClick={handleSuccess}>success</button>
          <button onClick={handleError}>Error</button>;
          <button onClick={handleWarning}>Warning</button>;
          <button onClick={handleInfo}>Info</button>;
        </div>
      </div>
    </div>
  );
}
