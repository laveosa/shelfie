import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import "@/App.scss";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import SheSidebar from "@/components/complex/she-sidebar/SheSidebar.tsx";
import SheHeader from "@/components/complex/she-header/SheHeader.tsx";
import useAppService from "@/useAppService.ts";
import { ToastProvider } from "@/utils/services/ToastService.tsx";
import { DialogProvider } from "@/utils/services/dialog/DialogProvider.tsx";

function App() {
  const service = useAppService();

  useEffect(() => {
    service.getUserPreferencesHandler();
  }, []);

  return (
    <div id="ApplicationNameWrapper">
      <ToastProvider>
        <DialogProvider>
          <SidebarProvider>
            <SheSidebar />
            <main className="w-full min-h-screen">
              <SheHeader />
              <div className="contentPage">
                <Outlet />
              </div>
            </main>
          </SidebarProvider>
        </DialogProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
