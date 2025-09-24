import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { merge } from "lodash";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { useToast } from "@/hooks/useToast.ts";
import OrdersApiHooks, {
  OrdersApiService as api,
} from "@/utils/services/api/OrdersApiService.ts";
import { IShipmentsPageSlice } from "@/const/interfaces/store-slices/IShipmentsPageSlice.ts";
import { ShipmentsPageSliceActions as actions } from "@/state/slices/ShipmentsPageSlice.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";
import useAppService from "@/useAppService.ts";

export default function useShipmentsPageService() {
  const state = useSelector(
    (state: RootState): IShipmentsPageSlice => state[StoreSliceEnum.SHIPMENTS],
  );
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const appService = useAppService();
  const dispatch = useDispatch<AppDispatch>();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [getShipmentsListForForGrid] =
    OrdersApiHooks.useGetShipmentsListForForGridMutation();
  const [createShipment] = OrdersApiHooks.useCreateShipmentMutation();
  const [updateUserPreferences] =
    UsersApiHooks.useUpdateUserPreferencesMutation();
  const [resetUserPreferences] =
    UsersApiHooks.useResetUserPreferencesMutation();
  const [getCustomersForGrid] = api.useGetCustomersForGridMutation();

  function getShipmentsListForForGridHandler(model) {
    dispatch(actions.setIsShipmentsGridLoading(true));
    return getShipmentsListForForGrid(model).then((res: any) => {
      dispatch(actions.setIsShipmentsGridLoading(false));
      dispatch(actions.refreshShipmentsGridRequestModel(res.data));
      return res;
    });
  }

  function getListOfCustomersHandler() {
    return getCustomersForGrid({}).then((res: any) => {
      dispatch(actions.refreshCustomersList(res.data.items));
      return res.data;
    });
  }

  function handleGridRequestChange(updates: GridRequestModel) {
    getShipmentsListForForGridHandler(updates);
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

  function createShipmentHandler() {
    dispatch(actions.setIsShipmentsCardLoading(true));
    return createShipment().then((res: any) => {
      dispatch(actions.setIsShipmentsCardLoading(false));
      dispatch(actions.refreshSelectedShipment(res.data));
      navigate(
        `${NavUrlEnum.SALES}${NavUrlEnum.SHIPMENTS}${NavUrlEnum.SHIPMENT_DETAILS}/${res.data.shipmentId}`,
      );
      return res.data;
    });
  }

  function manageShipmentHandler(shipment) {
    navigate(
      `${NavUrlEnum.SALES}${NavUrlEnum.SHIPMENTS}${NavUrlEnum.SHIPMENT_DETAILS}/${shipment.shipmentId}`,
    );
  }

  return {
    getShipmentsListForForGridHandler,
    createShipmentHandler,
    manageShipmentHandler,
    handleGridRequestChange,
    updateUserPreferencesHandler,
    resetUserPreferencesHandler,
    getListOfCustomersHandler,
  };
}
