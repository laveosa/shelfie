import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { ISupportPageSlice } from "@/const/interfaces/store-slices/ISupportPageSlice.ts";

export default function useSupportPageService() {
  const state = useSelector(
    (state: RootState): ISupportPageSlice => state[StoreSliceEnum.SUPPORT],
  );
  const dispatch = useDispatch<AppDispatch>();

  return { ...state };
}
