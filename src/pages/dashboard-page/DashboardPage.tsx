import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

import { LucideProps, Search, User2 } from "lucide-react";
import SvgLogo from "@/assets/icons/Shelfie_logo.svg";
import ImageLogo from "@/assets/images/AuthLogo.png";
import React from "react";

export function DashboardPage() {
  const service = useDashboardPageService();

  function Icon({ icon: Icon }: { icon: React.FC<LucideProps> }) {
    return <Icon />;
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <SheIcon icon={User2} />
      <SheIcon icon={SvgLogo} />
      <SheIcon icon={ImageLogo} />
    </div>
  );
}
