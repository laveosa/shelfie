import cs from "./SheSidebar.module.scss";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import {
  LayoutDashboard,
  LifeBuoy,
  MessageCircle,
  ReceiptEuro,
  Settings,
  Shirt,
  Users,
  Video,
} from "lucide-react";
import { CompanyModel } from "@/const/models/CompanyModel.ts";
import SheSidebarHeader from "@/components/complex/she-sidebar/components/she-sidebar-header/SheSidebarHeader.tsx";

const companies: CompanyModel[] = [
  {
    id: 1,
    title: "First",
    description: "First description",
    isActive: true,
    image:
      "https://res.cloudinary.com/vistaprint/images/c_scale,w_448,h_448,dpr_1.5/f_auto,q_auto/v1711116929/ideas-and-advice-prod/en-gb/hbo/hbo.png?_i=AA",
  },
  {
    id: 2,
    title: "Second",
    description: "Second description",
    image:
      "https://res.cloudinary.com/vistaprint/images/c_scale,w_448,h_448,dpr_1.5/f_auto,q_auto/v1711116920/ideas-and-advice-prod/en-gb/nasa/nasa.png?_i=AA",
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
      <SheSidebarHeader items={companies} />
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
