import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { merge } from "lodash";

import {
  PreferencesModel,
  PreferencesModelDefault,
} from "@/const/models/PreferencesModel";
import { AppDispatch } from "@/state/store.ts";
import { OrdersApiService as api } from "@/utils/services/api/OrdersApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel";
import { CustomersPageSliceActions as actions } from "@/state/slices/CustomersPageSlice";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum";
import UsersApiHooks from "@/utils/services/api/UsersApiService";
import { createCustomerCounter } from "@/const/models/CustomerCounterModel";
import { AppSliceActions as appActions } from "@/state/slices/AppSlice";
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
    // if (_.isEqual(data, state.customersGridRequestModel)) return;

    dispatch(actions.setIsCustomersLoading(true));

    return getCustomersForGrid(data).then((res: any) => {
      dispatch(actions.setIsCustomersLoading(false));

      if (!res.error) {
        dispatch(actions.refreshCustomersGridRequestModel(res.data));
        dispatch(actions.refreshCustomers(res.data.items));
      }
    });
  }

  function onManageCustomerHandler(rowData: any) {
    dispatch(actions.refreshSelectedCustomer(rowData));
    dispatch(actions.refreshCustomerCounter(createCustomerCounter()));
    dispatch(actions.refreshCustomerAddresses(null));
    dispatch(actions.refreshCustomerAddressesGridRequestModel({}));
    navigate(`${NavUrlEnum.CUSTOMER_BASIC_DATA}/${rowData.id}`);
  }

  function onCreateCustomerHandler() {
    dispatch(actions.refreshCustomerCounter(createCustomerCounter()));
    dispatch(actions.resetSelectedCustomer());
    navigate(`${NavUrlEnum.CUSTOMER_BASIC_DATA}`);
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
    state,
    appState,
    getCustomersForGridHandler,
    onManageCustomerHandler,
    onCreateCustomerHandler,
    updateUserPreferencesHandler,
    resetUserPreferencesHandler,
  };
}
