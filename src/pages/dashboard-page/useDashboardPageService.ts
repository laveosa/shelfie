import { useSelector } from "react-redux";
import { useState } from "react";
import { merge } from "lodash";

import { RootState } from "@/state/store.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IDashboardPageSlice } from "@/const/interfaces/store-slices/IDashboardPageSlice.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import useAppService from "@/useAppService.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";
import { DashboardPageSliceActions as actions } from "@/state/slices/DashboardPageSlice.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import OrdersApiHooks from "@/utils/services/api/OrdersApiService.ts";

export default function useDashboardPageService() {
  const state = useSelector(
    (state: RootState): IDashboardPageSlice => state[StoreSliceEnum.DASHBOARD],
  );
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const appService = useAppService();
  const dispatch = useAppDispatch();
  const [statistic, setStatistic] = useState(null);

  const [getBrandsForFilter] =
    ProductsApiHooks.useLazyGetBrandsForProductsFilterQuery();
  const [getCategoriesForFilter] =
    ProductsApiHooks.useLazyGetCategoriesForProductsFilterQuery();
  const [updateUserPreferences] =
    UsersApiHooks.useUpdateUserPreferencesMutation();
  const [resetUserPreferences] =
    UsersApiHooks.useResetUserPreferencesMutation();
  const [getListOfCustomersForGrid] =
    OrdersApiHooks.useGetListOfCustomersForGridMutation();

  function getBrandsForFilterHandler() {
    return getBrandsForFilter(null).then((res: any) => {
      dispatch(actions.refreshBrands(res.data));
      return res.data;
    });
  }

  function getCategoriesForFilterHandler() {
    return getCategoriesForFilter(null).then((res: any) => {
      dispatch(actions.refreshCategories(res.data));
      return res.data;
    });
  }

  function getCustomersForFilterHandler() {
    return getListOfCustomersForGrid({}).then((res: any) => {
      dispatch(actions.refreshCustomers(res.data.items));
    });
  }

  function updateUserPreferencesHandler(model: PreferencesModel) {
    const modifiedModel = merge({}, appState.preferences, model);
    return updateUserPreferences(modifiedModel).then(() => {
      appService.getUserPreferencesHandler();
    });
  }

  function resetUserPreferencesHandler(grid) {
    return resetUserPreferences(grid).then(() => {
      appService.getUserPreferencesHandler();
    });
  }

  return {
    state,
    appState,
    statistic,
    setStatistic,
    getBrandsForFilterHandler,
    getCategoriesForFilterHandler,
    getCustomersForFilterHandler,
    updateUserPreferencesHandler,
    resetUserPreferencesHandler,
  };
}
