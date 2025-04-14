import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export function DashboardPage() {
  const service = useDashboardPageService();

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>
      <SheButton id="TEST_id" className="TEST-class" iconPosition={"right"}>
        Test
      </SheButton>
      <br />
      <SheButton
        id="START_id"
        className="START-class"
        iconPosition={"right"}
        value="Start"
        valueTransKey="sfw390f23jf"
      />
    </div>
  );
}
