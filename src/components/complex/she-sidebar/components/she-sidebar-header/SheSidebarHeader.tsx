import { ChevronsUpDown } from "lucide-react";

import cs from "./SheSidebarHeader.module.scss";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { ISheSidebarHeader } from "@/const/interfaces/complex-components/ISheSidebarHeader.ts";
import { useEffect, useState } from "react";
import { CompanyModel } from "@/const/models/CompanyModel.ts";

export default function SheSidebarHeader({ items }: ISheSidebarHeader) {
  const [selected, setSelected] = useState<CompanyModel>(null);
  const { isMobile, state } = useSidebar();

  useEffect(() => {
    setSelected(items.find((item) => item.isActive));
  }, []);

  function onSelect(company: CompanyModel) {
    items.map((item: CompanyModel) => (item.isActive = item.id === company.id));
    setSelected(items.find((item) => item.isActive));
  }

  return (
    <SidebarHeader className={cs.sheSidebarHeader}>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                className={`${cs.selectedHeaderItem} ${state === "collapsed" ? cs.isCollapsed : ""}`}
              >
                <div className={cs.headerImage}>
                  <img src={selected?.image} alt="company-image" />
                </div>
                <div className={cs.headerInfo}>
                  <span className="she-text">{selected?.title}</span>
                  <span className="she-subtext">{selected?.description}</span>
                </div>
                <ChevronsUpDown className={`ml-auto ${cs.headerChevron}`} />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              {items.map((item: CompanyModel) => (
                <DropdownMenuItem key={item.id} asChild>
                  <div className={cs.headerItem} onClick={() => onSelect(item)}>
                    <img src={item.image} alt="compani-image" />
                    <span>{item.title}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
