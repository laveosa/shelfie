import { BaseController } from "./base-controller.ts";

import allProducts from "../static-collections/all-products.json";
import productDetail from "../static-collections/product-details.json";

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
}
