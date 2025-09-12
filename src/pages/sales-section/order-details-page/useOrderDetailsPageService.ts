import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { OrdersPageSliceActions as ordersActions } from "@/state/slices/OrdersPageSlice";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { useToast } from "@/hooks/useToast.ts";
import { OrderDetailsPageSliceActions as actions } from "@/state/slices/OrderDetailsPageSlice.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrderDetailsPageSlice } from "@/const/interfaces/store-slices/IOrderDetailsPageSlice.ts";
import OrdersApiHooks from "@/utils/services/api/OrdersApiService.ts";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";

export default function useOrderDetailsPageService(handleCardAction) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const state = useAppSelector<IOrderDetailsPageSlice>(
    StoreSliceEnum.ORDER_DETAILS,
  );
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const ordersService = useOrdersPageService();

  const [getOrderDetails] = OrdersApiHooks.useLazyGetOrderDetailsQuery();
  const [getListOfCustomersForGrid] =
    OrdersApiHooks.useGetListOfCustomersForGridMutation();
  const [assignCustomerToOrder] =
    OrdersApiHooks.useAssignCustomerToOrderMutation();
  const [deleteOrder] = OrdersApiHooks.useDeleteOrderMutation();
  const [getDiscountsList] = OrdersApiHooks.useLazyGetDiscountsListQuery();
  const [createDiscount] = OrdersApiHooks.useCreateDiscountMutation();
  const [removeDiscountsFromOrder] =
    OrdersApiHooks.useRemoveDiscountsFromOrderMutation();
  const [applyDiscountsToOrder] =
    OrdersApiHooks.useApplyDiscountsToOrderMutation();

  function getOrderDetailsHandler(orderId) {
    dispatch(actions.setIsOrderConfigurationCardLoading(true));
    return getOrderDetails(orderId).then((res: any) => {
      dispatch(actions.setIsOrderConfigurationCardLoading(false));
      dispatch(ordersActions.refreshSelectedOrder(res.data));
      dispatch(
        ordersActions.refreshProductCounter({ products: res.data.unitsAmount }),
      );
      return res;
    });
  }

  function getListOfCustomersForGridHandler(model) {
    dispatch(actions.setIsSelectEntityGridLoading(true));
    return getListOfCustomersForGrid(model).then((res: any) => {
      dispatch(actions.setIsSelectEntityGridLoading(false));
      dispatch(ordersActions.refreshCustomersGridRequestModel(res.data));
      return res.data;
    });
  }

  function assignCustomerToOrderHandler(orderId, customerId) {
    handleCardAction("selectEntityCard");
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
    handleCardAction("selectDiscountCard", true);
    dispatch(actions.setIsSelectDiscountGridLoading(true));

    return getDiscountsList().then((res: any) => {
      dispatch(actions.setIsSelectDiscountGridLoading(false));

      const selectedDiscountIds =
        ordersState.selectedOrder?.discounts?.map(
          (discount) => discount.discountId,
        ) ?? [];

      const modifiedList = res.data?.map((item) => ({
        ...item,
        isSelected: selectedDiscountIds.includes(item.discountId),
      }));

      dispatch(actions.refreshDiscountsList(modifiedList));

      return res.data;
    });
  }

  function createDiscountHandler(orderId, model) {
    return createDiscount(model).then((res: any) => {
      if (!res.error) {
        const newDiscount = { ...res.data, isSelected: true };
        const updatedList = [newDiscount, ...state.discountsList];
        dispatch(actions.refreshDiscountsList(updatedList));

        applyDiscountsToOrderHandler(
          orderId,
          { discounts: [res.data.discountId] },
          updatedList,
        );
        addToast({
          text: "Discount created successfully",
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

  function removeDiscountsFromOrderHandler(orderId, model) {
    return removeDiscountsFromOrder({ orderId, model }).then((res: any) => {
      if (!res.error) {
        dispatch(ordersActions.refreshSelectedOrder(res.data));

        const selectedDiscountIds =
          res.data.discounts?.map((discount) => discount.discountId) ?? [];

        const modifiedList = state.discountsList?.map((item) => ({
          ...item,
          isSelected: selectedDiscountIds.includes(item.discountId),
        }));

        dispatch(actions.refreshDiscountsList(modifiedList));
        addToast({
          text: "Discount successfully removed from order",
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

  function applyDiscountsToOrderHandler(
    orderId,
    model,
    currentList = state.discountsList,
  ) {
    return applyDiscountsToOrder({ orderId, model }).then((res: any) => {
      if (!res.error) {
        dispatch(ordersActions.refreshSelectedOrder(res.data));

        const selectedDiscountIds =
          res.data.discounts?.map((d) => d.discountId) ?? [];
        const modifiedList = currentList.map((item) => ({
          ...item,
          isSelected: selectedDiscountIds.includes(item.discountId),
        }));

        dispatch(actions.refreshDiscountsList(modifiedList));

        addToast({
          text: "Discount successfully applied to order",
          type: "success",
        });
      } else {
        addToast({ text: `${res.error.data.detail}`, type: "error" });
      }

      return res;
    });
  }

  function openSelectEntityCardHandler(model) {
    handleCardAction("selectEntityCard", true);
    ordersService.getListOfCustomersForGridHandler({
      ...ordersState.customersGridRequestModel,
      searchQuery: model,
    });
  }

  function searchEntityHandler(model) {
    getListOfCustomersForGridHandler({
      ...ordersState.customersGridRequestModel,
      searchQuery: model,
    });
  }

  function closeSelectEntityCardHandler() {
    handleCardAction("selectEntityCard");
  }

  function closeSelectDiscountCardHandler() {
    handleCardAction("selectDiscountCard");
  }

  return {
    getOrderDetailsHandler,
    getListOfCustomersForGridHandler,
    assignCustomerToOrderHandler,
    deleteOrderHandler,
    getDiscountsListHandler,
    createDiscountHandler,
    removeDiscountsFromOrderHandler,
    applyDiscountsToOrderHandler,
    openSelectEntityCardHandler,
    searchEntityHandler,
    closeSelectEntityCardHandler,
    closeSelectDiscountCardHandler,
  };
}
