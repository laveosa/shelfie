import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import {
  Box,
  Cat,
  ChevronDown,
  Cigarette,
  Clock,
  Dog,
  Fish,
  Lock,
  Rabbit,
  Search,
  Turtle,
  User,
  Users,
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

const optionsMix: ISheMultiSelectItem[] = [
  {
    value: 1,
    text: "1 number",
    textTransKey: "0293jsiodfjwioej",
    description: "some description for test",
    descriptionTransKey: "f32098f902f3jsdfwe",
    sideText: "OB4",
    sideTextTransKey: "32230f9j0wef",
    sideDescription: "some dess ksjdk",
    sideDescriptionTransKey: "f2903jf09wjefw",
    icon: Turtle,
    tooltip: { text: "some text for tooltip element" },
  },
  {
    value: "2",
    text: "2 string",
    textTransKey: "0293jsiodfjwioej",
    colors: ["red", "blue", "orange"],
  },
  {
    value: { option: 3 },
    text: "3 obj",
    textTransKey: "0293jsiodfjwioej",
    icon: Clock,
  },
  {
    value: [1, "2", true, { option: null }],
    text: "4 arr",
    textTransKey: "0293jsiodfjwioej",
    colors: ["#7BCBD5", "#7F434A", "#94A659", "#9A3859", "#F8E71C"],
  },
  {
    value: { option: 5 },
    text: "5 boolean",
    textTransKey: "0293jsiodfjwioej",
    tooltip: { text: "some text for tooltip element" },
  },
];

const optionsMix2: ISheMultiSelectItem[] = [
  {
    value: 1,
    text: "1 number",
    sideText: "OB4",
    icon: Turtle,
    tooltip: { text: "some text for tooltip element" },
  },
  {
    value: "2",
    text: "2 string",
    colors: ["red", "blue", "orange"],
  },
  {
    value: { option: 3 },
    text: "3 obj",
    icon: Clock,
  },
  {
    value: [1, "2", true, { option: null }],
    text: "4 arr",
    colors: ["#7BCBD5", "#7F434A", "#94A659", "#9A3859", "#F8E71C"],
  },
  {
    value: { option: 232323 },
    text: "test opium",
    textTransKey: "0293jsiodfjwioej",
    tooltip: { text: "some text for tooltip element" },
  },
  {
    value: { option: "232f3wefwe" },
    text: "carter",
    description: "sdkfjiow wien owien iwnfo wine",
  },
  {
    value: 33333,
    text: "lavanda",
  },
  {
    value: "samanta",
    text: "BB-44",
    icon: Clock,
  },
  {
    value: [1, 2, 3, 4, 5],
    text: "Folder 32",
    sideText: "B24",
    icon: Clock,
    colors: ["#7BCBD5"],
  },
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

  const [selectItems, setSelectItems] = useState<ISheMultiSelectItem[]>(null);
  const [selected, setSelected] = useState<any[]>(null);

  useEffect(() => {
    setTimeout(() => {
      setSelectItems(optionsMix);
    }, 1000);

    setTimeout(() => {
      setSelected([optionsMix[0].value, optionsMix[3].value]);
    }, 2000);
  }, []);

  // ================================================================== EVENT

  function onAction(value) {
    console.log(value);
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
        showClearBtn
      />

      <br />

      <SheMultiSelect
        label="Multi Select"
        options={optionsMix2}
        placeholder="select options..."
        contextType="badges"
        showSearch
        showFooter
        showClearBtn
        autoFocus
        // fullWidth
        // minWidth="600px"
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
