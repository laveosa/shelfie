import { Outlet } from "react-router-dom";

import "@/App.scss";
import SheBreadcrumbs from "@/components/complex/she-breadcrumbs/SheBreadcrumbs.tsx";

function App() {
  return (
    <div id="ApplicationNameWrapper">
      <SheBreadcrumbs />
      <Outlet />
    </div>
  );
}

export default App;
