import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheTestForm from "@/components/forms/test-from/SheTestForm.tsx";
import UserForm from "@/components/forms/user-form/UserForm.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

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

export function DashboardPage() {
  const service = useDashboardPageService();

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
