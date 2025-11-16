import { BaseController } from "./base-controller";

import customer from "../static-collections/Orders/customer.json";
import customersList from "../static-collections/Orders/customers-list.json";
import customerInfo from "../static-collections/Orders/customer-info.json";
import customerAddress from "../static-collections/Orders/customer-address.json";
import customerAddressesList from "../static-collections/Orders/customer-addresses-list.json";
import order from "../static-collections/Orders/order.json";
import ordersList from "../static-collections/Orders/orders-list.json";

import listOfStockActionsForGrid from "../static-collections/Orders/list-of-stock-actions-for-grid.json";
import stockActionInOrder from "../static-collections/Orders/stock-action-in-order.json";
import allStockActionsToPackage from "../static-collections/Orders/all-stock-actions-to-package.json";
import discountsList from "../static-collections/Orders/discounts-list.json";
import newDiscount from "../static-collections/Orders/new-discount.json";
import updateDiscount from "../static-collections/Orders/update-discount.json";
import discountsToOrder from "../static-collections/Orders/discounts-to-order.json";

import shipmentsListForForGrid from "../static-collections/Orders/shipments-list-for-grid.json";
import shipmentsListForOrder from "../static-collections/Orders/shipments-list-for-order.json";
import shipmentDetails from "../static-collections/Orders/shipment-details.json";
import newShipment from "../static-collections/Orders/new-shipment.json";
import updateShipment from "../static-collections/Orders/update-shipment.json";
import shipmentCustomer from "../static-collections/Orders/shipment-customer.json";
import shipmentAddress from "../static-collections/Orders/shipment-address.json";
import variantsToShipment from "../static-collections/Orders/variants-to-shipment.json";
import newShipmentForOrder from "../static-collections/Orders/new-shipment-for-order.json";
import stockActionForShipment from "../static-collections/Orders/update-stock-action-for-shipment.json";
import packageProducts from "../static-collections/Orders/package-products.json";
import shipmentStatusForOrder from "../static-collections/Orders/shipment-status-for-order.json";
import shipmentStatusToPrevious from "../static-collections/Orders/shipment-status-to-previous.json";
import cancelShipmentModel from "../static-collections/Orders/cancel-shipment.json";
import increaseShipmentStockActionModel from "../static-collections/Orders/increase-shipment-stock-action.json";
import decreaseShipmentStockActionModel from "../static-collections/Orders/decrease-shipment-stock-action.json";
import shipmentStockActionWithQuantity from "../static-collections/Orders/shipment-stock-action-with-quantity.json";
import variantToShipment from "../static-collections/Orders/variant-to-shipment.json";
import deliveryData from "../static-collections/Orders/confirm-delivery-data.json";

export class OrdersController extends BaseController {
  public static getCustomersForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(customersList),
    );
  }

  public static getCustomerDetails() {
    return this.staticDataApiHandler(customer);
  }

  public static createCustomer() {
    return this.staticDataApiHandler(customer);
  }

  public static updateCustomer() {
    return this.staticDataApiHandler(customer);
  }

  public static deleteCustomer() {
    return this.staticDataApiHandler({});
  }

  public static getCustomerAddressesForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(customerAddressesList),
    );
  }

  public static getCustomerAddressDetails() {
    return this.staticDataApiHandler(customerAddress);
  }

  public static createCustomerAddress() {
    return this.staticDataApiHandler(customerAddress);
  }

  public static updateCustomerAddress() {
    return this.staticDataApiHandler(customerAddress);
  }

  public static deleteCustomerAddress() {
    return this.staticDataApiHandler({});
  }

  public static getCustomerInfo() {
    return this.staticDataApiHandler(customerInfo);
  }

  public static getListOfOrdersForGrid() {
    return this.staticDataApiHandler(this.createGridDefaultModel(ordersList));
  }

  public static createOrder() {
    return this.staticDataApiHandler(order);
  }

  public static deleteOrder() {
    return this.staticDataApiHandler({});
  }

  public static getOrderDetails() {
    return this.staticDataApiHandler(order);
  }

  public static getListOfCustomersForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(customersList),
    );
  }

  public static assignCustomerToOrder() {
    return this.staticDataApiHandler(order);
  }

  public static getListOfStockActionsForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(listOfStockActionsForGrid),
    );
  }

  public static addVariantsToOrder() {
    return this.staticDataApiHandler({});
  }

  public static updateStockActionInOrder() {
    return this.staticDataApiHandler(stockActionInOrder);
  }

  public static removeStockActionFromOrder() {
    return this.staticDataApiHandler({});
  }

  public static getDiscountsList() {
    return this.staticDataApiHandler(discountsList);
  }

  public static createDiscount() {
    return this.staticDataApiHandler(newDiscount);
  }

  public static updateDiscount() {
    return this.staticDataApiHandler(updateDiscount);
  }

  public static removeDiscountsFromOrder() {
    return this.staticDataApiHandler({});
  }

  public static applyDiscountsToOrder() {
    return this.staticDataApiHandler(discountsToOrder);
  }

  public static getShipmentsListForForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(shipmentsListForForGrid),
    );
  }

  public static getShipmentsListForOrder() {
    return this.staticDataApiHandler(shipmentsListForOrder);
  }

  public static getShipmentDetails() {
    return this.staticDataApiHandler(shipmentDetails);
  }

  public static createShipment() {
    return this.staticDataApiHandler(newShipment);
  }

  public static updateShipmentDates() {
    return this.staticDataApiHandler(updateShipment);
  }

  public static updateShipmentCustomer() {
    return this.staticDataApiHandler(shipmentCustomer);
  }

  public static updateShipmentAddress() {
    return this.staticDataApiHandler(shipmentAddress);
  }

  public static connectShipmentToOrder() {
    return this.staticDataApiHandler({});
  }

  public static addOrderToShipment() {
    return this.staticDataApiHandler({});
  }

  public static disconnectOrderFromShipment() {
    return this.staticDataApiHandler({});
  }

  public static addVariantsToShipment() {
    return this.staticDataApiHandler(variantsToShipment);
  }

  public static removeVariantFromShipment() {
    return this.staticDataApiHandler({});
  }

  public static createShipmentForOrder() {
    return this.staticDataApiHandler(newShipmentForOrder);
  }

  public static updateStockActionForShipment() {
    return this.staticDataApiHandler(stockActionForShipment);
  }

  public static confirmPackedProducts() {
    return this.staticDataApiHandler(packageProducts);
  }

  public static getShipmentStatusForOrder() {
    return this.staticDataApiHandler(shipmentStatusForOrder);
  }

  public static returnShipmentStatusToPrevious() {
    return this.staticDataApiHandler(shipmentStatusToPrevious);
  }

  public static cancelShipment() {
    return this.staticDataApiHandler(cancelShipmentModel);
  }

  public static increaseShipmentStockAction() {
    return this.staticDataApiHandler(increaseShipmentStockActionModel);
  }

  public static decreaseShipmentStockAction() {
    return this.staticDataApiHandler(decreaseShipmentStockActionModel);
  }

  public static addShipmentStockActionWithQuantity() {
    return this.staticDataApiHandler(shipmentStockActionWithQuantity);
  }

  public static addAllStockActionsToPackage() {
    return this.staticDataApiHandler(allStockActionsToPackage);
  }

  public static addVariantToShipment() {
    return this.staticDataApiHandler(variantToShipment);
  }

  public static confirmDeliveryData() {
    return this.staticDataApiHandler(deliveryData);
  }
}
