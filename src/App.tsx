import { Outlet } from "react-router-dom";

import "@/App.scss";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import SheSidebar from "@/components/complex/she-sidebar/SheSidebar.tsx";

function App() {
  return (
    <div id="ApplicationNameWrapper">
      <SidebarProvider>
        <SheSidebar />
        <Outlet />
      </SidebarProvider>
    </div>
  );
}

export default App;
