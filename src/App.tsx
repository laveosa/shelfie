import { Outlet } from "react-router-dom";

import "@/App.scss";
import useAppService from "@/useAppService.ts";
import SheBreadcrumbs from "@/components/complex/she-breadcrumbs/SheBreadcrumbs.tsx";
import storageService from "@/utils/services/StorageService.ts";
import { StorageKeyEnum } from "@/const/enums/StorageKeyEnum.ts";

function App() {
  const service = useAppService();

  //TODO replace this logic with real user data from API
  storageService.setLocalStorage(StorageKeyEnum.USER, { id: 1 });

  return (
    <div id="ApplicationNameWrapper">
      <SheBreadcrumbs />
      <Outlet />
    </div>
  );
}

export default App;
