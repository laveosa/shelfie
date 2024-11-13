import { useNavigate } from "react-router-dom";

import cs from "./AuthPage.module.scss";
import useAppService from "@/useAppService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import storageService from "@/utils/services/StorageService.ts";
import { StorageKeyEnum } from "@/const/enums/StorageKeyEnum.ts";

export function AuthPage() {
  const service = useAppService();
  const navigate = useNavigate();

  function refreshUser() {
    service.refreshUser({ id: 2 });
    navigate("/");
  }

  return (
    <div id={cs.AuthPage}>
      <h1>Auth Page</h1>
      <SheButton onClick={refreshUser}>Refresh user</SheButton>
      <SheButton
        onClick={() => storageService.removeLocalStorage(StorageKeyEnum.USER)}
      >
        Delete user
      </SheButton>
    </div>
  );
}
