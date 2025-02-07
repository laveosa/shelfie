import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAppService from "@/useAppService.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export default function AuthGuard({ children }) {
  /*const { user } = useAppService();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(NavUrlEnum.DASHBOARD);
    }
  }, [user, navigate]);

  return <>{!user && children}</>;*/

  // TODO update this logic when user api will be updated
  return children;
}
