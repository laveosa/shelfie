import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

import ImageLogo from "@/assets/images/AuthLogo.png";
import SvgLogo from "@/assets/icons/Shelfie_logo.svg?react";
import Home from "@/assets/icons/house-solid.svg?react";
import { Search, User2 } from "lucide-react";

export function DashboardPage() {
  const service = useDashboardPageService();

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <SheIcon icon={ImageLogo} />
      <SheIcon icon={SvgLogo} />
      <SheIcon icon={Home} />
      <SheIcon icon={User2} />
    </div>
  );
}
