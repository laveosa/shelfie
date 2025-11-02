import { BaseController } from "./base-controller.ts";

import allProducts from "../static-collections/all-products.json";
import productDetail from "../static-collections/product-details.json";
import theProductsForGrid from "../static-collections/the-products-for-grid.json";
import brandsForProductsFilter from "../static-collections/brands-for-products-filter.json";
import productCode from "../static-collections/product-code.json";
import simpleListOfAllBrands from "../static-collections/simple-list-of-all-brands.json";

export class ProductsController extends BaseController {
  public static getAllProducts() {
    return this.staticDataApiHandler(this.createGridDefaultModel(allProducts));
  }

  public static getProductDetail() {
    return this.staticDataApiHandler(productDetail);
  }

  public static updateProduct() {
    return this.staticDataApiHandler({});
  }

  public static toggleProductActivation() {
    return this.staticDataApiHandler({});
  }

  public static deleteProduct() {
    return this.staticDataApiHandler({});
  }

  public static getTheProductsForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(theProductsForGrid),
    );
  }

  public static getBrandsForProductsFilter() {
    return this.staticDataApiHandler(brandsForProductsFilter);
  }

  public static getCategoriesForProductsFilter() {
    return this.staticDataApiHandler(brandsForProductsFilter);
  }

  public static generateProductCode() {
    return this.staticDataApiHandler(productCode);
  }

  public static getSimpleListOfAllBrands() {
    return this.staticDataApiHandler(simpleListOfAllBrands);
  }
}
