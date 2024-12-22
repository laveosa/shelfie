import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";

export function DashboardPage() {
  const service = useDashboardPageService();

  function inputAction(data: any) {
    console.log("Input action: ", data);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard Section</h1>
      <div>
        <h3>Input</h3>
        <br />
        <br />
        <br />

        <SheInput
          label="Product"
          placeholder="enter new product..."
          isSearch
          required
          onDelay={(value) => inputAction(value)}
        />

        {/*<SheInput
          label="Lable"
          placeholder="test placeholder"
          error="some error message just for the test"
          showCleatBtn={true}
          isSearch={true}
          autoFocus={true}
          onDelay={(value) => inputAction(value)}
        />*/}
      </div>
    </div>
  );
}
