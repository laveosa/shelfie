import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { useAppDispatch } from "@/utils/hooks/redux.ts";
import { ProductsPageSliceActions as action } from "@/state/slices/ProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";
import useAppService from "@/useAppService.ts";

export default function useProductsPageService() {
  const appService = useAppService();
  const dispatch = useAppDispatch();
  const [getTheProductsForGrid] =
    ProductsApiHooks.useGetTheProductsForGridMutation();
  const [getBrandsForFilter] =
    ProductsApiHooks.useLazyGetBrandsForProductsFilterQuery();
  const [getCategoriesForFilter] =
    ProductsApiHooks.useLazyGetCategoriesForProductsFilterQuery();
  const [manageProduct] = ProductsApiHooks.useManageProductMutation();
  const [deleteProduct] = ProductsApiHooks.useDeleteProductMutation();
  const [updateUserPreferences] =
    UsersApiHooks.useUpdateUserPreferencesMutation();
  const [resetUserPreferences] =
    UsersApiHooks.useResetUserPreferencesMutation();
  const [getSortingOptionsForGrid] =
    DictionaryApiHooks.useLazyGetSortingOptionsForGridQuery();

  function getTheProductsForGridHandler(data?: GridRequestModel) {
    dispatch(action.setLoading(true));
    return getTheProductsForGrid(data).then((res: any) => {
      dispatch(action.setLoading(false));
      if (res.error) {
        console.error(res.error);
        return;
      } else {
        return res.data;
      }
    });
  }

  function getBrandsForFilterHandler() {
    dispatch(action.setLoading(true));
    return getBrandsForFilter(null).then((res: any) => {
      dispatch(action.setLoading(false));
      dispatch(action.refreshBrands(res.data));
      return res.data;
    });
  }

  function getCategoriesForFilterHandler() {
    dispatch(action.setLoading(true));
    return getCategoriesForFilter(null).then((res: any) => {
      dispatch(action.setLoading(false));
      dispatch(action.refreshCategories(res.data));
      return res.data;
    });
  }

  function getSortingOptionsForGridHandler() {
    dispatch(action.setLoading(true));
    return getSortingOptionsForGrid(null).then((res: any) => {
      dispatch(action.setLoading(false));
      dispatch(action.refreshSortingOptions(res.data));
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

  return {
    getTheProductsForGridHandler,
    getBrandsForFilterHandler,
    getCategoriesForFilterHandler,
    getSortingOptionsForGridHandler,
    manageProductHandler,
    deleteProductHandler,
    updateUserPreferencesHandler,
    resetUserPreferencesHandler,
  };
}
