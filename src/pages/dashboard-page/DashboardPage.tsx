import React, { useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import { Box } from "lucide-react";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { SheTooltipEnum } from "@/const/enums/SheTooltipEnum.ts";
import SheMultiSelect from "@/components/primitive/she-multi-select/SheMultiSelect.tsx";

const options: ISheSelectItem<any>[] = [
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
    toggleClassName: "INNER-CELL-CLASS-NAME",
    toggleStyle: { border: "1px solid red" },
    iconClassName: "INNER-CELL-CLASS-NAME",
    iconStyle: { border: "1px solid red" },
    colorsClassName: "INNER-CELL-CLASS-NAME",
    colorsStyle: { border: "1px solid red" },
    infoClassName: "INNER-CELL-CLASS-NAME",
    infoStyle: { border: "1px solid red" },
    tooltipClassName: "INNER-CELL-CLASS-NAME",
    tooltipStyle: { border: "1px solid red" },
    view: "card",
    checkOnClick: true,
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
    checkOnClick: true,
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
    isSelected: true,
    icon: Box,
  },
];

const optionsSimple: ISheSelectItem<string>[] = [
  {
    text: "React",
    value: "REACT",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
  },
  {
    text: "Angular",
    value: "ANGULAR",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png",
    isSelected: true,
  },
  {
    text: "Vue",
    value: "VUE",
    icon: "https://www.w3schools.com/whatis/img_vue.jpg",
    isSelected: true,
  },
  {
    text: "Svelte",
    value: "SVELTE",
    icon: "https://logosandtypes.com/wp-content/uploads/2020/11/Svelte.png",
  },
  {
    text: "Flutter",
    value: "FLUTTER",
    icon: "https://images.icon-icons.com/2108/PNG/512/flutter_icon_130936.png",
  },
  {
    text: "Knockout",
    value: "KNOCKOUT",
    icon: "https://quintagroup.com/cms/js/js-image/knockout-js-logo.png/@@images/f4756dda-f9a9-4c04-9223-9f5724569747.png",
    isSelected: true,
  },
  {
    text: "JavaScript",
    value: "JS",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png",
  },
  {
    text: "HTML",
    value: "HTML",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png",
  },
  {
    text: "CSS",
    value: "CSS",
    icon: "https://images.seeklogo.com/logo-png/18/1/css3-logo-png_seeklogo-186678.png",
  },
];

export function DashboardPage() {
  const service = useDashboardPageService();

  const [selected, setSelected] = useState<boolean>();

  // ================================================================== EVENT

  // ================================================================== LAYOUT

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      {/*<div className="flex flex-col">
        {options.map((item) => (
          <SheOption
            {...item}
            key={item.text}
            className="mb-2"
            mode="multiple"
            isSelected={selected}
            showColorsColumn
            showIconsColumn
            aria-describedby="sss"
            checkOnClick
            onCheck={(data) => console.log("onCheck: ", data)}
            onClick={(data) => console.log("onClick: ", data)}
          />
        ))}
      </div>*/}

      <br />

      {/*<SheSelect<string>
        items={options}
        // items={optionsSimple}
        showClearBtn
        isOpen
        onSelect={(value) => console.log("select: ", value)}
        onSelectModel={(value) => console.log("select model: ", value)}
      />*/}

      <br />

      <SheMultiSelect<string>
        items={optionsSimple}
        contextType="badges"
        fullWidth
        showClearBtn
        showSearch
        searchValue="react"
        onSelect={(value) => console.log("select: ", value)}
        onSelectModel={(value) => console.log("select model: ", value)}
      />

      <br />

      <SheSelect<string>
        items={options}
        // items={optionsSimple}
        showClearBtn
        onSelect={(value) => console.log("select: ", value)}
        onSelectModel={(value) => console.log("select model: ", value)}
      />

      {/*<div className="flex gap-2 items-center justify-between">
        <div className="w-full flex">
          <SheMultiSelect<string>
            items={options}
            contextType="badges"
            fullWidth
            showClearBtn
            onSelect={(value) => console.log("select: ", value)}
            onSelectModel={(value) => console.log("select model: ", value)}
          />
        </div>
        <div className="w-full flex">
          <SheSelect<string>
            // items={options}
            items={optionsSimple}
            fullWidth
            showClearBtn
            onSelect={(value) => console.log("select: ", value)}
            onSelectModel={(value) => console.log("select model: ", value)}
          />
        </div>
      </div>*/}

      <br />
    </div>
  );
}
