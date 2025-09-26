import { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import cs from "./SheSidebarHeader.module.scss";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {
  ISheSidebarHeader
} from "@/const/interfaces/complex-components/ISheSidebarHeader.ts";
import { UserOrganizationModel } from "@/const/models/UserOrganizationModel.ts";
import { getInitials } from "@/utils/helpers/quick-helper.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function SheSidebarHeader({
  isLoading,
  items,
  selectedOrganization,
  onSelectOrganization,
}: ISheSidebarHeader) {
  const [selected, setSelected] = useState<UserOrganizationModel>(null);
  const { isMobile, state } = useSidebar();

  useEffect(() => {
    setSelected(selectedOrganization);
  }, [selectedOrganization]);

  function onSelect(id: number) {
    onSelectOrganization(id);
    setSelected(items.find((item: UserOrganizationModel) => item.id));
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
                {isLoading ? (
                  <div className={cs.skeletonBlock}>
                    <Skeleton className={cs.skeletonRound} />
                    <div className={cs.skeletonBars}>
                      <Skeleton className={cs.skeletonLongBar} />
                      <Skeleton className={cs.skeletonShortBar} />
                    </div>
                  </div>
                ) : (
                  <>
                    {selected?.thumbnail ? (
                      <div className={cs.headerImage}>
                        <img src={selected?.thumbnail} alt="company-image" />
                      </div>
                    ) : (
                      <div className={cs.noImage}>
                        <span className="she-title">
                          {getInitials(selected?.name)}
                        </span>
                      </div>
                    )}
                    <div className={cs.headerInfo}>
                      <span className="she-title">{selected?.name}</span>
                    </div>
                    <ChevronsUpDown className={`ml-auto ${cs.headerChevron}`} />
                  </>
                )}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              {items?.map((item: UserOrganizationModel) => (
                <DropdownMenuItem key={item?.id} asChild>
                  <div
                    className={cs.headerItem}
                    onClick={() => onSelect(item?.id)}
                  >
                    {selected?.thumbnail ? (
                      <div className={cs.headerImage}>
                        <img src={selected?.thumbnail} alt="company-image" />
                      </div>
                    ) : (
                      <div className={cs.noImage}>
                        <span className="she-title">
                          {getInitials(selected?.name)}
                        </span>
                      </div>
                    )}
                    <span className="she-title">{item?.name}</span>
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
