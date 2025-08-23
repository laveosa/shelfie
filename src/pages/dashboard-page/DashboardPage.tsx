import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { UserModel } from "@/const/models/UserModel.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import { ContextPatternEnum } from "@/const/enums/ContextPatternEnum.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";
import SheBadgeList from "@/components/primitive/she-badge-list/SheBadgeList.tsx";
import UserForm from "@/components/forms/user-form/UserForm.tsx";

import { Home } from "lucide-react";
import HomeSolid from "@/assets/icons/house-solid.svg?react";
import Logo from "@/assets/images/AuthLogo.png";
const ImageSVG = "https://www.svgrepo.com/show/303206/javascript-logo.svg";

const badges: ISheBadge<any>[] = [
  {
    text: "JS",
  },
  {
    icon: "https://www.svgrepo.com/show/303206/javascript-logo.svg",
  },
  {
    text: "JS",
    icon: "https://www.svgrepo.com/show/303206/javascript-logo.svg",
    value: {
      logo: "https://www.svgrepo.com/show/303206/javascript-logo.svg",
      value: "JS",
      description: "programing language",
      priority: 1,
      isActive: true,
    },
  },
  {
    text: "Angular",
    icon: "https://www.svgrepo.com/show/353396/angular-icon.svg",
    value: 111,
  },
  {
    text: "React",
    icon: "https://www.svgrepo.com/show/452092/react.svg",
    value: "in Progress",
  },
  {
    text: "Vue",
    icon: "https://www.svgrepo.com/show/452130/vue.svg",
    value: ["to", "do"],
  },
  {
    text: "Knockout",
    icon: "https://cdn.prod.website-files.com/62865614b39c464b76d339aa/683f1b2987a7298d7434d17d_Knockoutjs.svg",
    value: false,
  },
  {
    text: "Flutter",
    icon: "https://images.seeklogo.com/logo-png/35/2/flutter-logo-png_seeklogo-354671.png",
    value: ContextPatternEnum.EMAIL,
  },
];

const genders: ISheSelectItem<string>[] = [
  {
    text: "male",
    value: "male",
  },
  {
    text: "female",
    value: "female",
  },
  {
    text: "unicorn",
    value: "unicorn",
  },
  {
    text: "banana",
    value: "banana",
  },
];

const position: ISheSelectItem<string>[] = [
  {
    text: "Frontend",
    value: "Frontend",
  },
  {
    text: "Backend",
    value: "Backend",
  },
  {
    text: "HR",
    value: "HR",
  },
  {
    text: "SEO",
    value: "SEO",
  },
  {
    text: "Designer",
    value: "Designer",
  },
];

const user: UserModel = {
  name: "Anton",
  age: 32,
  email: "anton@yahoo.com",
  address: "Levetano 3/23",
  gender: "male",
  position: "SEO",
  isAvailable: true,
  tags: [badges[0], badges[1], badges[2], badges[4]],
};

export function DashboardPage() {
  const service = useDashboardPageService();

  const [_user, setUser] = useState<UserModel>(null);
  const [_badges, setBadges] = useState<ISheBadge<any>[]>(null);

  useEffect(() => {
    setTimeout(() => {
      setUser(user);
      setBadges(badges);
    }, 3000);
  }, []);

  // ================================================================== STATE

  // ================================================================== EVENT HANDLERS

  function onAction(event, model?) {
    console.log("EVENT: ", event);
    console.log("MODEL: ", model);
  }

  // ================================================================== LAYOUT
  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>
      <br />
      <br />

      {/*<SheIcon icon={Home} />
      <br />
      <SheIcon icon={HomeSolid} />
      <br />
      <SheIcon icon={Logo} />
      <br />
      <SheIcon icon={ImageSVG} />*/}

      {/*<SheBadgeList
        label="Frameworks"
        // items={badges}
        items={position}
        onClick={(event, model) => console.log("ON_CLICK: ", event, model)}
        onClose={(event, model) => console.log("ON_CLOSE: ", event, model)}
        onCloseAllExtra={(event, model) =>
          console.log("ON_CLOSE_ALL_EXTRA: ", event, model)
        }
        onClear={(event, model) => console.log("ON_CLEAR: ", event, model)}
      />*/}

      <br />
      <br />

      <UserForm
        data={_user}
        genders={genders}
        positions={position}
        // badges={position}
        badges={badges}
        notDisabledSubmit
        onSubmit={onAction}
        onCancel={onAction}
      />

      <br />
      <br />

      {/*<SheTestForm />*/}

      <br />
      <br />
    </div>
  );
}
