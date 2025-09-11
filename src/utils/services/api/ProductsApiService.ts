import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { ProductCodeModel } from "@/const/models/ProductCodeModel.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.PRODUCTS_BASE_URL);

export const ProductsApiService = createApi({
  reducerPath: ApiServiceNameEnum.PRODUCTS,
  baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.PRODUCTS],
  endpoints: (builder) => ({
    getAllProducts: apiConfig.createQuery<ProductModel[], void>(builder, {
      query: () => ({
        url: ApiUrlEnum.PRODUCTS,
      }),
      transformResponse: (res: any) => res.products, //TODO delete this code after we will receive real data
    }),
    getProductDetail: apiConfig.createQuery<ProductModel, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${id}`,
      }),
    }),
    // manageProduct: apiConfig.createMutation<void, ProductModel>(builder, {
    //   query: (model: ProductModel) => ({
    //     url: `${ApiUrlEnum.PRODUCTS}/${model.productId}`,
    //     method: "PUT",
    //     body: JSON.stringify(model),
    //   }),
    // }),
    updateProduct: apiConfig.createMutation<void, any>(builder, {
      query: ({ productId, model }) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCTS}/${productId}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    toggleProductActivation: apiConfig.createMutation<void, any>(builder, {
      query: (productId) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCTS}/${productId}/active`,
        method: "PATCH",
      }),
    }),
    deleteProduct: apiConfig.createMutation<void, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${id}`,
        method: "DELETE",
      }),
    }),
    getTheProductsForGrid: apiConfig.createMutation<
      GridModel,
      GridRequestModel
    >(builder, {
      query: (model?: GridRequestModel) => ({
        url: `${ApiUrlEnum.PRODUCTS}/list`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    getBrandsForProductsFilter: apiConfig.createQuery<BrandModel[], void>(
      builder,
      {
        query: () => ({
          url: `${ApiUrlEnum.BRANDS}/for-filter`,
        }),
      },
    ),
    getCategoriesForProductsFilter: apiConfig.createQuery<
      CategoryModel[],
      void
    >(builder, {
      query: () => ({
        url: `${ApiUrlEnum.PRODUCT_CATEGORIES}/for-filter`,
      }),
    }),
    generateProductCode: apiConfig.createQuery<any, void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.CODES}/generate-code`,
      }),
    }),
    getSimpleListOfAllBrands: apiConfig.createQuery<any[], void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.BRANDS}/all`,
      }),
    }),
    getAllCategoriesByOrganization: apiConfig.createQuery<any, void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCT_CATEGORIES}/all`,
      }),
    }),
    checkProductCode: apiConfig.createMutation<void, ProductCodeModel>(
      builder,
      {
        query: (code: ProductCodeModel) => ({
          url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.CODES}/check-code`,
          method: "POST",
          body: JSON.stringify(code),
        }),
      },
    ),
    checkBrandName: apiConfig.createMutation<void, BrandModel>(builder, {
      query: (brandName: BrandModel) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.BRANDS}/check-name`,
        method: "POST",
        body: JSON.stringify(brandName),
      }),
    }),
    checkCategoryName: apiConfig.createMutation<void, CategoryModel>(builder, {
      query: (categoryName: CategoryModel) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCT_CATEGORIES}/check-name`,
        method: "POST",
        body: JSON.stringify(categoryName),
      }),
    }),
    createNewProduct: apiConfig.createMutation<void, ProductModel>(builder, {
      query: (model: ProductModel) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCTS}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    createNewCategory: apiConfig.createMutation<void, CategoryModel>(builder, {
      query: (model: CategoryModel) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCT_CATEGORIES}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    createBrand: apiConfig.createMutation<void, BrandModel>(builder, {
      query: (model: BrandModel) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.BRANDS}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    uploadPhoto: apiConfig.createMutation<void, any>(builder, {
      query: (model: UploadPhotoModel) => ({
        url: `${ApiUrlEnum.ASSETS_BASE_URL}/${model.contextName}/${model.contextId}/upload-photo`,
        method: "POST",
        body: model.file,
        headers: {
          "Content-Type": model.file.type,
        },
      }),
    }),
    getCountersForProducts: apiConfig.createQuery<ProductCountersModel, number>(
      builder,
      {
        query: (id: number) => ({
          url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCTS}/${id}/counters`,
        }),
      },
    ),
    getProductPhotos: apiConfig.createQuery<any, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCTS}/${id}/photos`,
      }),
    }),
    getProductPhotosForVariant: apiConfig.createQuery<any, any>(builder, {
      query: ({ productId, variantId }) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCTS}/${productId}/photos/exclude-variant/${variantId}`,
      }),
    }),
    putPhotoInNewPosition: apiConfig.createMutation<void, any>(builder, {
      query: ({ productId, photoId, index }) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCTS}/${productId}/photo/${photoId}/${index}`,
        method: "PATCH",
      }),
    }),
    detachVariantPhoto: apiConfig.createMutation<
      any,
      {
        id?: number;
        photoId?: number;
      }
    >(builder, {
      query: ({ id, photoId }) => ({
        url: `${ApiUrlEnum.VARIANTS}/${id}/detach-photo/${photoId}`,
        method: "PATCH",
      }),
    }),
    getVariantsForGrid: apiConfig.createMutation<GridModel, GridRequestModel>(
      builder,
      {
        query: (model?: GridRequestModel) => ({
          url: `${ApiUrlEnum.VARIANTS}/list`,
          method: "POST",
          body: JSON.stringify(model),
        }),
      },
    ),
    getProductVariants: apiConfig.createQuery<VariantModel[], number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${id}${ApiUrlEnum.VARIANTS}`,
      }),
    }),
    createVariant: apiConfig.createMutation<
      any,
      {
        id: number;
        model: number[];
      }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${id}${ApiUrlEnum.VARIANTS}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    checkVariantCombination: apiConfig.createMutation<
      any,
      {
        id: number;
        model: number[];
      }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${id}/check-variant-combination`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    getVariantDetails: apiConfig.createQuery<VariantModel, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.VARIANTS}/${id}`,
      }),
    }),
    toggleVariantIsActive: apiConfig.createMutation<any, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.VARIANTS}/${id}/toggle-active`,
        method: "PATCH",
      }),
    }),
    updateVariantDetails: apiConfig.createMutation<
      any,
      {
        id?: number;
        model?: any;
      }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.VARIANTS}/${id}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    updateVariantTraitOptions: apiConfig.createMutation<
      any,
      {
        id?: number;
        model?: any;
      }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.VARIANTS}/${id}/trait-options`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    increaseStockAmountForVariant: apiConfig.createMutation<
      any,
      {
        id: number;
        model: any;
      }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.VARIANTS}/${id}/increase-stock`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    disposeVariantFromStock: apiConfig.createMutation<
      any,
      {
        id: number;
        model: any;
      }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.VARIANTS}/${id}/dispose-from-stock`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    getVariantStockHistory: apiConfig.createQuery<any, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.VARIANTS}/${id}/stock-history`,
      }),
    }),
    changeVariantPosition: apiConfig.createMutation<
      any,
      {
        productId?: number;
        variantId?: number;
        index?: number;
      }
    >(builder, {
      query: ({ productId, variantId, index }) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${productId}/variant/${variantId}/${index}`,
        method: "PATCH",
      }),
    }),
    changePhotoPositionForVariant: apiConfig.createMutation<
      any,
      {
        id?: number;
        photoId?: number;
        index?: number;
      }
    >(builder, {
      query: ({ id, photoId, index }) => ({
        url: `${ApiUrlEnum.VARIANTS}/${id}/photo/${photoId}/${index}`,
        method: "PATCH",
      }),
    }),
    attachProductPhotoToVariant: apiConfig.createMutation<
      any,
      {
        variantId?: number;
        photoId?: number;
      }
    >(builder, {
      query: ({ variantId, photoId }) => ({
        url: `${ApiUrlEnum.VARIANTS}/${variantId}/attach-photo/${photoId}`,
        method: "PATCH",
      }),
    }),
    getListOfAllTraits: apiConfig.createQuery<any, void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.TRAITS}/all`,
      }),
    }),
    getListOfTraitsForProduct: apiConfig.createQuery<any, number>(builder, {
      query: (id) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${id}${ApiUrlEnum.TRAITS}`,
      }),
    }),
    getListOfTraitsWithOptionsForProduct: apiConfig.createQuery<any, number>(
      builder,
      {
        query: (id) => ({
          url: `${ApiUrlEnum.PRODUCTS}/${id}/traits-with-options`,
        }),
      },
    ),
    getTrait: apiConfig.createQuery<any, number>(builder, {
      query: (id) => ({
        url: `${ApiUrlEnum.TRAITS}/${id}`,
      }),
    }),
    createNewTrait: apiConfig.createMutation<any, TraitModel>(builder, {
      query: (model?: any) => ({
        url: `${ApiUrlEnum.TRAITS}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    updateTrait: apiConfig.createMutation<
      any,
      {
        id?: number;
        model?: TraitModel;
      }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.TRAITS}/${id}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    setProductTraits: apiConfig.createMutation<
      any,
      {
        id?: number;
        model?: TraitModel;
      }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${id}${ApiUrlEnum.TRAITS}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    deleteTrait: apiConfig.createMutation<void, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.TRAITS}/${id}`,
        method: "DELETE",
      }),
    }),
    getOptionsForTrait: apiConfig.createQuery<any, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.TRAITS}/${id}${ApiUrlEnum.OPTIONS}`,
      }),
    }),
    createNewOptionForTrait: apiConfig.createMutation<
      any,
      {
        id?: number;
        model?: TraitOptionModel;
      }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.TRAITS}/${id}${ApiUrlEnum.OPTIONS}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    updateOptionOfTrait: apiConfig.createMutation<
      any,
      {
        id?: number;
        model?: TraitOptionModel;
      }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.TRAIT_OPTIONS}/${id}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    deleteOptionOfTrait: apiConfig.createMutation<
      any,
      {
        id?: number;
      }
    >(builder, {
      query: (id) => ({
        url: `${ApiUrlEnum.TRAIT_OPTIONS}/${id}`,
        method: "DELETE",
      }),
    }),
    changePositionOfTraitOption: apiConfig.createMutation<
      any,
      {
        traitId?: number;
        optionId?: number;
        index?: number;
      }
    >(builder, {
      query: ({ traitId, optionId, index }) => ({
        url: `${ApiUrlEnum.TRAITS}/${traitId}/options/${optionId}/${index}`,
        method: "PATCH",
      }),
    }),
    getTraitsForFilter: apiConfig.createQuery<any, void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.TRAITS}/for-filter/`,
      }),
    }),
    deleteVariant: apiConfig.createMutation<void, number>(builder, {
      query: (variantId: number) => ({
        url: `${ApiUrlEnum.VARIANTS}/${variantId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { endpoints, ...ProductsApiHooks } = ProductsApiService;
export default ProductsApiHooks;
