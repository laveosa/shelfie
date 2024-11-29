import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/state/store.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IDashboardPageSlice } from "@/const/interfaces/store-slices/IDashboardPageSlice.ts";

export default function useDashboardPageService() {
  const state = useSelector(
    (state: RootState): IDashboardPageSlice => state[StoreSliceEnum.DASHBOARD],
  );
  const [statistic, setStatistic] = useState(null);

  return {
    statistic,
    setStatistic,
  };
}
