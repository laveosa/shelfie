import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import { Box, User } from "lucide-react";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import { DateFormatEnum } from "@/const/enums/DateFormatEnum.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ISheRadioItem } from "@/const/interfaces/primitive-components/ISheRadioItem.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheMultiSelect from "@/components/primitive/she-multi-select/SheMultiSelect.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";

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

const singleDate: Date = new Date("01.01.2025");
const rangeDate: { from: Date | string; to: Date | string } = {
  from: "01.02.2025",
  to: "1/6/2025",
};
const multipleDate = [
  new Date("1-01-2025"),
  new Date("01/2/2025"),
  new Date("01.03-2025"),
  "01.04.2025",
  "01-5.2025",
  "1/6-2025",
];

const radioList: ISheRadioItem<string>[] = [
  {
    text: "option 1",
    value: "1",
  },
  {
    text: "option 2",
    value: "2",
  },
  {
    text: "option 3",
    value: "3",
  },
  {
    text: "option 4",
    value: "4",
  },
  {
    text: "option 5",
    value: "5",
  },
  {
    text: "option 6",
    value: "6",
  },
];

const radioListFull: ISheRadioItem<string>[] = [
  {
    text: "option 1",
    // description: "some description text for test",
    value: "1",
    tooltip: {
      text: "TOOLTIP text for Radio Option: 1",
    },
    // view: ComponentViewEnum.CARD,
  },
  {
    icon: User,
    text: "option 2",
    description: "some description text for test",
    value: "2",
    tooltip: {
      text: "TOOLTIP text for Radio Option: 2",
    },
    view: ComponentViewEnum.CARD,
  },
  {
    icon: Box,
    text: "option 3",
    description:
      "some description text for test some description text for test some description text for test some description text for test",
    value: "3",
    tooltip: {
      text: "TOOLTIP text for Radio Option: 2",
    },
    view: ComponentViewEnum.CARD,
  },
  {
    icon: User,
    text: "option 4",
    value: "4",
  },
  {
    icon: User,
    text: "option 5",
    value: "5",
    view: ComponentViewEnum.CARD,
  },
  {
    text: "option 6",
    description:
      "some description text for test some description text for test some description text for test some description text for test",
    value: "6",
    tooltip: {
      text: "TOOLTIP text for Radio Option: 2",
    },
  },
];

