import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { ProductsPageSliceActions as action } from "@/state/slices/ProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";

export default function useProductsPageService() {
  const state = useAppSelector<IProductsPageSlice>(StoreSliceEnum.PRODUCTS);
  const dispatch = useAppDispatch();
  const [getAllProducts] = ProductsApiHooks.useLazyGetAllProductsQuery();
  const [manageProduct] = ProductsApiHooks.useManageProductMutation();
  const [deleteProduct] = ProductsApiHooks.useDeleteProductMutation();

  const [updateUserPreferences] =
    UsersApiHooks.useUpdateUserPreferencesMutation();
  const [resetUserPreferences] =
    UsersApiHooks.useResetUserPreferencesMutation();
  const [getDefaultUserPreferences] =
    UsersApiHooks.useLazyGetDefaultUserPreferencesQuery();

  function getAllProductsHandler() {
    dispatch(action.setLoading(true));
    return getAllProducts(null).then((res: any) => {
      dispatch(action.setLoading(false));
      dispatch(action.refreshProducts(res.data));
      return res.data;
    });
  }

  function getDefaultUserPreferencesHandler() {
    dispatch(action.setLoading(true));
    return getDefaultUserPreferences(null).then((res: any) => {
      dispatch(action.setLoading(false));
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
    return updateUserPreferences(model).then((res: any) => {
      console.log(res);
    });
  }

  function resetUserPreferencesHandler() {
    return resetUserPreferences().then((res: any) => {
      console.log(res);
    });
  }

  function refreshColumnsPreferencesHandler(columnsPreferences: any) {
    dispatch(action.refreshColumnsPreferences(columnsPreferences));
  }

  return {
    ...state,
    getAllProductsHandler,
    manageProductHandler,
    deleteProductHandler,
    updateUserPreferencesHandler,
    resetUserPreferencesHandler,
    getDefaultUserPreferencesHandler,
    refreshColumnsPreferencesHandler,
  };
}
