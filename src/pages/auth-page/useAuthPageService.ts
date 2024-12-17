import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { RootState } from "@/state/store.ts";
import { IAuthPageSlice } from "@/const/interfaces/store-slices/IAuthPageSlice.ts";
import { AuthPageSliceActions as action } from "@/state/slices/AuthPageSlice";

export type AuthState =
  | "isChangePassword"
  | "isForgotPassword"
  | "isSignUp"
  | "isLogin";

export default function useAuthPageService() {
  const state = useSelector(
    (state: RootState): IAuthPageSlice => state[StoreSliceEnum.AUTH],
  );
  const dispatch = useDispatch();

  function setAuthState(stateToActivate: AuthState) {
    dispatch(
      action.setIsChangePassword(stateToActivate === "isChangePassword"),
    );
    dispatch(
      action.setIsForgotPassword(stateToActivate === "isForgotPassword"),
    );
    dispatch(action.setIsSignUp(stateToActivate === "isSignUp"));
    dispatch(action.setIsLogin(stateToActivate === "isLogin"));
  }

  return {
    ...state,
    setAuthState,
  };
}
