import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { Users } from "lucide-react";

export function DashboardPage() {
  const service = useDashboardPageService();

  function inputAction(data: any) {
    // console.log("Input action: ", data);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard Section</h1>
      <br />
      <div>
        <p>Input</p>
        <br />

        <SheInput
          label="Product"
          placeholder="enter new product..."
          isSearch
          minLength={4}
          maxLength={10}
          onChange={(value) => inputAction(value)}
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
