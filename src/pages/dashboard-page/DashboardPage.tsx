import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";

import HomeIcon from "@/assets/icons/house-solid.svg?react";
import SheLogo from "@/assets/icons/Shelfie_logo.svg?react";
import Logo from "@/assets/images/AuthLogo.png";
import { Search } from "lucide-react";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";

export function DashboardPage() {
  const service = useDashboardPageService();

  function onAction(event) {
    console.log(event);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <div className="flex gap-2 min-h-20 border-2">
        <SheIcon
          icon={Logo}
          iconView={IconViewEnum.SMOOTH}
          hoverEffect
          onClick={onAction}
        />
        <SheIcon icon={HomeIcon} color="red" iconView={IconViewEnum.CARD} />
        <SheIcon
          icon={SheLogo}
          className={cs.testLogoClass}
          iconView={IconViewEnum.BUTTON}
        />
        <SheIcon icon={Search} color="indigo" />
      </div>

      <br />

      <div className="flex gap-2 min-h-20 border-2">
        <SheButton
          value="some text"
          icon={{
            icon: HomeIcon,
            fullWidth: true,
          }}
        />
        <SheButton
          icon={{
            icon: Search,
          }}
          iconPosition={DirectionEnum.RIGHT}
          variant="secondary"
        />
        <SheButton
          icon={{
            icon: Logo,
            iconView: IconViewEnum.CIRCLE,
          }}
          variant="outline"
        />
        <SheIcon
          icon={Logo}
          iconView={IconViewEnum.SMOOTH}
          hoverEffect
          onClick={onAction}
        />
        <SheIcon icon={HomeIcon} color="red" iconView={IconViewEnum.CARD} />
        <SheIcon
          icon={SheLogo}
          className={cs.testLogoClass}
          iconView={IconViewEnum.BUTTON}
        />
      </div>

      <br />

      <div className="flex gap-2 min-h-20 border-2">
        <SheButton
          isLoading
          icon={{
            icon: Logo,
            iconView: IconViewEnum.SMOOTH,
          }}
        />
        <SheButton
          isLoading
          variant="secondary"
          icon={{
            icon: HomeIcon,
          }}
        />
        <SheButton
          isLoading
          variant="destructive"
          icon={{
            icon: HomeIcon,
          }}
        />
        <SheButton
          isLoading
          variant="outline"
          icon={{
            icon: HomeIcon,
          }}
        />
      </div>

      <br />

      <div className="flex gap-2 min-h-20 border-2">
        <SheButton isLoading value="Butoon" />
        <SheButton isLoading variant="secondary" value="Butoon" />
        <SheButton isLoading variant="destructive" value="Butoon" />
        <SheButton isLoading variant="outline" value="Butoon" />
      </div>

      <br />
    </div>
  );
}
