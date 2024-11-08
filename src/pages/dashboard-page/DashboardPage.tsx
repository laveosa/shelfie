import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";

export function DashboardPage() {
  const { statistic, setStatistic } = useDashboardPageService();

  return <div id={cs.DashboardPage}>Dashboard Section</div>;
}
