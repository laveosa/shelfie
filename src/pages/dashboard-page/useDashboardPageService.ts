import { useState } from "react";

export default function useDashboardPageService() {
  const [statistic, setStatistic] = useState(null);

  return {
    statistic,
    setStatistic,
  };
}
