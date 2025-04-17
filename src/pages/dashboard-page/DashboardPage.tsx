import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";

import Home from "@/assets/icons/house-solid.svg?react";
import TNFLogo from "@/assets/icons/TNF_logo.svg?react";
import Logo from "@/assets/images/AuthLogo.png";
import Users from "lucide-react";

export function DashboardPage() {
  const service = useDashboardPageService();

  function onChangeHandler(event) {
    console.log("OnChange: ", event);
  }

  function onDelayHandler(event) {
    console.log("OnDelay: ", event);
  }

  function onBlurHandler(event) {
    console.log("OnBlur: ", event);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>
      <br />

      <SheInput />

      <br />

      <SheInput
        id="SOME_INPUT_ID"
        className="input-one-class"
        label="Input ONE"
        labelTransKey="sdkj0f320dk"
        showClearBtn
        required
        minLength={3}
        maxLength={20}
        isSearch
        onChange={onChangeHandler}
        onDelay={onDelayHandler}
        onBlur={onBlurHandler}
      />

      <br />
    </div>
  );
}
