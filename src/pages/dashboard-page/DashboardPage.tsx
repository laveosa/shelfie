import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import SheOption from "@/components/primitive/she-option/SheOption.tsx";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";

const options: ISheOption[] = [
  {
    text: "option 1",
    value: 1,
  },
  {
    text: "option 2",
    value: "2",
  },
  {
    text: "option 3",
    value: [1, "2", 3, "4"],
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

      <div>
        {options.map((option) => (
          <SheOption
            key={option.text}
            mode="multiple"
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
