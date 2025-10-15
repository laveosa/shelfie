import { useNavigate } from "react-router-dom";

import {
  convertAddressToRequestModel,
  createAddressRequestModel
} from "@/utils/helpers/address-helper.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { useToast } from "@/hooks/useToast.ts";
import {
  ShipmentDetailsPageSliceActions as actions
} from "@/state/slices/ShipmentDetailsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import OrdersApiHooks from "@/utils/services/api/OrdersApiService.ts";
import {
  IShipmentDetailsPageSlice
} from "@/const/interfaces/store-slices/IShipmentDetailsPageSlice.ts";
import {
  IOrdersPageSlice
} from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import DictionaryApiHooks, {
  DictionaryApiService
} from "@/utils/services/api/DictionaryApiService.ts";
import {
  OrdersPageSliceActions as ordersActions
} from "@/state/slices/OrdersPageSlice.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { OrderItemModel } from "@/const/models/OrderItemModel.ts";
import {
  convertCustomerToRequestModel
} from "@/utils/helpers/customer-helper.ts";
import { AddressModel } from "@/const/models/AddressModel.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export default function useShipmentDetailsPageService(handleCardAction) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const state = useAppSelector<IShipmentDetailsPageSlice>(
    StoreSliceEnum.SHIPMENT_DETAILS,
  );
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);

  const [createShipment] = OrdersApiHooks.useCreateShipmentMutation();
  const [updateShipmentDates] = OrdersApiHooks.useUpdateShipmentDatesMutation();
  const [updateShipmentCustomer] =
    OrdersApiHooks.useUpdateShipmentCustomerMutation();
  const [updateShipmentAddress] =
    OrdersApiHooks.useUpdateShipmentAddressMutation();
  const [getListOfCustomersForGrid] =
    OrdersApiHooks.useGetListOfCustomersForGridMutation();
  const [connectShipmentToOrder] =
    OrdersApiHooks.useConnectShipmentToOrderMutation();
  const [getShipmentDetails] = OrdersApiHooks.useLazyGetShipmentDetailsQuery();
  const [disconnectOrderFromShipment] =
    OrdersApiHooks.useDisconnectOrderFromShipmentMutation();
  const [removeVariantFromShipment] =
    OrdersApiHooks.useRemoveVariantFromShipmentMutation();
  const [confirmPackedProducts] =
    OrdersApiHooks.useConfirmPackedProductsMutation();
  const [getCustomerAddressesForGrid] =
    OrdersApiHooks.useGetCustomerAddressesForGridMutation();
  const [getCustomer] = OrdersApiHooks.useLazyGetCustomerDetailsQuery();
  const [createCustomer] = OrdersApiHooks.useCreateCustomerMutation();
  const [updateCustomer] = OrdersApiHooks.useUpdateCustomerMutation();
  const [getCountryCode] = DictionaryApiHooks.useLazyGetCountryCodeQuery();
  const [updateCustomerAddress] =
    OrdersApiHooks.useUpdateCustomerAddressMutation();
  const [createCustomerAddress] =
    OrdersApiHooks.useCreateCustomerAddressMutation();
  const [getListOfOrdersForGrid] =
    OrdersApiHooks.useGetListOfOrdersForGridMutation();
  const [addOrderToShipment] = OrdersApiHooks.useAddOrderToShipmentMutation();
  const [addShipmentStockActionWithQuantity] =
    OrdersApiHooks.useAddShipmentStockActionWithQuantityMutation();
  const [increaseShipmentStockAction] =
    OrdersApiHooks.useIncreaseShipmentStockActionMutation();
  const [decreaseShipmentStockAction] =
    OrdersApiHooks.useDecreaseShipmentStockActionMutation();
  const [addAllStockActionsToPackage] =
    OrdersApiHooks.useAddAllStockActionsToPackageMutation();
  const [addVariantToShipment] =
    OrdersApiHooks.useAddVariantToShipmentMutation();
  const [cancelShipment] = OrdersApiHooks.useCancelShipmentMutation();
  const [returnShipmentStatusToPrevious] =
    OrdersApiHooks.useReturnShipmentStatusToPreviousMutation();
  const [getDeliveryServicesList] =
    DictionaryApiService.useLazyGetDeliveryServicesListQuery();
  const [confirmDeliveryData] = OrdersApiHooks.useConfirmDeliveryDataMutation();

  function getListOfCustomersForGridHandler(model) {
    handleCardAction("selectEntityCard", true);
    return getListOfCustomersForGrid(model).then((res: any) => {
      const updatedCustomers = res.data.items.map((customer) => {
        const targetCustomerId =
          state.activeCardForCustomers === "shipmentConfigurationCard"
            ? state.selectedShipment?.customerId
            : state.selectedCustomer?.customerId;
        return {
          ...customer,
          isSelected: customer.customerId === targetCustomerId,
        };
      });
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
    return updateShipmentCustomer({ shipmentId, model }).then((res: any) => {
      if (!res.error) {
        getShipmentDetailsHandler(state.selectedShipment.shipmentId).then(
          (res: any) => {
            if (!res.error) {
              addToast({
                text: "Shipment successfully updated",
                type: "success",
              });
            }
          },
        );
        // dispatch(
        //   actions.refreshSelectedShipment({
        //     ...state.selectedShipment,
        //     customer: res.data,
        //   }),
        // );
      } else {
        addToast({
          text: res?.error?.message,
          type: "error",
        });
      }
    });
  }

  function updateShipmentAddressHandler(addressId: number) {
    return updateShipmentAddress({
      shipmentId: state.selectedShipment.shipmentId,
      model: { addressId },
    }).then((res: any) => {
      if (!res.error) {
        handleCardAction("selectCustomerAddressCard");
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

  function getShipmentDetailsHandler(shipmentId: number) {
    if (!state.activeCards.includes("shipmentConfigurationCard")) {
      handleCardAction("shipmentConfigurationCard", true);
    }
    dispatch(
      actions.refreshActiveCardForCustomers("shipmentConfigurationCard"),
    );
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
    if (state.activeCardForCustomers === "selectOrderForShipmentCard") {
      dispatch(actions.refreshSelectedCustomer(customer));

      const updatedModel = {
        ...state.ordersGridRequestModel,
        filter: {
          ...state.ordersGridRequestModel.filter,
          customerId: customer.customerId,
        },
      };
      dispatch(actions.refreshOrdersGridRequestModel(updatedModel));
      dispatch(actions.setIsOrdersGridLoading(true));
      getListOfOrdersForGrid(updatedModel).then((res: any) => {
        dispatch(actions.setIsOrdersGridLoading(false));
        dispatch(actions.refreshOrdersGridRequestModel(res.data));
      });
    } else {
      updateShipmentCustomer({
        shipmentId: state.selectedShipment.shipmentId,
        model: customer,
      }).then((res: any) => {
        if (!res.error) {
          dispatch(
            actions.refreshSelectedShipment({
              ...state.selectedShipment,
              customer: customer,
              customerId: customer.customerId,
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
      });
    }
  }

  function disconnectOrderFromShipmentHandler(
    shipmentId: number,
    orderId: number,
  ) {
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    return disconnectOrderFromShipment({ shipmentId, orderId }).then(
      (res: any) => {
        dispatch(actions.setIsShipmentConfigurationCardLoading(false));
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

  function removeVariantFromShipmentHandler(actionId: number) {
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    return removeVariantFromShipment(actionId).then((res: any) => {
      dispatch(actions.setIsShipmentConfigurationCardLoading(false));
      dispatch(actions.refreshSelectedShipment(res.data));
    });
  }

  function closeShipmentConfigurationCardHandler() {
    handleCardAction("shipmentConfigurationCard");
    dispatch(actions.resetActiveCardForCustomers());
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
      const updatedCustomers = res.data.items.map((customer) => {
        const targetCustomerId = state.activeCards.includes(
          "shipmentConfigurationCard",
        )
          ? state.selectedShipment?.customerId
          : state.selectedCustomer?.customerId;

        return {
          ...customer,
          isSelected: customer.customerId === targetCustomerId,
        };
      });
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

  function confirmPackedProductsHandler() {
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    confirmPackedProducts(state.selectedShipment.shipmentId).then(
      (res: any) => {
        dispatch(actions.setIsShipmentConfigurationCardLoading(false));
        if (!res.error) {
          dispatch(actions.refreshSelectedShipment(res.data));
        }
      },
    );
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

  function openCustomerCardHandler(model?: CustomerModel) {
    handleCardAction("customerCard", true);
    getCustomer(
      state.activeCards.includes("ShipmentConfigurationCard")
        ? state.selectedShipment.customerId
        : model.customerId,
    ).then((res: any) => {
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
        const updatedItems = ordersState.customersGridRequestModel.items.map(
          (item) => (item.customerId === res.data.customerId ? res.data : item),
        );
        const modifiedList = updatedItems.map((item) => ({
          ...item,
          isSelected: item.customerId === state.managedCustomer.customerId,
        }));
        dispatch(
          ordersActions.refreshCustomersGridRequestModel({
            ...ordersState.customersGridRequestModel,
            items: modifiedList,
          }),
        );
        if (state.selectedShipment.customerId === res.data.customerId) {
          dispatch(
            actions.refreshSelectedShipment({
              ...state.selectedShipment,
              customer: res.data,
              customerId: res.data.customerId,
            }),
          );
        }
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

  function manageAddressHandler(model: AddressModel) {
    handleCardAction("customerAddressCard", true);
    getCountryCode(null).then((res: any) => {
      if (res.data) {
        dispatch(actions.refreshCountryCodesList(res.data));
      }
    });
    if (model) {
      dispatch(actions.refreshManagedAddress(model));
    }
  }

  function resolveCustomerAddressData(data: any) {
    const requestModel = createAddressRequestModel(
      data.alias,
      data.addressLine1,
      data.addressLine2,
      data.city,
      data.state,
      data.postalCode,
      data.countryId,
    );
    if (data.addressId) {
      return updateCustomerAddressHandler(requestModel);
    } else {
      return createCustomerAddressHandler(requestModel);
    }
  }

  function updateCustomerAddressHandler(data: any) {
    const requestData = convertAddressToRequestModel(data);
    dispatch(actions.setIsCustomerAddressCardLoading(true));
    return updateCustomerAddress({
      id: state.managedAddress.addressId,
      model: requestData,
    }).then((res) => {
      dispatch(actions.setIsCustomerAddressCardLoading(false));
      if (res.error) {
        return;
      }
      const updatedItems = state.addressesGridRequestModel.items.map((item) =>
        item.addressId === res.data.addressId ? res.data : item,
      );
      const modifiedList = updatedItems.map((item) => ({
        ...item,
        isSelected: item.addressId === state.selectedShipment.deliveryAddressId,
      }));
      dispatch(
        actions.refreshAddressesGridRequestModel({
          ...state.addressesGridRequestModel,
          items: modifiedList,
        }),
      );
      if (state.selectedShipment.deliveryAddressId === res.data.addressId) {
        dispatch(
          actions.refreshSelectedShipment({
            ...state.selectedShipment,
            deliveryAddress: res.data,
            deliveryAddressId: res.data.addressId,
          }),
        );
      }
      dispatch(actions.resetManagedAddress());
      handleCardAction("customerAddressCard");
      addToast({
        text: "Customer address updated successfully",
        type: "info",
      });
    });
  }

  function createCustomerAddressHandler(data: any) {
    const requestData = convertAddressToRequestModel(data);

    dispatch(actions.setIsCustomerAddressCardLoading(true));
    return createCustomerAddress({
      id: state.selectedCustomer.customerId,
      model: requestData,
    }).then((res) => {
      dispatch(actions.setIsCustomerAddressCardLoading(false));
      if (res.error) {
        return;
      } else {
        const updatedItems = [
          res.data,
          ...state.addressesGridRequestModel.items,
        ];

        const modifiedList = updatedItems.map((item) => ({
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
        addToast({
          text: "New customer address created successfully",
          type: "info",
        });
        dispatch(actions.resetManagedAddress());
        handleCardAction("customerAddressCard");
      }
    });
  }

  function closeCustomerAddressCardHandler() {
    handleCardAction("customerAddressCard");
    dispatch(actions.resetManagedAddress());
  }

  function openSelectOrderForShipmentCardHandler() {
    handleCardAction("selectOrderForShipmentCard", true);
    dispatch(actions.setIsOrdersGridLoading(true));
    getListOfOrdersForGrid({
      ...state.ordersGridRequestModel,
      filter: { customerId: state.selectedCustomer?.customerId },
    }).then((res) => {
      dispatch(actions.setIsOrdersGridLoading(false));
      dispatch(actions.refreshOrdersGridRequestModel(res.data));
    });
    dispatch(
      actions.refreshActiveCardForCustomers("selectOrderForShipmentCard"),
    );
  }

  function addOrderToShipmentHandler(model: any) {
    handleCardAction("selectOrderForShipmentCard");
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    addOrderToShipment({
      shipmentId: state.selectedShipment.shipmentId,
      orderId: model.id,
    }).then((res: any) => {
      dispatch(actions.setIsShipmentConfigurationCardLoading(false));
      if (!res.error) {
        dispatch(actions.refreshSelectedShipment(res.data));
        addToast({
          text: "Order successfully connected to shipment",
          type: "info",
        });
      } else {
        addToast({
          text: res?.error?.message,
          type: "error",
        });
      }
    });
  }

  function closeSelectOrderForShipmentCardHandler() {
    handleCardAction("selectOrderForShipmentCard");
    dispatch(
      actions.refreshActiveCardForCustomers("shipmentConfigurationCard"),
    );
  }

  function navigateToOrderHandler(orderId: number) {
    navigate(`${NavUrlEnum.SALES}${NavUrlEnum.ORDER_DETAILS}/${orderId}`);
  }

  function increaseShipmentStockActionHandler(stockActionId: number) {
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    increaseShipmentStockAction(stockActionId).then((res: any) => {
      dispatch(actions.setIsShipmentConfigurationCardLoading(false));
      dispatch(actions.refreshSelectedShipment(res.data));
    });
  }

  function decreaseShipmentStockActionHandler(stockActionId: number) {
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    decreaseShipmentStockAction(stockActionId).then((res: any) => {
      dispatch(actions.setIsShipmentConfigurationCardLoading(false));
      dispatch(actions.refreshSelectedShipment(res.data));
    });
  }

  function changePackedOrderItemQuantityHandler(model: OrderItemModel) {
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    addShipmentStockActionWithQuantity({
      stockActionId: model.stockActionId,
      model: { quantity: model.quantityToPack },
    }).then((res: any) => {
      dispatch(actions.setIsShipmentConfigurationCardLoading(false));
      dispatch(actions.refreshSelectedShipment(res.data));
    });
  }

  function addVariantToShipmentHandler(stockActionId: number) {
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    return addVariantToShipment({
      shipmentId: state.selectedShipment.shipmentId,
      stockActionId,
    }).then((res: any) => {
      dispatch(actions.setIsShipmentConfigurationCardLoading(false));
      if (!res.error) {
        dispatch(actions.refreshSelectedShipment(res.data));
      }
    });
  }

  function addAllVariantsToShipmentHandler() {
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    addAllStockActionsToPackage(state.selectedShipment.shipmentId).then(
      (res: any) => {
        dispatch(actions.setIsShipmentConfigurationCardLoading(false));
        dispatch(actions.refreshSelectedShipment(res.data));
      },
    );
  }

  function cancelShipmentHandler() {
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    cancelShipment(state.selectedShipment.shipmentId).then((res: any) => {
      dispatch(actions.setIsShipmentConfigurationCardLoading(false));
      dispatch(actions.refreshSelectedShipment(res.data));
    });
  }

  function returnShipmentStatusToPreviousHandler() {
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    returnShipmentStatusToPrevious(state.selectedShipment.shipmentId).then(
      (res: any) => {
        dispatch(actions.setIsShipmentConfigurationCardLoading(false));
        dispatch(actions.refreshSelectedShipment(res.data));
      },
    );
  }

  function getDeliveryServicesListHandler() {
    getDeliveryServicesList().then((res: any) => {
      dispatch(actions.refreshDeliveryServicesList(res.data));
    });
  }

  function confirmDeliveryDataHandler(model: any) {
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    confirmDeliveryData({
      shipmentId: state.selectedShipment.shipmentId,
      model: {
        trackNumber: model.trackNumber,
        deliveryServiceId: model.deliveryServiceId,
      },
    }).then((res: any) => {
      dispatch(actions.setIsShipmentConfigurationCardLoading(true));
      dispatch(actions.refreshSelectedShipment(res.data));
    });
  }

  return {
    createShipmentHandler,
    updateShipmentDatesHandler,
    updateShipmentCustomerHandler,
    updateShipmentAddressHandler,
    connectShipmentToOrderHandler,
    getShipmentDetailsHandler,
    getListOfCustomersForGridHandler,
    selectCustomerHandler,
    disconnectOrderFromShipmentHandler,
    addVariantToShipmentHandler,
    addAllVariantsToShipmentHandler,
    removeVariantFromShipmentHandler,
    closeShipmentConfigurationCardHandler,
    openCreateEntityCardHandler,
    searchEntityHandle,
    closeSelectEntityCardHandler,
    confirmPackedProductsHandler,
    openSelectAddressCardHandler,
    searchAddressHandle,
    closeSelectAddressCardHandler,
    openCustomerCardHandler,
    createCustomerHandler,
    updateCustomerHandler,
    closeCustomerCardHandler,
    manageAddressHandler,
    resolveCustomerAddressData,
    closeCustomerAddressCardHandler,
    openSelectOrderForShipmentCardHandler,
    closeSelectOrderForShipmentCardHandler,
    addOrderToShipmentHandler,
    navigateToOrderHandler,
    increaseShipmentStockActionHandler,
    decreaseShipmentStockActionHandler,
    changePackedOrderItemQuantityHandler,
    cancelShipmentHandler,
    returnShipmentStatusToPreviousHandler,
    getDeliveryServicesListHandler,
    confirmDeliveryDataHandler,
  };
}
