import { BaseController } from "./base-controller.ts";

import allProducts from "../static-collections/Products/all-products.json";
import productDetail from "../static-collections/Products/product-details.json";
import theProductsForGrid from "../static-collections/Products/the-products-for-grid.json";
import brandsForProductsFilter from "../static-collections/Products/brands-for-products-filter.json";
import productCode from "../static-collections/Products/product-code.json";
import simpleListOfAllBrands from "../static-collections/Products/simple-list-of-all-brands.json";
import allCategoriesByOrganization from "../static-collections/Products/all-categories-by-organization.json";
import newProduct from "../static-collections/Products/new-product.json";
import newCategory from "../static-collections/Products/new-category.json";
import newBrand from "../static-collections/Products/new-brand.json";
import countersForProducts from "../static-collections/Products/counters-for-products.json";
import listOfProductPhotos from "../static-collections/Products/list-of-product-photos.json";
import productPhotosForVariant from "../static-collections/Products/product-photos-for-variant.json";
import variantsForGrid from "../static-collections/Products/variants-for-grid.json";
import productVariants from "../static-collections/Products/product-variants.json";
import createVariant from "../static-collections/Products/create-variant.json";
import variantDetails from "../static-collections/Products/variant-details.json";
import disposeVariantFromStock from "../static-collections/Products/dispose-variant-from-stock.json";
import variantStockHistory from "../static-collections/Products/variant-stock-history.json";
import listOfAllTraits from "../static-collections/Products/list-of-all-traits.json";
import listOfTraitsForProduct from "../static-collections/Products/list-of-traits-for-product.json";
import listOfTraitsWithOptionsForProduct from "../static-collections/Products/list-of-traits-with-options-for-product.json";
import trait from "../static-collections/Products/trait.json";
import optionsForTrait from "../static-collections/Products/options-for-trait.json";
import newOptionForTrait from "../static-collections/Products/new-option-for-trait.json";

import brandsList from "../static-collections/Products/brands-list_TABLE.json";
import productsList from "../static-collections/Products/products-list_TABLE.json";
import variantsList from "../static-collections/Products/variants-list_TABLE.json";

export class ProductsController extends BaseController {
  public static getAllProducts() {
    return this.staticDataApiHandler(this.createGridDefaultModel(productsList));
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

  public static createNewCategory() {
    return this.staticDataApiHandler(newCategory);
  }

  public static createBrand() {
    return this.staticDataApiHandler(newBrand);
  }

  public static uploadPhoto() {
    return this.staticDataApiHandler(newBrand);
  }

  public static getCountersForProducts() {
    return this.staticDataApiHandler(countersForProducts);
  }

  public static getProductPhotos() {
    return this.staticDataApiHandler(listOfProductPhotos);
  }

  public static getProductPhotosForVariant() {
    return this.staticDataApiHandler(productPhotosForVariant);
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
    return this.staticDataApiHandler(createVariant);
  }

  public static checkVariantCombination() {
    return this.staticDataApiHandler({});
  }

  public static getVariantDetails() {
    return this.staticDataApiHandler(variantDetails);
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
    return this.staticDataApiHandler(listOfAllTraits);
  }

  public static getListOfTraitsForProduct() {
    return this.staticDataApiHandler(listOfTraitsForProduct);
  }

  public static getListOfTraitsWithOptionsForProduct() {
    return this.staticDataApiHandler(listOfTraitsWithOptionsForProduct);
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
    return this.staticDataApiHandler(newOptionForTrait);
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
