import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelect.ts";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";
import Logo from "@/assets/images/AuthLogo.png";
import { Search, Users } from "lucide-react";

const _items: ISheSelectItem[] = [
  {
    text: "Option 1",
    value: 1,
  },
  {
    text: "Option 2",
    value: "TWO",
  },
  {
    text: "Option 3",
    // description: "some description for select item NO: 3",
    value: {
      name: "User",
      age: 32,
      isMarried: true,
    },
  },
];

export function DashboardPage() {
  const service = useDashboardPageService();

  const [options, setOptions] = useState<ISheSelectItem[]>(null);
  const [selected, setSelected] = useState<ISheSelectItem>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setOptions(_items);
    }, 1000);

    setTimeout(() => {
      setSelected(options ? options[2].value : null);
      setLoading(false);
    }, 2000);
  });

  function onAction(event) {
    console.log(event);
  }

  function onOpenHandler(event) {
    console.log(event);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <div className="flex gap-10">
        <SheSelect
          label="Select ONE"
          items={options}
          selected={selected}
          icon={Users}
          hideFirstOption
          showClearBtn
          isLoading={loading}
          isOpen
          onSelect={onAction}
        />

        <SheSelect
          label="Select TWO"
          items={_items}
          selected={_items[2].value}
          icon={Users}
          hideFirstOption
          showClearBtn
          isLoading={loading}
          isOpen
          onSelect={onAction}
        />
      </div>

      <br />
    </div>
  );
}
