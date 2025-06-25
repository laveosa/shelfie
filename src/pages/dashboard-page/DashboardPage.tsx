import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheOption from "@/components/primitive/she-option/SheOption.tsx";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";
import { Box } from "lucide-react";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";

const options: ISheOption<any>[] = [
  {
    id: "OPTION_1",
    text: "option 1",
    description: "some description",
    sideText: "DB-12",
    sideDescription:
      "jewj 2902 9j293j 932j 09j2390j 3209 j2039j 2039j 293j 032j09 32j09 2j39 j2390j 90j 32 we jewj 2902 9j293j 932j 09j2390j 3209 j2039j 2039j 293j 032j09 32j09 2j39 j2390j 90j 32 we jewj 2902 9j293j 932j 09j2390j 3209 j2039j 2039j 293j 032j09 32j09 2j39 j2390j 90j 32 we ",
    value: 1,
    isSelected: true,
    tooltip: {
      text: "some text for tooltip",
    },
  },
  {
    id: "OPTION_2",
    text: "option 2",
    value: "2",
    description:
      "some description s ewew 23 23 23d23d2 d23d 23 d23d 23d 23d 23d2 some description s ewew 23 23 23d23d2 d23d 23 d23d 23d 23d 23d2 some description s ewew 23 23 23d23d2 d23d 23 d23d 23d 23d 23d2 some description s ewew 23 23 23d23d2 d23d 23 d23d 23d 23d 23d2 some description s ewew 23 23 23d23d2 d23d 23 d23d 23d 23d 23d2 ",
    sideText: "BG-40",
    sideDescription: "some small side description",
    colors: ["red", "blue"],
  },
  {
    id: "OPTION_3",
    text: "d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d ",
    textTransKey: "9jwe09jwe9jwe9f0j",
    description:
      "d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d ",
    descriptionTransKey: "jfw90fj2309fjwefjwjef",
    sideText:
      "d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d ",
    sideTextTransKey: "j09f2jf9jwfkwjeflwjef",
    sideDescription:
      "d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d ",
    sideDescriptionTransKey: "f9ewf09jwe0f9jw09efj9wjefwe",
    value: [1, "2", 3, "4"],
    icon: Box,
  },
];

export function DashboardPage() {
  const service = useDashboardPageService();

  // ================================================================== EVENT

  // ================================================================== LAYOUT

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheToggle text="some text" isLoading />

      <br />

      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <SheOption
            key={option.text}
            className="SOME_CUSTOM_CLASS_NAME_FOR_PTION_COMPONENT"
            mode="multiple"
            view="card"
            showIconsColumn
            showColorsColumn
            checkOnClick
            onCheck={(data, event) => console.log("onCheck: ", data, event)}
            onClick={(data, event) => console.log("onClick: ", data, event)}
            {...option}
          />
        ))}
      </div>

      <br />
    </div>
  );
}
