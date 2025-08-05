import { useAppDispatch } from "@/utils/hooks/redux.ts";
import { OrdersPageSliceActions as ordersActions } from "@/state/slices/OrdersPageSlice";
import OrderApiHooks from "@/utils/services/api/OrderApiService.ts";

export default function useOrderDetailsPageService() {
  const dispatch = useAppDispatch();
  const [getOrderDetails] = OrderApiHooks.useLazyGetOrderDetailsQuery();

  function getOrderDetailsHandler(orderId) {
    return getOrderDetails(orderId).then((res: any) => {
      dispatch(ordersActions.refreshSelectedOrder(res.data));
      return res;
    });
  }

  return {
    getOrderDetailsHandler,
  };
}
