import React, { useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import { Box, Cat, ChevronDown, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import SheBadgeList from "@/components/primitive/she-badge-list/SheBadgeList.tsx";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";

const frameworksList: ISheMultiSelectItem[] = [
  { value: "1", text: "React", icon: Turtle },
  { value: 1, text: "Angular", icon: Cat },
  { value: true, text: "Vue", icon: Dog },
  { value: { title: "svelte" }, text: "Svelte", icon: Rabbit },
  { value: "ember", text: "Ember", icon: Fish },
];

const badges: ISheBadge[] = [
  {
    text: "Apple 1111111",
    value: 1,
    icon: Box,
    color: "#8C85E4",
    iconColor: "white",
    textColor: "white",
  },
  {
    text: "Banana",
    value: "2",
  },
  {
    text: "Peach2222222222222",
    value: [1, "2", 3, "4"],
  },
  {
    text: "Orange",
    value: { one: 1, two: "2", three: [1, "2", 3, "4"] },
  },
];

export function DashboardPage() {
  const service = useDashboardPageService();

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "react",
    "angular",
  ]);
  const [btnSize, setBtnSize] = useState<"normal" | "small">(null);
  const [twistIcon, setTwistIcon] = useState<boolean>(null);

  // ================================================================== EVENT

  function onAction(value) {
    // console.log(value);
  }

  // ================================================================== LAYOUT

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <br />

      <SheBadgeList
        label="Badges:"
        tooltip="some text for tooltip KKKK"
        items={badges}
        // componentView="card"
        // maxWidth="400px"
        // itemsWrap="nowrap"
        showCloseBtn
        showClearBtn
        onClick={(value) => console.log("onClick: ", value)}
        onClose={(value) => console.log("onClose: ", value)}
        onClear={(value) => console.log("onClear: ", value)}
      />

      <br />

      {/*<SheMultiSelect
        options={frameworksList}
        placeholder="Select frameworks"
        onValueChange={onAction}
        autoFocus
        onIsOpen={(event) => console.log("onIsOpen: ", event)}
        onClear={(event) => console.log("onClear: ", event)}
      />*/}

      <br />
    </div>
  );
}
