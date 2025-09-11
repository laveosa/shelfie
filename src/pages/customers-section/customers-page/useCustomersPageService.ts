import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import _, { merge } from "lodash";

import { AppDispatch } from "@/state/store.ts";
import { OrdersApiService as api } from "@/utils/services/api/OrdersApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel";
import { CustomersPageSliceActions as actions } from "@/state/slices/CustomersPageSlice";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum";
import UsersApiHooks from "@/utils/services/api/UsersApiService";
import {
  PreferencesModel,
  PreferencesModelDefault,
} from "@/const/models/PreferencesModel";
import { createCustomerCounter } from "@/const/models/CustomerCounterModel";
import { AppSliceActions as appActions } from "@/state/slices/AppSlice";
import { DEFAULT_SORTING_OPTIONS } from "@/const/models/GridSortingModel";
import { useAppSelector } from "@/utils/hooks/redux";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum";
import { ICustomersPageSlice } from "@/const/interfaces/store-slices/ICustomersPageSlice";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice";

export default function useCustomersPageService() {
  const state = useAppSelector<ICustomersPageSlice>(StoreSliceEnum.CUSTOMERS);
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [getCustomersForGrid] = api.useGetCustomersForGridMutation();
  const [updateUserPreferences] =
    UsersApiHooks.useUpdateUserPreferencesMutation();
  const [resetUserPreferences] =
    UsersApiHooks.useResetUserPreferencesMutation();

  function getCustomersForGridHandler(data?: GridRequestModel) {
    if (!data && state.customersGridRequestModel.items.length > 0) return;
    if (_.isEqual(data, state.customersGridRequestModel)) return;
    data = data ?? state.customersGridRequestModel;

    dispatch(actions.setIsCustomersLoading(true));

    return getCustomersForGrid(data).then((res: any) => {
      dispatch(actions.setIsCustomersLoading(false));

      if (!res.error) {
        dispatch(actions.refreshCustomersGridRequestModel(res.data));
        dispatch(actions.refreshCustomers(res.data.items));
      }
      return res;
    });
  }

  function onManageCustomerHandler(rowData: any) {
    dispatch(actions.refreshSelectedCustomer(rowData));
    dispatch(actions.refreshCustomerCounter(createCustomerCounter()));
    dispatch(actions.refreshCustomerAddresses(null));
    dispatch(
      actions.refreshCustomerAddressesGridRequestModel({
        pager: {},
        items: [],
      }),
    );
    navigate(`${NavUrlEnum.CUSTOMER_BASIC_DATA}/${rowData.id}`);
  }

  function onCreateCustomerHandler() {
    dispatch(actions.refreshCustomerCounter(createCustomerCounter()));
    dispatch(actions.resetSelectedCustomer());
    navigate(`${NavUrlEnum.CUSTOMER_BASIC_DATA}`);
  }

  function setDefaultSortingOptionsHandler() {
    dispatch(actions.refreshSortingOptions(DEFAULT_SORTING_OPTIONS));
  }

  function updateUserPreferencesHandler(model: PreferencesModel) {
    const modifiedModel = merge({}, appState.preferences, model);
    dispatch(appActions.refreshPreferences(modifiedModel));

    return updateUserPreferences(model);
  }

  function resetUserPreferencesHandler(grid) {
    const resetModel = merge({}, appState.preferences, {
      viewsReferences: {
        customerReferences:
          PreferencesModelDefault.viewsReferences.customerReferences,
      },
    });
    dispatch(appActions.refreshPreferences(resetModel));
    return resetUserPreferences(grid).catch((error) => {
      console.error("Failed to reset preferences on server:", error);
    });
  }

  return {
    appState,
    state,
    getCustomersForGridHandler,
    onManageCustomerHandler,
    onCreateCustomerHandler,
    updateUserPreferencesHandler,
    resetUserPreferencesHandler,
    setDefaultSortingOptionsHandler,
  };
}
