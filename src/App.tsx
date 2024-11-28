import { Outlet } from "react-router-dom";

import "@/App.scss";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import SheSidebar from "@/components/complex/she-sidebar/SheSidebar.tsx";

function App() {
  return (
    <div id="ApplicationNameWrapper">
      <SidebarProvider>
        <SheSidebar />
        <main className="w-full min-h-screen">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}

export default App;
