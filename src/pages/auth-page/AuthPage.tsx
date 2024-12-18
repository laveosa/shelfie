import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import cs from "./AuthPage.module.scss";
import useAppService from "@/useAppService.ts";
import useAuthPageService, {
  AuthState,
} from "@/pages/auth-page/useAuthPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import { Input } from "@/components/ui/input.tsx";
import { AuthStateEnum } from "@/const/enums/AuthStateEnum.ts";
import { AuthModel } from "@/const/models/AuthModel.ts";

export function AuthPage() {
  const service = useAuthPageService();
  const appService = useAppService();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleAuthStateChange =
    (stateToActivate: AuthState) => (e: React.MouseEvent) => {
      e.preventDefault();
      service.setAuthState(stateToActivate);
    };

  function submitHandler(data: AuthModel) {
    console.log(data);
    handleAuthStateChange(AuthStateEnum.IS_CHANGE_PASSWORD);
    navigate("/");
  }

  return (
    <div id={cs.AuthPage}>
      <div className={cs.authPageWrapper}>
        <div className={cs.authHeader}>
          <img
            className={cs.authHeaderLogo}
            src="src/assets/icons/Shelfie_logo.svg"
            alt="shelfie-logo"
          />
          <span className="she-title">{service.authPageStaticText.title}</span>
          <span className="she-subtext">
            {service.authPageStaticText.subTitle}
          </span>
        </div>
        <div className={cs.authContent}>
          {service.isLogIn && (
            <div className={cs.FacebookButtonBlock}>
              <SheButton
                variant="outline"
                onClick={handleAuthStateChange(
                  AuthStateEnum.IS_CHANGE_PASSWORD,
                )}
              >
                Sign in with Facebook
              </SheButton>
              <div className={cs.authContentBorder}>OR</div>
            </div>
          )}
          <div className={cs.authInputBlock}>
            <SheForm form={form} onSubmit={submitHandler}>
              {!service.isChangePassword && (
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
              )}
              <div className={cs.forgotPasswordLink}>
                {service.isLogIn && (
                  <a
                    href=""
                    onClick={handleAuthStateChange(
                      AuthStateEnum.IS_FORGOT_PASSWORD,
                    )}
                  >
                    {service.authPageStaticText.forgotPasswordLink}
                  </a>
                )}
                {service.isForgotPassword && (
                  <a
                    href=""
                    onClick={handleAuthStateChange(AuthStateEnum.IS_LOGIN)}
                  >
                    {service.authPageStaticText.forgotPasswordLink}
                  </a>
                )}
              </div>
              {!service.isForgotPassword && (
                <div className={cs.passwordInput}>
                  <SheForm.Field
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                      },
                    }}
                    name="password"
                    label="Password"
                  >
                    <Input placeholder="enter password..." />
                  </SheForm.Field>
                </div>
              )}
              {service.isChangePassword && (
                <div className={cs.passwordInput}>
                  <SheForm.Field
                    rules={{
                      required: "Please confirm your password",
                      validate: (value, formValues) => {
                        if (value === formValues.password) {
                          return true;
                        }
                        return "Passwords do not match";
                      },
                    }}
                    name="confirmPassword"
                    label="Confirm Password"
                  >
                    <Input placeholder="confirm password..." />
                  </SheForm.Field>
                </div>
              )}
              <SheForm.Submit>
                {form.formState.isSubmitting
                  ? "Submitting..."
                  : service.authPageStaticText.buttonText}
              </SheForm.Submit>
            </SheForm>
          </div>
        </div>
        <div>
          {service.isLogIn && (
            <div className={cs.footerText}>
              <span>Don’t have an account yet? </span>
              <a
                href=""
                onClick={handleAuthStateChange(AuthStateEnum.iS_SIGN_UP)}
              >
                {service.authPageStaticText.footerText}
              </a>
            </div>
          )}
          {service.isSignUp && (
            <div className={cs.footerText}>
              <span>Already have account? </span>
              <a
                href=""
                onClick={handleAuthStateChange(AuthStateEnum.IS_LOGIN)}
              >
                {service.authPageStaticText.footerText}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
