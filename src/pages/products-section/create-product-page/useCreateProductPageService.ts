import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ProductsPageSliceActions as action } from "@/state/slices/ProductsPageSlice.ts";

export default function useCreateProductPageService() {
  const state = useAppSelector<IProductsPageSlice>(StoreSliceEnum.PRODUCTS);
  const dispatch = useAppDispatch();
  const [getAllProducts] = ProductsApiHooks.useLazyGetAllProductsQuery();
  const [generateProductCode] =
    ProductsApiHooks.useLazyGenerateProductCodeQuery();
  const [getSimpleListOfAllBrands] =
    ProductsApiHooks.useLazyGetSimpleListOfAllBrandsQuery();
  const [getAllCategoriesByOrganization] =
    ProductsApiHooks.useLazyGetAllCategoriesByOrganizationQuery();
  const [checkProductCode] = ProductsApiHooks.useCheckProductCodeMutation();
  const [createNewProduct] = ProductsApiHooks.useCreateNewProductMutation();

  function getAllProductsHandler() {
    dispatch(action.setLoading(true));
    return getAllProducts(null).then((res: any) => {
      dispatch(action.setLoading(false));
      dispatch(action.setProducts(res.data));
      return res.data;
    });
  }

  function generateProductCodeHandler() {
    return generateProductCode(null).then((res: any) => {
      return res.data;
    });
  }

  function getSimpleListOfAllBrandsHandler() {
    return getSimpleListOfAllBrands(null).then((res: any) => {
      return res.data;
    });
  }

  function getAllCategoriesByOrganizationHandler() {
    return getAllCategoriesByOrganization(null).then((res: any) => {
      return res.data;
    });
  }

  function checkProductCodeHandler(code) {
    return checkProductCode(code).then((res: any) => {
      return res.data;
    });
  }

  function createNewProductHandler() {
    return createNewProduct(null).then((res: any) => {
      return res.data;
    });
  }

  return {
    ...state,
    getAllProductsHandler,
    generateProductCodeHandler,
    getSimpleListOfAllBrandsHandler,
    getAllCategoriesByOrganizationHandler,
    checkProductCodeHandler,
    createNewProductHandler,
  };
}
