import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AuthPageSliceActions as action } from "@/state/slices/AuthPageSlice";
import AuthApiHooks from "@/utils/services/api/AuthApiService.ts";
import { RequestAuthModel } from "@/const/models/RequestAuthModel.ts";
import { AuthFormViewEnum } from "@/const/enums/AuthFormViewEnum.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IAuthPageSlice } from "@/const/interfaces/store-slices/IAuthPageSlice.ts";
import { IAuthForm } from "@/const/interfaces/forms/IAuthForm.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";
import useAppService from "@/useAppService.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export default function useAuthPageService() {
  const [getCountryCode] = DictionaryApiHooks.useLazyGetCountryCodeQuery();
  const [userSignIn] = AuthApiHooks.useUserSignInMutation();
  const [userSignUp] = AuthApiHooks.useUserSignUpMutation();
  const [forgotPassword] = AuthApiHooks.useForgotPasswordMutation();
  const [resetPassword] = AuthApiHooks.useResetPasswordMutation();
  const [confirmSignInNumber] = AuthApiHooks.useConfirmSignInNumberMutation();
  const [verifySignupNumber] = AuthApiHooks.useVerifySignUpNumberMutation();
  const [confirmSignUpPhoneNumber] =
    AuthApiHooks.useConfirmSignUpPhoneNumberMutation();
  const [verifySignInNumber] = AuthApiHooks.useVerifySignInNumberMutation();

  const state = useAppSelector<IAuthPageSlice>(StoreSliceEnum.AUTH);
  const dispatch = useAppDispatch();
  const { refreshToken } = useAppService();
  const location = useLocation();
  const navigate = useNavigate();
  const [formStaticText, setFormStaticText] = useState<IAuthForm>(
    _getAuthPageStaticText(state.authFormView),
  );

  //TODO extract logic into AUTH page component
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has("change-password")) {
      authFormViewChangeHandler(AuthFormViewEnum.CHANGE_PASSWORD);
    }
    const token = params.get("token");
    if (token) {
      dispatch(action.setResetToken(token));
    }
  }, [location]);

  // ------------------------------------------------------------------- API

  function getCountryCodeHandler() {
    dispatch(action.setLoading(true));
    return getCountryCode(null).then((res: any) => {
      dispatch(action.setLoading(false));
      if (res.data) {
        dispatch(action.setCountryCode(res.data));
      }
      return res;
    });
  }

  function userSignInHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return userSignIn(model).then((res: any) => {
      dispatch(action.setLoading(false));
      if (res.error) {
        return;
      } else {
        refreshToken(res.data.token);
        verifySignInNumberHandler();
      }
    });
  }

  function confirmSignInNumberHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return confirmSignInNumber(model).then((res: any) => {
      dispatch(action.setLoading(false));
      refreshToken(res.data.token);
      navigate(NavUrlEnum.DASHBOARD);
    });
  }

  function verifySignInNumberHandler() {
    dispatch(action.setLoading(true));
    return verifySignInNumber(null).then((res: any) => {
      dispatch(action.setLoading(false));
      if (res.error) {
        authFormViewChangeHandler(AuthFormViewEnum.VERIFY_PHONE_NUMBER);
      } else {
        authFormViewChangeHandler(AuthFormViewEnum.VERIFY_CODE);
        dispatch(action.setHiddenPhoneNumber(res.data.hiddenPhoneNumber));
      }
    });
  }

  function userSignUpHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return userSignUp(model).then((res: any) => {
      dispatch(action.setLoading(false));
      if (res.error) {
        return;
      } else {
        refreshToken(res.data.token);
        authFormViewChangeHandler(AuthFormViewEnum.VERIFY_PHONE_NUMBER);
      }
    });
  }

  function verifySignupNumberHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return verifySignupNumber(model).then((res: any) => {
      dispatch(action.setLoading(false));
      if (res.error) {
        return;
      } else {
        authFormViewChangeHandler(AuthFormViewEnum.VERIFY_CODE);
      }
    });
  }

  function confirmSignUpPhoneNumberHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return confirmSignUpPhoneNumber(model).then((res: any) => {
      dispatch(action.setLoading(false));
      if (res.error) {
        refreshToken(res.data.token);
        authFormViewChangeHandler(AuthFormViewEnum.SIGN_UP);
      } else {
        navigate(NavUrlEnum.DASHBOARD);
      }
    });
  }

  function forgotPasswordHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return forgotPassword(model).then((res: any) => {
      dispatch(action.setLoading(false));
      if (res.error) {
        return;
      } else {
        authFormViewChangeHandler(AuthFormViewEnum.SIGN_IN);
      }
    });
  }

  function resetPasswordHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    model.resetToken = state.resetToken;
    return resetPassword(model).then((_res: any) => {
      dispatch(action.setLoading(false));
      authFormViewChangeHandler(AuthFormViewEnum.SIGN_IN);
    });
  }

  // ------------------------------------------------------------------- LOGIC

  function authFormViewChangeHandler(view: AuthFormViewEnum) {
    dispatch(action.setAuthFormView(view));
    setFormStaticText(_getAuthPageStaticText(view));
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
          changePhoneNumberLink: "Change",
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
    getCountryCodeHandler,
    userSignInHandler,
    verifySignInNumberHandler,
    confirmSignInNumberHandler,
    userSignUpHandler,
    verifySignupNumberHandler,
    confirmSignUpPhoneNumberHandler,
    forgotPasswordHandler,
    resetPasswordHandler,
    authFormViewChangeHandler,
  };
}
