import { Outlet } from "react-router-dom";

import "@/App.scss";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import SheSidebar from "@/components/complex/she-sidebar/SheSidebar.tsx";
import SheNavbar from "@/components/complex/she-navbar/SheNavbar.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";

function App() {
  return (
    <div id="ApplicationNameWrapper">
      <SidebarProvider>
        <SheSidebar />
        <div className="applicationContentWrapper">
          <SheNavbar />
          <Outlet />
        </div>
        <Toaster />
      </SidebarProvider>
    </div>
  );
}

export default App;
