import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import Logo from "@/assets/images/AuthLogo.png";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";
import { Home, Users } from "lucide-react";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import UserForm from "@/components/forms/user-form/UserForm.tsx";

export function DashboardPage() {
  const service = useDashboardPageService();

  const [text, setText] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setText("SOME VALUE PASSED ASYNC FOR TEST");
    }, 4000);
  }, []);

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <div className="flex gap-4">
        <SheButton
          value="Loading"
          minWidth="100px"
          onClick={() => setLoading(!loading)}
        />
        <SheButton
          value="Valid"
          minWidth="100px"
          onClick={() => setIsValid(!isValid)}
        />
      </div>

      <br />

      <SheTextArea
        label="Textarea"
        value={text}
        placeholder="is loading test..."
        isLoading={loading}
        required
        tooltip={{ text: "some tooltip text" }}
        minLength={3}
        maxLength={10}
        icon={Users}
        showClearBtn
        onChange={(event) => console.log("onChange: ", event)}
        onDelay={(event) => console.log("onDelay: ", event)}
        onBlur={(event) => console.log("onBlur: ", event)}
        onIsValid={(event) => console.log("onIsValid: ", event)}
      />

      <br />

      <SheInput
        label="Input"
        value={text}
        required
        minLength={4}
        maxLength={7}
        showClearBtn
      />

      <br />

      {/*<SheTextArea
        label="Textarea 1"
        labelTransKey="sdfewiniwceon"
        placeholder="some new placeholder for textarea..."
        placeholderTransKey="slkdjfwieoj"
        value={text}
        icon={Home}
        showClearBtn
        rows={1}
        delayTime={1800}
        onDelay={(event) => console.log("onDelay: ", event)}
      />*/}

      <br />

      {/*<SheTextArea
        label="Textarea"
        placeholder="disabled test..."
        disabled
        onChange={(event) => console.log("onChange: ", event)}
      />*/}

      <br />

      {/*<SheTextArea
        label="Textarea 1"
        labelTransKey="sdfewiniwceon"
        placeholder="some new placeholder for textarea..."
        placeholderTransKey="slkdjfwieoj"
        value={text}
        icon={{
          icon: Logo,
          iconView: IconViewEnum.SMOOTH,
        }}
        showClearBtn
        resize
        required
        style={{
          border: "1px solid red",
        }}
        fullWidth
        rows={12}
        onChange={(event) => console.log("onChange: ", event)}
        onDelay={(event) => console.log("onDelay: ", event)}
        onBlur={(event) => console.log("onBlur: ", event)}
      />*/}

      <br />
    </div>
  );
}
