import React from "react";
import { useForm } from "react-hook-form";

import cs from "./AuthPage.module.scss";
import useAuthPageService from "@/pages/auth-page/useAuthPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import { Input } from "@/components/ui/input.tsx";
import { AuthFormViewEnum } from "@/const/enums/AuthFormViewEnum.ts";
import { RequestAuthModel } from "@/const/models/RequestAuthModel.ts";

export function AuthPage() {
  const service = useAuthPageService();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: RequestAuthModel) {
    console.log(data);
  }

  return (
    <div id={cs["AuthPage"]}>
      <div className={cs.authPageWrapper}>
        <div className={cs.authHeader}>
          <img
            className={cs.authHeaderLogo}
            src="src/assets/icons/Shelfie_logo.svg"
            alt="shelfie-logo"
          />
          <span className="she-title">{service.formStaticText.title}</span>
          <span className="she-subtext">{service.formStaticText.subTitle}</span>
        </div>
        <div className={cs.authContent}>
          {service.authFormView === AuthFormViewEnum.LOGIN && (
            <div className={cs.FacebookButtonBlock}>
              <SheButton
                variant="outline"
                onClick={() =>
                  service.authFormViewChangeHandler(
                    AuthFormViewEnum.CHANGE_PASSWORD,
                  )
                }
              >
                Sign in with Facebook
              </SheButton>
              <div className={cs.authContentBorder}>OR</div>
            </div>
          )}
          <div className={cs.authInputBlock}>
            <SheForm form={form} onSubmit={onSubmit}>
              {service.authFormView !== AuthFormViewEnum.CHANGE_PASSWORD && (
                <div>
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
              )}
              <div className={cs.forgotPasswordLink}>
                {(service.authFormView === AuthFormViewEnum.LOGIN ||
                  service.authFormView ===
                    AuthFormViewEnum.FORGOT_PASSWORD) && (
                  <span
                    className="she-text-link"
                    onClick={() =>
                      service.authFormViewChangeHandler(
                        service.authFormView === AuthFormViewEnum.LOGIN
                          ? AuthFormViewEnum.FORGOT_PASSWORD
                          : AuthFormViewEnum.LOGIN,
                      )
                    }
                  >
                    {service.formStaticText.forgotPasswordLink}
                  </span>
                )}
              </div>
              {service.authFormView !== AuthFormViewEnum.FORGOT_PASSWORD && (
                <div className={cs.passwordInput}>
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
                    <Input type="password" placeholder="enter password..." />
                  </SheForm.Field>
                </div>
              )}
              {service.authFormView === AuthFormViewEnum.CHANGE_PASSWORD && (
                <div className={cs.passwordInput}>
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
              <SheForm.Submit>
                {service.formStaticText.buttonText}
              </SheForm.Submit>
            </SheForm>
          </div>
        </div>
        <div>
          {(service.authFormView === AuthFormViewEnum.LOGIN ||
            service.authFormView === AuthFormViewEnum.SIGN_UP) && (
            <div className={cs.footerText}>
              {service.authFormView === AuthFormViewEnum.LOGIN ? (
                <span>Don’t have an account yet? </span>
              ) : (
                <span>Already have account? </span>
              )}
              <span
                className="she-text-link"
                onClick={() =>
                  service.authFormViewChangeHandler(
                    service.authFormView === AuthFormViewEnum.LOGIN
                      ? AuthFormViewEnum.SIGN_UP
                      : AuthFormViewEnum.LOGIN,
                  )
                }
              >
                {service.formStaticText.footerText}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
