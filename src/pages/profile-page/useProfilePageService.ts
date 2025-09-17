import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { IProfilePageSlice } from "@/const/interfaces/store-slices/IProfilePageSlice.ts";

export default function useProfilePageService() {
  const state = useSelector(
    (state: RootState): IProfilePageSlice => state[StoreSliceEnum.PROFILE],
  );
  const dispatch = useDispatch<AppDispatch>();

  return {};
}
