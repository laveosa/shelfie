import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAppService from "@/useAppService.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export default function AuthGuard({ children }) {
  const { token } = useAppService();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(NavUrlEnum.DASHBOARD);
    }
  }, [token, navigate]);

  return <>{!token && children}</>;
}
