import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";

export const ProductsApiService = createApi({
  reducerPath: ApiServiceNameEnum.PRODUCTS,
  baseQuery: fetchBaseQuery({ baseUrl: ApiUrlEnum.BASE_URL }),
  tagTypes: [ApiServiceNameEnum.PRODUCTS],
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductModel[], void>({
      query: () => ({
        url: ApiUrlEnum.PRODUCTS,
      }),
    }),
    getProductById: builder.query<ProductModel, number>({
      query: (id: number) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${id}`,
      }),
    }),
    manageProduct: builder.mutation<void, ProductModel>({
      query: (product: ProductModel) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${product.id}`,
        method: "PUT",
        body: JSON.stringify(product),
      }),
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useManageProductMutation,
  useDeleteProductMutation,
} = ProductsApiService;
