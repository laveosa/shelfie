import { useState } from "react";
import { Trans } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

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
import SheSidebarHeader from "@/components/complex/she-sidebar/components/she-sidebar-header/SheSidebarHeader.tsx";
import { ISheSidebar } from "@/const/interfaces/complex-components/ISheSidebar.ts";
import { ISheSidebarGroup } from "@/const/interfaces/complex-components/ISheSidebarGroup.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { ISheSidebarItem } from "@/const/interfaces/complex-components/ISheSidebarItem.ts";
import { getCurrentSectionUrl } from "@/utils/helpers/quick-helper.ts";

const navGroups: ISheSidebarGroup[] = [
  {
    title: "ACTIVITY",
    transKey: "SheSidebar.GroupTitle.Active",
    items: [
      {
        title: "Dashboard",
        transKey: "SheSidebar.NavItems.Dashboard",
        url: NavUrlEnum.DASHBOARD,
        icon: LayoutDashboard,
      },
      {
        title: "Products",
        transKey: "SheSidebar.NavItems.Products",
        url: NavUrlEnum.PRODUCTS,
        icon: Shirt,
      },
      {
        title: "Messenger",
        transKey: "SheSidebar.NavItems.Messenger",
        url: NavUrlEnum.MESSENGER,
        icon: MessageCircle,
      },
      {
        title: "Sales",
        transKey: "SheSidebar.NavItems.Sales",
        url: `${NavUrlEnum.SALES}`,
        icon: ReceiptEuro,
      },
      {
        title: "Transmissions",
        transKey: "SheSidebar.NavItems.Transmissions",
        url: NavUrlEnum.TRANSMISSIONS,
        icon: Video,
      },
    ],
  },
  {
    title: "CUSTOMERS",
    transKey: "SheSidebar.GroupTitle.Customers",
    items: [
      {
        title: "Customers",
        transKey: "SheSidebar.NavItems.Customers",
        url: NavUrlEnum.CUSTOMERS,
        icon: Users,
      },
    ],
  },
  {
    title: "SETUP",
    transKey: "SheSidebar.GroupTitle.Setup",
    items: [
      {
        title: "Setting",
        transKey: "SheSidebar.NavItems.Settings",
        url: NavUrlEnum.SETTINGS,
        icon: Settings,
      },
      {
        title: "Support",
        transKey: "SheSidebar.NavItems.Support",
        url: NavUrlEnum.SUPPORT,
        icon: LifeBuoy,
      },
    ],
  },
];

export default function SheSidebar({
  isSidebarHeaderLoading,
  user,
  userOrganizations,
  onSelectedOrganizations,
}: ISheSidebar) {
  const location = useLocation();
  const [selected, setSelected] = useState<NavUrlEnum | string>(
    getCurrentSectionUrl(location.pathname),
  );

  return (
    <Sidebar className={cs.sheSidebar} collapsible="icon">
      <SheSidebarHeader
        isLoading={isSidebarHeaderLoading}
        items={userOrganizations}
        selectedOrganization={user?.organization}
        onSelectOrganization={onSelectedOrganizations}
      />
      <SidebarContent className={cs.sidebarContent}>
        {navGroups.map((group: ISheSidebarGroup) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>
              <span className={cs.groupTitle}>
                <Trans i18nKey={group.transKey}>{group.title}</Trans>
              </span>
            </SidebarGroupLabel>
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
                      <span className={cs.navItemTitle}>
                        <Trans i18nKey={item.transKey}>{item.title}</Trans>
                      </span>
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
