import { BaseController } from "./base-controller";

import purchase from "../static-collections/Purchases/purchase.json";
import purchasesList from "../static-collections/Purchases/purchases-list.json";
import purchaseProductsList from "../static-collections/Purchases/purchase-products-list.json";
import purchaseCounters from "../static-collections/Purchases/purchase-counters.json";
import variantToPurchaseProducts from "../static-collections/Purchases/variant-to-purchase-products.json";
import purchaseProductVariants from "../static-collections/Purchases/purchase-product-variants.json";
import purchaseSummary from "../static-collections/Purchases/purchase-summary.json";
import margin from "../static-collections/Purchases/margin.json";
import marginsList from "../static-collections/Purchases/margins-list.json";
import marginRules from "../static-collections/Purchases/margin-rules.json";
import marginItem from "../static-collections/Purchases/margin-item.json";
import marginItemsList from "../static-collections/Purchases/margin-items-list.json";
import invoicesForGrid from "../static-collections/Purchases/invoices-for-grid.json";

export class PurchasesController extends BaseController {
  public static getListOfPurchasesForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(purchasesList),
    );
  }

  public static getListOfPurchaseProductsForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(purchaseProductsList),
    );
  }

  public static getPurchaseDetails() {
    return this.staticDataApiHandler(purchase);
  }

  public static createPurchaseForSupplier() {
    return this.staticDataApiHandler(purchase);
  }

  public static updatePurchaseForSupplier() {
    return this.staticDataApiHandler(purchase);
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
    return this.staticDataApiHandler(this.createGridDefaultModel(marginsList));
  }

  public static getAllMargins() {
    return this.staticDataApiHandler(margin);
  }

  public static getMarginForPurchase() {
    return this.staticDataApiHandler(margin);
  }

  public static getMarginDetails() {
    return this.staticDataApiHandler(margin);
  }

  public static createMargin() {
    return this.staticDataApiHandler(margin);
  }

  public static updateMargin() {
    return this.staticDataApiHandler(margin);
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
    return this.staticDataApiHandler(margin);
  }

  public static detachMargin() {
    return this.staticDataApiHandler({});
  }

  public static updateMarginRulesForPurchase() {
    return this.staticDataApiHandler(marginRules);
  }

  public static getMarginItemsListForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(marginItemsList),
    );
  }

  public static getInvoicesForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(invoicesForGrid),
    );
  }

  public static restoreMarginRuleToDefault() {
    return this.staticDataApiHandler(margin);
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
