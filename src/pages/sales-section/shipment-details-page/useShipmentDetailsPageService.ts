import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { useToast } from "@/hooks/useToast.ts";
import { ShipmentDetailsPageSliceActions as actions } from "@/state/slices/ShipmentDetailsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import OrdersApiHooks from "@/utils/services/api/OrdersApiService.ts";
import { IShipmentDetailsPageSlice } from "@/const/interfaces/store-slices/IShipmentDetailsPageSlice.ts";
import useAppService from "@/useAppService.ts";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";
import { OrdersPageSliceActions as ordersActions } from "@/state/slices/OrdersPageSlice.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { OrderItemModel } from "@/const/models/OrderItemModel.ts";
import { convertCustomerToRequestModel } from "@/utils/helpers/customer-helper.ts";
import { AddressModel } from "@/const/models/AddressModel.ts";
import {
  convertAddressToRequestModel,
  createAddressRequestModel,
} from "@/utils/helpers/address-helper.ts";

export default function useShipmentDetailsPageService(handleCardAction) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const state = useAppSelector<IShipmentDetailsPageSlice>(
    StoreSliceEnum.SHIPMENT_DETAILS,
  );
  const appService = useAppService();
  const { orderId } = useParams();
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
  const [getCountryCode] = DictionaryApiHooks.useLazyGetCountryCodeQuery();
  const [updateCustomerAddress] =
    OrdersApiHooks.useUpdateCustomerAddressMutation();
  const [createCustomerAddress] =
    OrdersApiHooks.useCreateCustomerAddressMutation();
  const [getListOfOrdersForGrid] =
    OrdersApiHooks.useGetListOfOrdersForGridMutation();
  const [addOrderToShipment] = OrdersApiHooks.useAddOrderToShipmentMutation();
  const [getShipmentStatusForOrder] =
    OrdersApiHooks.useLazyGetShipmentStatusForOrderQuery();

  // function getOrderDetailsHandler(orderId) {
  //   return getOrderDetails(orderId).then((res: any) => {
  //     dispatch(ordersActions.refreshSelectedOrder(res.data));
  //     dispatch(
  //       actions.refreshSelectedCustomer({
  //         ...res.data.customer,
  //         customerId: res.data.customerId,
  //       }),
  //     );
  //     return res;
  //   });
  // }
  //
  // function getOrderStockActionsListForGrid(orderId) {
  //   dispatch(actions.setIsProductsGridLoading(true));
  //   ordersService
  //     .getListOfStockActionsForGridHandler(
  //       orderId,
  //       ordersState.stockActionsGridRequestModel,
  //     )
  //     .then(() => {
  //       dispatch(actions.setIsProductsGridLoading(false));
  //     });
  // }

  // function getShipmentsListForForGridHandler(model) {
  //   dispatch(actions.setIsSelectShipmentForOrderGridLoading(true));
  //   return getShipmentsListForForGrid(model).then((res: any) => {
  //     dispatch(actions.setIsSelectShipmentForOrderGridLoading(false));
  //     dispatch(actions.refreshShipmentsGridRequestModel(res.data));
  //     return res;
  //   });
  // }
  //
  // function getShipmentsListForOrderHandler(orderId) {
  //   dispatch(actions.setIsOrderShipmentsGridLoading(true));
  //   return getShipmentsListForOrder(orderId).then((res: any) => {
  //     dispatch(actions.setIsOrderShipmentsGridLoading(false));
  //     dispatch(actions.refreshOrderShipments(res.data));
  //     return res;
  //   });
  // }

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
        } else {
          addToast({
            text: res?.error?.message,
            type: "error",
          });
        }
      });
    }
  }

  // function selectShipmentHandler() {
  //   const updatedModel = {
  //     ...state.shipmentsGridRequestModel,
  //     filter: {
  //       customers: [state.selectedCustomer.customerId],
  //     },
  //   };
  //   dispatch(actions.refreshShipmentsGridRequestModel(updatedModel));
  //
  //   getShipmentsListForForGridHandler(updatedModel);
  //   dispatch(
  //     actions.refreshActiveCardForCustomers("selectShipmentForOrderCard"),
  //   );
  // }

  // function showAllShipmentsHandler() {
  //   dispatch(actions.resetSelectedCustomer());
  //   const updatedModel = {
  //     ...state.shipmentsGridRequestModel,
  //     filter: {
  //       ...state.shipmentsGridRequestModel.filter,
  //       customers: [],
  //     },
  //   };
  //   dispatch(actions.refreshShipmentsGridRequestModel(updatedModel));
  //   getShipmentsListForForGridHandler(updatedModel);
  // }

  // function updateUserPreferencesHandler(model: PreferencesModel) {
  //   return updateUserPreferences(model).then(() => {
  //     appService.getUserPreferencesHandler();
  //   });
  // }
  //
  // function resetUserPreferencesHandler(grid) {
  //   return resetUserPreferences(grid).then(() => {
  //     appService.getUserPreferencesHandler();
  //   });
  // }

  // function shipmentsGridRequestChangeHandle(updates) {
  //   if (
  //     updates === "deliveryServiceId" ||
  //     "shipmentStatus" ||
  //     "startDate" ||
  //     "endDate"
  //   ) {
  //     getShipmentsListForForGridHandler(updates);
  //   }
  // }

  // function applyShipmentsGridColumns(model) {
  //   const modifiedModel = merge({}, appState.preferences, model);
  //   dispatch(appActions.refreshPreferences(modifiedModel));
  //   updateUserPreferencesHandler(modifiedModel);
  // }

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
        if (!res.error) {
          dispatch(actions.refreshSelectedShipment(res.data));
          getShipmentStatusForOrderHandler(Number(orderId));
        }
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

  // function closeSelectShipmentForOrderCardHandler() {
  //   handleCardAction("selectShipmentForOrderCard");
  //   dispatch(actions.resetActiveCardForCustomers());
  // }

  // function createShipmentForOrderHandler(orderId: number) {
  //   handleCardAction("shipmentConfigurationCard", true);
  //   dispatch(actions.setIsShipmentConfigurationCardLoading(true));
  //   dispatch(actions.resetSelectedCustomer());
  //   return createShipmentForOrder(orderId).then((res: any) => {
  //     dispatch(actions.setIsShipmentConfigurationCardLoading(false));
  //     dispatch(actions.refreshSelectedShipment(res.data));
  //     return res;
  //   });
  // }

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
      if (!res.error) {
        dispatch(actions.refreshSelectedShipment(res.data));
        getShipmentStatusForOrderHandler(Number(orderId));
      }
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
          isSelected:
            item.customerId ===
              state.activeCards.includes("shipmentConfigurationCard") ||
            state.activeCards.includes("selectOrderForShipmentCard")
              ? state.selectedShipment.customerId
              : item.customerId === state.selectedCustomer.customerId,
        }));
        dispatch(
          ordersActions.refreshCustomersGridRequestModel({
            ...ordersState.customersGridRequestModel,
            items: modifiedList,
          }),
        );
        if (
          state.activeCards.includes("shipmentConfigurationCard") &&
          state.selectedShipment.customerId === res.data.customerId
        ) {
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
        } else {
          if (state.selectedCustomer.customerId === res.data.customerId) {
            dispatch(actions.refreshSelectedCustomer(res.data));
          }
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
        item.locationId === res.data.locationId ? res.data : item,
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
    }).then(() => {
      dispatch(actions.setIsShipmentConfigurationCardLoading(false));
      getShipmentDetailsHandler(state.selectedShipment.shipmentId);
      // dispatch(
      //   actions.refreshSelectedShipment({
      //     ...state.selectedShipment,
      //     orders: [
      //       ...state.selectedShipment.orders,
      //       {
      //         customer: model.customer,
      //         orderDate: model.date,
      //         orderId: model.id,
      //         unitsAmount: model.count,
      //       },
      //     ],
      //   }),
      // );
    });
  }

  function closeSelectOrderForShipmentCardHandler() {
    handleCardAction("selectOrderForShipmentCard");
    dispatch(
      actions.refreshActiveCardForCustomers("shipmentConfigurationCard"),
    );
  }

  function getShipmentStatusForOrderHandler(orderId: number) {
    dispatch(actions.setIsProductsGridLoading(true));
    getShipmentStatusForOrder(orderId).then((res: any) => {
      dispatch(actions.setIsProductsGridLoading(false));
      dispatch(actions.refreshOrderStockActions(res.data));
    });
  }

  return {
    // getOrderDetailsHandler,
    // getShipmentsListForOrderHandler,
    // getOrderStockActionsListForGrid,
    createShipmentHandler,
    updateShipmentDatesHandler,
    updateShipmentCustomerHandler,
    updateShipmentAddressHandler,
    // getShipmentsListForForGridHandler,
    connectShipmentToOrderHandler,
    getShipmentDetailsHandler,
    getListOfCustomersForGridHandler,
    selectCustomerHandler,
    // selectShipmentHandler,
    // showAllShipmentsHandler,
    // updateUserPreferencesHandler,
    // resetUserPreferencesHandler,
    // shipmentsGridRequestChangeHandle,
    // applyShipmentsGridColumns,
    disconnectOrderFromShipmentHandler,
    addVariantsToShipmentHandler,
    addAllVariantsToShipmentHandler,
    removeVariantFromShipmentHandler,
    closeShipmentConfigurationCardHandler,
    openCreateEntityCardHandler,
    searchEntityHandle,
    closeSelectEntityCardHandler,
    // closeSelectShipmentForOrderCardHandler,
    // createShipmentForOrderHandler,
    changePackedOrderItemQuantityHandler,
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
    getShipmentStatusForOrderHandler,
  };
}
