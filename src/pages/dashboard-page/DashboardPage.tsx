import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheRadioGroup from "@/components/primitive/she-radio-group/SheRadioGroup.tsx";
import { ISheRadioItem } from "@/const/interfaces/primitive-components/ISheRadioItem.ts";
import { Users } from "lucide-react";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";

const radioItems: ISheRadioItem[] = [
  {
    text: "Option 1",
    value: 1,
    icon: Users,
    description: "some description for radio item",
  },
  {
    text: "option 2",
    value: "2",
    icon: Users,
    description: "some description for radio item",
  },
  {
    text: "option 3",
    value: {
      option: "number 3",
      valid: true,
    },
    icon: Users,
    description: "some description for radio item",
  },
];

export function DashboardPage() {
  const service = useDashboardPageService();

  const [_radioItems, setRadioItems] = useState<ISheRadioItem[]>(null);
  const [_isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setRadioItems(radioItems);
      setIsLoading(false);
    }, 2000);

    setTimeout(() => {
      setIsLoading(true);
    }, 3000);

    setTimeout(() => {
      // setIsLoading(false);
    }, 5000);
  }, []);

  // ================================================================== EVENT

  function onAction(value) {
    console.log("radio value: ", value);
  }

  // ================================================================== LAYOUT

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheRadioGroup
        label="Radio Group"
        items={_radioItems}
        value={_radioItems ? _radioItems[1].value : null}
        // view={ComponentViewEnum.CARD}
        itemsView={ComponentViewEnum.CARD}
        skeletonQuantity={3}
        isLoading={_isLoading}
        onValueChange={onAction}
      />

      <br />

      {/*<SheRadioGroup
        label="Radio Group"
        items={radioItems}
        value={radioItems[1].value}
        onValueChange={onAction}
      />*/}

      <br />
    </div>
  );
}
