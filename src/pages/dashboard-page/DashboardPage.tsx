import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import UserForm from "@/components/forms/user-form/UserForm.tsx";

export function DashboardPage() {
  const service = useDashboardPageService();

  function onSubmitHandler(model) {
    console.log(model);
  }

  function onCancelHandler(model) {
    console.log(model);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <UserForm onSubmit={onSubmitHandler} onCancel={onCancelHandler} />
    </div>
  );
}
