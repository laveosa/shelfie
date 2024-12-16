import { useNavigate } from "react-router-dom";

import cs from "./AuthPage.module.scss";
import useAppService from "@/useAppService.ts";
import useAuthPageService from "@/pages/auth-page/useAuthPageService.ts";

export function AuthPage() {
  const service = useAuthPageService();
  const appService = useAppService();
  const navigate = useNavigate();

  return (
    <div id={cs.AuthPage}>
      <div className={cs.authHeader}>
        <img src="src/assets/icons/Shelfie_logo.svg" alt="shelfie-logo" />
        <span className="she-title">Log in with your email</span>
        <span className="she-subtext">Enter your information to login</span>
      </div>
    </div>
  );
}
