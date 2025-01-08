import React, { useEffect, useState } from "react";
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

export function AuthPage() {
  const service = useAuthPageService();
  const [countryCode, setCountryCode] = useState([]);

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
      countryCode: "",
    },
  });

  useEffect(() => {
    const fetchCountryCodes = async () => {
      const codes = await service.getCountryCodeHandler();
      setCountryCode(codes.data);
    };

    if (countryCode.length > 0) {
      form.setValue("countryCode", countryCode[0].phoneCode);
    }

    fetchCountryCodes();
  }, [countryCode, form]);

  function onSubmit(data: any) {
    switch (service.authFormView) {
      case AuthFormViewEnum.SIGN_IN:
        service.userLoginHandler(data);
        break;
      case AuthFormViewEnum.SIGN_UP:
        service.registerNewUserHandler(data);
        break;
      case AuthFormViewEnum.FORGOT_PASSWORD:
        service.forgotPasswordHandler(data);
        break;
      case AuthFormViewEnum.CHANGE_PASSWORD:
        service.resetPasswordHandler(data);
        break;
      case AuthFormViewEnum.VERIFY_PHONE_NUMBER:
        service.verifyIdentityHandler(data);
        break;
      case AuthFormViewEnum.VERIFY_CODE:
        service.verifyPhoneNumberHandler(data);
        break;
    }
    console.log(data);
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
              {service.authFormView ===
                AuthFormViewEnum.VERIFY_PHONE_NUMBER && (
                <div className={cs.phoneInput}>
                  <div className={cs.formItem}>
                    <FormField
                      control={form.control}
                      name="countryCode"
                      rules={{
                        required: "Country code is required",
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country Code</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countryCode.map((option) => (
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
                    >
                      <Input type="number" placeholder="phone number..." />
                    </SheForm.Field>
                  </div>
                </div>
              )}
              {service.authFormView === AuthFormViewEnum.VERIFY_CODE && (
                <>
                  <div className={cs.formItem}>
                    <SheForm.Field
                      rules={{
                        required: "Please enter your phone number",
                      }}
                      name="verifyPhoneNumber"
                      label="Phone Number"
                    >
                      <Input type="tel" placeholder="phone ending on..." />
                    </SheForm.Field>
                  </div>
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
                </>
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
