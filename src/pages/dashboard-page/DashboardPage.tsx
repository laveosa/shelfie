import React, { useEffect, useRef, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import { Box, Clock, Home, LayoutDashboard, User, Users } from "lucide-react";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import SheMultiSelect from "@/components/primitive/she-multi-select/SheMultiSelect.tsx";
import SheAutocomplete from "@/components/primitive/she-autocomplete/SheAutocomplete.tsx";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import SheBadgeList from "@/components/primitive/she-badge-list/SheBadgeList.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheTimePicker from "@/components/primitive/she-time-picker/SheTimePicker.tsx";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";
import { TimeFormatEnum } from "@/const/enums/TimeFormatEnum.ts";

const options: ISheSelectItem<any>[] = [
  {
    id: "OPTION_1",
    text: "option 1",
    description: "some description",
    sideText: "DB-12",
    sideDescription:
      "jewj 2902 9j293j 932j 09j2390j 3209 j2039j 2039j 293j 032j09 32j09 2j39 j2390j 90j 32 we jewj 2902 9j293j 932j 09j2390j 3209 j2039j 2039j 293j 032j09 32j09 2j39 j2390j 90j 32 we jewj 2902 9j293j 932j 09j2390j 3209 j2039j 2039j 293j 032j09 32j09 2j39 j2390j 90j 32 we ",
    value: 1,
    isSelected: true,
    tooltip: {
      text: "some text for tooltip",
    },
    toggleClassName: "INNER-CELL-CLASS-NAME",
    toggleStyle: { border: "1px solid red" },
    iconClassName: "INNER-CELL-CLASS-NAME",
    iconStyle: { border: "1px solid red" },
    colorsClassName: "INNER-CELL-CLASS-NAME",
    colorsStyle: { border: "1px solid red" },
    infoClassName: "INNER-CELL-CLASS-NAME",
    infoStyle: { border: "1px solid red" },
    tooltipClassName: "INNER-CELL-CLASS-NAME",
    tooltipStyle: { border: "1px solid red" },
    view: "card",
    checkOnClick: true,
  },
  {
    id: "OPTION_2",
    text: "option 2",
    value: "2",
    description:
      "some description s ewew 23 23 23d23d2 d23d 23 d23d 23d 23d 23d2 some description s ewew 23 23 23d23d2 d23d 23 d23d 23d 23d 23d2 some description s ewew 23 23 23d23d2 d23d 23 d23d 23d 23d 23d2 some description s ewew 23 23 23d23d2 d23d 23 d23d 23d 23d 23d2 some description s ewew 23 23 23d23d2 d23d 23 d23d 23d 23d 23d2 ",
    sideText: "BG-40",
    sideDescription: "some small side description",
    colors: ["red", "blue"],
    checkOnClick: true,
  },
  {
    id: "OPTION_3",
    text: "d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d ",
    textTransKey: "9jwe09jwe9jwe9f0j",
    description:
      "d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d ",
    descriptionTransKey: "jfw90fj2309fjwefjwjef",
    sideText:
      "d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d ",
    sideTextTransKey: "j09f2jf9jwfkwjeflwjef",
    sideDescription:
      "d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d d0d2 k2-30kd 203kd -032kd-03kd0 k2-d0k 23-d0k23d0k -3kd -203kd-2 03kd-203k d-20k3 d-20k3 d ",
    sideDescriptionTransKey: "f9ewf09jwe0f9jw09efj9wjefwe",
    value: [1, "2", 3, "4"],
    isSelected: true,
    icon: Box,
  },
];

const optionsSimple: ISheSelectItem<string>[] = [
  {
    text: "React",
    value: "REACT",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
  },
  {
    text: "Angular",
    value: "ANGULAR",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png",
    isSelected: true,
    colors: [
      "#968AD5",
      "#126762",
      "#968AD5",
      "#126762",
      "#968AD5",
      "#126762",
      "#968AD5",
      "#126762",
    ],
  },
  {
    text: "Vue",
    value: "VUE",
    icon: "https://www.w3schools.com/whatis/img_vue.jpg",
    isSelected: true,
  },
  {
    text: "Svelte",
    value: "SVELTE",
    icon: "https://logosandtypes.com/wp-content/uploads/2020/11/Svelte.png",
  },
  {
    text: "Flutter",
    value: "FLUTTER",
    icon: "https://images.icon-icons.com/2108/PNG/512/flutter_icon_130936.png",
  },
  {
    text: "Knockout",
    value: "KNOCKOUT",
    icon: "https://quintagroup.com/cms/js/js-image/knockout-js-logo.png/@@images/f4756dda-f9a9-4c04-9223-9f5724569747.png",
    isSelected: true,
  },
  {
    text: "JavaScript",
    value: "JS",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png",
    colors: ["red", "blue"],
  },
  {
    text: "HTML",
    value: "HTML",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png",
  },
  {
    text: "CSS",
    value: "CSS",
    colors: ["#968AD5", "#126762"],
  },
];

const badges: ISheBadge<string>[] = [
  {
    text: "React",
    value: "REACT",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
    showCloseBtn: true,
  },
  {
    text: "Angular",
    value: "ANGULAR",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png",
    showCloseBtn: true,
  },
  {
    text: "Vue",
    value: "VUE",
    icon: "https://www.w3schools.com/whatis/img_vue.jpg",
  },
  {
    text: "Svelte",
    value: "SVELTE",
    icon: "https://logosandtypes.com/wp-content/uploads/2020/11/Svelte.png",
  },
  {
    text: "Flutter",
    value: "FLUTTER",
    icon: "https://images.icon-icons.com/2108/PNG/512/flutter_icon_130936.png",
  },
  {
    text: "Knockout",
    value: "KNOCKOUT",
    icon: "https://quintagroup.com/cms/js/js-image/knockout-js-logo.png/@@images/f4756dda-f9a9-4c04-9223-9f5724569747.png",
  },
  {
    text: "JavaScript",
    value: "JS",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png",
  },
  {
    text: "HTML",
    value: "HTML",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png",
  },
  {
    text: "CSS",
    value: "CSS",
  },
];

export function DashboardPage() {
  const service = useDashboardPageService();

  const [_items, setItems] = useState<ISheOption<any>[]>(null);
  const [selected, setSelected] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(null);
  const [_badges, setBadges] = useState<ISheBadge<string>[]>(null);

  // -------------------------------------------- INPUT
  const [_inputValue, setInputValue] = useState<string>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // setIsLoading(true);

    setTimeout(() => {
      // setItems(optionsSimple);
      // setItems(options);
      // setBadges(badges);
      // setInputValue("input static test!!!");
    }, 1000);

    /*const timer = setTimeout(() => {
      const el = triggerRef.current;
      if (el) {
        el.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        el.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
        el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    }, 1000);
    return () => clearTimeout(timer);*/
  }, []);

  // ================================================================== EVENT

  function onSelectHandler(value: any, model: any) {
    console.log("VALUE: ", value);
    console.log("MODEL: ", model);
  }

  // ================================================================== LAYOUT

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>
      <br />
      <br />

      <div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>TimePicker</b>
        </h2>
        <br />
        <div className="flex gap-10">
          <SheTimePicker
            // selectClassName="SELECT-CLASS-NAME"
            // selectStyle={{ border: "1px solid blue" }}
            // hhLabel="11"
            // mmLabel="22"
            // ssLabel="33"
            // periodLabel="pp"
            label="Timepicker"
            required
            icon={Home}
            // date={new Date()}
            // startDate={new Date()}
            // endDate={new Date()}
            // timeFormat={TimeFormatEnum.HH_MM_SS}
            timePeriod="PM"
            clockWorksheets="12"
            // type={SheTimePickerTypeEnum.TIMER}
            // type={SheTimePickerTypeEnum.CLOCK}
            // hideInputLabels
            // size="small"
            // autoFocus
            showClearBtn
            onSetDate={(value) => console.log("SET DATE: ", value)}
            onDelay={(value) => console.log("DELAY: ", value)}
            // onBlur={(value) => console.log("BLUR: ", value)}
            // onTick={(value) => console.log("TICK: ", value)}
            // onIsValid={(value) => console.log("VALID: ", value)}
          />
          {/*<SheTimePicker
            label="Timepicker"
            required
            icon={Home}
            date={new Date()}
            // type={SheTimePickerTypeEnum.TIMER}
            // type={SheTimePickerTypeEnum.CLOCK}
            // hideInputLabels
            size="small"
            // autoFocus
            showClearBtn
            onSetDate={(value) => console.log("SET DATE: ", value)}
            onDelay={(value) => console.log("DELAY: ", value)}
            onBlur={(value) => console.log("BLUR: ", value)}
            onTick={(value) => console.log("TICK: ", value)}
            onIsValid={(value) => console.log("VALID: ", value)}
          />*/}
        </div>
        <br />
        <br />
      </div>

      <div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>Autocomplete</b>
        </h2>
        <br />
        <div className="flex gap-10">
          <SheAutocomplete
            id="ID_AUTOCOMPLETE"
            className="CLASS-NAME-FOR-AUTOCOMPLETE"
            required
            label="Autocomplete"
            items={optionsSimple}
            // clearBtnPosition="out"
            // iconPosition="out"
            // view="card"
            showClearBtn
            // showSelectBtn
            icon={Users}
            // isLoading
            // disabled
            // autoFocus
            // fullWidth
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
            onSelect={(event, model) =>
              console.log("Autocomplete value: ", event, model)
            }
          />
          <SheAutocomplete
            id="ID_AUTOCOMPLETE"
            className="CLASS-NAME-FOR-AUTOCOMPLETE"
            required
            label="Autocomplete"
            items={optionsSimple}
            clearBtnPosition="out"
            iconPosition="out"
            // view="card"
            showClearBtn
            // showSelectBtn
            icon={Users}
            // isLoading
            // disabled
            // autoFocus
            // fullWidth
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
            onSelect={(event, model) =>
              console.log("Autocomplete value: ", event, model)
            }
          />
        </div>
        <br />
        <br />
      </div>

      <div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>Multi Select</b>
        </h2>
        <br />
        <div className="flex gap-10">
          <SheMultiSelect<string>
            label="MultiSelect"
            labelTransKey="909wefj09wejf09j"
            required
            tooltip={{
              className: "TOOLTIP-CLASS-NAME",
              style: { border: "1px solid blue" },
              title: "TITLE Pp",
              titleTransKey: "2399u203u09fuj",
              text: "some text for tooltip",
              textTransKey: "fw9ef092309fe9u",
              description:
                "29 329j 029j3f 0293j 0293j9023f 0293jf029 3jf 0239j032 j2 09n2",
              descriptionTransKey: "wef902jf309jew09j",
              icon: Users,
            }}
            // clearBtnPosition="out"
            // iconPosition="out"
            // view="card"
            items={optionsSimple}
            contextType="badges"
            showClearBtn
            showSearch
            showFooter
            // autoFocus
            icon={Home}
            // clearBtnPosition="out"
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
            onSelect={(value, model) => console.log("onSelect: ", value, model)}
          />
          <SheMultiSelect<string>
            label="MultiSelect"
            labelTransKey="909wefj09wejf09j"
            required
            tooltip={{
              className: "TOOLTIP-CLASS-NAME",
              style: { border: "1px solid blue" },
              title: "TITLE Pp",
              titleTransKey: "2399u203u09fuj",
              text: "some text for tooltip",
              textTransKey: "fw9ef092309fe9u",
              description:
                "29 329j 029j3f 0293j 0293j9023f 0293jf029 3jf 0239j032 j2 09n2",
              descriptionTransKey: "wef902jf309jew09j",
              icon: Users,
            }}
            clearBtnPosition="out"
            iconPosition="out"
            // view="card"
            items={optionsSimple}
            contextType="badges"
            showClearBtn
            showSearch
            showFooter
            // autoFocus
            icon={Home}
            // clearBtnPosition="out"
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
            onSelect={(value, model) => console.log("onSelect: ", value, model)}
          />
        </div>
        <br />
        <br />
      </div>

      <div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>Select</b>
        </h2>
        <br />
        <div className="flex gap-10">
          {/*<SheSelect<string>
            label="Select"
            labelTransKey="909wefj09wejf09j"
            required
            tooltip={{
              className: "TOOLTIP-CLASS-NAME",
              style: { border: "1px solid blue" },
              title: "TITLE Pp",
              titleTransKey: "2399u203u09fuj",
              text: "some text for tooltip",
              textTransKey: "fw9ef092309fe9u",
              description:
                "29 329j 029j3f 0293j 0293j9023f 0293jf029 3jf 0239j032 j2 09n2",
              descriptionTransKey: "wef902jf309jew09j",
              icon: Users,
            }}
            // clearBtnPosition="out"
            // iconPosition="out"
            // view="card"
            items={optionsSimple}
            // items={_items}
            // selected={selected}
            icon={Clock}
            // autoFocus
            showClearBtn
            // clearBtnPosition="out"
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
            onSelect={(value, model) => onSelectHandler(value, model)}
          />*/}
          {/*<SheSelect<string>
            label="Select"
            labelTransKey="909wefj09wejf09j"
            required
            tooltip={{
              className: "TOOLTIP-CLASS-NAME",
              style: { border: "1px solid blue" },
              title: "TITLE Pp",
              titleTransKey: "2399u203u09fuj",
              text: "some text for tooltip",
              textTransKey: "fw9ef092309fe9u",
              description:
                "29 329j 029j3f 0293j 0293j9023f 0293jf029 3jf 0239j032 j2 09n2",
              descriptionTransKey: "wef902jf309jew09j",
              icon: Users,
            }}
            clearBtnPosition="out"
            iconPosition="out"
            // view="card"
            items={optionsSimple}
            // items={_items}
            // selected={selected}
            icon={Clock}
            // autoFocus
            showClearBtn
            // clearBtnPosition="out"
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
            onSelect={(value, model) => onSelectHandler(value, model)}
          />*/}
        </div>
        <br />
        <br />
      </div>

      <div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>Input</b>
        </h2>
        <br />
        <div className="flex gap-10">
          <SheInput
            label="Input"
            labelTransKey="909wefj09wejf09j"
            value={_inputValue}
            required
            tooltip={{
              className: "TOOLTIP-CLASS-NAME",
              style: { border: "1px solid blue" },
              title: "TITLE Pp",
              titleTransKey: "2399u203u09fuj",
              text: "some text for tooltip",
              textTransKey: "fw9ef092309fe9u",
              description:
                "29 329j 029j3f 0293j 0293j9023f 0293jf029 3jf 0239j032 j2 09n2",
              descriptionTransKey: "wef902jf309jew09j",
              icon: Users,
            }}
            icon={User}
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
            // clearBtnPosition="out"
            // iconPosition="out"
            showClearBtn
            // autoFocus
            // isSearch
            // icon={Users}
            // minLength={6}
            // maxLength={10}
            // pattern={ContextPatternEnum.EMAIL}
            onChange={(value, model) =>
              console.log("ON CHANGE: ", value, model)
            }
            onDelay={(value, model) => console.log("ON DELAY: ", value, model)}
            onBlur={(value, model) => console.log("ON BLUR: ", value, model)}
          />
          <SheInput
            label="Input"
            labelTransKey="909wefj09wejf09j"
            required
            tooltip={{
              className: "TOOLTIP-CLASS-NAME",
              style: { border: "1px solid blue" },
              title: "TITLE Pp",
              titleTransKey: "2399u203u09fuj",
              text: "some text for tooltip",
              textTransKey: "fw9ef092309fe9u",
              description:
                "29 329j 029j3f 0293j 0293j9023f 0293jf029 3jf 0239j032 j2 09n2",
              descriptionTransKey: "wef902jf309jew09j",
              icon: Users,
            }}
            icon={User}
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
            clearBtnPosition="out"
            iconPosition="out"
            showClearBtn
            // autoFocus
            // isSearch
            // icon={Users}
            // minLength={6}
            // maxLength={10}
            // pattern={ContextPatternEnum.EMAIL}
            onChange={(value, model) =>
              console.log("ON CHANGE: ", value, model)
            }
            onDelay={(value, model) => console.log("ON DELAY: ", value, model)}
            onBlur={(value, model) => console.log("ON BLUR: ", value, model)}
          />
        </div>
        <br />
        <br />
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col fullWidth">
          <h2 className="underline">
            <b>Badge List ROW</b>
          </h2>
          <br />
          <div className="flex flex-col gap-10">
            <SheBadgeList
              label="Badge List"
              labelTransKey="0329j9wejf"
              required
              tooltip="some tooltip for Badge List component"
              tooltipTransKey="9f2jfkwejlk"
              // items={_badges}
              items={badges}
              itemsWrap="nowrap"
              icon={Home}
              maxBadgeAmount="4"
              // autoBadgeAmount
              showCloseBtn
              showClearBtn
              onClick={(event, model) =>
                console.log("ON CLICK: ", event, model)
              }
              onClear={(event, model) =>
                console.log("ON CLEAR: ", event, model)
              }
              onClose={(event, model) =>
                console.log("ON CLOSE: ", event, model)
              }
              onCloseAllExtra={(event, model) =>
                console.log("ON CLOSE ALL: ", event, model)
              }
            />
            <SheBadgeList
              label="Badge List"
              labelTransKey="0329j9wejf"
              required
              tooltip="some tooltip for Badge List component"
              tooltipTransKey="9f2jfkwejlk"
              items={_badges}
              // items={badges}
              itemsWrap="nowrap"
              icon={Home}
              // maxBadgeAmount="4"
              // autoBadgeAmount
              showCloseBtn
              showClearBtn
              maxWidth="500px"
              onClick={(event, model) =>
                console.log("ON CLICK: ", event, model)
              }
              onClear={(event, model) =>
                console.log("ON CLEAR: ", event, model)
              }
              onClose={(event, model) =>
                console.log("ON CLOSE: ", event, model)
              }
              onCloseAllExtra={(event, model) =>
                console.log("ON CLOSE ALL: ", event, model)
              }
            />
          </div>
          <br />
          <br />
        </div>

        <div className="flex flex-col fullWidth">
          <h2 className="underline">
            <b>Badge List COLUMN</b>
          </h2>
          <br />
          <div className="flex gap-10">
            <SheBadgeList
              label="Badge List"
              labelTransKey="0329j9wejf"
              required
              tooltip="some tooltip for Badge List component"
              tooltipTransKey="9f2jfkwejlk"
              // items={_badges}
              items={badges}
              itemsWrap="nowrap"
              icon={Home}
              maxBadgeAmount="4"
              // autoBadgeAmount
              showCloseBtn
              showClearBtn
              direction="column"
              onClick={(event, model) =>
                console.log("ON CLICK: ", event, model)
              }
              onClear={(event, model) =>
                console.log("ON CLEAR: ", event, model)
              }
              onClose={(event, model) =>
                console.log("ON CLOSE: ", event, model)
              }
              onCloseAllExtra={(event, model) =>
                console.log("ON CLOSE ALL: ", event, model)
              }
            />
            <SheBadgeList
              label="Badge List"
              labelTransKey="0329j9wejf"
              required
              tooltip="some tooltip for Badge List component"
              tooltipTransKey="9f2jfkwejlk"
              items={_badges}
              // items={badges}
              itemsWrap="nowrap"
              icon={Home}
              // maxBadgeAmount="4"
              // autoBadgeAmount
              showCloseBtn
              showClearBtn
              direction="column"
              onClick={(event, model) =>
                console.log("ON CLICK: ", event, model)
              }
              onClear={(event, model) =>
                console.log("ON CLEAR: ", event, model)
              }
              onClose={(event, model) =>
                console.log("ON CLOSE: ", event, model)
              }
              onCloseAllExtra={(event, model) =>
                console.log("ON CLOSE ALL: ", event, model)
              }
            />
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
