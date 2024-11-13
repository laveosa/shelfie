import useAuth from "@/utils/hooks/useAuth.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export default function RouterGuard({ children }) {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(`/${NavUrlEnum.AUTH}`, { replace: true });
    }
  }, [user, navigate]);

  return children;
}