export function DashboardPage() {
  const service = useDashboardPageService();

  const [_optionsSource, setOptionsSource] = useState<any>(null);
  const [_options, setOptions] = useState<any>(null);

  const [_sourceValue, setSourceValue] = useState<any>(null);
  const [_value, setValue] = useState<any>(null);

  const [_singleDateSource, setSingleDateSource] = useState<any>(null);
  const [_singleDate, setSingleDate] = useState<any>(null);
  const [_rangeDateSource, setRangeDateSource] = useState<any>(null);
  const [_rangeDate, setRangeDate] = useState<any>(null);
  const [_multipleDateSource, setMultipleDateSource] = useState<any>(null);
  const [_multipleDate, setMultipleDate] = useState<any>(null);

  // const [_items, setItems] = useState<ISheOption<any>[]>(null);
  // const [selected, setSelected] = useState<any>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(null);
  // const [_badges, setBadges] = useState<ISheBadge<string>[]>(null);
  // const [_time, setTime] = useState<Date>(null);
  // const [_startTime, setStartTime] = useState<Date>(null);
  // const [_endTime, setEndTime] = useState<Date>(null);
  // const [_radioSimple, setRadioSimple] =
  //   useState<ISheRadioItem<string>[]>(null);
  // const [_radioFull, setRadioFull] = useState<ISheRadioItem<string>[]>(null);

  // -------------------------------------------- INPUT
  // const [_inputValue, setInputValue] = useState<string>(null);

  // const searchRef = useRef<HTMLInputElement>(null);
  // const triggerRef = useRef<HTMLButtonElement>(null);
  // const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // setIsLoading(true);

    setTimeout(() => {
      // setItems(optionsSimple);
      // setItems(options);
      // setBadges(badges);
      // setInputValue("input static test!!!");

      const tmpTime: Date = new Date();
      // const tmpStartTime: Date = tmpTime;

      // setTime(tmpTime);
      // setRadioSimple(radioList);
      // setRadioFull(radioListFull);
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
  function onActionHandler(value: any, model: any) {
    console.log("VALUE: ", value);
    console.log("MODEL: ", model);
  }

  function onBlurHandler(value: any, model: any) {
    setTimeout(() => {
      // setValue(value);
    }, 2000);
  }

  // ================================================================== PRIVATE
  const addMinutes = (date: Date, minutes: number): Date => {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    return newDate;
  };

  // Subtract minutes
  const subtractMinutes = (date: Date, minutes: number): Date => {
    return addMinutes(date, -minutes);
  };

  // ================================================================== LAYOUT
  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>
      <br />
      <br />

      {/*<div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>TimePicker</b>
        </h2>
        <br />
        <div className="flex gap-10">component</div>
        <br />
        <div className="divider"></div>
        <br />
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>Highlight Changed</b>
        </h2>
        <br />
        <div className="flex flex-col gap-6">
          <div className="flex gap-10">
            <SheButton value="Update" onClick={() => setSourceValue(_value)} />
          </div>
          <div className="flex gap-10">
            <SheTextArea
              label="Textarea"
              value={_sourceValue}
              onChange={setValue}
            />
          </div>
        </div>
        <br />
        <div className="divider"></div>
        <br />
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>Highlight Changed</b>
        </h2>
        <br />
        <div className="flex flex-col gap-6">
          <div className="flex gap-10">
            <SheButton value="Update" onClick={() => setSourceValue(_value)} />
          </div>
          <div className="flex gap-10">
            <SheSelect
              label="Select"
              items={optionsSimple}
              selected={_sourceValue}
              onSelect={setValue}
            />
          </div>
        </div>
        <br />
        <div className="divider"></div>
        <br />
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>Highlight Changed</b>
        </h2>
        <br/>
        <div className="flex flex-col gap-6">
          <div className="flex gap-10">
            <SheButton
              value="Update"
              onClick={() => setOptionsSource(_options)}
            />
          </div>
          <div className="flex gap-10">
            <SheMultiSelect
              label="MultiSelect"
              items={optionsSimple}
              selectedValues={_optionsSource}
              onSelect={setOptions}
            />
          </div>
        </div>
        <br/>
        <div className="divider"></div>
        <br/>
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>Highlight Changed</b>
        </h2>
        <br/>
        <div className="flex flex-col gap-6">
          <div className="flex gap-10">
            <SheButton value="Update" onClick={() => setValue(_sourceValue)}/>
          </div>
          <div className="flex gap-10">
            <SheInput label="Input" value={_value} onChange={setSourceValue}/>
          </div>
        </div>
        <br/>
        <div className="divider"></div>
        <br/>
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>Highlight Changed</b>
        </h2>
        <br/>
        <div className="flex flex-col gap-6">
          <div className="flex gap-10">
            <SheButton
              value="Update Single"
              onClick={(event) => setSingleDateSource(_singleDate)}
            />
            <SheButton
              value="Update Range"
              onClick={(event) => setRangeDateSource(_rangeDate)}
            />
            <SheButton
              value="Update Multiple"
              onClick={(event) => setMultipleDateSource(_multipleDate)}
            />
          </div>
          <div className="flex gap-10">
            <SheDatePicker
              label="Single"
              date={_singleDateSource}
              mode="single"
              dateFormat={DateFormatEnum.MM_DD_YYYY}
              onSelectDate={setSingleDate}
            />
            <SheDatePicker
              label="Range"
              date={_rangeDateSource}
              mode="range"
              dateFormat={DateFormatEnum.MM_DD_YYYY}
              onSelectDate={setRangeDate}
            />
            <SheDatePicker
              label="Multiple"
              date={_multipleDateSource}
              mode="multiple"
              dateFormat={DateFormatEnum.MM_DD_YYYY}
              onSelectDate={setMultipleDate}
            />
          </div>
        </div>
        <br/>
        <div className="divider"></div>
        <br/>
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>Toggle</b>
        </h2>
        <br />
        <div className="flex gap-10">
          <SheToggle
            label="Toggle 1"
            icon={Home}
            text="Angular"
            checked
            onChecked={(event) => console.log("CHECK: ", event)}
          />
          <SheToggle
            label="Toggle 2"
            required
            text="React"
            icon={Home}
            tooltip="Calendar Multiple mode: some tooltip text for test purpuse only"
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            // descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            // errorMessageIcon={LayoutDashboard}
            onChecked={(event) => console.log("CHECK: ", event)}
          />
          <SheToggle
            label="Toggle 2"
            required
            // icon={Home}
            text="React"
            checked
            type={SheToggleTypeEnum.SWITCH}
            description="some description for toggle 2"
            view={ComponentViewEnum.CARD}
            onChecked={(event) => console.log("CHECK: ", event)}
          />
        </div>
        <br />
        <div className="divider"></div>
        <br />
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>Textarea</b>
        </h2>
        <br />
        <div className="flex gap-10">
          <SheTextArea
            label="Textarea TEXT:"
            required
            // view="card"
            // required
            // isLoading
            // disabled
            icon={Home}
            showClearBtn
            ignoreValidation
            tooltip="Calendar Multiple mode: some tooltip text for test purpuse only"
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
            onChange={(event, model) => console.log("CHANGE: ", event, model)}
            onDelay={(event, model) => console.log("DELAY: ", event, model)}
            onBlur={(event, model) => console.log("BLUR: ", event, model)}
            onIsValid={(event) => console.log("IS_VALID: ", event)}
          />
          <SheTextArea
            label="Textarea NUMBER:"
            minLength={4}
            maxLength={10}
            view="card"
            required
            // isLoading
            // disabled
            // icon={Home}
            iconPosition="out"
            showClearBtn
            clearBtnPosition="out"
            // tooltip="Calendar Multiple mode: some tooltip text for test purpuse only"
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            // descriptionTransKey="f0923fj9wejfwe"
            // descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            // errorMessageTransKey="f0wejfw9ejfkwlejfw"
            // errorMessageIcon={LayoutDashboard}
            onChange={(event, model) => console.log("CHANGE: ", event, model)}
            onDelay={(event, model) => console.log("DELAY: ", event, model)}
            onBlur={(event, model) => console.log("BLUR: ", event, model)}
            onIsValid={(event) => console.log("IS_VALID: ", event)}
          />
        </div>
        <br />
        <div className="divider"></div>
        <br />
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>RadioGroup</b>
        </h2>
        <br />
        <div className="flex gap-10">
          <SheRadioGroup<string>
            // id="RGFL_ID"
            // className="RADIO-GROUP-FULL-LIST"
            // style={{ border: "1px solid blue" }}
            items={radioListFull}
            selected={radioListFull[2].value}
            label="Radio Group"
            icon={Home}
            showClearBtn
            maxWidth="400px"
            itemsView={ComponentViewEnum.CARD}
            view="card"
            required
            // isLoading
            // disabled
            autoFocus
            tooltip="Calendar Multiple mode: some tooltip text for test purpuse only"
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
            onValueChange={(value, model) =>
              console.log("onValueChange: ", value, model)
            }
          />
          <SheRadioGroup<string>
            label="Radio Group"
            items={radioList}
            selected="3"
            // icon={Home}
            // showClearBtn
            // view="card"
            // required
            // direction="row"
            // maxWidth="400px"
            // tooltip="Calendar Multiple mode: some tooltip text for test purpuse only"
            // description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            // descriptionTransKey="f0923fj9wejfwe"
            // descriptionIcon={Users}
            // errorMessage="some error message some error message some error message some error message some error message"
            // errorMessageTransKey="f0wejfw9ejfkwlejfw"
            // errorMessageIcon={LayoutDashboard}
            onValueChange={(value, model) =>
              console.log("onValueChange: ", value, model)
            }
          />
          <SheRadioGroup<string>
            items={_radioFull}
            label="Radio Group"
            icon={Home}
            showClearBtn
            // view="card"
            // required
            // direction="row"
            maxWidth="400px"
            tooltip="Calendar Multiple mode: some tooltip text for test purpuse only"
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
            onValueChange={(value) => console.log("onValueChange: ", value)}
          />
        </div>
        <br />
        <div className="divider"></div>
        <br />
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>DatePicker</b>
        </h2>
        <br />
        <div className="flex gap-10">
          <SheDatePicker
            // className="DATE-PICKER-CLASS-NAME"
            // style={{ border: "1px solid red" }}
            // calendarClassName="CALENDAR-CALL-NAME"
            // calendarStyle={{ border: "1px solid blue" }}
            label="DatePicker"
            // mode="single"
            icon={Home}
            showClearBtn
            // view="card"
            required
            tooltip="Calendar Multiple mode: some tooltip text for test purpuse only"
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
            onOpenChange={(value, model) =>
              console.log("onOpen: ", value, model)
            }
            onSelectDate={(value, model) =>
              console.log("onSelectDate: ", value, model)
            }
          />
          <SheDatePicker
            label="DatePicker"
            mode="range"
            icon={Home}
            iconPosition="out"
            showClearBtn
            clearBtnPosition="out"
            required
            tooltip="Calendar Multiple mode: some tooltip text for test purpuse only"
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
            onOpenChange={(value, model) =>
              console.log("onOpen: ", value, model)
            }
            onSelectDate={(value, model) =>
              console.log("onSelectDate: ", value, model)
            }
          />
          <SheDatePicker
            label="DatePicker"
            mode="multiple"
            onOpenChange={(value, model) =>
              console.log("onOpen: ", value, model)
            }
            onSelectDate={(value, model) =>
              console.log("onSelectDate: ", value, model)
            }
          />
        </div>
        <br />
        <div className="divider" />
        <br />
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
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
        <div className="divider"></div>
        <br />
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
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
        <div className="divider"></div>
        <br />
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>Select</b>
        </h2>
        <br />
        <div className="flex gap-10">
          <SheSelect<string>
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
            selected={selected}
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
          />
          <SheSelect<string>
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
          />
        </div>
        <br />
        <div className="divider"></div>
        <br />
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>Input Editor</b>
        </h2>
        <br />
        <div className="flex gap-10">
          <SheInputEditor
            label="Input Editor"
            value="some text for input editor"
            icon={Home}
            required
            tooltip="Calendar Multiple mode: some tooltip text for test purpuse only"
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
            onChange={(value, model) => console.log("onChange: ", value, model)}
            onToggleManage={(value) => console.log("onToggleManage: ", value)}
            onSave={(value, model) => console.log("onSave: ", value, model)}
            onCancel={(value, model) => console.log("onCancel: ", value, model)}
          />
          <SheInputEditor
            label="Input Editor"
            showClearBtn={false}
            required
            icon={Users}
            tooltip="Calendar Multiple mode: some tooltip text for test purpuse only"
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            errorMessage="some error message some error message some error message some error message some error message"
            errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
            onChange={(value, model) => console.log("onChange: ", value, model)}
            onToggleManage={(value) => console.log("onToggleManage: ", value)}
            onSave={(value, model) => console.log("onSave: ", value, model)}
            onCancel={(value, model) => console.log("onCancel: ", value, model)}
          />
        </div>
        <br />
        <div className="divider"></div>
        <br />
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
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
            iconPosition="out"
            showClearBtn
            clearBtnPosition="out"
            minLength={2}
            maxLength={10}
            description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            // descriptionTransKey="f0923fj9wejfwe"
            descriptionIcon={Users}
            // errorMessage="some error message some error message some error message some error message some error message"
            // errorMessageTransKey="f0wejfw9ejfkwlejfw"
            errorMessageIcon={LayoutDashboard}
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
        <div className="divider"></div>
        <br />
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>Calendar</b>
        </h2>
        <br />
        <div className="flex gap-4">
          <SheCalendar
            date={singleDate}
            dateFormat={DateFormatEnum.MM_DD_YYYY}
            markedDates={multipleDate}
            // mode="single"
            label="Calendar Single"
            required
            icon={Box}
            showClearBtn
            view="card"
            // tooltip="Calendar Multiple mode: some tooltip text for test purpuse only"
            // description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            // descriptionTransKey="f0923fj9wejfwe"
            // descriptionIcon={Users}
            // errorMessage="some error message some error message some error message some error message some error message"
            // errorMessageTransKey="f0wejfw9ejfkwlejfw"
            // errorMessageIcon={LayoutDashboard}
            onSelectDate={(value, model) =>
              console.log("Single: ", value, model)
            }
          />
          <SheCalendar
            date={rangeDate}
            dateFormat={DateFormatEnum.DD_MMM_YYYY}
            // mode="range"
            label="Calendar Range"
            required
            icon={Home}
            showClearBtn
            view="card"
            // tooltip="Calendar Multiple mode: some tooltip text for test purpuse only"
            // description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            // descriptionTransKey="f0923fj9wejfwe"
            // descriptionIcon={Users}
            // errorMessage="some error message some error message some error message some error message some error message"
            // errorMessageTransKey="f0wejfw9ejfkwlejfw"
            // errorMessageIcon={LayoutDashboard}
            onSelectDate={(value, model) =>
              console.log("Range: ", value, model)
            }
          />
          <SheCalendar
            date={multipleDate}
            dateFormat={DateFormatEnum.AT_h_mm_A}
            // mode="multiple"
            label="Calendar Multiple"
            required
            icon={Calendar}
            showClearBtn
            view="card"
            // tooltip="Calendar Multiple mode: some tooltip text for test purpuse only"
            // description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            // descriptionTransKey="f0923fj9wejfwe"
            // descriptionIcon={Users}
            // errorMessage="some error message some error message some error message some error message some error message"
            // errorMessageTransKey="f0wejfw9ejfkwlejfw"
            // errorMessageIcon={LayoutDashboard}
            onSelectDate={(value, model) =>
              console.log("Multiple: ", value, model)
            }
          />
        </div>
        <br />
        <div className="divider" />
        <br />
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>TimePicker</b>
        </h2>
        <br />
        <div className="flex gap-10">
          <SheTimePicker
            label="Timepicker"
            required
            icon={Home}
            // date={new Date()}
            // date={_time}
            startDate={addMinutes(new Date(), 0)}
            endDate={addMinutes(new Date(), 2)}
            timeFormat={TimeFormatEnum.HH_MM_SS}
            type={SheTimePickerTypeEnum.TIMER}
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
            // description="some description for test perpes only some description for test perpes only some description for test perpes only some description for test perpes only"
            // descriptionTransKey="f0923fj9wejfwe"
            // descriptionIcon={Users}
            // errorMessage="some error message some error message some error message some error message some error message"
            // errorMessageTransKey="f0wejfw9ejfkwlejfw"
            // errorMessageIcon={LayoutDashboard}
          />
          <div className="flex flex-col gap-6">
            <SheTimePicker
              label="Timepicker"
              required
              icon={Home}
              // date={new Date()}
              date={_time}
              // type={SheTimePickerTypeEnum.TIMER}
              // type={SheTimePickerTypeEnum.CLOCK}
              // hideInputLabels
              // size="small"
              // autoFocus
              showClearBtn
              onSetDate={(value) => console.log("SET DATE: ", value)}
              onDelay={(value) => console.log("DELAY: ", value)}
              onBlur={(value) => console.log("BLUR: ", value)}
              onTick={(value) => console.log("TICK: ", value)}
              onIsValid={(value) => console.log("VALID: ", value)}
            />
            <SheTimePicker
              label="Timepicker"
              required
              icon={Home}
              // date={new Date()}
              date={_time}
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
            />
          </div>
          <SheTimePicker
            label="Timepicker"
            required
            icon={Clock}
            // date={new Date()}
            // type={SheTimePickerTypeEnum.TIMER}
            type={SheTimePickerTypeEnum.CLOCK}
            // hideInputLabels
            // size="small"
            // autoFocus
            showClearBtn
            hideInputLabels
            onSetDate={(value) => console.log("SET DATE: ", value)}
            onDelay={(value) => console.log("DELAY: ", value)}
            onBlur={(value) => console.log("BLUR: ", value)}
            onTick={(value) => console.log("TICK: ", value)}
            onIsValid={(value) => console.log("VALID: ", value)}
          />
          <SheTimePicker
            date={new Date()}
            showClearBtn
            hideInputLabels
            clockWorksheets="12"
            onSetDate={(value, model) =>
              console.log("SET DATE: ", value, model)
            }
            onDelay={(value, model) => console.log("DELAY: ", value, model)}
            onBlur={(value, model) => console.log("BLUR: ", value, model)}
            onTick={(value, model) => console.log("TICK: ", value, model)}
            onIsValid={(value) => console.log("VALID: ", value)}
          />
        </div>
        <br />
        <div className="divider"></div>
        <br />
      </div>*/}

      {/*<div className="flex justify-between">
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
          <div className="divider"></div>
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
          <div className="divider"></div>
          <br />
        </div>
      </div>*/}

      {/*<div className="flex flex-col fullWidth">
        <h2 className="underline">
          <b>Button</b>
        </h2>
        <br />
        <div className="flex flex-col gap-10">
          <div className="flex flex-row gap-6">
            <SheButton value="Start" />
            <SheButton icon={Home} />
          </div>
          <div className="flex flex-row gap-6">
            <SheButton value="Start" size="small" />
            <SheButton icon={Home} size="small" />
          </div>
        </div>
        <br />
        <div className="divider"></div>
        <br />
      </div>*/}
    </div>
  );
}
