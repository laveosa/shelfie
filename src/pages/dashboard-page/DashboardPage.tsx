import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheAutocomplete from "@/components/primitive/she-autocomplete/SheAutocomplete.tsx";
import { ISheAutocompleteItem } from "@/const/interfaces/primitive-components/ISheAutocompleteItem.ts";

const options: any[] = [
  {
    text: "karndash2",
    value: "ONE",
  },
  {
    text: "muza333",
    value: 2,
  },
  {
    text: "kraft222",
    value: [1, "THREE", true, ["semmy", 2, 3, "okk"], { name: "user", age: 3 }],
  },
  {
    text: "kentuky1212",
    value: { name: "user", age: 3 },
  },
  {
    text: "overner111",
    value: [1, 2, 3, 4],
  },
  {
    text: "seciro222",
    value: "3333 kenny",
  },
];

export function DashboardPage() {
  const service = useDashboardPageService();

  const [_options, setOptions] = useState<ISheAutocompleteItem[]>(null);

  useEffect(() => {
    setOptions(options);
  }, []);

  // ================================================================== EVENT

  // ================================================================== LAYOUT

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>
      <br />
      <br />

      <SheAutocomplete
        label="Autocomplete"
        labelTransKey="9we09wjef09j"
        items={_options}
        autoFocus
        onChange={(value) => console.log("onChange: ", value)}
        onBlur={(value) => console.log("onBlur: ", value)}
        onSearch={(value) => console.log("onSearch: ", value)}
        onSelect={(value) => console.log("onSelect: ", value)}
      />
    </div>
  );
}
