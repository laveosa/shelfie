import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";

import Home from "@/assets/icons/house-solid.svg?react";
import TNFLogo from "@/assets/icons/TNF_logo.svg?react";
import Logo from "@/assets/images/AuthLogo.png";
import Users from "lucide-react";
import { InputPatternEnum } from "@/const/enums/InputPatternEnum.ts";

export function DashboardPage() {
  const service = useDashboardPageService();

  const [isValid, setIsValid] = useState<boolean>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsValid(true);
    }, 2000);

    setTimeout(() => {
      setIsValid(false);
    }, 4000);

    setTimeout(() => {
      setIsValid(true);
    }, 6000);

    setTimeout(() => {
      setIsValid(false);
    }, 8000);
  }, []);

  function onChangeHandler(event) {
    // console.log("OnChange: ", event);
  }

  function onDelayHandler(event) {
    // console.log("OnDelay: ", event);
  }

  function onBlurHandler(event) {
    // console.log("OnBlur: ", event);
  }

  function onIsValidHandler(event) {
    console.log("errorFuncHandler: ", event);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>
      <br />

      <SheInput icon={Home} minLength={2} maxLength={12} />

      <br />

      <SheInput
        id="SOME_INPUT_ID"
        className="input-one-class"
        label="Input ONE"
        labelTransKey="sdkj0f320dk"
        showClearBtn
        required
        minLength={2}
        maxLength={12}
        isSearch
        isValid={isValid}
        pattern={InputPatternEnum.EMAIL}
        onChange={onChangeHandler}
        onDelay={onDelayHandler}
        onBlur={onBlurHandler}
        onIsValid={onIsValidHandler}
      />

      <br />
    </div>
  );
}
