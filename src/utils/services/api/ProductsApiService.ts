import { createApi } from "@reduxjs/toolkit/query/react";

import { ProductsController as controller } from "db/controllers/products-controller.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { ProductCodeModel } from "@/const/models/ProductCodeModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.PRODUCTS_BASE_URL);
type ControllerType = typeof controller;

export const ProductsApiService = createApi({
  reducerPath: ApiServiceNameEnum.PRODUCTS,
  baseQuery: async () => ({ data: undefined }),
  // baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.PRODUCTS],
  endpoints: (builder) => ({
    getAllProducts: builder.query<GridRequestModel, void>(
      apiConfig.getStaticData<ControllerType>("getAllProducts", controller),
    ),
    getProductDetail: builder.query<ProductModel, number>(
      apiConfig.getStaticData<ControllerType>("getProductDetail", controller),
    ),
    updateProduct: builder.mutation<void, any>(
      apiConfig.getStaticData<ControllerType>("updateProduct", controller),
    ),
    toggleProductActivation: builder.mutation<void, any>(
      apiConfig.getStaticData<ControllerType>(
        "toggleProductActivation",
        controller,
      ),
    ),
    deleteProduct: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>("deleteProduct", controller),
    ),
    getTheProductsForGrid: builder.mutation<GridRequestModel, GridRequestModel>(
      apiConfig.getStaticData<ControllerType>(
        "getTheProductsForGrid",
        controller,
      ),
    ),
    getBrandsForProductsFilter: builder.query<BrandModel[], void>(
      apiConfig.getStaticData<ControllerType>(
        "getBrandsForProductsFilter",
        controller,
      ),
    ),
    getCategoriesForProductsFilter: builder.query<CategoryModel[], void>(
      apiConfig.getStaticData<ControllerType>(
        "getCategoriesForProductsFilter",
        controller,
      ),
    ),
    generateProductCode: builder.query<string, void>(
      apiConfig.getStaticData<ControllerType>(
        "generateProductCode",
        controller,
      ),
    ),
    getSimpleListOfAllBrands: builder.query<BrandModel[], void>(
      apiConfig.getStaticData<ControllerType>(
        "getSimpleListOfAllBrands",
        controller,
      ),
    ),
    getAllCategoriesByOrganization: builder.query<any, void>(
      apiConfig.getStaticData<ControllerType>(
        "getAllCategoriesByOrganization",
        controller,
      ),
    ),
    checkProductCode: builder.mutation<void, ProductCodeModel>(
      apiConfig.getStaticData<ControllerType>("checkProductCode", controller),
    ),
    checkBrandName: builder.mutation<void, BrandModel>(
      apiConfig.getStaticData<ControllerType>("checkBrandName", controller),
    ),
    checkCategoryName: builder.mutation<void, CategoryModel>(
      apiConfig.getStaticData<ControllerType>("checkCategoryName", controller),
    ),
    createNewProduct: builder.mutation<void, ProductModel>(
      apiConfig.getStaticData<ControllerType>("createNewProduct", controller),
    ),
    createNewCategory: builder.mutation<void, CategoryModel>(
      apiConfig.getStaticData<ControllerType>("createNewCategory", controller),
    ),
    createBrand: builder.mutation<void, BrandModel>(
      apiConfig.getStaticData<ControllerType>("createBrand", controller),
    ),
    uploadPhoto: builder.mutation<void, any>(
      apiConfig.getStaticData<ControllerType>("uploadPhoto", controller),
    ),
    getCountersForProducts: builder.query<ProductCountersModel, number>(
      apiConfig.getStaticData<ControllerType>(
        "getCountersForProducts",
        controller,
      ),
    ),
    getProductPhotos: builder.query<any, number>(
      apiConfig.getStaticData<ControllerType>("getProductPhotos", controller),
    ),
    getProductPhotosForVariant: builder.query<any, any>(
      apiConfig.getStaticData<ControllerType>(
        "getProductPhotosForVariant",
        controller,
      ),
    ),
    putPhotoInNewPosition: builder.mutation<void, any>(
      apiConfig.getStaticData<ControllerType>(
        "putPhotoInNewPosition",
        controller,
      ),
    ),
    detachVariantPhoto: builder.mutation<
      any,
      {
        id?: number;
        photoId?: number;
      }
    >(
      apiConfig.getStaticData<ControllerType>("detachVariantPhoto", controller),
    ),
    getVariantsForGrid: builder.mutation<GridRequestModel, GridRequestModel>(
      apiConfig.getStaticData<ControllerType>("getVariantsForGrid", controller),
    ),
    getProductVariants: builder.query<VariantModel[], number>(
      apiConfig.getStaticData<ControllerType>("getProductVariants", controller),
    ),
    createVariant: builder.mutation<
      any,
      {
        id: number;
        model: number[];
      }
    >(apiConfig.getStaticData<ControllerType>("createVariant", controller)),
    checkVariantCombination: builder.mutation<
      any,
      {
        id: number;
        model: number[];
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "checkVariantCombination",
        controller,
      ),
    ),
    getVariantDetails: builder.query<VariantModel, number>(
      apiConfig.getStaticData<ControllerType>("getVariantDetails", controller),
    ),
    toggleVariantIsActive: builder.mutation<any, number>(
      apiConfig.getStaticData<ControllerType>(
        "toggleVariantIsActive",
        controller,
      ),
    ),
    updateVariantDetails: builder.mutation<
      any,
      {
        id?: number;
        model?: any;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "updateVariantDetails",
        controller,
      ),
    ),
    updateVariantTraitOptions: builder.mutation<
      any,
      {
        id?: number;
        model?: any;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "updateVariantTraitOptions",
        controller,
      ),
    ),
    increaseStockAmountForVariant: builder.mutation<
      any,
      {
        id: number;
        model: any;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "increaseStockAmountForVariant",
        controller,
      ),
    ),
    disposeVariantFromStock: builder.mutation<
      any,
      {
        id: number;
        model: any;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "disposeVariantFromStock",
        controller,
      ),
    ),
    getVariantStockHistory: builder.query<any, number>(
      apiConfig.getStaticData<ControllerType>(
        "getVariantStockHistory",
        controller,
      ),
    ),
    changeVariantPosition: builder.mutation<
      any,
      {
        productId?: number;
        variantId?: number;
        index?: number;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "changeVariantPosition",
        controller,
      ),
    ),
    changePhotoPositionForVariant: builder.mutation<
      any,
      {
        id?: number;
        photoId?: number;
        index?: number;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "changePhotoPositionForVariant",
        controller,
      ),
    ),
    attachProductPhotoToVariant: builder.mutation<
      any,
      {
        variantId?: number;
        photoId?: number;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "attachProductPhotoToVariant",
        controller,
      ),
    ),
    getListOfAllTraits: builder.query<any, void>(
      apiConfig.getStaticData<ControllerType>("getListOfAllTraits", controller),
    ),
    getListOfTraitsForProduct: builder.query<any, number>(
      apiConfig.getStaticData<ControllerType>(
        "getListOfTraitsForProduct",
        controller,
      ),
    ),
    getListOfTraitsWithOptionsForProduct: builder.query<any, number>(
      apiConfig.getStaticData<ControllerType>(
        "getListOfTraitsWithOptionsForProduct",
        controller,
      ),
    ),
    getTrait: builder.query<any, number>(
      apiConfig.getStaticData<ControllerType>("getTrait", controller),
    ),
    createNewTrait: builder.query<any, TraitModel>(
      apiConfig.getStaticData<ControllerType>("createNewTrait", controller),
    ),
    updateTrait: builder.query<
      any,
      {
        id?: number;
        model?: TraitModel;
      }
    >(apiConfig.getStaticData<ControllerType>("updateTrait", controller)),
    setProductTraits: builder.mutation<
      any,
      {
        id?: number;
        model?: TraitModel;
      }
    >(apiConfig.getStaticData<ControllerType>("setProductTraits", controller)),
    deleteTrait: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>("deleteTrait", controller),
    ),
    getOptionsForTrait: builder.query<any, number>(
      apiConfig.getStaticData<ControllerType>("getOptionsForTrait", controller),
    ),
    createNewOptionForTrait: builder.mutation<
      any,
      {
        id?: number;
        model?: TraitOptionModel;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "createNewOptionForTrait",
        controller,
      ),
    ),
    updateOptionOfTrait: builder.mutation<
      any,
      {
        id?: number;
        model?: TraitOptionModel;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "updateOptionOfTrait",
        controller,
      ),
    ),
    deleteOptionOfTrait: builder.mutation<
      any,
      {
        id?: number;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "deleteOptionOfTrait",
        controller,
      ),
    ),
    changePositionOfTraitOption: builder.mutation<
      any,
      {
        traitId?: number;
        optionId?: number;
        index?: number;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "changePositionOfTraitOption",
        controller,
      ),
    ),
    getTraitsForFilter: builder.query<any, void>(
      apiConfig.getStaticData<ControllerType>("getTraitsForFilter", controller),
    ),
    deleteVariant: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>("deleteVariant", controller),
    ),
    updateBrandOwner: builder.mutation<
      any,
      { brandId: number; model: CompanyModel }
    >(apiConfig.getStaticData<ControllerType>("updateBrandOwner", controller)),
    // ============================================================= EXAMPLE QUERY
    /*getProductDetail: apiConfig.createQuery<ProductModel, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.PRODUCTS}/${id}`,
      }),
    }),*/
    // ============================================================= EXAMPLE MUTATION
    /*updateProduct: apiConfig.createMutation<void, any>(builder, {
      query: ({ productId, model }) => ({
        url: `${ApiUrlEnum.PRODUCTS_BASE_URL}${ApiUrlEnum.PRODUCTS}/${productId}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),*/
  }),
});

export const { endpoints, ...ProductsApiHooks } = ProductsApiService;
export default ProductsApiHooks;
