import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import "@/App.scss";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import SheSidebar from "@/components/complex/she-sidebar/SheSidebar.tsx";
import SheHeader from "@/components/complex/she-header/SheHeader.tsx";
import useAppService from "@/useAppService.ts";

function App() {
  const service = useAppService();

  //TODO transfer this logic to new hook 'USE'
  useEffect(() => {
    service.getUserPreferencesHandler();
  }, []);

  return (
    <div id="ApplicationNameWrapper">
      <SidebarProvider>
        <SheSidebar />
        <main className="w-full min-h-screen">
          <SheHeader />
          <div className="contentPage">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default App;
