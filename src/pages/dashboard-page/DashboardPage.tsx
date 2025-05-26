import React, { useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import SheMultiSelect from "@/components/primitive/she-multi-select/SheMultiSelect.tsx";
import SheBadge from "@/components/primitive/she-badge/SheBadge.tsx";

const frameworksList = [
  { value: "react", label: "React", icon: Turtle },
  { value: "angular", label: "Angular", icon: Cat },
  { value: "vue", label: "Vue", icon: Dog },
  { value: "svelte", label: "Svelte", icon: Rabbit },
  { value: "ember", label: "Ember", icon: Fish },
];

export function DashboardPage() {
  const service = useDashboardPageService();

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "react",
    "angular",
  ]);

  // ================================================================== EVENT

  // ================================================================== LAYOUT

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheBadge
        disabled
        text="test"
        textTransKey="09wjef9wje0"
        onClick={(event) => console.log("onClick: ", event)}
        onClose={() => console.log("onClose: ===")}
      />
      <br />
      <SheBadge text="Test" textTransKey="09wjef9wje0" hideCloseBtn />
      <br />
      <SheBadge text="TEST" textTransKey="09wjef9wje0" hideCloseBtn />

      <br />

      {/*<div className="p-4 max-w-xl">
        <SheMultiSelect
          options={frameworksList}
          onValueChange={setSelectedFrameworks}
          placeholder="Select frameworks"
          maxCount={3}
        />
      </div>*/}

      <br />
    </div>
  );
}
