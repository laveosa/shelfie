import { useAppDispatch } from "@/utils/hooks/redux.ts";
import { OrdersPageSliceActions as ordersActions } from "@/state/slices/OrdersPageSlice";
import OrderApiHooks from "@/utils/services/api/OrderApiService.ts";
import { useNavigate } from "react-router-dom";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { useToast } from "@/hooks/useToast.ts";
import { OrderDetailsPageSliceActions as actions } from "@/state/slices/OrderDetailsPageSlice.ts";

export default function useOrderDetailsPageService() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [getOrderDetails] = OrderApiHooks.useLazyGetOrderDetailsQuery();
  const [getListOfCustomersForGrid] =
    OrderApiHooks.useGetListOfCustomersForGridMutation();
  const [assignCustomerToOrder] =
    OrderApiHooks.useAssignCustomerToOrderMutation();
  const [deleteOrder] = OrderApiHooks.useDeleteOrderMutation();

  function getOrderDetailsHandler(orderId) {
    return getOrderDetails(orderId).then((res: any) => {
      dispatch(ordersActions.refreshSelectedOrder(res.data));
      return res;
    });
  }

  function getListOfCustomersForGridHandler(model) {
    dispatch(actions.setIsSelectEntityGridLoading(true));
    return getListOfCustomersForGrid(model).then((res: any) => {
      dispatch(actions.setIsSelectEntityGridLoading(false));
      dispatch(ordersActions.refreshCustomersGridModel(res.data));
      return res.data;
    });
  }

  function assignCustomerToOrderHandler(orderId, customerId) {
    return (
      dispatch(actions.setIsOrderConfigurationCardLoading(true)),
      assignCustomerToOrder({ orderId, customerId }).then((res: any) => {
        dispatch(actions.setIsOrderConfigurationCardLoading(false));
        dispatch(ordersActions.refreshSelectedOrder(res.data));
        return res;
      })
    );
  }

  function deleteOrderHandler(orderId) {
    return deleteOrder(orderId).then((res: any) => {
      if (!res.error) {
        navigate(`${NavUrlEnum.SALES}${NavUrlEnum.ORDERS}`);
        addToast({
          text: "Order deleted successfully",
          type: "success",
        });
      } else {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
      return res;
    });
  }

  return {
    getOrderDetailsHandler,
    getListOfCustomersForGridHandler,
    assignCustomerToOrderHandler,
    deleteOrderHandler,
  };
}
