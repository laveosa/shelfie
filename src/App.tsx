import { Outlet } from "react-router-dom";

import "@/App.scss";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import SheSidebar from "@/components/complex/she-sidebar/SheSidebar.tsx";
import { Avatar } from "@/components/ui/avatar.tsx";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input.tsx";
import { BellDot, Search } from "lucide-react";

function App() {
  return (
    <div id="ApplicationNameWrapper">
      <SidebarProvider>
        <SheSidebar />
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid black",
              width: "100%",
            }}
          >
            <SidebarTrigger
              style={{
                margin: "15px",
                marginBottom: "10px",
                width: "15px",
                height: "15px",
              }}
            />
            <div className="relative h-10 w-full">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
              <Input
                type="search"
                placeholder="Search"
                style={{
                  width: "200px",
                  height: "25px",
                  marginTop: "9px",
                  backgroundColor: "lightgray",
                  padding: "2px 3px 2px 35px ",
                }}
                // className="pl-10 pr-3 py-2 text-sm" // Add additional styling as needed
                value=""
              />
            </div>
            <BellDot style={{ color: "gray", margin: "10px" }} />
            <Avatar
              style={{
                width: "30px",
                height: "30px",
                marginTop: "5px",
                borderRadius: "10px",
              }}
            >
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                style={{ zIndex: 999 }}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  );
}

export default App;
