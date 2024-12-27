import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { SheTooltipEnum } from "@/const/enums/SheTooltipEnum.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { useState } from "react";
import { InputPatternEnum } from "@/const/enums/InputPatternEnum.ts";

export function DashboardPage() {
  const service = useDashboardPageService();

  const [inputValue, setInputValue] = useState("some default input value");
  const [inputError, setInputError] = useState("some ERROR message");

  function onAction(data: any) {
    console.log("Action: ", data);
  }

  function onChange(data: any) {
    console.log("on change: ", data);
  }

  function onBlur(data: any) {
    console.log("on blur: ", data);
  }

  function onDelay(data: any) {
    console.log("on delay: ", data);
  }

  function onUpdateText() {
    setInputError("new error message");
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard Section</h1>
      <br />
      <div>
        <p>Input</p>
        <br />

        <SheInput
          label="Label"
          showClearBtn
          value="sdkll sdiwe"
          disabled
          // required
          // minLength={2}
          // maxLength={10}
          // pattern={InputPatternEnum.email}
          // error="Some Error Message"
          onChange={(e) => onChange(e)}
        />

        <br />
        <br />
        <br />

        <SheButton onClick={onUpdateText}>update text value</SheButton>

        {/*<SheInput
          label="Product"
          labelTransKey=""
          placeholder="enter new product..."
          placeholderTransKey=""
          isSearch
          strict
          tooltip={{
            title: "Title",
            titleTransKey: null,
            text: "k iweoiw eowie oiweo wi enweoi nwie weoie woei weoiwh oiwe oiwe owieh oweih owei woei k iweoiw eowie oiweo wi enweoi nwie weoie woei weoiwh oiwe oiwe owieh oweih owei woei k iweoiw eowie oiweo wi enweoi nwie weoie woei weoiwh oiwe oiwe owieh oweih owei woei k iweoiw eowie oiweo wi enweoi nwie weoie woei weoiwh oiwe oiwe owieh oweih owei woei",
            textTransKey: null,
            description: "some description text",
            descriptionTransKey: null,
            align: "start",
            side: "bottom",
          }}
          onChange={(value) => onAction(value)}
        />*/}
      </div>
    </div>
  );
}
