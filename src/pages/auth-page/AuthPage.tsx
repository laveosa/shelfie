import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import cs from "./AuthPage.module.scss";
import useAuthPageService from "@/pages/auth-page/useAuthPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import { Input } from "@/components/ui/input.tsx";
import { AuthFormViewEnum } from "@/const/enums/AuthFormViewEnum.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { RequestAuthModel } from "@/const/models/RequestAuthModel.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IAuthPageSlice } from "@/const/interfaces/store-slices/IAuthPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AuthPageSliceActions as action } from "@/state/slices/AuthPageSlice";
import storageService from "@/utils/services/StorageService.ts";
import { StorageKeyEnum } from "@/const/enums/StorageKeyEnum.ts";

export function AuthPage() {
  const service = useAuthPageService();
  const dispatch = useAppDispatch();
  const state = useAppSelector<IAuthPageSlice>(StoreSliceEnum.AUTH);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      verifyPhoneNumber: undefined,
      verifyCode: undefined,
      phoneCodeModel: null,
    },
  });

  const phoneNumber: string = form.watch("phoneNumber");
  const phoneCode: string = form.watch("phoneCodeModel.phoneCode");
  let hiddenPhoneNumber: string = "1234";

  useEffect(() => {
    const fetchCountryCodes = async () => {
      const codes = await service.getCountryCodeHandler();
      dispatch(action.setCountryCode(codes.data));
      form.setValue("phoneCodeModel", state.countryCode[0]);
    };

    fetchCountryCodes();
  }, [state.countryCode]);

  function onSubmit(data: RequestAuthModel) {
    switch (service.authFormView) {
      case AuthFormViewEnum.SIGN_IN:
        service.userSignInHandler(data).then((res) => {
          console.log("AUT_PAGE", res);
          if (!res.error) {
            service.verifySignInNumberHandler().then(() => {
              hiddenPhoneNumber = storageService.getLocalStorage(
                StorageKeyEnum.HIDDEN_PHONE_NUMBER,
              );
            });
          }
        });
        break;
      case AuthFormViewEnum.SIGN_UP:
        service.userSignUpHandler(data);
        break;
      case AuthFormViewEnum.FORGOT_PASSWORD:
        service.forgotPasswordHandler(data);
        break;
      case AuthFormViewEnum.CHANGE_PASSWORD:
        service.resetPasswordHandler(data);
        break;
      case AuthFormViewEnum.VERIFY_PHONE_NUMBER:
        service.verifySignupNumberHandler(data);
        break;
      case AuthFormViewEnum.VERIFY_CODE:
        hiddenPhoneNumber
          ? service.confirmSignInNumberHandler(data)
          : service.confirmSignUpPhoneNumberHandler(data);
        break;
    }
  }

  return (
    <div id={cs["AuthPage"]}>
      <div className={cs.authPageWrapper}>
        <div className={cs.authHeader}>
          <img
            className={cs.authHeaderLogo}
            src="src/assets/images/AuthLogo.png"
            alt="shelfie-logo"
          />
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
                          value: 5,
                          message: "First name must be at least 5 characters",
                        },
                        maxLength: {
                          value: 50,
                          message: "First name cannot exceed 50 characters",
                        },
                      }}
                      name="firstName"
                    >
                      <SheInput
                        label="First Name"
                        placeholder="enter first name..."
                        isValid={!form.formState.errors.firstName}
                        error={form.formState.errors.firstName?.message}
                        showError={true}
                      />
                    </SheForm.Field>
                  </div>
                  <div className={cs.formItem}>
                    <SheForm.Field
                      rules={{
                        required: "Last name is required",
                        minLength: {
                          value: 5,
                          message: "Last name must be at least 5 characters",
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
                  {!hiddenPhoneNumber && (
                    <div className={cs.formItem}>
                      <FormField
                        control={form.control}
                        name="phoneCodeModel"
                        rules={{
                          required: "Country code is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <Select
                              disabled={
                                service.authFormView ===
                                AuthFormViewEnum.VERIFY_CODE
                              }
                              onValueChange={(value) => {
                                const selectedCountry = state.countryCode.find(
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
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {state.countryCode.map((option) => (
                                  <SelectItem
                                    key={option.countryId}
                                    value={option.phoneCode}
                                  >
                                    <div className="flex items-center">
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
                  <div className={cs.formItem}>
                    <SheForm.Field
                      rules={{
                        required: "Please select a country code",
                        minLength: {
                          value: 8,
                          message: "Phone number must be at least 8 characters",
                        },
                        maxLength: {
                          value: 9,
                          message: "Phone number cannot exceed 9 characters",
                        },
                      }}
                      name="phoneNumber"
                      label={hiddenPhoneNumber ? "Phone number" : null}
                    >
                      <Input
                        disabled={
                          service.authFormView === AuthFormViewEnum.VERIFY_CODE
                        }
                        type="number"
                        placeholder={
                          service.authFormView === AuthFormViewEnum.VERIFY_CODE
                            ? hiddenPhoneNumber
                              ? `Phone ending in ${hiddenPhoneNumber}`
                              : phoneNumber
                            : "phone number..."
                        }
                        style={
                          hiddenPhoneNumber
                            ? {
                                marginTop: "10px",
                              }
                            : null
                        }
                      />
                    </SheForm.Field>
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
                    name="verifyCode"
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
      <div className={cs.footerText}>
        {(service.authFormView === AuthFormViewEnum.SIGN_IN ||
          service.authFormView === AuthFormViewEnum.SIGN_UP ||
          service.authFormView === AuthFormViewEnum.VERIFY_CODE ||
          service.authFormView === AuthFormViewEnum.FORGOT_PASSWORD) && (
          <span>{service.formStaticText.footerText} </span>
        )}
        <span
          className="she-text-link"
          onClick={() =>
            service.authFormView === AuthFormViewEnum.SIGN_IN
              ? service.authFormViewChangeHandler(AuthFormViewEnum.SIGN_UP)
              : service.authFormViewChangeHandler(AuthFormViewEnum.SIGN_IN)
          }
        >
          {service.formStaticText.footerLink}
        </span>
      </div>

      <div style={{ display: "flex", paddingTop: "20px" }}>
        <SheButton
          variant="outline"
          onClick={() =>
            service.authFormViewChangeHandler(AuthFormViewEnum.FORGOT_PASSWORD)
          }
        >
          Forgot Password
        </SheButton>
        <SheButton
          variant="outline"
          onClick={() =>
            service.authFormViewChangeHandler(
              AuthFormViewEnum.VERIFY_PHONE_NUMBER,
            )
          }
        >
          VERIFY_IDENTITY
        </SheButton>
        <SheButton
          variant="outline"
          onClick={() =>
            service.authFormViewChangeHandler(AuthFormViewEnum.VERIFY_CODE)
          }
        >
          VERIFY_PHONE_NUMBER
        </SheButton>
        <SheButton
          variant="outline"
          onClick={() =>
            service.authFormViewChangeHandler(AuthFormViewEnum.CHANGE_PASSWORD)
          }
        >
          CHANGE_PASSWORD
        </SheButton>
        <SheButton
          variant="outline"
          onClick={() =>
            service.authFormViewChangeHandler(AuthFormViewEnum.SIGN_UP)
          }
        >
          SIGN_UP
        </SheButton>
      </div>
    </div>
  );
}
