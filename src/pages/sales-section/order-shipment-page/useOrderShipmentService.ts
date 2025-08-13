import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { OrdersPageSliceActions as ordersActions } from "@/state/slices/OrdersPageSlice";
import { useToast } from "@/hooks/useToast.ts";
import { OrderShipmentPageSliceActions as actions } from "@/state/slices/OrderShipmentPageSlice";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import OrdersApiHooks from "@/utils/services/api/OrdersApiService.ts";
import { IOrderShipmentPageSlice } from "@/const/interfaces/store-slices/IOrderShipmentPageSlice.ts";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";

export default function useOrderShipmentPageService() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const state = useAppSelector<IOrderShipmentPageSlice>(
    StoreSliceEnum.ORDER_SHIPMENT,
  );
  const ordersService = useOrdersPageService();
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);

  const [getOrderDetails] = OrdersApiHooks.useLazyGetOrderDetailsQuery();
  const [createShipment] = OrdersApiHooks.useCreateShipmentMutation();
  const [updateShipmentDates] = OrdersApiHooks.useUpdateShipmentDatesMutation();
  const [updateShipmentCustomer] =
    OrdersApiHooks.useUpdateShipmentCustomerMutation();
  const [updateShipmentAddress] =
    OrdersApiHooks.useUpdateShipmentAddressMutation();
  const [getShipmentsListForForGrid] =
    OrdersApiHooks.useGetShipmentsListForForGridMutation();

  function getOrderDetailsHandler(orderId) {
    return getOrderDetails(orderId).then((res: any) => {
      dispatch(ordersActions.refreshSelectedOrder(res.data));
      dispatch(actions.refreshSelectedCustomer(res.data.customer));
      return res;
    });
  }

  function getOrderStockActionsListForGrid(orderId) {
    dispatch(actions.setIsProductsGridLoading(true));
    ordersService
      .getListOfStockActionsForGridHandler(
        orderId,
        ordersState.stockActionsGridRequestModel,
      )
      .then(() => {
        dispatch(actions.setIsProductsGridLoading(false));
      });
  }

  function getShipmentsListForForGridHandler(model) {
    dispatch(actions.setIsSelectShipmentForOrderGridLoading(true));
    return getShipmentsListForForGrid(model).then((res: any) => {
      dispatch(actions.setIsSelectShipmentForOrderGridLoading(false));
      dispatch(actions.refreshShipmentsGridModel(res.data));
      return res;
    });
  }

  function createShipmentHandler() {
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    return createShipment().then((res: any) => {
      dispatch(actions.setIsShipmentConfigurationCardLoading(false));
      dispatch(actions.refreshSelectedShipment(res.data));
      return res;
    });
  }

  function updateShipmentDatesHandler(shipmentId: number, model: any) {
    return updateShipmentDates({ shipmentId, model }).then((res: any) => {
      if (!res.error) {
        addToast({
          text: "Shipment successfully updated",
          type: "success",
        });
      } else {
        addToast({
          text: res?.error?.message,
          type: "error",
        });
      }
      return res;
    });
  }

  function updateShipmentCustomerHandler(shipmentId: number, model: any) {
    return updateShipmentCustomer({ shipmentId, model }).then((res: any) => {
      if (!res.error) {
        dispatch(
          actions.refreshSelectedShipment({
            ...state.selectedShipment,
            customer: res.data,
          }),
        );
        addToast({
          text: "Shipment successfully updated",
          type: "success",
        });
      } else {
        addToast({
          text: res?.error?.message,
          type: "error",
        });
      }
      return res;
    });
  }

  function updateShipmentAddressHandler(shipmentId: number, model: any) {
    return updateShipmentAddress({ shipmentId, model }).then((res: any) => {
      if (!res.error) {
        dispatch(
          actions.refreshSelectedShipment({
            ...state.selectedShipment,
            deliveryAddress: res.data,
          }),
        );
        addToast({
          text: "Shipment successfully updated",
          type: "success",
        });
      } else {
        addToast({
          text: res?.error?.message,
          type: "error",
        });
      }
      return res;
    });
  }

  return {
    getOrderDetailsHandler,
    getOrderStockActionsListForGrid,
    createShipmentHandler,
    updateShipmentDatesHandler,
    updateShipmentCustomerHandler,
    updateShipmentAddressHandler,
    getShipmentsListForForGridHandler,
  };
}
