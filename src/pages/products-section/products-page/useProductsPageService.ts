import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { ProductsPageSliceActions as action } from "@/state/slices/ProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";

export default function useProductsPageService() {
  const {
    useLazyGetAllProductsQuery,
    useManageProductMutation,
    useDeleteProductMutation,
  } = ProductsApiHooks;
  const {
    useLazyGetUserPreferencesQuery,
    useLazyGetDefaultUserPreferencesQuery,
    useUpdateUserPreferencesMutation,
    useResetUserPreferencesMutation,
  } = UsersApiHooks;
  const state = useAppSelector<IProductsPageSlice>(StoreSliceEnum.PRODUCTS);
  const dispatch = useAppDispatch();
  const [getAllProducts] = useLazyGetAllProductsQuery();
  const [manageProduct] = useManageProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [getUserPreferences] = useLazyGetUserPreferencesQuery();
  const [updateUserPreferences] = useUpdateUserPreferencesMutation();
  const [resetUserPreferences] = useResetUserPreferencesMutation();
  const [getDefaultUserPreferences] = useLazyGetDefaultUserPreferencesQuery();

  function getAllProductsHandler() {
    dispatch(action.setLoading(true));
    return getAllProducts(null).then((res: any) => {
      dispatch(action.setLoading(false));
      dispatch(action.setProducts(res.data));
      return res.data;
    });
  }

  function getUserPreferencesHandler() {
    dispatch(action.setLoading(true));
    return getUserPreferences(null).then((res: any) => {
      dispatch(action.setLoading(false));
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

  return {
    ...state,
    getAllProductsHandler,
    getUserPreferencesHandler,
    manageProductHandler,
    deleteProductHandler,
    updateUserPreferencesHandler,
    resetUserPreferencesHandler,
    getDefaultUserPreferencesHandler,
  };
}
