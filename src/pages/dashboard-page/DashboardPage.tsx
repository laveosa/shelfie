import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import UserForm from "@/components/forms/examples/user-form/UserForm.tsx";
import { UserModel } from "@/const/models/UserModel.ts";

const user: UserModel = {
  id: "2323_SDJKLkkaW32kjanlISJI",
  firstName: "John",
  lastName: "Doe",
  nickName: "",
  age: 30,
  email: "startlord0521882@example.com",
  phone: "+1 123-456-7890",
  address: "5/24 Levetano Str. Odessa, Ukraine",
  workStatus: "active",
  dateBirth: new Date("05.21.1982"),
  gender: "male",
  nationality: "UA",
  maritalStatus: "single",
  position: "frontend",
  comment:
    "some comment for test, 233333333333333333333333333333, some comment for test, 233333333333333333333333333333, some comment for test, 233333333333333333333333333333, some comment for test, 233333333333333333333333333333, ",
  isAvailable: true,
  isRemote: true,
  communicationPreferences: ["phone", "email", "ms teams", "slack"],
  interests: [1, 2, 3, 4, 5],
  contractPeriod: {
    from: "09.05.2025",
    to: "09.15.2025",
  },
  leaveDays: ["09.05.2025", "09.11.2025", "09.17.2025", "09.23.2025"],
};

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
        data={user}
        notDisabledSubmit
        onSubmit={onAction}
        onCancel={onAction}
      />

      <br />
      <br />
    </div>
  );
}
