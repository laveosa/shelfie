import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { ISettingsPageSlice } from "@/const/interfaces/store-slices/ISettingsPageSlice.ts";

export default function useSettingsPageService() {
  const state = useSelector(
    (state: RootState): ISettingsPageSlice => state[StoreSliceEnum.SETTINGS],
  );
  const dispatch = useDispatch<AppDispatch>();

  return { ...state };
}
