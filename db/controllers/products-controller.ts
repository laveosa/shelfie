import { BaseController } from "./base-controller.ts";

import product from "../static-collections/Products/product.json";
import productsList from "../static-collections/Products/products-list.json";
import productVariants from "../static-collections/Products/product-variants.json";
import productCode from "../static-collections/Products/product-code.json";
import productPhotos from "../static-collections/Products/product-photos.json";
import countersForProducts from "../static-collections/Products/counters-for-products.json";
import variant from "../static-collections/Products/variant.json";
import variantsList from "../static-collections/Products/variants-list.json";
import variantStockHistory from "../static-collections/Products/variant-stock-history.json";
import disposeVariantFromStock from "../static-collections/Products/dispose-variant-from-stock.json";
import brand from "../static-collections/Products/brand.json";
import brandsList from "../static-collections/Products/brands-list.json";
import brandsForProductsFilter from "../static-collections/Products/brands-for-products-filter.json";
import category from "../static-collections/Products/category.json";
import categoriesList from "../static-collections/Products/categories-list.json";
import trait from "../static-collections/Products/trait.json";
import traitList from "../static-collections/Products/trait-list.json";
import traitOption from "../static-collections/Products/trait-option.json";
import optionsForTrait from "../static-collections/Products/options-for-trait.json";

export class ProductsController extends BaseController {
  public static getAllProducts() {
    return this.staticDataApiHandler(this.createGridDefaultModel(productsList));
  }

  public static getProductDetail() {
    return this.staticDataApiHandler(product);
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
    return this.staticDataApiHandler(this.createGridDefaultModel(productsList));
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
    return this.staticDataApiHandler(brandsList);
  }

  public static getAllCategoriesByOrganization() {
    return this.staticDataApiHandler(categoriesList);
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
    return this.staticDataApiHandler(product);
  }

  public static createNewCategory() {
    return this.staticDataApiHandler(category);
  }

  public static createBrand() {
    return this.staticDataApiHandler(brand);
  }

  public static uploadPhoto() {
    return this.staticDataApiHandler(brand);
  }

  public static getCountersForProducts() {
    return this.staticDataApiHandler(countersForProducts);
  }

  public static getProductPhotos() {
    return this.staticDataApiHandler(productPhotos);
  }

  public static getProductPhotosForVariant() {
    return this.staticDataApiHandler(productPhotos);
  }

  public static putPhotoInNewPosition() {
    return this.staticDataApiHandler({});
  }

  public static detachVariantPhoto() {
    return this.staticDataApiHandler({});
  }

  public static getVariantsForGrid() {
    return this.staticDataApiHandler(this.createGridDefaultModel(variantsList));
  }

  public static getProductVariants() {
    return this.staticDataApiHandler(productVariants);
  }

  public static createVariant() {
    return this.staticDataApiHandler(variant);
  }

  public static checkVariantCombination() {
    return this.staticDataApiHandler({});
  }

  public static getVariantDetails() {
    return this.staticDataApiHandler(variant);
  }

  public static toggleVariantIsActive() {
    return this.staticDataApiHandler({});
  }

  public static updateVariantDetails() {
    return this.staticDataApiHandler({});
  }

  public static updateVariantTraitOptions() {
    return this.staticDataApiHandler({});
  }

  public static increaseStockAmountForVariant() {
    return this.staticDataApiHandler({});
  }

  public static disposeVariantFromStock() {
    return this.staticDataApiHandler(disposeVariantFromStock);
  }

  public static getVariantStockHistory() {
    return this.staticDataApiHandler(variantStockHistory);
  }

  public static changeVariantPosition() {
    return this.staticDataApiHandler({});
  }

  public static changePhotoPositionForVariant() {
    return this.staticDataApiHandler({});
  }

  public static getListOfAllTraits() {
    return this.staticDataApiHandler(traitList);
  }

  public static getListOfTraitsForProduct() {
    return this.staticDataApiHandler(traitList);
  }

  public static getListOfTraitsWithOptionsForProduct() {
    return this.staticDataApiHandler(traitList);
  }

  public static getTrait() {
    return this.staticDataApiHandler(trait);
  }

  public static createNewTrait() {
    return this.staticDataApiHandler({});
  }

  public static updateTrait() {
    return this.staticDataApiHandler({});
  }

  public static setProductTraits() {
    return this.staticDataApiHandler({});
  }

  public static deleteTrait() {
    return this.staticDataApiHandler({});
  }

  public static getOptionsForTrait() {
    return this.staticDataApiHandler(optionsForTrait);
  }

  public static createNewOptionForTrait() {
    return this.staticDataApiHandler(traitOption);
  }

  public static deleteOptionOfTrait() {
    return this.staticDataApiHandler({});
  }

  public static changePositionOfTraitOption() {
    return this.staticDataApiHandler({});
  }

  public static getTraitsForFilter() {
    return this.staticDataApiHandler({});
  }

  public static deleteVariant() {
    return this.staticDataApiHandler({});
  }

  public static updateBrandOwner() {
    return this.staticDataApiHandler({});
  }
}
