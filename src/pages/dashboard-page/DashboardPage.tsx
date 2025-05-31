import React, { useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import { Cat, ChevronDown, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";

const frameworksList: ISheMultiSelectItem[] = [
  { value: "1", text: "React", icon: Turtle },
  { value: 1, text: "Angular", icon: Cat },
  { value: true, text: "Vue", icon: Dog },
  { value: { title: "svelte" }, text: "Svelte", icon: Rabbit },
  { value: "ember", text: "Ember", icon: Fish },
];

/*const badges: ISheBadge[] = [
  {
    text: "Apple 1111111",
  },
  {
    text: "Banana",
    icon: Box,
  },
  {
    text: "Peach2222222222222",
  },
  {
    text: "Orange",
  },
  {
    text: "Apple 1111111",
  },
  {
    text: "Banana",
    icon: Box,
  },
  {
    text: "Peach2222222222222",
  },
  {
    text: "Orange",
  },
  {
    text: "Apple 1111111",
  },
  {
    text: "Banana",
    icon: Box,
  },
  {
    text: "Peach2222222222222",
  },
  {
    text: "Orange",
  },
];*/

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

      <div className="flex gap-2 items-center">
        <SheButton
          value="Toggle Btn Size"
          onClick={() =>
            setBtnSize((prevState) => {
              return prevState !== "small" ? "small" : "normal";
            })
          }
        />

        <SheButton
          value="Twist Icon"
          onClick={() => setTwistIcon((prevState) => !prevState)}
        />
      </div>

      <br />
      <h2>Icon Btn</h2>

      <div className="flex gap-2 items-center">
        <SheButton icon={ChevronDown} twistIcon={twistIcon} size={btnSize} />
        <SheButton
          icon={ChevronDown}
          iconPosition={DirectionEnum.RIGHT}
          twistIcon={twistIcon}
          size={btnSize}
          variant="secondary"
          autoFocus
        />
        <SheButton
          icon={ChevronDown}
          iconPosition={DirectionEnum.RIGHT}
          twistIcon={twistIcon}
          size={btnSize}
          variant="destructive"
          autoFocus
        />
        <SheButton
          icon={ChevronDown}
          iconPosition={DirectionEnum.RIGHT}
          twistIcon={twistIcon}
          size={btnSize}
          variant="ghost"
          autoFocus
        />
        <SheButton
          icon={ChevronDown}
          twistIcon={twistIcon}
          size={btnSize}
          variant="outline"
        />
        <SheButton
          icon={ChevronDown}
          twistIcon={twistIcon}
          size={btnSize}
          variant="link"
        />
        <SheButton
          icon={ChevronDown}
          twistIcon={twistIcon}
          size={btnSize}
          variant="default"
        />
      </div>

      <br />
      <h2>Text Btn</h2>
      <div className="flex gap-2 items-center">
        <SheButton
          size={btnSize}
          value="no variant"
          iconPosition={DirectionEnum.RIGHT}
        />
        <SheButton
          size={btnSize}
          value="SECONDARY"
          variant="secondary"
          iconPosition={DirectionEnum.RIGHT}
        />
        <SheButton
          size={btnSize}
          value="destructive"
          variant="destructive"
          iconPosition={DirectionEnum.RIGHT}
        />
        <SheButton size={btnSize} value="GHOST" variant="ghost" />
        <SheButton size={btnSize} value="outline" variant="outline" />
        <SheButton size={btnSize} value="LINK" variant="link" />
        <SheButton size={btnSize} value="default" variant="default" />
      </div>

      <h2>Text Btn with min width</h2>
      <div className="flex gap-2 items-center">
        <SheButton size={btnSize} minWidth="100px" value="no variant" />
        <SheButton
          size={btnSize}
          iconPosition={DirectionEnum.RIGHT}
          minWidth="100px"
          value="SECONDARY"
          variant="secondary"
        />
        <SheButton
          size={btnSize}
          iconPosition={DirectionEnum.RIGHT}
          minWidth="100px"
          value="destructive"
          variant="destructive"
        />
        <SheButton
          size={btnSize}
          iconPosition={DirectionEnum.RIGHT}
          minWidth="100px"
          value="GHOST"
          variant="ghost"
        />
        <SheButton
          size={btnSize}
          minWidth="100px"
          value="outline"
          variant="outline"
        />
        <SheButton
          size={btnSize}
          minWidth="100px"
          value="LINK"
          variant="link"
        />
        <SheButton
          size={btnSize}
          minWidth="100px"
          value="default"
          variant="default"
        />
      </div>

      <br />
      <h2>Icon and Text Btn</h2>
      <div className="flex gap-2 items-center">
        <SheButton
          icon={ChevronDown}
          iconPosition={DirectionEnum.RIGHT}
          twistIcon={twistIcon}
          size={btnSize}
          value="no variant"
        />
        <SheButton
          icon={ChevronDown}
          iconPosition={DirectionEnum.RIGHT}
          twistIcon={twistIcon}
          size={btnSize}
          value="secondary"
          variant="secondary"
        />
        <SheButton
          icon={ChevronDown}
          iconPosition={DirectionEnum.RIGHT}
          twistIcon={twistIcon}
          size={btnSize}
          value="DESTRUCTIVE"
          variant="destructive"
        />
        <SheButton
          icon={ChevronDown}
          twistIcon={twistIcon}
          size={btnSize}
          value="ghost"
          variant="ghost"
        />
        <SheButton
          icon={ChevronDown}
          twistIcon={twistIcon}
          size={btnSize}
          value="OUTLINE"
          variant="outline"
        />
        <SheButton
          icon={ChevronDown}
          twistIcon={twistIcon}
          size={btnSize}
          value="link"
          variant="link"
        />
        <SheButton
          icon={ChevronDown}
          twistIcon={twistIcon}
          size={btnSize}
          value="DEFAULT"
          variant="default"
        />
      </div>

      <br />
      <h2>Icon and Text Btn with min width</h2>
      <div className="flex gap-2 items-center">
        <SheButton
          icon={ChevronDown}
          iconPosition={DirectionEnum.RIGHT}
          twistIcon={twistIcon}
          size={btnSize}
          minWidth="200px"
          value="no variant"
        />
        <SheButton
          icon={ChevronDown}
          iconPosition={DirectionEnum.RIGHT}
          twistIcon={twistIcon}
          size={btnSize}
          value="secondary"
          minWidth="200px"
          variant="secondary"
        />
        <SheButton
          icon={ChevronDown}
          twistIcon={twistIcon}
          size={btnSize}
          value="DESTRUCTIVE"
          minWidth="200px"
          variant="destructive"
        />
        <SheButton
          icon={ChevronDown}
          twistIcon={twistIcon}
          size={btnSize}
          value="ghost"
          minWidth="200px"
          variant="ghost"
        />
      </div>

      <br />

      <div className="flex gap-2 items-center">
        <SheButton
          icon={ChevronDown}
          twistIcon={twistIcon}
          size={btnSize}
          value="OUTLINE OUTLINE OUTLINE OUTLINE OUTLINE"
          minWidth="200px"
          maxWidth="200px"
          valueWrap
          variant="outline"
        />
        <SheButton
          icon={ChevronDown}
          twistIcon={twistIcon}
          size={btnSize}
          value="link link link link linklinklinklinklinklinklinklinklinklinklinklinklinklinklinklink"
          minWidth="200px"
          maxWidth="200px"
          valueWrap
          variant="link"
        />
        <SheButton
          icon={ChevronDown}
          twistIcon={twistIcon}
          size={btnSize}
          value="DEFAULTDEFAULTDEFAULTDEFAULTDEFAULTDEFAULTDEFAULTDEFAULTDEFAULTDEFAULT"
          minWidth="200px"
          maxWidth="200px"
          variant="default"
        />
      </div>

      <br />

      {/*<SheBadgeList
        label="Badges:"
        tooltip="some text for tooltip KKKK"
        items={badges}
        // componentView="card"
        maxWidth="400px"
        itemsWrap="nowrap"
        showCloseBtn
        showClearBtn
        onClick={(value) => console.log("onClick: ", value)}
        onClose={(value) => console.log("onClose: ", value)}
        onClear={(value) => console.log("onClear: ", value)}
      />*/}

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
