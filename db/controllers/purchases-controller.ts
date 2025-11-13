import { BaseController } from "./base-controller";

import listOfPurchasesForGrid from "../static-collections/Purchases/list-of-purchases-for-grid.json";
import listOfPurchaseProductsForGrid from "../static-collections/Purchases/list-of-purchase-products-for-grid.json";
import purchaseDetailsModel from "../static-collections/Purchases/purchase-details.json";
import newPurchase from "../static-collections/Purchases/new-purchase.json";
import updatePurchase from "../static-collections/Purchases/update-purchase.json";
import purchaseCounters from "../static-collections/Purchases/purchase-counters.json";
import variantToPurchaseProducts from "../static-collections/Purchases/variant-to-purchase-products.json";
import purchaseProductVariants from "../static-collections/Purchases/purchase-product-variants.json";
import purchaseSummary from "../static-collections/Purchases/purchase-summary.json";
import marginsListForGrid from "../static-collections/Purchases/margins-list-for-grid.json";
import allMargins from "../static-collections/Purchases/all-margins.json";
import marginForPurchase from "../static-collections/Purchases/margin-for-purchase.json";
import marginDetails from "../static-collections/Purchases/margin-details.json";
import createMarginModel from "../static-collections/Purchases/create-margin.json";
import updateMarginModel from "../static-collections/Purchases/update-margin.json";
import marginRules from "../static-collections/Purchases/margin-rules.json";
import connectMarginToPurchaseModel from "../static-collections/Purchases/connect-margin-to-purchase.json";
import marginRulesForPurchase from "../static-collections/Purchases/margin-rules-for-purchase.json";
import marginItemsListForGrid from "../static-collections/Purchases/margin-items-list-for-grid.json";
import invoicesForGrid from "../static-collections/Purchases/invoices-for-grid.json";
import marginRuleToDefault from "../static-collections/Purchases/margin-rule-to-default.json";
import marginItem from "../static-collections/Purchases/margin-item.json";

export class PurchasesController extends BaseController {
  public static getListOfPurchasesForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(listOfPurchasesForGrid),
    );
  }

  public static getListOfPurchaseProductsForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(listOfPurchaseProductsForGrid),
    );
  }

  public static getPurchaseDetails() {
    return this.staticDataApiHandler(purchaseDetailsModel);
  }

  public static createPurchaseForSupplier() {
    return this.staticDataApiHandler(newPurchase);
  }

  public static updatePurchaseForSupplier() {
    return this.staticDataApiHandler(updatePurchase);
  }

  public static getPurchaseCounters() {
    return this.staticDataApiHandler(purchaseCounters);
  }

  public static addVariantToPurchaseProducts() {
    return this.staticDataApiHandler(variantToPurchaseProducts);
  }

  public static updatePurchaseProduct() {
    return this.staticDataApiHandler({});
  }

  public static getPurchaseProductVariants() {
    return this.staticDataApiHandler(purchaseProductVariants);
  }

  public static deleteStockAction() {
    return this.staticDataApiHandler({});
  }

  public static getPurchaseSummary() {
    return this.staticDataApiHandler(purchaseSummary);
  }

  public static getMarginsListForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(marginsListForGrid),
    );
  }

  public static getAllMargins() {
    return this.staticDataApiHandler(allMargins);
  }

  public static getMarginForPurchase() {
    return this.staticDataApiHandler(marginForPurchase);
  }

  public static getMarginDetails() {
    return this.staticDataApiHandler(marginDetails);
  }

  public static createMargin() {
    return this.staticDataApiHandler(createMarginModel);
  }

  public static updateMargin() {
    return this.staticDataApiHandler(updateMarginModel);
  }

  public static createMarginRules() {
    return this.staticDataApiHandler(marginRules);
  }

  public static deleteMargin() {
    return this.staticDataApiHandler({});
  }

  public static restoreMargin() {
    return this.staticDataApiHandler({});
  }

  public static connectMarginToPurchase() {
    return this.staticDataApiHandler(connectMarginToPurchaseModel);
  }

  public static detachMargin() {
    return this.staticDataApiHandler({});
  }

  public static updateMarginRulesForPurchase() {
    return this.staticDataApiHandler(marginRulesForPurchase);
  }

  public static getMarginItemsListForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(marginItemsListForGrid),
    );
  }

  public static getInvoicesForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(invoicesForGrid),
    );
  }

  public static restoreMarginRuleToDefault() {
    return this.staticDataApiHandler(marginRuleToDefault);
  }

  public static updateMarginItem() {
    return this.staticDataApiHandler(marginItem);
  }

  public static applyMarginItem() {
    return this.staticDataApiHandler({});
  }

  public static applyVisibleMarginItems() {
    return this.staticDataApiHandler({});
  }

  public static applyAllMarginItems() {
    return this.staticDataApiHandler({});
  }

  public static deletePurchase() {
    return this.staticDataApiHandler({});
  }
}
