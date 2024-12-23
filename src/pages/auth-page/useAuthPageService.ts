import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AuthPageSliceActions as action } from "@/state/slices/AuthPageSlice";
import AuthApiHooks from "@/utils/services/api/AuthApiService.ts";
import { RequestAuthModel } from "@/const/models/RequestAuthModel.ts";
import { AuthFormViewEnum } from "@/const/enums/AuthFormViewEnum.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IAuthPageSlice } from "@/const/interfaces/store-slices/IAuthPageSlice.ts";
import { IAuthForm } from "@/const/interfaces/forms/IAuthForm.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export default function useAuthPageService() {
  const {
    useUserLoginMutation,
    useRegisterNewUserMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
  } = AuthApiHooks;
  const state = useAppSelector<IAuthPageSlice>(StoreSliceEnum.AUTH);
  const dispatch = useAppDispatch();
  const [userLogin] = useUserLoginMutation();
  const [registerNewUser] = useRegisterNewUserMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [resetPassword] = useResetPasswordMutation();

  const navigate = useNavigate();
  let [formStaticText, setFormStaticText] = useState<IAuthForm>(
    _getAuthPageStaticText(state.authFormView),
  );

  // ------------------------------------------------------------------- API

  function userLoginHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return userLogin(model).then((res: any) => {
      dispatch(action.setLoading(false));
      console.log("RES Login", res);
      navigate(`/${NavUrlEnum.DASHBOARD}`);
    });
  }

  function registerNewUserHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return registerNewUser(model).then((res: any) => {
      dispatch(action.setLoading(false));
      console.log("RES Register", res);
    });
  }

  function forgotPasswordHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return forgotPassword(model).then((res: any) => {
      dispatch(action.setLoading(false));
      console.log("RES Forgot", res);
    });
  }

  function resetPasswordHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return resetPassword(model).then((res: any) => {
      dispatch(action.setLoading(false));
      console.log("RES Reset", res);
    });
  }

  // ------------------------------------------------------------------- LOGIC

  function authFormViewChangeHandler(view: AuthFormViewEnum) {
    dispatch(action.setAuthFormView(view));
    setFormStaticText(_getAuthPageStaticText(view));

    console.log(view);
  }

  // ------------------------------------------------------------------- PRIVATE

  function _getAuthPageStaticText(view: AuthFormViewEnum) {
    switch (view) {
      case AuthFormViewEnum.SIGN_UP:
        return {
          title: "Sign up with your email",
          subTitle: "Enter your information to join",
          facebookButtonText: "Sign up with Facebook",
          buttonText: "Sign up",
          footerText: "Already have account?",
          footerLink: "Sign in",
        };
      case AuthFormViewEnum.SIGN_IN:
        return {
          title: "Sign in with your email",
          subTitle: "Enter your information to sign in",
          facebookButtonText: "Sign in with Facebook",
          forgotPasswordLink: "Forgot password",
          buttonText: "Sign in",
          footerText: "Don’t have an account yet? ",
          footerLink: "Sign up",
        };
      case AuthFormViewEnum.FORGOT_PASSWORD:
        return {
          title: "Forgot password",
          subTitle: "Enter your email to reset password",
          buttonText: "Send reset link",
          footerText: "Already have account?",
          footerLink: "Sign in",
        };
      case AuthFormViewEnum.CHANGE_PASSWORD:
        return {
          title: "Change password",
          subTitle: "Enter your new password",
          buttonText: "Change password",
        };
      case AuthFormViewEnum.VERIFY_CODE:
        return {
          title: "Verify Your Identity",
          subTitle: "We’ve sent a text message to:",
          buttonText: "Continue",
          footerText: "Didn’t receive a code? ",
          footerLink: "Resend",
        };
      case AuthFormViewEnum.VERIFY_PHONE_NUMBER:
        return {
          title: "Verify Your Identity",
          subTitle:
            "Please provide phone number so we could send you a message",
          buttonText: "Send",
        };
    }
  }

  return {
    ...state,
    formStaticText,
    userLoginHandler,
    registerNewUserHandler,
    forgotPasswordHandler,
    resetPasswordHandler,
    authFormViewChangeHandler,
  };
}
