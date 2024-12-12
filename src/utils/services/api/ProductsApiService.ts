import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { ApiConfigurationService as apiConfig } from "@/utils/services/api/ApiConfigurationService.ts";

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

    getProductById: builder.query<ProductModel, number>({
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
    manageProduct: builder.mutation<void, ProductModel>({
      query: (product: ProductModel) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${product.id}`,
        method: "PUT",
        body: JSON.stringify(product),
      }),
      invalidatesTags: (result) => [
        {
          type: ApiServiceNameEnum.PRODUCTS,
          result,
        },
      ],
    }),
    deleteProduct: builder.mutation<void, number>({
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
  }),
});

export const { endpoints, ...ProductsApiHooks } = ProductsApiService;
export default ProductsApiHooks;
