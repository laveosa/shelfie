import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { useNavigate } from "react-router-dom";

import { ProductsPageSliceActions as action } from "@/state/slices/ProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";
import useAppService from "@/useAppService.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { addGridRowColor } from "@/utils/helpers/quick-helper.ts";
import { GridRowsColorsEnum } from "@/const/enums/GridRowsColorsEnum.ts";

export default function useProductsPageService() {
  const appService = useAppService();
  const state = useAppSelector<IProductsPageSlice>(StoreSliceEnum.PRODUCTS);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [getTheProductsForGrid] =
    ProductsApiHooks.useGetTheProductsForGridMutation();
  const [getVariantsForGrid] = ProductsApiHooks.useGetVariantsForGridMutation();
  const [getBrandsForFilter] =
    ProductsApiHooks.useLazyGetBrandsForProductsFilterQuery();
  const [getCategoriesForFilter] =
    ProductsApiHooks.useLazyGetCategoriesForProductsFilterQuery();
  const [getCountersForProducts] =
    ProductsApiHooks.useLazyGetCountersForProductsQuery();
  const [getProductDetails] = ProductsApiHooks.useLazyGetProductDetailQuery();
  const [manageProduct] = ProductsApiHooks.useManageProductMutation();
  const [deleteProduct] = ProductsApiHooks.useDeleteProductMutation();
  const [toggleProductActivation] =
    ProductsApiHooks.useToggleProductActivationMutation();
  const [updateUserPreferences] =
    UsersApiHooks.useUpdateUserPreferencesMutation();
  const [resetUserPreferences] =
    UsersApiHooks.useResetUserPreferencesMutation();
  const [getSortingOptionsForGrid] =
    DictionaryApiHooks.useLazyGetSortingOptionsForGridQuery();
  const [getProductPhotos] = ProductsApiHooks.useLazyGetProductPhotosQuery();
  const [getProductVariants] =
    ProductsApiHooks.useLazyGetProductVariantsQuery();
  const [getTaxesList] = DictionaryApiHooks.useLazyGetTaxesListQuery();
  const [getCurrenciesList] =
    DictionaryApiHooks.useLazyGetCurrenciesListQuery();

  //-------------------------------------------------API

  function getTheProductsForGridHandler(
    data?: GridRequestModel,
    isForceRefresh?: boolean,
  ) {
    if (isForceRefresh) {
      dispatch(action.setIsLoading(true));
      dispatch(action.setIsProductsLoading(true));
      return getTheProductsForGrid(data).then((res: any) => {
        dispatch(action.setIsProductsLoading(false));
        dispatch(action.setIsLoading(false));
        if (res.error) {
          return;
        } else {
          return res.data;
        }
      });
    } else {
      if (state.products === null) {
        dispatch(action.setIsLoading(true));
        dispatch(action.setIsProductsLoading(true));
        return getTheProductsForGrid(data).then((res: any) => {
          dispatch(action.setIsLoading(false));
          dispatch(action.setIsProductsLoading(false));
          if (res.error) {
            return;
          } else {
            return res.data;
          }
        });
      }
    }
  }

  function getVariantsForGridHandler(data?: GridRequestModel) {
    dispatch(action.setIsLoading(true));
    return getVariantsForGrid(data).then((res: any) => {
      dispatch(action.setIsLoading(false));
      if (res.error) {
        return;
      } else {
        return res.data;
      }
    });
  }

  function getBrandsForFilterHandler() {
    dispatch(action.setIsLoading(true));
    return getBrandsForFilter(null).then((res: any) => {
      dispatch(action.setIsLoading(false));
      dispatch(action.refreshBrands(res.data));
      return res.data;
    });
  }

  function getCategoriesForFilterHandler() {
    dispatch(action.setIsLoading(true));
    return getCategoriesForFilter(null).then((res: any) => {
      dispatch(action.setIsLoading(false));
      dispatch(action.refreshCategories(res.data));
      return res.data;
    });
  }

  function getSortingOptionsForGridHandler() {
    dispatch(action.setIsLoading(true));
    return getSortingOptionsForGrid(null).then((res: any) => {
      dispatch(action.setIsLoading(false));
      dispatch(action.refreshSortingOptions(res.data));
      return res.data;
    });
  }

  function getCountersForProductsHandler(id: any) {
    return getCountersForProducts(id).then((res: any) => {
      return res.data;
    });
  }

  function getProductDetailsHandler(id) {
    return getProductDetails(id).then((res: any) => {
      return res.data;
    });
  }

  function manageProductHandler(model: ProductModel) {
    return manageProduct(model).then((res: any) => {
      console.log(res);
    });
  }

  function deleteProductHandler(id: number) {
    return deleteProduct(id).then((res: any) => {
      console.log(res);
    });
  }

  function toggleProductActivationHandler(productId) {
    return toggleProductActivation(productId).then((res: any) => {
      return res;
    });
  }

  function updateUserPreferencesHandler(model: PreferencesModel) {
    return updateUserPreferences(model).then(() => {
      appService.getUserPreferencesHandler();
    });
  }

  function resetUserPreferencesHandler() {
    return resetUserPreferences().then(() => {
      appService.getUserPreferencesHandler();
    });
  }

  function getProductPhotosHandler(id: number) {
    dispatch(action.setIsProductPhotosLoading(true));
    return getProductPhotos(id).then((res: any) => {
      dispatch(action.setIsProductPhotosLoading(false));
      return res.data;
    });
  }

  function getProductVariantsHandler(id: any) {
    dispatch(action.setIsProductVariantsLoading(true));
    return getProductVariants(id).then((res: any) => {
      dispatch(action.setIsProductVariantsLoading(false));
      const modifiedRes = {
        ...res,
        data: addGridRowColor(res.data, "color", [
          {
            field: "showAlert",
            value: true,
            color: GridRowsColorsEnum.ERROR,
          },
        ]),
      };

      return modifiedRes.data;
    });
  }

  function getTaxesListHandler() {
    return getTaxesList().then((res: any) => {
      return res.data;
    });
  }

  function getCurrenciesListHandler() {
    return getCurrenciesList().then((res: any) => {
      return res.data;
    });
  }

  //----------------------------------------------------LOGIC

  function itemCardHandler(item) {
    dispatch(action.resetProductCounter());
    dispatch(action.refreshProductPhotos([]));
    dispatch(action.resetProduct());
    dispatch(action.refreshProductVariants([]));
    navigate(
      `${ApiUrlEnum.PRODUCTS}${ApiUrlEnum.PRODUCT_BASIC_DATA}/${item.productId}`,
    );
  }

  return {
    getTheProductsForGridHandler,
    getVariantsForGridHandler,
    getBrandsForFilterHandler,
    getCategoriesForFilterHandler,
    getSortingOptionsForGridHandler,
    getCountersForProductsHandler,
    getProductDetailsHandler,
    manageProductHandler,
    deleteProductHandler,
    toggleProductActivationHandler,
    updateUserPreferencesHandler,
    resetUserPreferencesHandler,
    getProductPhotosHandler,
    getProductVariantsHandler,
    getTaxesListHandler,
    getCurrenciesListHandler,
    itemCardHandler,
  };
}
