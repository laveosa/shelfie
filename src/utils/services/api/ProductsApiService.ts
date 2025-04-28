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
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
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
      providesTags: (result: ProductModel[]) =>
        apiConfig.providesTags<ProductModel>(
          result,
          ApiServiceNameEnum.PRODUCTS,
        ),
    }),
    getProductDetail: apiConfig.createQuery<ProductModel, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${id}`,
      }),
      providesTags: (_result, _error, id) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          id,
        },
      ],
    }),
    manageProduct: apiConfig.createMutation<void, ProductModel>(builder, {
      query: (model: ProductModel) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${model.productId}`,
        method: "PUT",
        body: JSON.stringify(model),
      }),
      invalidatesTags: (result) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          result,
        },
      ],
    }),
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
      invalidatesTags: (_result, _error, id) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          id,
        },
      ],
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
      // invalidatesTags: (_result, _error, model) => [
      //   {
      //     type: ApiServiceNameEnum.PRODUCTS,
      //     model,
      //   },
      // ],
    }),
    getBrandsForProductsFilter: apiConfig.createQuery<BrandModel[], void>(
      builder,
      {
        query: () => ({
          url: `${ApiUrlEnum.BRANDS}/for-filter`,
        }),
        // providesTags: (result: BrandModel[]) =>
        //   apiConfig.providesTags(result, ApiServiceNameEnum.PRODUCTS),
      },
    ),
    getCategoriesForProductsFilter: apiConfig.createQuery<
      CategoryModel[],
      void
    >(builder, {
      query: () => ({
        url: `${ApiUrlEnum.PRODUCT_CATEGORIES}/for-filter`,
      }),
      // providesTags: (result: CategoryModel[]) =>
      //   apiConfig.providesTags(result, ApiServiceNameEnum.PRODUCTS),
    }),
    generateProductCode: apiConfig.createQuery<any, void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.CODES}/generate-code`,
      }),
      providesTags: (_result, _error, code) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          code,
        },
      ],
    }),
    getSimpleListOfAllBrands: apiConfig.createQuery<any[], void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.BRANDS}/all`,
      }),
      providesTags: (result: any[]) =>
        apiConfig.providesTags<any[]>(result, ApiServiceNameEnum.PRODUCTS),
    }),
    getAllCategoriesByOrganization: apiConfig.createQuery<any, void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCT_CATEGORIES}/all`,
      }),
      providesTags: (result: any) =>
        apiConfig.providesTags<any>(result, ApiServiceNameEnum.PRODUCTS),
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
      invalidatesTags: (_result, _error, brandName) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          brandName,
        },
      ],
    }),
    checkCategoryName: apiConfig.createMutation<void, CategoryModel>(builder, {
      query: (categoryName: CategoryModel) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCT_CATEGORIES}/check-name`,
        method: "POST",
        body: JSON.stringify(categoryName),
      }),
      invalidatesTags: (_result, _error, categoryName) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          categoryName,
        },
      ],
    }),
    createNewProduct: apiConfig.createMutation<void, ProductModel>(builder, {
      query: (model: ProductModel) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCTS}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
      invalidatesTags: (_result, _error, model) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          model,
        },
      ],
    }),
    createNewCategory: apiConfig.createMutation<void, CategoryModel>(builder, {
      query: (model: CategoryModel) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCT_CATEGORIES}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
      invalidatesTags: (_result, _error, model) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          model,
        },
      ],
    }),
    createBrand: apiConfig.createMutation<void, BrandModel>(builder, {
      query: (model: BrandModel) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.BRANDS}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
      invalidatesTags: (_result, _error, model) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          model,
        },
      ],
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
      invalidatesTags: (_result, _error, file) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          file,
        },
      ],
    }),
    getCountersForProducts: apiConfig.createQuery<ProductCounterModel, number>(
      builder,
      {
        query: (id: number) => ({
          url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCTS}/${id}/counters`,
        }),
        providesTags: (_result, _error, result) => [
          {
            type: ApiServiceNameEnum.PRODUCTS,
            result,
          },
        ],
      },
    ),
    getProductPhotos: apiConfig.createQuery<ProductCounterModel, number>(
      builder,
      {
        query: (id: number) => ({
          url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCTS}/${id}/photos`,
        }),
        providesTags: (_result, _error, result) => [
          {
            type: ApiServiceNameEnum.PRODUCTS,
            result,
          },
        ],
      },
    ),
    putPhotoInNewPosition: apiConfig.createMutation<void, any>(builder, {
      query: ({ productId, photoId, index }) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCTS}/${productId}/photo/${photoId}/${index}`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, result) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          result,
        },
      ],
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
      invalidatesTags: (_result, _error, result) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          result,
        },
      ],
    }),
    getVariantsForGrid: apiConfig.createMutation<GridModel, GridRequestModel>(
      builder,
      {
        query: (model?: GridRequestModel) => ({
          url: `${ApiUrlEnum.VARIANTS}/list`,
          method: "POST",
          body: JSON.stringify(model),
        }),
        invalidatesTags: (_result, _error, model) => [
          {
            type: ApiServiceNameEnum.PRODUCTS,
            model,
          },
        ],
      },
    ),
    getProductVariants: apiConfig.createQuery<VariantModel[], number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${id}${ApiUrlEnum.VARIANTS}`,
      }),
      providesTags: (_result, _error, result) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          result,
        },
      ],
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
      invalidatesTags: (_result, _error, model) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          model,
        },
      ],
    }),
    getVariantDetails: apiConfig.createQuery<VariantModel, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.VARIANTS}/${id}`,
      }),
      // providesTags: (_result, _error, result) => [
      //   {
      //     type: ApiServiceNameEnum.PRODUCTS,
      //     result,
      //   },
      // ],
    }),
    toggleVariantIsActive: apiConfig.createMutation<any, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.VARIANTS}/${id}/toggle-active`,
        method: "PATCH",
      }),
      // invalidatesTags: (_result, _error, result) => [
      //   {
      //     type: ApiServiceNameEnum.PRODUCTS,
      //     result,
      //   },
      // ],
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
      invalidatesTags: (_result, _error, result) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          result,
        },
      ],
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
      // invalidatesTags: (_result, _error, result) => [
      //   {
      //     type: ApiServiceNameEnum.PRODUCTS,
      //     result,
      //   },
      // ],
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
      invalidatesTags: (_result, _error, model) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          model,
        },
      ],
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
      invalidatesTags: (_result, _error, model) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          model,
        },
      ],
    }),
    getVariantStockHistory: apiConfig.createQuery<any, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.VARIANTS}/${id}/stock-history`,
      }),
      providesTags: (_result, _error, result) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          result,
        },
      ],
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
      invalidatesTags: (_result, _error, result) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          result,
        },
      ],
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
      providesTags: (result: TraitModel[]) =>
        apiConfig.providesTags(result, ApiServiceNameEnum.PRODUCTS),
    }),
    getListOfTraitsForProduct: apiConfig.createQuery<any, number>(builder, {
      query: (id) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${id}${ApiUrlEnum.TRAITS}`,
      }),
      providesTags: (result) =>
        apiConfig.providesTags(result, ApiServiceNameEnum.PRODUCTS),
    }),
    getListOfTraitsWithOptionsForProduct: apiConfig.createQuery<any, number>(
      builder,
      {
        query: (id) => ({
          url: `${ApiUrlEnum.PRODUCTS}/${id}/traits-with-options`,
        }),
        providesTags: (result) =>
          apiConfig.providesTags(result, ApiServiceNameEnum.PRODUCTS),
      },
    ),
    getTrait: apiConfig.createQuery<any, number>(builder, {
      query: (id) => ({
        url: `${ApiUrlEnum.TRAITS}/${id}`,
      }),
      providesTags: (_result, _error, result) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          result,
        },
      ],
    }),
    createNewTrait: apiConfig.createMutation<any, TraitModel>(builder, {
      query: (model?: any) => ({
        url: `${ApiUrlEnum.TRAITS}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
      invalidatesTags: (_result, _error, model: TraitModel) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          model,
        },
      ],
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
      invalidatesTags: (_result, _error, result) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          result,
        },
      ],
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
    getOptionsForTrait: apiConfig.createQuery<any, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.TRAITS}/${id}${ApiUrlEnum.OPTIONS}`,
      }),
      providesTags: (result: TraitOptionModel[]) =>
        apiConfig.providesTags(result, ApiServiceNameEnum.PRODUCTS),
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
      invalidatesTags: (_result, _error, result) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          result,
        },
      ],
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
      invalidatesTags: (_result, _error, result) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          result,
        },
      ],
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
      invalidatesTags: (_result, _error, result) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          result,
        },
      ],
    }),
  }),
});

export const { endpoints, ...ProductsApiHooks } = ProductsApiService;
export default ProductsApiHooks;
