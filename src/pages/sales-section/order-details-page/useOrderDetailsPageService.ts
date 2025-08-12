import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { OrdersPageSliceActions as ordersActions } from "@/state/slices/OrdersPageSlice";
import { useNavigate } from "react-router-dom";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { useToast } from "@/hooks/useToast.ts";
import { OrderDetailsPageSliceActions as actions } from "@/state/slices/OrderDetailsPageSlice.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrderDetailsPageSlice } from "@/const/interfaces/store-slices/IOrderDetailsPageSlice.ts";
import OrdersApiHooks from "@/utils/services/api/OrdersApiService.ts";

export default function useOrderDetailsPageService() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const state = useAppSelector<IOrderDetailsPageSlice>(
    StoreSliceEnum.ORDER_DETAILS,
  );
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);

  const [getOrderDetails] = OrdersApiHooks.useLazyGetOrderDetailsQuery();
  const [getListOfCustomersForGrid] =
    OrdersApiHooks.useGetListOfCustomersForGridMutation();
  const [assignCustomerToOrder] =
    OrdersApiHooks.useAssignCustomerToOrderMutation();
  const [deleteOrder] = OrdersApiHooks.useDeleteOrderMutation();
  const [getDiscountsList] = OrdersApiHooks.useLazyGetDiscountsListQuery();
  const [createDiscount] = OrdersApiHooks.useCreateDiscountMutation();

  function getOrderDetailsHandler(orderId) {
    dispatch(actions.setIsOrderConfigurationCardLoading(true));
    return getOrderDetails(orderId).then((res: any) => {
      dispatch(actions.setIsOrderConfigurationCardLoading(false));
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
    dispatch(actions.setIsOrderConfigurationCardLoading(true));
    return assignCustomerToOrder({ orderId, customerId }).then((res: any) => {
      dispatch(actions.setIsOrderConfigurationCardLoading(false));
      dispatch(ordersActions.refreshSelectedOrder(res.data));
      return res;
    });
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

  function getDiscountsListHandler() {
    dispatch(actions.setIsSelectDiscountGridLoading(true));
    return getDiscountsList().then((res: any) => {
      dispatch(actions.setIsSelectDiscountGridLoading(false));
      const modifiedList = res.items.map((item) => ({
        ...item,
        isSelected: item.discountId === ordersState.selectedOrder.discountId,
      }));
      dispatch(actions.refreshDiscountsList(modifiedList));
      return res;
    });
  }

  function createDiscountHandler(model) {
    return createDiscount(model).then((res: any) => {
      if (!res.error) {
        dispatch(
          actions.refreshDiscountsList([res.data, ...state.discountsList]),
        );
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
    getDiscountsListHandler,
    createDiscountHandler,
  };
}
