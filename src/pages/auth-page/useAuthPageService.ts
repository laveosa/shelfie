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
  const { useUserLoginMutation, useRegisterNewUserMutation } = AuthApiHooks;
  const state = useAppSelector<IAuthPageSlice>(StoreSliceEnum.AUTH);
  const dispatch = useAppDispatch();
  const [userLogin] = useUserLoginMutation();
  const [registerNewUser] = useRegisterNewUserMutation();

  const navigate = useNavigate();
  let [formStaticText, setFormStaticText] = useState<IAuthForm>(
    _getAuthPageStaticText(state.authFormView),
  );

  // ------------------------------------------------------------------- API

  function userLoginHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return userLogin(model).then((res: any) => {
      dispatch(action.setLoading(false));
      console.log(res);
      navigate(NavUrlEnum.DASHBOARD);
    });
  }

  function registerNewUserHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return registerNewUser(model).then((res: any) => {
      dispatch(action.setLoading(false));
      console.log(res);
      navigate(NavUrlEnum.DASHBOARD);
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
          subTitle: "Create your account",
          buttonText: "Sign up",
          footerText: "Log in",
        };
      case AuthFormViewEnum.LOGIN:
        return {
          title: "Log in with your email",
          subTitle: "Enter your information to login",
          forgotPasswordLink: "Forgot password",
          buttonText: "Log in",
          footerText: "Sign up",
        };
      case AuthFormViewEnum.FORGOT_PASSWORD:
        return {
          title: "Forgot password",
          subTitle: "Enter your email to reset password",
          forgotPasswordLink: "Return to login",
          buttonText: "Send reset link",
        };
      case AuthFormViewEnum.CHANGE_PASSWORD:
        return {
          title: "Change password",
          subTitle: "Enter your new password",
          buttonText: "Change password",
        };
    }
  }

  return {
    ...state,
    formStaticText,
    userLoginHandler,
    registerNewUserHandler,
    authFormViewChangeHandler,
    getAuthPageStaticText: _getAuthPageStaticText,
  };
}
