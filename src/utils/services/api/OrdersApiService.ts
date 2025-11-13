import { createApi } from "@reduxjs/toolkit/query/react";

import { OrdersController as controller } from "db/controllers/orders-controller.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { CustomerModel } from "@/const/models/CustomerModel";
import { CustomerRequestModel } from "@/const/models/CustomerRequestModel";
import { AddressModel } from "@/const/models/AddressModel";
import { AddressRequestModel } from "@/const/models/AddressRequestModel";
import { CustomerCounterModel } from "@/const/models/CustomerCounterModel";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.ORDERS_BASE_URL);
type ControllerType = typeof controller;

export const OrdersApiService = createApi({
  reducerPath: ApiServiceNameEnum.ORDERS,
  baseQuery: async () => ({ data: undefined }),
  // baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.ORDERS],
  endpoints: (builder) => ({
    getCustomersForGrid: builder.mutation<GridRequestModel, GridRequestModel>(
      apiConfig.getStaticData<ControllerType>(
        "getCustomersForGrid",
        controller,
      ),
    ),
    getCustomerDetails: builder.query<CustomerModel, number>(
      apiConfig.getStaticData<ControllerType>("getCustomerDetails", controller),
    ),
    createCustomer: builder.mutation<any, CustomerRequestModel>(
      apiConfig.getStaticData<ControllerType>("createCustomer", controller),
    ),
    updateCustomer: builder.mutation<
      any,
      { id: number; model: CustomerRequestModel }
    >(apiConfig.getStaticData<ControllerType>("updateCustomer", controller)),
    deleteCustomer: builder.mutation<any, number>(
      apiConfig.getStaticData<ControllerType>("deleteCustomer", controller),
    ),
    getCustomerAddressesForGrid: builder.mutation<
      GridRequestModel,
      { model?: GridRequestModel; id: number }
    >(
      apiConfig.getStaticData<ControllerType>(
        "getCustomerAddressesForGrid",
        controller,
      ),
    ),
    getCustomerAddressDetails: builder.query<AddressModel, number>(
      apiConfig.getStaticData<ControllerType>(
        "getCustomerAddressDetails",
        controller,
      ),
    ),
    createCustomerAddress: builder.mutation<
      any,
      { id: number; model: AddressRequestModel }
    >(
      apiConfig.getStaticData<ControllerType>(
        "createCustomerAddress",
        controller,
      ),
    ),
    updateCustomerAddress: builder.mutation<
      any,
      { id: number; model: AddressRequestModel }
    >(
      apiConfig.getStaticData<ControllerType>(
        "updateCustomerAddress",
        controller,
      ),
    ),
    deleteCustomerAddress: builder.mutation<any, number>(
      apiConfig.getStaticData<ControllerType>(
        "deleteCustomerAddress",
        controller,
      ),
    ),
    getCustomerInfo: builder.query<CustomerCounterModel, number>(
      apiConfig.getStaticData<ControllerType>("getCustomerInfo", controller),
    ),
    getListOfOrdersForGrid: builder.mutation<any, any>(
      apiConfig.getStaticData<ControllerType>(
        "getListOfOrdersForGrid",
        controller,
      ),
    ),
    createOrder: builder.mutation<any, void>(
      apiConfig.getStaticData<ControllerType>("createOrder", controller),
    ),
    deleteOrder: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>("deleteOrder", controller),
    ),
    getOrderDetails: builder.query<number, void>(
      apiConfig.getStaticData<ControllerType>("getOrderDetails", controller),
    ),
    getListOfCustomersForGrid: builder.mutation<any, any>(
      apiConfig.getStaticData<ControllerType>(
        "getListOfCustomersForGrid",
        controller,
      ),
    ),
    assignCustomerToOrder: builder.mutation<void, any>(
      apiConfig.getStaticData<ControllerType>(
        "assignCustomerToOrder",
        controller,
      ),
    ),
    getListOfStockActionsForGrid: builder.mutation<
      any,
      { orderId: number; model: GridRequestModel }
    >(
      apiConfig.getStaticData<ControllerType>(
        "getListOfStockActionsForGrid",
        controller,
      ),
    ),
    addVariantsToOrder: builder.mutation<void, { orderId: number; model: any }>(
      apiConfig.getStaticData<ControllerType>("addVariantsToOrder", controller),
    ),
    updateStockActionInOrder: builder.mutation<
      void,
      { stockActionId: number; model: any }
    >(
      apiConfig.getStaticData<ControllerType>(
        "updateStockActionInOrder",
        controller,
      ),
    ),
    removeStockActionFromOrder: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>(
        "removeStockActionFromOrder",
        controller,
      ),
    ),
    getDiscountsList: builder.query<void, void>(
      apiConfig.getStaticData<ControllerType>("getDiscountsList", controller),
    ),
    createDiscount: builder.mutation<any, any>(
      apiConfig.getStaticData<ControllerType>("createDiscount", controller),
    ),
    updateDiscount: builder.mutation<void, { discountId: number; model: any }>(
      apiConfig.getStaticData<ControllerType>("updateDiscount", controller),
    ),
    removeDiscountsFromOrder: builder.mutation<
      void,
      { orderId: number; model: any }
    >(
      apiConfig.getStaticData<ControllerType>(
        "removeDiscountsFromOrder",
        controller,
      ),
    ),
    applyDiscountsToOrder: builder.mutation<
      void,
      { orderId: number; model: any }
    >(
      apiConfig.getStaticData<ControllerType>(
        "applyDiscountsToOrder",
        controller,
      ),
    ),
    getShipmentsListForForGrid: builder.mutation<any, GridRequestModel>(
      apiConfig.getStaticData<ControllerType>(
        "getShipmentsListForForGrid",
        controller,
      ),
    ),
    getShipmentsListForOrder: builder.query<void, number>(
      apiConfig.getStaticData<ControllerType>(
        "getShipmentsListForOrder",
        controller,
      ),
    ),
    getShipmentDetails: builder.query<void, number>(
      apiConfig.getStaticData<ControllerType>("getShipmentDetails", controller),
    ),
    createShipment: builder.mutation<any, void>(
      apiConfig.getStaticData<ControllerType>("createShipment", controller),
    ),
    updateShipmentDates: builder.mutation<
      void,
      { shipmentId: number; model: any }
    >(
      apiConfig.getStaticData<ControllerType>(
        "updateShipmentDates",
        controller,
      ),
    ),
    updateShipmentCustomer: builder.mutation<
      void,
      { shipmentId: number; model: any }
    >(
      apiConfig.getStaticData<ControllerType>(
        "updateShipmentCustomer",
        controller,
      ),
    ),
    updateShipmentAddress: builder.mutation<
      void,
      { shipmentId: number; model: any }
    >(
      apiConfig.getStaticData<ControllerType>(
        "updateShipmentAddress",
        controller,
      ),
    ),
    connectShipmentToOrder: builder.mutation<
      void,
      { shipmentId: number; orderId: number }
    >(
      apiConfig.getStaticData<ControllerType>(
        "connectShipmentToOrder",
        controller,
      ),
    ),
    addOrderToShipment: builder.mutation<
      void,
      { shipmentId: number; orderId: number }
    >(
      apiConfig.getStaticData<ControllerType>("addOrderToShipment", controller),
    ),
    disconnectOrderFromShipment: builder.mutation<
      void,
      { shipmentId: number; orderId: number }
    >(
      apiConfig.getStaticData<ControllerType>(
        "disconnectOrderFromShipment",
        controller,
      ),
    ),
    addVariantsToShipment: builder.mutation<
      void,
      { shipmentId: number; model: any }
    >(
      apiConfig.getStaticData<ControllerType>(
        "addVariantsToShipment",
        controller,
      ),
    ),
    removeVariantFromShipment: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>(
        "removeVariantFromShipment",
        controller,
      ),
    ),
    createShipmentForOrder: builder.mutation<any, number>(
      apiConfig.getStaticData<ControllerType>(
        "createShipmentForOrder",
        controller,
      ),
    ),
    updateStockActionForShipment: builder.mutation<
      void,
      { stockActionId: number; model: any }
    >(
      apiConfig.getStaticData<ControllerType>(
        "updateStockActionForShipment",
        controller,
      ),
    ),
    confirmPackedProducts: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>(
        "confirmPackedProducts",
        controller,
      ),
    ),
    getShipmentStatusForOrder: builder.query<void, number>(
      apiConfig.getStaticData<ControllerType>(
        "getShipmentStatusForOrder",
        controller,
      ),
    ),
    returnShipmentStatusToPrevious: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>(
        "returnShipmentStatusToPrevious",
        controller,
      ),
    ),
    cancelShipment: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>("cancelShipment", controller),
    ),
    increaseShipmentStockAction: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>(
        "increaseShipmentStockAction",
        controller,
      ),
    ),
    decreaseShipmentStockAction: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>(
        "decreaseShipmentStockAction",
        controller,
      ),
    ),
    addShipmentStockActionWithQuantity: builder.mutation<
      void,
      { stockActionId: number; model: any }
    >(
      apiConfig.getStaticData<ControllerType>(
        "addShipmentStockActionWithQuantity",
        controller,
      ),
    ),
    addAllStockActionsToPackage: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>(
        "addAllStockActionsToPackage",
        controller,
      ),
    ),
    addVariantToShipment: builder.mutation<
      void,
      { shipmentId: number; stockActionId: number }
    >(
      apiConfig.getStaticData<ControllerType>(
        "addVariantToShipment",
        controller,
      ),
    ),
    confirmDeliveryData: builder.mutation<
      void,
      { shipmentId: number; model: any }
    >(
      apiConfig.getStaticData<ControllerType>(
        "confirmDeliveryData",
        controller,
      ),
    ),
  }),
});
export const { endpoints, ...OrdersApiHooks } = OrdersApiService;
export default OrdersApiHooks;
