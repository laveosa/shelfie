import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import "@/App.scss";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import SheSidebar from "@/components/complex/she-sidebar/SheSidebar.tsx";
import SheHeader from "@/components/complex/she-header/SheHeader.tsx";
import useAppService from "@/useAppService.ts";
import { ToastProvider } from "@/utils/services/ToastService.tsx";
import { DialogProvider } from "@/utils/services/dialog/DialogProvider.tsx";
import SheAppContextMainWrapper from "@/components/complex/she-app-context-main-wrapper/SheAppContextMainWrapper.tsx";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";

function App() {
  const service = useAppService();
  const state = useAppSelector<IAppSlice>(StoreSliceEnum.APP);

  useEffect(() => {
    service.getUserPreferencesHandler();
    service.getUserDetailsHandler();
  }, []);

  return (
    <div id="ApplicationNameWrapper">
      <ToastProvider>
        <DialogProvider>
          <SidebarProvider>
            <SheSidebar />
            <SheAppContextMainWrapper>
              <SheHeader user={state.userDetails} />
              <div className="contentPage">
                <Outlet />
              </div>
            </SheAppContextMainWrapper>
          </SidebarProvider>
        </DialogProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
