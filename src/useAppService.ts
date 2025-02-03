import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { AppSliceActions as action } from "@/state/slices/AppSlice.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { UserModel } from "@/const/models/UserModel.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";

export default function useAppService() {
  const state = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const dispatch = useAppDispatch();

  const [getUserPreferences] = UsersApiHooks.useLazyGetUserPreferencesQuery();

  function getUserPreferencesHandler() {
    dispatch(action.setLoading(true));
    return getUserPreferences(null).then((res: any) => {
      dispatch(action.setLoading(false));
      dispatch(action.refreshPreferences(res.data));
    });
  }

  function refreshUser(model: UserModel) {
    dispatch(action.refreshUser(model));
  }

  function refreshToken(model) {
    dispatch(action.refreshToken(model));
  }

  function refreshPreferences(model) {
    dispatch(action.refreshPreferences(model));
  }

  function logOut() {
    dispatch(action.logOut());
  }

  return {
    ...state,
    getUserPreferencesHandler,
    refreshUser,
    refreshToken,
    logOut,
  };
}
