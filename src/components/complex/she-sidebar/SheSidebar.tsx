import cs from "./SheSidebar.module.scss";
import logo from "@/assets/icons/TNF_logo.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import {
  ChevronDown,
  IceCreamBowl,
  IdCard,
  LayoutDashboard,
  LifeBuoy,
  MessageCircle,
  ReceiptEuro,
  Settings,
  Shirt,
  Users,
  Video,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Avatar } from "@/components/ui/avatar.tsx";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const projects = [
  {
    title: "First",
    icon: IceCreamBowl,
  },
  {
    title: "Second",
    icon: IdCard,
  },
];

const activityItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/products",
    icon: Shirt,
  },
  {
    title: "Messenger",
    url: "/messenger",
    icon: MessageCircle,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ReceiptEuro,
  },
  {
    title: "Transmissions",
    url: "/transmissions",
    icon: Video,
  },
];

const usersItems = [
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
];

const setupItems = [
  {
    title: "Setting",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Support",
    url: "/support",
    icon: LifeBuoy,
  },
];

export default function SheSidebar() {
  return (
    <Sidebar className={cs.SheSidebar} collapsible="icon">
      <Collapsible className="group/collapsible">
        <SidebarContent className={cs.SidebarContent}>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <Avatar style={{ borderRadius: "10px" }}>
                  <AvatarImage
                    className={cs.SidebarAvatarImage}
                    src={logo}
                    alt="@shadcn"
                    style={{ zIndex: 999 }}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "10px",
                  }}
                >
                  <p>To NIE Fabryka</p>
                  <p style={{ fontSize: "8px" }}>Subscription Active</p>
                </div>
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className={cs.SidebarGroupContent}>
                <SidebarMenu>
                  {projects.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={"https://www.google.com"}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </SidebarContent>
      </Collapsible>
      <SidebarContent className={cs.SidebarContent}>
        <SidebarGroup>
          <SidebarGroupLabel>ACTIVITY</SidebarGroupLabel>
          <SidebarMenu>
            {activityItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>USERS</SidebarGroupLabel>
          <SidebarMenu>
            {usersItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>SETUP</SidebarGroupLabel>
          <SidebarMenu>
            {setupItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
