import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAppService from "@/useAppService.ts";

// TODO update and use this logic base on User model, when "getUserBaseModel" api will be provided
export default function RouterGuard({ children }) {
  const { token, logOut } = useAppService();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      logOut();
    }
  }, [token, navigate]);

  return <>{token && children}</>;
}
