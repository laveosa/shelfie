import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { SheTooltipEnum } from "@/const/enums/SheTooltipEnum.ts";

export function DashboardPage() {
  const service = useDashboardPageService();

  function onAction(data: any) {
    console.log("Action: ", data);
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
          pattern={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
          tooltip={{
            title: "Title",
            text: "text",
            description: "some description text",
            align: "start",
            side: "bottom",
          }}
          onChange={(value) => onAction(value)}
        />
      </div>
    </div>
  );
}
