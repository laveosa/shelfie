import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { FormControl, FormField, FormItem } from "@/components/ui/form.tsx";
import cs from "./AuthPage.module.scss";
import useAuthPageService from "@/pages/auth-page/useAuthPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import { Input } from "@/components/ui/input.tsx";
import { AuthFormViewEnum } from "@/const/enums/AuthFormViewEnum.ts";
import { RequestAuthModel } from "@/const/models/RequestAuthModel.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IAuthPageSlice } from "@/const/interfaces/store-slices/IAuthPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AuthPageSliceActions as action } from "@/state/slices/AuthPageSlice";
import storageService from "@/utils/services/StorageService.ts";
import { StorageKeyEnum } from "@/const/enums/StorageKeyEnum.ts";
import logo from "@/assets/images/AuthLogo.png";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import { useToast } from "@/hooks/useToast.ts";

export default function AuthPage() {
  const service = useAuthPageService();
  const dispatch = useAppDispatch();
  const state = useAppSelector<IAuthPageSlice>(StoreSliceEnum.AUTH);
  const { addToast } = useToast();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      verifyPhoneNumber: null,
      code: state.countryCode[0],
      phoneCodeModel: null,
    },
  });

  const phoneNumber: string = form.watch("phoneNumber");
  const phoneCode: string = form.watch("phoneCodeModel.phoneCode");

  useEffect(() => {
    storageService.removeLocalStorage(StorageKeyEnum.TOKEN);
    const fetchCountryCodes = async () => {
      const codes = await service.getCountryCodeHandler();
      dispatch(action.setCountryCode(codes.data));
      form.setValue("phoneCodeModel", state.countryCode[0]);
    };

    fetchCountryCodes();
  }, [state.countryCode]);

  useEffect(() => {
    if (service.authFormView === AuthFormViewEnum.FORGOT_PASSWORD) {
      form.reset();
    }
  }, [service.authFormView]);

  // useEffect(() => {
  //   if (state.countryCode.length) {
  //     form.setValue("phoneCodeModel", state.countryCode[0]);
  //   }
  // }, [state.countryCode, form]);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      const codes = await service.getCountryCodeHandler();
      dispatch(action.setCountryCode(codes.data));
      form.reset({
        ...form.getValues(),
        phoneCodeModel: codes.data[0],
      });
    };

    fetchCountryCodes();
  }, []);

  function onFooterLink() {
    switch (service.authFormView) {
      case AuthFormViewEnum.SIGN_IN:
        service.authFormViewChangeHandler(AuthFormViewEnum.SIGN_UP);
        form.reset();
        break;
      case AuthFormViewEnum.SIGN_UP:
        service.authFormViewChangeHandler(AuthFormViewEnum.SIGN_IN);
        form.reset();
        break;
      case AuthFormViewEnum.VERIFY_CODE:
        //TODO implement resend verification code API
        state.hiddenPhoneNumber
          ? service.verifySignInNumberHandler()
          : service.confirmSignUpPhoneNumberHandler(form.getValues());
        break;
      case AuthFormViewEnum.FORGOT_PASSWORD:
        service.authFormViewChangeHandler(AuthFormViewEnum.SIGN_IN);
        form.reset();
        break;
    }
  }

  function onSubmit(data: RequestAuthModel) {
    switch (service.authFormView) {
      case AuthFormViewEnum.SIGN_IN:
        service.userSignInHandler(data).then((res) => {
          if (res) {
            addToast({
              text: res.error.data.title,
              type: "error",
            });
          }
        });
        break;
      case AuthFormViewEnum.SIGN_UP:
        service.userSignUpHandler(data).then((res) => {
          if (res.error) {
            addToast({
              text: res.error.data.detail,
              type: "error",
            });
          }
        });
        break;
      case AuthFormViewEnum.FORGOT_PASSWORD:
        service.forgotPasswordHandler(data).then((res) => {
          if (res.error) {
            addToast({
              text: res.error.data.detail,
              type: "error",
            });
          } else {
            addToast({
              text: res.data.message,
              type: "success",
            });
          }
        });
        break;
      case AuthFormViewEnum.CHANGE_PASSWORD:
        service.resetPasswordHandler(data);
        break;
      case AuthFormViewEnum.VERIFY_PHONE_NUMBER:
        service.verifySignupNumberHandler(data).then((res) => {
          if (res.error) {
            addToast({
              text: res.error.data.detail,
              type: "error",
            });
          }
        });
        break;
      case AuthFormViewEnum.VERIFY_CODE:
        state.hiddenPhoneNumber
          ? service.confirmSignInNumberHandler(data).then((res) => {
              if (res.error) {
                addToast({
                  text: res.error.data.detail,
                  type: "error",
                });
              }
            })
          : service.confirmSignUpPhoneNumberHandler(data).then((res) => {
              if (res.error) {
                addToast({
                  text: res.error.data.detail,
                  type: "error",
                });
              }
            });
        break;
    }
  }

  // useEffect(() => {
  //   console.log("LOADING", state.isLoading);
  //   dispatch(action.setLoading(true));
  // }, [state.isLoading]);

  return (
    <div id={cs["AuthPage"]}>
      <div
        className={`${cs.authPageWrapper} ${state.isLoading ? cs.authPageLoading : ""}`}
      >
        {state.isLoading && <SheLoading className={cs.authPageLoadingBlock} />}
        <div className={cs.authHeader}>
          <img className={cs.authHeaderLogo} src={logo} alt="shelfie-logo" />
          <span className="she-title">{service.formStaticText.title}</span>
          <span className="she-subtext">{service.formStaticText.subTitle}</span>
        </div>
        <div className={cs.authContent}>
          <div className={cs.authInputBlock}>
            <SheForm form={form} onSubmit={onSubmit}>
              {service.authFormView === AuthFormViewEnum.SIGN_UP && (
                <>
                  <div className={cs.formItem}>
                    <SheForm.Field
                      rules={{
                        required: "First name is required",
                        minLength: {
                          value: 3,
                          message: "First name must be at least 3 characters",
                        },
                        maxLength: {
                          value: 50,
                          message: "First name cannot exceed 50 characters",
                        },
                      }}
                      name="firstName"
                      label="First Name"
                    >
                      <Input placeholder="enter first name..." />
                    </SheForm.Field>
                  </div>
                  <div className={cs.formItem}>
                    <SheForm.Field
                      rules={{
                        required: "Last name is required",
                        minLength: {
                          value: 3,
                          message: "Last name must be at least 3 characters",
                        },
                        maxLength: {
                          value: 50,
                          message: "Last name cannot exceed 50 characters",
                        },
                      }}
                      name="lastName"
                      label="Last Name"
                    >
                      <Input placeholder="enter first name..." />
                    </SheForm.Field>
                  </div>
                </>
              )}
              {(service.authFormView === AuthFormViewEnum.SIGN_IN ||
                service.authFormView === AuthFormViewEnum.SIGN_UP ||
                service.authFormView === AuthFormViewEnum.FORGOT_PASSWORD) && (
                <>
                  <div className={cs.formItem}>
                    <SheForm.Field
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                        minLength: {
                          value: 5,
                          message: "Email must be at least 5 characters",
                        },
                        maxLength: {
                          value: 50,
                          message: "Email cannot exceed 50 characters",
                        },
                      }}
                      name="email"
                      label="Email"
                    >
                      <Input placeholder="enter email..." />
                    </SheForm.Field>
                  </div>
                </>
              )}
              {(service.authFormView === AuthFormViewEnum.SIGN_IN ||
                service.authFormView === AuthFormViewEnum.SIGN_UP ||
                service.authFormView === AuthFormViewEnum.CHANGE_PASSWORD) && (
                <div className={cs.formItem}>
                  <SheForm.Field
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    }}
                    name="password"
                    label="Password"
                  >
                    <Input
                      className={cs.passwordInput}
                      type="password"
                      placeholder="enter password..."
                    />
                  </SheForm.Field>
                </div>
              )}
              <div className={cs.forgotPasswordLink}>
                {service.authFormView === AuthFormViewEnum.SIGN_IN && (
                  <span
                    className="she-text-link"
                    onClick={() =>
                      service.authFormViewChangeHandler(
                        service.authFormView === AuthFormViewEnum.SIGN_IN
                          ? AuthFormViewEnum.FORGOT_PASSWORD
                          : AuthFormViewEnum.SIGN_IN,
                      )
                    }
                  >
                    {service.formStaticText.forgotPasswordLink}
                  </span>
                )}
              </div>
              {service.authFormView === AuthFormViewEnum.CHANGE_PASSWORD && (
                <div className={cs.formItem}>
                  <SheForm.Field
                    rules={{
                      required: "Please confirm your password",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "Passwords do not match",
                    }}
                    name="confirmPassword"
                    label="Confirm Password"
                  >
                    <Input type="password" placeholder="confirm password..." />
                  </SheForm.Field>
                </div>
              )}
              {(service.authFormView === AuthFormViewEnum.VERIFY_PHONE_NUMBER ||
                service.authFormView === AuthFormViewEnum.VERIFY_CODE) && (
                <div className={cs.phoneInput}>
                  <span className={`${cs.phoneNumberTitle} she-title`}>
                    Phone number
                  </span>
                  <div className={cs.phoneInputItems}>
                    {!state.hiddenPhoneNumber && (
                      <div className={cs.formItem}>
                        <FormField
                          control={form.control}
                          name="phoneCodeModel"
                          rules={{
                            required: "Country code is required",
                          }}
                          render={({ field }) => (
                            <FormItem className={cs.countryCodeInput}>
                              <Select
                                disabled={
                                  service.authFormView ===
                                  AuthFormViewEnum.VERIFY_CODE
                                }
                                onValueChange={(value) => {
                                  const selectedCountry =
                                    state.countryCode.find(
                                      (country) => country.phoneCode === value,
                                    );
                                  field.onChange(selectedCountry);
                                }}
                                value={
                                  service.authFormView ===
                                  AuthFormViewEnum.VERIFY_CODE
                                    ? phoneCode
                                    : field.value?.phoneCode || ""
                                }
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      defaultValue={
                                        state.countryCode[0]?.phoneCode
                                      }
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {state.countryCode.map((option) => (
                                    <SelectItem
                                      key={option.countryId}
                                      value={option.phoneCode}
                                    >
                                      <div className="flex items-center gap-2">
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: option.flagIcon,
                                          }}
                                        />
                                        {option.phoneCode}
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    <div
                      className={cs.formItem}
                      style={
                        state.hiddenPhoneNumber
                          ? {
                              width: "100%",
                            }
                          : null
                      }
                    >
                      <SheForm.Field
                        rules={
                          !state.hiddenPhoneNumber
                            ? {
                                required: "Phone number is required",
                                minLength: {
                                  value: 8,
                                  message:
                                    "Phone number must be at least 8 characters",
                                },
                                maxLength: {
                                  value: 9,
                                  message:
                                    "Phone number cannot exceed 9 characters",
                                },
                              }
                            : null
                        }
                        name="phoneNumber"
                        label={state.hiddenPhoneNumber ? "Phone number" : null}
                      >
                        <Input
                          disabled={
                            service.authFormView ===
                            AuthFormViewEnum.VERIFY_CODE
                          }
                          // type="number"
                          placeholder={
                            service.authFormView ===
                            AuthFormViewEnum.VERIFY_CODE
                              ? state.hiddenPhoneNumber
                                ? `Phone ending in ${state.hiddenPhoneNumber}`
                                : phoneNumber
                              : "phone number..."
                          }
                          style={
                            state.hiddenPhoneNumber
                              ? {
                                  marginTop: "10px",
                                }
                              : null
                          }
                        />
                      </SheForm.Field>
                    </div>
                    {!state.hiddenPhoneNumber && (
                      <div className={cs.changePhoneNumber}>
                        <span
                          className="she-text-link"
                          onClick={() =>
                            service.authFormViewChangeHandler(
                              AuthFormViewEnum.VERIFY_PHONE_NUMBER,
                            )
                          }
                        >
                          {service.formStaticText.changePhoneNumberLink}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {service.authFormView === AuthFormViewEnum.VERIFY_CODE && (
                <div className={cs.formItem}>
                  <SheForm.Field
                    rules={{
                      required: "Please enter code",
                      minLength: {
                        value: 6,
                        message: "Code must be 6 characters",
                      },
                      maxLength: {
                        value: 6,
                        message: "Code must be 6 characters",
                      },
                    }}
                    name="code"
                    label="Enter the 6-digit code"
                  >
                    <Input type="number" placeholder="enter code..." />
                  </SheForm.Field>
                </div>
              )}
              <div className={cs.formButton}>
                <SheForm.Submit>
                  {service.formStaticText.buttonText}
                </SheForm.Submit>
              </div>
            </SheForm>
          </div>
          {(service.authFormView === AuthFormViewEnum.SIGN_IN ||
            service.authFormView === AuthFormViewEnum.SIGN_UP) && (
            <div className={cs.facebookButtonBlock}>
              <div className={cs.authContentBorder}>OR</div>
              <SheButton variant="outline">
                {service.formStaticText.facebookButtonText}
              </SheButton>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${cs.footerText} ${state.isLoading ? cs.authPageLoading : ""}`}
      >
        {(service.authFormView === AuthFormViewEnum.SIGN_IN ||
          service.authFormView === AuthFormViewEnum.SIGN_UP ||
          service.authFormView === AuthFormViewEnum.VERIFY_CODE ||
          service.authFormView === AuthFormViewEnum.FORGOT_PASSWORD) && (
          <span>{service.formStaticText.footerText} </span>
        )}
        <span className="she-text-link" onClick={onFooterLink}>
          {service.formStaticText.footerLink}
        </span>
      </div>
      {/*<div style={{ display: "flex", paddingTop: "20px" }}>*/}
      {/*  <SheButton*/}
      {/*    variant="outline"*/}
      {/*    onClick={() =>*/}
      {/*      service.authFormViewChangeHandler(AuthFormViewEnum.FORGOT_PASSWORD)*/}
      {/*    }*/}
      {/*  >*/}
      {/*    Forgot Password*/}
      {/*  </SheButton>*/}
      {/*  <SheButton*/}
      {/*    variant="outline"*/}
      {/*    onClick={() =>*/}
      {/*      service.authFormViewChangeHandler(*/}
      {/*        AuthFormViewEnum.VERIFY_PHONE_NUMBER,*/}
      {/*      )*/}
      {/*    }*/}
      {/*  >*/}
      {/*    VERIFY_IDENTITY*/}
      {/*  </SheButton>*/}
      {/*  <SheButton*/}
      {/*    variant="outline"*/}
      {/*    onClick={() =>*/}
      {/*      service.authFormViewChangeHandler(AuthFormViewEnum.VERIFY_CODE)*/}
      {/*    }*/}
      {/*  >*/}
      {/*    VERIFY_PHONE_NUMBER*/}
      {/*  </SheButton>*/}
      {/*  <SheButton*/}
      {/*    variant="outline"*/}
      {/*    onClick={() =>*/}
      {/*      service.authFormViewChangeHandler(AuthFormViewEnum.CHANGE_PASSWORD)*/}
      {/*    }*/}
      {/*  >*/}
      {/*    CHANGE_PASSWORD*/}
      {/*  </SheButton>*/}
      {/*  <SheButton*/}
      {/*    variant="outline"*/}
      {/*    onClick={() =>*/}
      {/*      service.authFormViewChangeHandler(AuthFormViewEnum.SIGN_UP)*/}
      {/*    }*/}
      {/*  >*/}
      {/*    SIGN_UP*/}
      {/*  </SheButton>*/}
      {/*</div>*/}
    </div>
  );
}

// export default AuthPage;
