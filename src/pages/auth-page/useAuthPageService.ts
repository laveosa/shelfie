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
import storageService from "@/utils/services/StorageService.ts";
import { StorageKeyEnum } from "@/const/enums/StorageKeyEnum.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";

export default function useAuthPageService() {
  const {
    useUserSignInMutation,
    useUserSignUpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useSendSmsToConfirmPhoneNumberMutation,
    useConfirmSignInNumberMutation,
    useVerifySignUpNumberMutation,
    useConfirmSignUpPhoneNumberMutation,
    useVerifySignInNumberMutation,
  } = AuthApiHooks;
  const { useLazyGetCountryCodeQuery } = DictionaryApiHooks;

  const state = useAppSelector<IAuthPageSlice>(StoreSliceEnum.AUTH);
  const dispatch = useAppDispatch();
  const [getCountryCode] = useLazyGetCountryCodeQuery();
  const [userSignIn] = useUserSignInMutation();
  const [userSignUp] = useUserSignUpMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [resetPassword] = useResetPasswordMutation();
  const [sendSmsToConfirmPhoneNumber] =
    useSendSmsToConfirmPhoneNumberMutation();
  const [confirmSignInNumber] = useConfirmSignInNumberMutation();
  const [verifySignupNumber] = useVerifySignUpNumberMutation();
  const [confirmSignUpPhoneNumber] = useConfirmSignUpPhoneNumberMutation();
  const [verifySignInNumber] = useVerifySignInNumberMutation();

  const navigate = useNavigate();
  let [formStaticText, setFormStaticText] = useState<IAuthForm>(
    _getAuthPageStaticText(state.authFormView),
  );

  // ------------------------------------------------------------------- API

  function getCountryCodeHandler() {
    dispatch(action.setLoading(true));
    return getCountryCode().then((res: any) => {
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
        storageService.setLocalStorage(StorageKeyEnum.TOKEN, res.data.token);
        return res;
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
        storageService.setLocalStorage(StorageKeyEnum.TOKEN, res.data.token);
        authFormViewChangeHandler(AuthFormViewEnum.VERIFY_PHONE_NUMBER);
      }
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

  function sendSmsToConfirmPhoneNumberHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return sendSmsToConfirmPhoneNumber(model).then((res: any) => {
      dispatch(action.setLoading(false));
      console.log("RES Verify Identity", res);
    });
  }

  function confirmSignInNumberHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return confirmSignInNumber(model).then((res: any) => {
      dispatch(action.setLoading(false));
      console.log("RES confirm phone number", res);
    });
  }

  function verifySignInNumberHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return verifySignInNumber(model).then((res: any) => {
      dispatch(action.setLoading(false));
      if (res.error) {
        authFormViewChangeHandler(AuthFormViewEnum.VERIFY_PHONE_NUMBER);
      } else {
        storageService.setLocalStorage(
          StorageKeyEnum.HIDDEN_PHONE_NUMBER,
          res.data.hiddenPhoneNumber,
        );
        authFormViewChangeHandler(AuthFormViewEnum.VERIFY_CODE);
      }
    });
  }

  function confirmSignUpPhoneNumberHandler(model: RequestAuthModel) {
    dispatch(action.setLoading(true));
    return confirmSignUpPhoneNumber(model).then((res: any) => {
      dispatch(action.setLoading(false));
      if (res.error) {
        storageService.removeLocalStorage(StorageKeyEnum.TOKEN);
        authFormViewChangeHandler(AuthFormViewEnum.SIGN_UP);
      } else {
        console.log("RES confirm signup phone number", res);
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
      console.log("RES verify Number", res);
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
    authFormViewChangeHandler,
    getCountryCodeHandler,
    userSignInHandler,
    userSignUpHandler,
    forgotPasswordHandler,
    resetPasswordHandler,
    sendSmsToConfirmPhoneNumberHandler,
    confirmSignInNumberHandler,
    verifySignupNumberHandler,
    confirmSignUpPhoneNumberHandler,
    verifySignInNumberHandler,
  };
}
