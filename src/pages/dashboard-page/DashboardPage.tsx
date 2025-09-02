import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import UserForm, {
  userFormExampleModel,
} from "@/components/forms/examples/user-form/UserForm.tsx";

export function DashboardPage() {
  const service = useDashboardPageService();

  // ================================================================== STATE

  // ================================================================== EVENT HANDLERS

  function onAction(event, model?) {
    console.log("EVENT: ", event);
    console.log("MODEL: ", model);
  }

  // ================================================================== LOGIC

  // ================================================================== LAYOUT
  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>
      <br />
      <br />

      <UserForm
        data={userFormExampleModel}
        notDisabledSubmit
        onSubmit={onAction}
        onCancel={onAction}
      />

      <br />
      <br />
    </div>
  );
}
