import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import useAppService from "@/useAppService.ts";

export default function RouterGuard({ children }) {
  /*const { token, logOut } = useAppService();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      logOut();
    }
  }, [token, navigate]);

  return <>{token && children}</>;*/

  return <>{children}</>;
}
