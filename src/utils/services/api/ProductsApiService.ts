import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { ProductCategoryModel } from "@/const/models/ProductCategoryModel.ts";
import { ProductCodeModel } from "@/const/models/ProductCodeModel.ts";

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
    getProductById: apiConfig.createQuery<ProductModel, number>(builder, {
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
        url: `${ApiUrlEnum.PRODUCTS}/${model.id}`,
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
      invalidatesTags: (_result, _error, model) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          model,
        },
      ],
    }),
    getBrandsForProductsFilter: apiConfig.createQuery<BrandModel[], void>(
      builder,
      {
        query: () => ({
          url: `${ApiUrlEnum.BRANDS}/for-filter`,
        }),
        providesTags: (result: BrandModel[]) =>
          apiConfig.providesTags(result, ApiServiceNameEnum.PRODUCTS),
      },
    ),
    getCategoriesForProductsFilter: apiConfig.createQuery<
      ProductCategoryModel[],
      void
    >(builder, {
      query: () => ({
        url: `${ApiUrlEnum.PRODUCT_CATEGORIES}/for-filter`,
      }),
      providesTags: (result: ProductCategoryModel[]) =>
        apiConfig.providesTags(result, ApiServiceNameEnum.PRODUCTS),
    }),
    generateProductCode: apiConfig.createQuery<any, void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCTS}/generate-code`,
      }),
      // providesTags: (result: any) =>
      //   apiConfig.providesTags(result, ApiServiceNameEnum.PRODUCTS),
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
          url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCTS}/check-code`,
          method: "POST",
          body: JSON.stringify(code),
        }),
        invalidatesTags: (_result, _error, code) => [
          {
            type: ApiServiceNameEnum.PRODUCTS,
            code,
          },
        ],
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
  }),
});

export const { endpoints, ...ProductsApiHooks } = ProductsApiService;
export default ProductsApiHooks;
