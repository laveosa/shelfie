import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheOption from "@/components/primitive/she-option/SheOption.tsx";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";
import { Box } from "lucide-react";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

const options: ISheSelectItem[] = [
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

const optionsSimple: ISheSelectItem[] = [
  {
    text: "React",
    value: "REACT",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
  },
  {
    text: "Angular",
    value: "ANGULAR",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png",
  },
  {
    text: "Vue",
    value: "VUE",
    icon: "https://www.w3schools.com/whatis/img_vue.jpg",
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
  },
  {
    text: "React",
    value: "REACT",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
  },
  {
    text: "Angular",
    value: "ANGULAR",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png",
  },
  {
    text: "Vue",
    value: "VUE",
    icon: "https://www.w3schools.com/whatis/img_vue.jpg",
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
  },
  {
    text: "React",
    value: "REACT",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
  },
  {
    text: "Angular",
    value: "ANGULAR",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png",
  },
  {
    text: "Vue",
    value: "VUE",
    icon: "https://www.w3schools.com/whatis/img_vue.jpg",
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

      {/*<div className="flex flex-col">
        {options.map((item) => (
          <SheOption
            className="mb-2"
            view="card"
            mode="multiple"
            showColorsColumn
            showIconsColumn
            {...item}
          />
        ))}
      </div>*/}

      <br />

      <SheSelect<string>
        label="Select"
        // items={options}
        items={optionsSimple}
        onSelect={(value) => console.log(value)}
      />

      <br />
    </div>
  );
}
