import { BaseController } from "./base-controller";

import customer from "../static-collections/Orders/customer.json";
import customersList from "../static-collections/Orders/customers-list.json";
import customerInfo from "../static-collections/Orders/customer-info.json";
import customerAddress from "../static-collections/Orders/customer-address.json";
import customerAddressesList from "../static-collections/Orders/customer-addresses-list.json";
import order from "../static-collections/Orders/order.json";
import ordersList from "../static-collections/Orders/orders-list.json";
import stockAction from "../static-collections/Orders/stock-action.json";
import stockActionsList from "../static-collections/Orders/stock-actions-list.json";
import discount from "../static-collections/Orders/discount.json";
import discountsList from "../static-collections/Orders/discounts-list.json";
import discountsToOrder from "../static-collections/Orders/discounts-to-order.json";
import shipment from "../static-collections/Orders/shipment.json";
import shipmentsList from "../static-collections/Orders/shipments-list.json";
import shipmentStatusForOrder from "../static-collections/Orders/shipment-status-for-order.json";

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
      this.createGridDefaultModel(stockActionsList),
    );
  }

  public static addVariantsToOrder() {
    return this.staticDataApiHandler({});
  }

  public static updateStockActionInOrder() {
    return this.staticDataApiHandler(stockAction);
  }

  public static removeStockActionFromOrder() {
    return this.staticDataApiHandler({});
  }

  public static getDiscountsList() {
    return this.staticDataApiHandler(discountsList);
  }

  public static createDiscount() {
    return this.staticDataApiHandler(discount);
  }

  public static updateDiscount() {
    return this.staticDataApiHandler(discount);
  }

  public static removeDiscountsFromOrder() {
    return this.staticDataApiHandler({});
  }

  public static applyDiscountsToOrder() {
    return this.staticDataApiHandler(discountsToOrder);
  }

  public static getShipmentsListForForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(shipmentsList),
    );
  }

  public static getShipmentsListForOrder() {
    return this.staticDataApiHandler(shipmentsList);
  }

  public static getShipmentDetails() {
    return this.staticDataApiHandler(shipment);
  }

  public static createShipment() {
    return this.staticDataApiHandler(shipment);
  }

  public static updateShipmentDates() {
    return this.staticDataApiHandler(shipment);
  }

  public static updateShipmentCustomer() {
    return this.staticDataApiHandler(customer);
  }

  public static updateShipmentAddress() {
    return this.staticDataApiHandler(customerAddress);
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
    return this.staticDataApiHandler(shipment);
  }

  public static removeVariantFromShipment() {
    return this.staticDataApiHandler({});
  }

  public static createShipmentForOrder() {
    return this.staticDataApiHandler({});
  }

  public static updateStockActionForShipment() {
    return this.staticDataApiHandler(shipment);
  }

  public static confirmPackedProducts() {
    return this.staticDataApiHandler(shipment);
  }

  public static getShipmentStatusForOrder() {
    return this.staticDataApiHandler(shipmentStatusForOrder);
  }

  public static returnShipmentStatusToPrevious() {
    return this.staticDataApiHandler(shipment);
  }

  public static cancelShipment() {
    return this.staticDataApiHandler(shipment);
  }

  public static increaseShipmentStockAction() {
    return this.staticDataApiHandler(shipment);
  }

  public static decreaseShipmentStockAction() {
    return this.staticDataApiHandler(shipment);
  }

  public static addShipmentStockActionWithQuantity() {
    return this.staticDataApiHandler(shipment);
  }

  public static addAllStockActionsToPackage() {
    return this.staticDataApiHandler(stockAction);
  }

  public static addVariantToShipment() {
    return this.staticDataApiHandler(shipment);
  }

  public static confirmDeliveryData() {
    return this.staticDataApiHandler(shipment);
  }
}
