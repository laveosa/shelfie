import React, { useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import {
  Apple,
  Banana,
  Box,
  Cat,
  Dog,
  Fish,
  Home,
  LetterText,
  Lock,
  Rabbit,
  Turtle,
  Users,
} from "lucide-react";
import SheMultiSelect from "@/components/primitive/she-multi-select/SheMultiSelect.tsx";
import SheBadge from "@/components/primitive/she-badge/SheBadge.tsx";
import SheBadgeList from "@/components/primitive/she-badge-list/SheBadgeList.tsx";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";

const frameworksList = [
  { value: "1", label: "React", icon: Turtle },
  { value: 1, label: "Angular", icon: Cat },
  { value: true, label: "Vue", icon: Dog },
  { value: { title: "svelte" }, label: "Svelte", icon: Rabbit },
  { value: "ember", label: "Ember", icon: Fish },
];

const badges: ISheBadge[] = [
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
];

export function DashboardPage() {
  const service = useDashboardPageService();

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "react",
    "angular",
  ]);

  // ================================================================== EVENT

  function onAction(value) {
    console.log(value);
  }

  // ================================================================== LAYOUT

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <div className="flex gap-2 items-center">
        <SheBadge
          text="No Variant"
          icon={Apple}
          iconColor="red"
          isLoading
          onClick={(value) => console.log("onClick: ", value)}
        />
        <SheBadge
          text="Default"
          icon={Banana}
          variant="destructive"
          textColor="yellow"
          isLoading
          onClick={(value) => console.log("onClick: ", value)}
        />
        <SheBadge
          text="Outline"
          icon={LetterText}
          variant="outline"
          color="blue"
          isLoading
          onClick={(value) => console.log("onClick: ", value)}
        />
        <SheBadge
          text="Secondary"
          icon={Box}
          variant="secondary"
          isLoading
          showCloseBtn
        />
        <SheBadge
          text="Destructive"
          icon={Lock}
          variant="destructive"
          isLoading
          showCloseBtn
        />
        <SheBadge
          icon={Home}
          isLoading
          onClick={(value) => console.log("onClick: ", value)}
        />
        <SheBadge
          icon={Home}
          showCloseBtn
          isLoading
          onClick={(value) => console.log("onClick: ", value)}
        />
        <SheBadge text={44} variant="secondary" isLoading />
        <SheBadge
          text={4}
          showCloseBtn
          isLoading
          onClick={(value) => console.log("onClick: ", value)}
        />
      </div>

      <br />

      {/*<SheBadgeList
        label="Badges:"
        tooltip="some text for tooltip KKKK"
        items={badges}
        showClearBtn
        required
        componentView="card"
        elementMaxWidth="100px"
        onClick={(value) => console.log("onClick: ", value)}
        onClose={(value) => console.log("onClose: ", value)}
        onClear={(value) => console.log("onClear: ", value)}
      />*/}

      <br />

      {/*<SheMultiSelect
        options={frameworksList}
        placeholder="Select frameworks"
        onValueChange={onAction}
        onIsOpen={(event) => console.log("onIsOpen: ", event)}
        onClear={(event) => console.log("onClear: ", event)}
      />*/}

      <br />
    </div>
  );
}
