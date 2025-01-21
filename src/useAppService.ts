import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { AppSliceActions as action } from "@/state/slices/AppSlice.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { UserModel } from "@/const/models/UserModel.ts";
import { IAppService } from "@/const/interfaces/IAppService.ts";

export default function useAppService() {
  const state = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const dispatch = useAppDispatch();

  function refreshUser(model: UserModel) {
    dispatch(action.refreshUser(model));
  }

  function refreshToken(model) {
    dispatch(action.refreshToken(model));
  }

  function logOut() {
    dispatch(action.logOut());
  }

  return { ...state, refreshUser, refreshToken, logOut } as IAppService;
}
