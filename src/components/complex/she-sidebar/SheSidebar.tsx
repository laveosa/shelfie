import cs from "./SheSidebar.module.scss";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
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
import { ISheSidebar } from "@/const/interfaces/complex-components/ISheSidebar.ts";
import { ISheSidebarGroup } from "@/const/interfaces/complex-components/ISheSidebarGroup.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { ISheSidebarItem } from "@/const/interfaces/complex-components/ISheSidebarItem.ts";
import { NavLink } from "react-router-dom";
import { useState } from "react";

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

const navGroups: ISheSidebarGroup[] = [
  {
    title: "ACTIVITY",
    items: [
      {
        title: "Dashboard",
        url: NavUrlEnum.DASHBOARD,
        icon: LayoutDashboard,
      },
      {
        title: "Products",
        url: NavUrlEnum.PRODUCTS,
        icon: Shirt,
      },
      {
        title: "Messenger",
        url: NavUrlEnum.MESSENGER,
        icon: MessageCircle,
      },
      {
        title: "Orders",
        url: NavUrlEnum.ORDERS,
        icon: ReceiptEuro,
      },
      {
        title: "Transmissions",
        url: NavUrlEnum.TRANSMISSIONS,
        icon: Video,
      },
    ],
  },
  {
    title: "USERS",
    items: [
      {
        title: "Users",
        url: NavUrlEnum.USERS,
        icon: Users,
      },
    ],
  },
  {
    title: "SETUP",
    items: [
      {
        title: "Setting",
        url: NavUrlEnum.SETTINGS,
        icon: Settings,
      },
      {
        title: "Support",
        url: NavUrlEnum.SUPPORT,
        icon: LifeBuoy,
      },
    ],
  },
];

export default function SheSidebar({}: ISheSidebar) {
  const [selected, setSelected] = useState<NavUrlEnum>(NavUrlEnum.DASHBOARD);

  return (
    <Sidebar className={cs.sheSidebar} collapsible="icon">
      <SheSidebarHeader items={companies} />
      <SidebarContent className={cs.sidebarContent}>
        {navGroups.map((group: ISheSidebarGroup) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item: ISheSidebarItem) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      selected === item.url ? cs.sidebarItemActive : ""
                    }
                    tooltip={item.title}
                    onClick={() => setSelected(item.url)}
                  >
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
