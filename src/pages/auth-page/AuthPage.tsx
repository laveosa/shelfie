import { useNavigate } from "react-router-dom";

import cs from "./AuthPage.module.scss";
import useAppService from "@/useAppService.ts";
import useAuthPageService from "@/pages/auth-page/useAuthPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export function AuthPage() {
  const service = useAuthPageService();
  const appService = useAppService();
  const navigate = useNavigate();

  return (
    <div id={cs.AuthPage}>
      <div className={cs.authPageWrapper}>
        <div className={cs.authHeader}>
          <img
            className={cs.authHeaderLogo}
            src="src/assets/icons/Shelfie_logo.svg"
            alt="shelfie-logo"
          />
          <span className="she-title">Log in with your email</span>
          <span className="she-subtext">Enter your information to login</span>
        </div>
        <div className={cs.authContent}>
          <div className={cs.FacebookButtonBlock}>
            <SheButton variant="outline">Sign in with Facebook</SheButton>
            <div className={cs.authContentBorder}>OR</div>
          </div>
        </div>
      </div>
      <div>
        <span>Don’t have an account yet?</span>
        <a href="">Sign up</a>
      </div>
    </div>
  );
}
