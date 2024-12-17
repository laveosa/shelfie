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

  const getAuthPageStaticText = () => {
    if (state.isChangePassword) {
      return {
        title: "Change password",
        subTitle: "Enter your new password",
        forgotPasswordLink: "",
        buttonText: "Change password",
        footerText: "",
      };
    }

    if (state.isForgotPassword) {
      return {
        title: "Forgot password",
        subTitle: "Enter your email to reset password",
        forgotPasswordLink: "Return to login",
        buttonText: "Send reset link",
        footerText: "",
      };
    }

    if (state.isSignUp) {
      return {
        title: "Sign up with your email",
        subTitle: "Create your account",
        forgotPasswordLink: "",
        buttonText: "Sign up",
        footerText: "Already have an account? Log in",
      };
    }

    return {
      title: "Log in with your email",
      subTitle: "Enter your information to login",
      forgotPasswordLink: "Forgot password",
      buttonText: "Log in",
      footerText: "Sign up",
    };
  };

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
    authPageStaticText: getAuthPageStaticText(),
  };
}
