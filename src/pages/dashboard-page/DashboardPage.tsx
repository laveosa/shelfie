import React, { useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import {
  Box,
  Cat,
  ChevronDown,
  Cigarette,
  Dog,
  Fish,
  Rabbit,
  Search,
  Turtle,
  User,
} from "lucide-react";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import SheBadgeList from "@/components/primitive/she-badge-list/SheBadgeList.tsx";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import SheMultiSelect from "@/components/primitive/she-multi-select/SheMultiSelect.tsx";
import SheCalendar from "@/components/primitive/she-calendar/SheCalendar.tsx";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";

const optionsNumber: ISheMultiSelectItem[] = [
  { value: 1, text: "1", icon: Turtle },
  { value: 2, text: "2", icon: Cat },
  { value: 3, text: "3", icon: Dog },
  { value: 4, text: "4", icon: Rabbit },
  { value: 5, text: "5", icon: Fish },
];

const optionsString: ISheMultiSelectItem[] = [
  { value: "One", text: "One" },
  { value: "Two", text: "Two" },
  { value: "Three", text: "Three" },
  { value: "Fore", text: "Fore" },
  { value: "Five", text: "Five" },
];

const optionsArr: ISheMultiSelectItem[] = [
  { value: [1, "One"], text: "Arr 1" },
  { value: [2, "Two"], text: "Arr 2" },
  { value: [3, "Three"], text: "Arr 3" },
  { value: [4, "Fore"], text: "Arr 4" },
  { value: [5, "Five"], text: "Arr 5" },
];

const optionsObj: ISheMultiSelectItem[] = [
  { value: { option: 1 }, text: "Obj 1" },
  { value: { option: "2" }, text: "Obj 2" },
  { value: { option: 3 }, text: "Obj 3" },
  { value: { option: "4" }, text: "Obj 4" },
  { value: { option: 5 }, text: "Obj 5" },
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
    icon: User,
    value: { one: 1, two: "2", three: [1, "2", 3, "4"] },
  },
  {
    text: "1",
    value: 121,
    color: "#8C85E4",
    iconColor: "white",
    textColor: "white",
  },
  {
    text: "2",
    value: 2323,
  },
  {
    text: "Peach2222222222222",
    value: 2312232212,
  },
  {
    text: "3",
    icon: User,
    value: { one: 1, two: "2", three: [1, "2", 3, "4"] },
  },
  {
    text: "Apple 1111111",
    value: 3453212323,
    icon: Box,
    color: "#8C85E4",
    iconColor: "white",
    textColor: "white",
  },
  {
    text: "Banana",
    value: 5334211212,
  },
  {
    text: "Peach2222222222222",
    value: 32314334321,
  },
  {
    text: "Orange",
    icon: User,
    value: { one: 1, two: "2", three: [1, "2", 3, "4"] },
  },
  {
    text: "1",
    value: 333,
    color: "#8C85E4",
    iconColor: "white",
    textColor: "white",
  },
  {
    text: "2",
    value: 23232323,
  },
  {
    text: "Peach2222222222222",
    value: 24312112121212,
  },
  {
    text: "3",
    icon: User,
    value: 12222222222111,
  },
];

export function DashboardPage() {
  const service = useDashboardPageService();

  const [badgeItems, setBadgeItems] = useState<ISheBadge[]>(null);

  // ================================================================== EVENT

  function onAction(value) {
    // console.log(value);
  }

  // ================================================================== LAYOUT

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      {/*<br />

      <SheButton
        value="Badges"
        onClick={() => setBadgeItems(!badgeItems ? badges : null)}
      />*/}

      <br />

      {/*<SheDatePicker label="Date Picker" />*/}

      <br />

      <SheSelect
        label="Select"
        items={[
          { text: "option 1", value: 1 },
          { text: "option 2", value: 2 },
        ]}
      />

      <br />

      <SheMultiSelect
        label="Multi Select"
        options={optionsObj}
        selectedValues={[optionsObj[1].value, optionsObj[3].value]}
        placeholder="select options..."
        placeholderTransKey="023jf09jwe"
        icon={Search}
        // fullWidth
        // minWidth="400px"
        // maxWidth="200px"
        onValueChange={onAction}
        onIsOpen={(event) => console.log("onIsOpen: ", event)}
        onClear={(event) => console.log("onClear: ", event)}
      />

      <br />

      {/*<SheBadgeList
        label="Badges:"
        tooltip="some text for tooltip KKKK"
        items={badgeItems}
        // icon={Cigarette}
        // elementIcon={Cat}
        // componentView="card"
        // maxBadgeAmount={6}
        // direction="column"
        autoBadgeAmount
        // maxWidth="400px"
        // minWidth="400px"
        // fullWidth
        // itemsWrap="nowrap"
        showCloseBtn
        // showClearBtn
        onClick={(value) => console.log("onClick: ", value)}
        onClose={(value) => console.log("onClose: ", value)}
        onCloseAllExtra={(value) => console.log("onCloseAllExtra: ", value)}
        onClear={(value) => console.log("onClear: ", value)}
      />*/}

      <br />
    </div>
  );
}
