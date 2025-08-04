import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";
import { OrdersPageSliceActions as actions } from "@/state/slices/OrdersPageSlice.ts";
import OrderApiHooks from "@/utils/services/api/OrderApiService.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import useAppService from "@/useAppService.ts";

export default function useOrdersPageService() {
  const appService = useAppService();
  const state = useSelector(
    (state: RootState): IOrdersPageSlice => state[StoreSliceEnum.ORDERS],
  );
  const dispatch = useDispatch<AppDispatch>();

  const [getSortingOptionsForGrid] =
    DictionaryApiHooks.useLazyGetSortingOptionsForGridQuery();
  const [getListOfOrdersForGrid] =
    OrderApiHooks.useGetListOfOrdersForGridMutation();
  const [updateUserPreferences] =
    UsersApiHooks.useUpdateUserPreferencesMutation();
  const [resetUserPreferences] =
    UsersApiHooks.useResetUserPreferencesMutation();
  const [createOrder] = OrderApiHooks.useCreateOrderMutation();

  function getSortingOptionsForGridHandler() {
    return getSortingOptionsForGrid(null).then((res: any) => {
      dispatch(actions.refreshSortingOptions(res.data));
      return res.data;
    });
  }

  function getListOfOrdersForGridHandler(model) {
    dispatch(actions.setIsOrdersGridLoading(true));
    return getListOfOrdersForGrid(model).then((res: any) => {
      dispatch(actions.setIsOrdersGridLoading(false));
      dispatch(actions.refreshOrdersGridModel(res.data));
      return res.data;
    });
  }

  function updateUserPreferencesHandler(model: PreferencesModel) {
    return updateUserPreferences(model).then(() => {
      appService.getUserPreferencesHandler();
    });
  }

  function resetUserPreferencesHandler(grid) {
    return resetUserPreferences(grid).then(() => {
      appService.getUserPreferencesHandler();
    });
  }

  function createOrderHandler() {
    return createOrder().then((res) => {
      dispatch(actions.refreshSelectedOrder(res.data));
      return res.data;
    });
  }

  return {
    getSortingOptionsForGridHandler,
    getListOfOrdersForGridHandler,
    updateUserPreferencesHandler,
    resetUserPreferencesHandler,
    createOrderHandler,
  };
}
