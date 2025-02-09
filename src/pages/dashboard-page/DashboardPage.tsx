import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";

export function DashboardPage() {
  const service = useDashboardPageService();

  function onSubmitHandler(model) {
    console.log(model);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard Section</h1>
      <SheForm />
    </div>
  );
}
