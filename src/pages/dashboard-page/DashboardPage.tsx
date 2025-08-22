import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheTestForm from "@/components/forms/test-from/SheTestForm.tsx";
import UserForm from "@/components/forms/user-form/UserForm.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import { UserModel } from "@/const/models/UserModel.ts";

const genders: ISheSelectItem<string>[] = [
  {
    text: "male",
    value: "male",
  },
  {
    text: "female",
    value: "female",
  },
  {
    text: "unicorn",
    value: "unicorn",
  },
  {
    text: "banana",
    value: "banana",
  },
];

const position: ISheSelectItem<string>[] = [
  {
    text: "Frontend",
    value: "Frontend",
  },
  {
    text: "Backend",
    value: "Backend",
  },
  {
    text: "HR",
    value: "HR",
  },
  {
    text: "SEO",
    value: "SEO",
  },
  {
    text: "Designer",
    value: "Designer",
  },
];

const user: UserModel = {
  name: "Anton",
  age: 32,
  email: "anton@yahoo.com",
  address: "Levetano 3/23",
  gender: "male",
  position: "SEO",
};

export function DashboardPage() {
  const service = useDashboardPageService();

  const [_user, setUser] = useState<UserModel>(null);

  useEffect(() => {
    setTimeout(() => {
      setUser(user);
    }, 3000);
  }, []);

  // ================================================================== STATE

  // ================================================================== EVENT HANDLERS

  function onAction(event, model?) {
    console.log("EVENT: ", event);
    console.log("MODEL: ", model);
  }

  // ================================================================== LAYOUT
  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>
      <br />
      <br />

      <UserForm
        data={_user}
        genders={genders}
        positions={position}
        onSubmit={onAction}
        onCancel={onAction}
      />

      <br />
      <br />

      {/*<SheTestForm />*/}

      <br />
      <br />
    </div>
  );
}
