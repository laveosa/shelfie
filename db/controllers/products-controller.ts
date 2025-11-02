import { BaseController } from "./base-controller.ts";

import allProducts from "../static-collections/all-products.json";
import productDetail from "../static-collections/product-details.json";
import theProductsForGrid from "../static-collections/the-products-for-grid.json";
import brandsForProductsFilter from "../static-collections/brands-for-products-filter.json";
import productCode from "../static-collections/product-code.json";
import simpleListOfAllBrands from "../static-collections/simple-list-of-all-brands.json";
import allCategoriesByOrganization from "../static-collections/all-categories-by-organization.json";
import newProduct from "../static-collections/new-product.json";

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

  public static getAllCategoriesByOrganization() {
    return this.staticDataApiHandler(allCategoriesByOrganization);
  }

  public static checkProductCode() {
    return this.staticDataApiHandler({});
  }

  public static checkBrandName() {
    return this.staticDataApiHandler({});
  }

  public static checkCategoryName() {
    return this.staticDataApiHandler({});
  }

  public static createNewProduct() {
    return this.staticDataApiHandler(newProduct);
  }
}
