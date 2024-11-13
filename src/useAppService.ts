import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { AppSliceActions } from "@/state/slices/AppSlice.ts";

export default function useAppService() {
  const state = useSelector(
    (state: RootState): IAppSlice => state[StoreSliceEnum.APP],
  );
  const dispatch = useDispatch<AppDispatch>();

  function refreshUser(model) {
    dispatch(AppSliceActions.refreshUser(model));
  }

  function refreshToken(model) {
    dispatch(AppSliceActions.refreshToken(model));
  }

  return { ...state, refreshUser, refreshToken };
}
