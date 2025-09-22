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
import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { convertCustomerToRequestModel } from "@/utils/helpers/customer-helper.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";

export default function useOrderDetailsPageService(handleCardAction) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const state = useAppSelector<IOrderDetailsPageSlice>(
    StoreSliceEnum.ORDER_DETAILS,
  );
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const ordersService = useOrdersPageService();
  const { openConfirmationDialog } = useDialogService();

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
  const [createCustomer] = OrdersApiHooks.useCreateCustomerMutation();
  const [updateCustomer] = OrdersApiHooks.useUpdateCustomerMutation();
  const [deleteCustomer] = OrdersApiHooks.useDeleteCustomerMutation();

  function getOrderDetailsHandler(orderId) {
    dispatch(actions.setIsOrderConfigurationCardLoading(true));
    dispatch(actions.setIsDiscountsGridLoading(true));
    dispatch(actions.setIsShipmentsGridLoading(true));
    return getOrderDetails(orderId).then((res: any) => {
      dispatch(actions.setIsOrderConfigurationCardLoading(false));
      dispatch(actions.setIsDiscountsGridLoading(false));
      dispatch(actions.setIsShipmentsGridLoading(false));
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

  async function deleteOrderHandler(orderId) {
    const confirmedCustomerDeleting = await openConfirmationDialog({
      headerTitle: "Deleting order",
      text: "You are about to delete order.",
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedCustomerDeleting) return;
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
        handleCardAction("selectDiscountCard");
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

  function openSelectEntityCardHandler() {
    handleCardAction("selectEntityCard", true);
    ordersService
      .getListOfCustomersForGridHandler(ordersState.customersGridRequestModel)
      .then((res: any) => {
        const modifiedList = res.items.map((item) => ({
          ...item,
          isSelected: item.customerId === ordersState.selectedOrder.customerId,
        }));
        dispatch(
          ordersActions.refreshCustomersGridRequestModel({
            ...ordersState.customersGridRequestModel,
            items: modifiedList,
          }),
        );
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

  function openCreateEntityCardHandler() {
    handleCardAction("customerCard", true);
    dispatch(actions.resetSelectedCustomer());
  }

  function manageCustomerHandler(model: CustomerModel) {
    handleCardAction("customerCard", true);
    dispatch(actions.refreshSelectedCustomer(model));
  }

  function createCustomerHandler(data: any) {
    const requestData = convertCustomerToRequestModel(data);
    dispatch(actions.setIsCustomerCardLoading(true));
    return createCustomer(requestData).then((res) => {
      dispatch(actions.setIsCustomerCardLoading(false));
      if (res.error) {
        return;
      } else {
        addToast({
          text: "New customer created successfully",
          type: "info",
        });
        dispatch(actions.refreshSelectedCustomer(res.data));
        dispatch(
          ordersActions.refreshCustomersGridRequestModel({
            ...ordersState.customersGridRequestModel,
            items: [...ordersState.customersGridRequestModel.items, res.data],
          }),
        );
      }
    });
  }

  function updateCustomerHandler(data: any) {
    const requestData = convertCustomerToRequestModel(data);
    dispatch(actions.setIsCustomerCardLoading(true));
    return updateCustomer({
      id: state.selectedCustomer?.customerId,
      model: requestData,
    }).then((res) => {
      dispatch(actions.setIsCustomerCardLoading(false));
      if (res.error) {
        return;
      } else {
        addToast({
          text: "Customer updated successfully",
          type: "info",
        });
        return res.data;
      }
    });
  }

  async function deleteCustomerHandler(data: any) {
    const confirmedCustomerDeleting = await openConfirmationDialog({
      headerTitle: "Deleting customer",
      text: `You are about to delete customer ${data.customerName}.`,
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedCustomerDeleting) return;
    deleteCustomer(data.id).then((res) => {
      if (res.error) {
        addToast({
          text: "Failed to delete customer",
          type: "error",
        });
        return;
      } else {
        handleCardAction("customerCard");
        addToast({
          text: "Customer deleted successfully",
          type: "info",
        });
        dispatch(
          ordersActions.refreshCustomersGridRequestModel({
            ...ordersState.customersGridRequestModel,
            items: ordersState.customersGridRequestModel.items.filter(
              (customer) => customer.customerId !== data.customerId,
            ),
          }),
        );
        if (ordersState.selectedOrder.customerId === data.customerId) {
          dispatch(
            ordersActions.refreshSelectedOrder({
              ...ordersState.selectedOrder,
              customer: null,
            }),
          );
        }
      }
    });
  }

  function closeCustomerCardHandler() {
    handleCardAction("customerCard");
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
    openCreateEntityCardHandler,
    manageCustomerHandler,
    createCustomerHandler,
    updateCustomerHandler,
    deleteCustomerHandler,
    closeCustomerCardHandler,
  };
}
