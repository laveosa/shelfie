import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import i18n from "i18next";

import "@/App.scss";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import SheHeader from "@/components/complex/she-header/SheHeader.tsx";
import useAppService from "@/useAppService.ts";
import { ToastProvider } from "@/utils/services/ToastService.tsx";
import { DialogProvider } from "@/utils/services/dialog/DialogProvider.tsx";
import SheAppContextMainWrapper from "@/components/complex/she-app-context-main-wrapper/SheAppContextMainWrapper.tsx";
import SheSidebar from "@/components/complex/she-sidebar/SheSidebar.tsx";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";

function App() {
  const service = useAppService();
  const state = useAppSelector<IAppSlice>(StoreSliceEnum.APP);

  const languageCode = state.user?.languageCode;

  useEffect(() => {
    const supportedLangs = ["en-EN", "pl-PL"];
    const browserLang = navigator.language || navigator.languages[0] || "en-EN";
    const targetLang =
      languageCode ??
      (supportedLangs.includes(browserLang) ? browserLang : "en-EN");

    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }
  }, [languageCode]);

  useEffect(() => {
    service.getUserPreferencesHandler();
    service.getUserDetailsHandler();
    service.getUserOrganizationsHandler();
  }, []);

  return (
    <div id="ShelfieAppWrapper">
      <ToastProvider>
        <DialogProvider>
          <SidebarProvider>
            <SheSidebar
              isSidebarHeaderLoading={state.isUserMenuLoading}
              user={state.user}
              userOrganizations={state?.userOrganizations}
              onSelectedOrganizations={(id) =>
                service.switchUserOrganizationHandler(id)
              }
            />
            <SheAppContextMainWrapper>
              <SheHeader
                user={state.user}
                isUserMenuLoading={state?.isUserMenuLoading}
              />
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
