import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { Search } from "lucide-react";
import TmpIcon from "@/assets/icons/TNF_logo.svg";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import UserForm from "@/components/forms/user-form/UserForm.tsx";

export function DashboardPage() {
  const service = useDashboardPageService();

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheButton
        id="TEST_id"
        className="TEST-class"
        // icon={Search}
        onClick={(event) => {
          console.log("TEST click: ", event.target);
        }}
      >
        Test
      </SheButton>
      <br />
      <SheButton
        id="START_id"
        className="START-class"
        // icon={TmpIcon}
        iconPosition={DirectionEnum.RIGHT}
        value="Start"
        valueTransKey="sfw390f23jf"
        onClick={(event) => {
          console.log("START click: ", event.target);
        }}
      />
    </div>
  );
}
