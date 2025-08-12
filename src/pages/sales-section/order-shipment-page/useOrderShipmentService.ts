import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { OrdersPageSliceActions as ordersActions } from "@/state/slices/OrdersPageSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast.ts";
import { OrderDetailsPageSliceActions as actions } from "@/state/slices/OrderDetailsPageSlice.ts";
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

  function getOrderDetailsHandler(orderId) {
    dispatch(actions.setIsOrderConfigurationCardLoading(true));
    return getOrderDetails(orderId).then((res: any) => {
      dispatch(actions.setIsOrderConfigurationCardLoading(false));
      dispatch(ordersActions.refreshSelectedOrder(res.data));
      return res;
    });
  }

  function getOrderStockActionsListForGrid(orderId) {
    ordersService
      .getListOfStockActionsForGridHandler(
        orderId,
        ordersState.stockActionsGridRequestModel,
      )
      .then(() => {
        // dispatch(actions.setIsProductsInOrderGridLoading(false));
      });
  }

  return {
    getOrderDetailsHandler,
    getOrderStockActionsListForGrid,
  };
}
