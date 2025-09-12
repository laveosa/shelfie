import { useNavigate } from "react-router-dom";
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

export default function useOrderShipmentPageService(
  handleCardAction,
  handleMultipleCardActions,
) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  function connectShipmentToOrderHandler(shipmentId: number, orderId: number) {
    return connectShipmentToOrder({ shipmentId, orderId }).then((res: any) => {
      if (!res.error) {
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
    handleMultipleCardActions({
      shipmentConfigurationCard: true,
      selectShipmentForOrderCard: false,
    });
    dispatch(actions.setIsShipmentDetailsCardLoading(true));
    return getShipmentDetails(shipmentId).then((res: any) => {
      dispatch(actions.setIsShipmentDetailsCardLoading(false));
      dispatch(actions.refreshSelectedShipment(res.data));
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
    let gridRequestModel;
    if (
      updates === "deliveryServiceId" ||
      "shipmentStatus" ||
      "startDate" ||
      "endDate"
    ) {
      gridRequestModel = dispatch(
        actions.refreshShipmentsGridRequestModel({
          ...state.shipmentsGridRequestModel,
          currentPage: 1,
          filter: {
            ...state.shipmentsGridRequestModel.filter,
            ...updates,
          },
        }),
      );
    } else {
      gridRequestModel = dispatch(
        actions.refreshShipmentsGridRequestModel({
          ...state.shipmentsGridRequestModel,
          ...updates,
        }),
      );
    }
    getShipmentsListForForGridHandler(gridRequestModel.payload);
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
    return addVariantsToShipment({ shipmentId, model }).then((res: any) => {
      return res.data;
    });
  }

  function removeVariantFromShipmentHandler(actionId: number) {
    return removeVariantFromShipment(actionId).then((res: any) => {
      return res.data;
    });
  }

  function closeShipmentConfigurationCardHandler() {
    handleCardAction("shipmentConfigurationCard");
  }

  function closeSelectEntityCardHandler() {
    handleCardAction("selectEntityCard");
  }

  function closeSelectShipmentForOrderCardHandler() {
    handleCardAction("selectShipmentForOrderCard");
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
    removeVariantFromShipmentHandler,
    closeShipmentConfigurationCardHandler,
    closeSelectEntityCardHandler,
    closeSelectShipmentForOrderCardHandler,
  };
}
