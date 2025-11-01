import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { AppSliceActions as action } from "@/state/slices/AppSlice.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";
import AuthApiHooks from "@/utils/services/api/AuthApiService.ts";

export default function useAppService() {
  const state = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const dispatch = useAppDispatch();

  const [getUserPreferences] = UsersApiHooks.useLazyGetUserPreferencesQuery();
  const [getUserDetails] = UsersApiHooks.useLazyGetUserDetailsQuery();
  const [getUserOrganizations] =
    UsersApiHooks.useLazyGetUserOrganizationsQuery();
  const [switchUserOrganization] =
    AuthApiHooks.useSwitchUserOrganizationMutation();

  function getUserPreferencesHandler() {
    dispatch(action.setLoading(true));
    return getUserPreferences(null).then((res: any) => {
      console.log("PREFERENCES: ", res.data);

      dispatch(action.setLoading(false));
      dispatch(action.refreshPreferences(res.data));
    });
  }

  function getUserDetailsHandler() {
    dispatch(action.setIsUserMenuLoading(true));
    getUserDetails().then((res) => {
      console.log("DETAILS: ", res.data);

      dispatch(action.setIsUserMenuLoading(false));
      dispatch(action.refreshUser(res.data));
    });
  }

  function getUserOrganizationsHandler() {
    getUserOrganizations().then((res: any) => {
      console.log("ORGANIZATIONS: ", res.data);

      dispatch(action.refreshUserOrganizations(res.data));
    });
  }

  function switchUserOrganizationHandler(id: number) {
    switchUserOrganization({ organizationId: id }).then((model: any) => {
      if (model.data?.token) {
        refreshToken(model.data.token);
      }
    });
  }

  function refreshToken(model) {
    dispatch(action.refreshToken(model));
  }

  function refreshPreferences(model) {
    dispatch(action.refreshPreferences(model));
    return model;
  }

  function logOut() {
    dispatch(action.logOut());
  }

  return {
    ...state,
    getUserPreferencesHandler,
    getUserDetailsHandler,
    getUserOrganizationsHandler,
    switchUserOrganizationHandler,
    refreshPreferences,
    refreshToken,
    logOut,
  };
}
