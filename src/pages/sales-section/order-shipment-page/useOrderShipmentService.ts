import { merge } from "lodash";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { OrdersPageSliceActions as ordersActions } from "@/state/slices/OrdersPageSlice";
import { useToast } from "@/hooks/useToast.ts";
import { OrderShipmentPageSliceActions as actions } from "@/state/slices/OrderShipmentPageSlice";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import OrdersApiHooks from "@/utils/services/api/OrdersApiService.ts";
import { IOrderShipmentPageSlice } from "@/const/interfaces/store-slices/IOrderShipmentPageSlice.ts";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";
import { AppSliceActions as appActions } from "@/state/slices/AppSlice.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import useAppService from "@/useAppService.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { OrderItemModel } from "@/const/models/OrderItemModel.ts";
import { convertCustomerToRequestModel } from "@/utils/helpers/customer-helper.ts";

export default function useOrderShipmentPageService(
  handleCardAction,
  handleMultipleCardActions,
) {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const appService = useAppService();
  const state = useAppSelector<IOrderShipmentPageSlice>(
    StoreSliceEnum.ORDER_SHIPMENT,
  );

  const ordersService = useOrdersPageService();
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);

  const [getOrderDetails] = OrdersApiHooks.useLazyGetOrderDetailsQuery();
  const [createShipment] = OrdersApiHooks.useCreateShipmentMutation();
  const [updateShipmentDates] = OrdersApiHooks.useUpdateShipmentDatesMutation();
  const [updateShipmentCustomer] =
    OrdersApiHooks.useUpdateShipmentCustomerMutation();
  const [updateShipmentAddress] =
    OrdersApiHooks.useUpdateShipmentAddressMutation();
  const [getShipmentsListForForGrid] =
    OrdersApiHooks.useGetShipmentsListForForGridMutation();
  const [getShipmentsListForOrder] =
    OrdersApiHooks.useLazyGetShipmentsListForOrderQuery();
  const [getListOfCustomersForGrid] =
    OrdersApiHooks.useGetListOfCustomersForGridMutation();
  const [connectShipmentToOrder] =
    OrdersApiHooks.useConnectShipmentToOrderMutation();
  const [getShipmentDetails] = OrdersApiHooks.useLazyGetShipmentDetailsQuery();
  const [updateUserPreferences] =
    UsersApiHooks.useUpdateUserPreferencesMutation();
  const [resetUserPreferences] =
    UsersApiHooks.useResetUserPreferencesMutation();
  const [disconnectOrderFromShipment] =
    OrdersApiHooks.useDisconnectOrderFromShipmentMutation();
  const [addVariantsToShipment] =
    OrdersApiHooks.useAddVariantsToShipmentMutation();
  const [removeVariantFromShipment] =
    OrdersApiHooks.useRemoveVariantFromShipmentMutation();
  const [createShipmentForOrder] =
    OrdersApiHooks.useCreateShipmentForOrderMutation();
  const [updateStockActionForShipment] =
    OrdersApiHooks.useUpdateStockActionForShipmentMutation();
  const [confirmPackedProducts] =
    OrdersApiHooks.useConfirmPackedProductsMutation();
  const [getCustomerAddressesForGrid] =
    OrdersApiHooks.useGetCustomerAddressesForGridMutation();
  const [getCustomer] = OrdersApiHooks.useLazyGetCustomerDetailsQuery();
  const [createCustomer] = OrdersApiHooks.useCreateCustomerMutation();
  const [updateCustomer] = OrdersApiHooks.useUpdateCustomerMutation();

  function getOrderDetailsHandler(orderId) {
    return getOrderDetails(orderId).then((res: any) => {
      dispatch(ordersActions.refreshSelectedOrder(res.data));
      dispatch(
        actions.refreshSelectedCustomer({
          ...res.data.customer,
          customerId: res.data.customerId,
        }),
      );
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
      dispatch(actions.refreshShipmentsGridRequestModel(res.data));
      return res;
    });
  }

  function getShipmentsListForOrderHandler(orderId) {
    dispatch(actions.setIsOrderShipmentsGridLoading(true));
    return getShipmentsListForOrder(orderId).then((res: any) => {
      dispatch(actions.setIsOrderShipmentsGridLoading(false));
      dispatch(actions.refreshOrderShipments(res.data));
      return res;
    });
  }

  function getListOfCustomersForGridHandler(model) {
    handleCardAction("selectEntityCard", true);
    return getListOfCustomersForGrid(model).then((res: any) => {
      const updatedCustomers = res.data.items.map((customer) =>
        customer.customerId === state.selectedCustomer?.customerId
          ? { ...customer, isSelected: true }
          : { ...customer, isSelected: false },
      );
      dispatch(
        ordersActions.refreshCustomersGridRequestModel({
          ...res.data,
          items: updatedCustomers,
        }),
      );
      return res.data;
    });
  }

  function createShipmentHandler() {
    handleCardAction("shipmentConfigurationCard", true);
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    dispatch(actions.resetSelectedCustomer());
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
    handleCardAction("selectEntityCard");
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

  function updateShipmentAddressHandler(addressId: number) {
    return updateShipmentAddress({
      shipmentId: state.selectedShipment.shipmentId,
      model: { addressId },
    }).then((res: any) => {
      if (!res.error) {
        dispatch(
          actions.refreshSelectedShipment({
            ...state.selectedShipment,
            deliveryAddress: res.data,
            deliveryAddressId: res.data.addressId,
          }),
        );
        const modifiedList = state.addressesGridRequestModel.items.map(
          (item) => ({
            ...item,
            isSelected: item.addressId === res.data.addressId,
          }),
        );
        dispatch(
          actions.refreshAddressesGridRequestModel({
            ...state.addressesGridRequestModel,
            items: modifiedList,
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

  function connectShipmentToOrderHandler(shipmentId: number, orderId: number) {
    return connectShipmentToOrder({ shipmentId, orderId }).then((res: any) => {
      if (!res.error) {
        dispatch(
          actions.refreshOrderShipments([...state.orderShipments, res.data]),
        );
        addToast({
          text: "Shipment successfully added to order",
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

  // function getShipmentDetailsHandler(shipmentId: number) {
  //   handleMultipleCardActions({
  //     shipmentConfigurationCard: true,
  //     selectShipmentForOrderCard: false,
  //   });
  //   dispatch(actions.setIsShipmentDetailsCardLoading(true));
  //   return getShipmentDetails(shipmentId).then((res: any) => {
  //     dispatch(actions.setIsShipmentDetailsCardLoading(false));
  //     dispatch(actions.refreshSelectedShipment(res.data));
  //     return res;
  //   });
  // }

  function getShipmentDetailsHandler(shipmentId: number) {
    handleMultipleCardActions({
      shipmentConfigurationCard: true,
      selectShipmentForOrderCard: false,
    });

    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    return getShipmentDetails(shipmentId).then((res: any) => {
      dispatch(actions.setIsShipmentConfigurationCardLoading(false));

      if (res?.data) {
        const cleanedShipment = {
          ...res.data,
          orderItems:
            res.data.orderItems?.filter(
              (item: any) => item.orderedAmount !== 0,
            ) || [],
        };

        dispatch(actions.refreshSelectedShipment(cleanedShipment));
        return cleanedShipment;
      }

      return res;
    });
  }

  function selectCustomerHandler(customer: CustomerModel) {
    handleCardAction("selectEntityCard");
    if (state.activeCards.includes("selectShipmentForOrderCard")) {
      dispatch(actions.refreshSelectedCustomer(customer));

      const updatedModel = {
        ...state.shipmentsGridRequestModel,
        filter: {
          ...state.shipmentsGridRequestModel.filter,
          customerId: customer.customerId,
        },
      };
      dispatch(actions.refreshShipmentsGridRequestModel(updatedModel));

      getShipmentsListForForGridHandler(updatedModel);
    } else {
      updateShipmentCustomerHandler(state.selectedShipment.shipmentId, {
        customerId: customer.customerId,
      });
    }
  }

  function selectShipmentHandler() {
    const updatedModel = {
      ...state.shipmentsGridRequestModel,
      filter: {
        customerId: state.selectedCustomer.customerId,
      },
    };
    dispatch(actions.refreshShipmentsGridRequestModel(updatedModel));

    getShipmentsListForForGridHandler(updatedModel);
  }

  function showAllShipmentsHandler() {
    dispatch(actions.resetSelectedCustomer());
    dispatch(
      actions.refreshShipmentsGridRequestModel({
        ...state.shipmentsGridRequestModel,
        filter: {
          ...state.shipmentsGridRequestModel.filter,
          customerId: null,
        },
      }),
    );
    getShipmentsListForForGridHandler(state.shipmentsGridRequestModel);
  }

  function updateUserPreferencesHandler(model: PreferencesModel) {
    return updateUserPreferences(model).then(() => {
      appService.getUserPreferencesHandler();
    });
  }

  function resetUserPreferencesHandler(grid) {
    return resetUserPreferences(grid).then(() => {
      appService.getUserPreferencesHandler();
    });
  }

  function shipmentsGridRequestChangeHandle(updates) {
    if (
      updates === "deliveryServiceId" ||
      "shipmentStatus" ||
      "startDate" ||
      "endDate"
    ) {
      getShipmentsListForForGridHandler(updates);
    }
  }

  function applyShipmentsGridColumns(model) {
    const modifiedModel = merge({}, appState.preferences, model);
    dispatch(appActions.refreshPreferences(modifiedModel));
    updateUserPreferencesHandler(modifiedModel);
  }

  function disconnectOrderFromShipmentHandler(
    shipmentId: number,
    orderId: number,
  ) {
    return disconnectOrderFromShipment({ shipmentId, orderId }).then(
      (res: any) => {
        if (!res.error) {
          dispatch(actions.refreshSelectedShipment(res.data));
          addToast({
            text: "Order successfully deleted from shipment",
            type: "success",
          });
        } else {
          addToast({
            text: res?.error?.message,
            type: "error",
          });
        }
        return res.data;
      },
    );
  }

  function addVariantsToShipmentHandler(shipmentId: number, model: any) {
    const normalizedData = {
      items: [
        {
          ...model,
        },
      ],
    };
    return addVariantsToShipment({ shipmentId, model: normalizedData }).then(
      (res: any) => {
        dispatch(actions.refreshSelectedShipment(res.data));
      },
    );
  }

  function addAllVariantsToShipmentHandler(shipmentId: number, model: any) {
    const normalizedData = {
      items: model.map((item: any) => ({
        stockActionId: item.stockActionId,
        quantity: item.amount,
      })),
    };
    addVariantsToShipment({ shipmentId, model: normalizedData }).then(
      (res: any) => {
        dispatch(actions.refreshSelectedShipment(res.data));
      },
    );
  }

  function removeVariantFromShipmentHandler(actionId: number) {
    return removeVariantFromShipment(actionId).then((res: any) => {
      dispatch(actions.refreshSelectedShipment(res.data));
    });
  }

  function closeShipmentConfigurationCardHandler() {
    handleCardAction("shipmentConfigurationCard");
  }

  function openCreateEntityCardHandler() {
    handleCardAction("customerCard", true);
  }

  function searchEntityHandle(model) {
    dispatch(actions.setIsSelectEntityGridLoading(true));
    return getListOfCustomersForGrid({
      ...ordersState.CustomersGridRequestModel,
      searchQuery: model,
    }).then((res: any) => {
      dispatch(actions.setIsSelectEntityGridLoading(false));
      const updatedCustomers = res.data.items.map((customer) =>
        customer.customerId === state.selectedCustomer?.customerId
          ? { ...customer, isSelected: true }
          : { ...customer, isSelected: false },
      );
      dispatch(
        ordersActions.refreshCustomersGridRequestModel({
          ...res.data,
          items: updatedCustomers,
        }),
      );
    });
  }

  function closeSelectEntityCardHandler() {
    handleCardAction("selectEntityCard");
  }

  function closeSelectShipmentForOrderCardHandler() {
    handleCardAction("selectShipmentForOrderCard");
  }

  function createShipmentForOrderHandler(orderId: number) {
    handleCardAction("shipmentConfigurationCard", true);
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    dispatch(actions.resetSelectedCustomer());
    return createShipmentForOrder(orderId).then((res: any) => {
      dispatch(actions.setIsShipmentConfigurationCardLoading(false));
      dispatch(actions.refreshSelectedShipment(res.data));
      return res;
    });
  }

  function changePackedOrderItemQuantityHandler(model: OrderItemModel) {
    updateStockActionForShipment({
      stockActionId: model.stockActionId,
      model: { quantity: model.amount },
    }).then((res: any) => {
      dispatch(actions.refreshSelectedShipment(res.data));
    });
  }

  function confirmPackedProductsHandler(
    shipmentId: number,
    model: OrderItemModel[],
  ) {
    confirmPackedProducts({
      shipmentId,
      model: {
        items: model.map((item) => ({
          stockActionId: item.stockActionId,
          quantity: item.amount,
        })),
      },
    }).then((res: any) => {
      dispatch(actions.refreshSelectedShipment(res.data));
    });
  }

  function getCustomerAddressesForGridHandler(customerId: number) {
    dispatch(actions.setIsCustomerAddressesGridLoading(true));
    return getCustomerAddressesForGrid({
      model: state.addressesGridRequestModel,
      id: customerId,
    }).then((res: any) => {
      dispatch(actions.setIsCustomerAddressesGridLoading(false));
      if (res.error) return;
      dispatch(actions.refreshAddressesGridRequestModel(res.data));
      return res;
    });
  }

  function openSelectAddressCardHandler(customerId: number) {
    handleCardAction("selectCustomerAddressCard", true);
    dispatch(actions.setIsCustomerAddressesGridLoading(true));
    getCustomerAddressesForGridHandler(customerId).then((res: any) => {
      dispatch(actions.setIsCustomerAddressesGridLoading(false));
      if (res.data) {
        const modifiedList = res.data.items.map((item) => ({
          ...item,
          isSelected:
            item.addressId === state.selectedShipment.deliveryAddressId,
        }));
        dispatch(
          actions.refreshAddressesGridRequestModel({
            ...state.addressesGridRequestModel,
            items: modifiedList,
          }),
        );
      }
    });
  }

  function searchAddressHandle(model: any) {
    dispatch(actions.setIsCustomerAddressesGridLoading(true));
    getCustomerAddressesForGrid({
      model: {
        searchQuery: model,
      },
      id: state.selectedShipment.customerId,
    }).then((res: any) => {
      dispatch(actions.setIsCustomerAddressesGridLoading(false));
      if (res.data) {
        const modifiedList = res.data.items.map((item) => ({
          ...item,
          isSelected:
            item.addressId === state.selectedShipment.deliveryAddressId,
        }));
        dispatch(
          actions.refreshAddressesGridRequestModel({
            ...state.addressesGridRequestModel,
            items: modifiedList,
          }),
        );
      }
    });
  }

  function closeSelectAddressCardHandler() {
    handleCardAction("selectCustomerAddressCard");
  }

  function openCustomerCardHandler() {
    handleCardAction("customerCard", true);
    getCustomer(state.selectedShipment.customerId).then((res: any) => {
      dispatch(actions.refreshManagedCustomer(res.data));
    });
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
        handleCardAction("customerCard");
        dispatch(
          ordersActions.refreshCustomersGridRequestModel({
            ...ordersState.customersGridRequestModel,
            items: [res.data, ...ordersState.customersGridRequestModel.items],
          }),
        );
        return res.data;
      }
    });
  }

  function updateCustomerHandler(data: any) {
    const requestData = convertCustomerToRequestModel(data);
    dispatch(actions.setIsCustomerCardLoading(true));
    return updateCustomer({
      id: state.managedCustomer?.customerId,
      model: requestData,
    }).then((res) => {
      dispatch(actions.setIsCustomerCardLoading(false));
      if (res.error) {
        return;
      } else {
        handleCardAction("customerCard");
        dispatch(actions.resetManagedCustomer());
        dispatch(
          actions.refreshSelectedShipment({
            ...state.selectedShipment,
            customer: {
              customerName: res.data.customerName,
              email: res.data.email,
              phone: res.data.phoneNumber,
            },
          }),
        );
        addToast({
          text: "Customer updated successfully",
          type: "info",
        });
        return res.data;
      }
    });
  }

  function closeCustomerCardHandler() {
    handleCardAction("customerCard");
    dispatch(actions.resetManagedCustomer());
  }

  return {
    getOrderDetailsHandler,
    getShipmentsListForOrderHandler,
    getOrderStockActionsListForGrid,
    createShipmentHandler,
    updateShipmentDatesHandler,
    updateShipmentCustomerHandler,
    updateShipmentAddressHandler,
    getShipmentsListForForGridHandler,
    connectShipmentToOrderHandler,
    getShipmentDetailsHandler,
    getListOfCustomersForGridHandler,
    selectCustomerHandler,
    selectShipmentHandler,
    showAllShipmentsHandler,
    updateUserPreferencesHandler,
    resetUserPreferencesHandler,
    shipmentsGridRequestChangeHandle,
    applyShipmentsGridColumns,
    disconnectOrderFromShipmentHandler,
    addVariantsToShipmentHandler,
    addAllVariantsToShipmentHandler,
    removeVariantFromShipmentHandler,
    closeShipmentConfigurationCardHandler,
    openCreateEntityCardHandler,
    searchEntityHandle,
    closeSelectEntityCardHandler,
    closeSelectShipmentForOrderCardHandler,
    createShipmentForOrderHandler,
    changePackedOrderItemQuantityHandler,
    confirmPackedProductsHandler,
    openSelectAddressCardHandler,
    searchAddressHandle,
    closeSelectAddressCardHandler,
    openCustomerCardHandler,
    createCustomerHandler,
    updateCustomerHandler,
    closeCustomerCardHandler,
  };
}
