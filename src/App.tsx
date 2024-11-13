import { Outlet } from "react-router-dom";

import "@/App.scss";
import useAppService from "@/useAppService.ts";
import SheBreadcrumbs from "@/components/complex/she-breadcrumbs/SheBreadcrumbs.tsx";

function App() {
  const service = useAppService();

  return (
    <div id="ApplicationNameWrapper">
      <SheBreadcrumbs />
      <Outlet />
    </div>
  );
}

export default App;
