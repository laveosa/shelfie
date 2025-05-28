import React, { useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import SheMultiSelect from "@/components/primitive/she-multi-select/SheMultiSelect.tsx";
import SheBadge from "@/components/primitive/she-badge/SheBadge.tsx";

const frameworksList = [
  { value: "1", label: "React", icon: Turtle },
  { value: 1, label: "Angular", icon: Cat },
  { value: true, label: "Vue", icon: Dog },
  { value: { title: "svelte" }, label: "Svelte", icon: Rabbit },
  { value: "ember", label: "Ember", icon: Fish },
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

      <br />

      <div className="p-4 max-w-xl">
        <SheMultiSelect
          options={frameworksList}
          placeholder="Select frameworks"
          onValueChange={onAction}
          onIsOpen={(event) => console.log("onIsOpen: ", event)}
          onClear={(event) => console.log("onClear: ", event)}
        />
      </div>

      <br />
    </div>
  );
}
