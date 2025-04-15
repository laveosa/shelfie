import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";

import HomeIcon from "@/assets/icons/house-solid.svg?react";
import SheLogo from "@/assets/icons/Shelfie_logo.svg?react";
import Logo from "@/assets/images/AuthLogo.png";
import { Search } from "lucide-react";

export function DashboardPage() {
  const service = useDashboardPageService();

  function onAction(event) {
    console.log(event);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <Search />

      <SheIcon icon={HomeIcon} color="red" />
      <SheIcon icon={SheLogo} />
      <SheIcon
        icon={Logo}
        iconView={IconViewEnum.CIRCLE}
        minWidth="100px"
        hoverEffect
        onClick={onAction}
      />
      <SheIcon icon={Search} color="#38C0FF" />
    </div>
  );
}
