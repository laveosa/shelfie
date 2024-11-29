import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { IMessengerPageSlice } from "@/const/interfaces/store-slices/IMessengerPageSlice.ts";

export default function useMessengerPageService() {
  const state = useSelector(
    (state: RootState): IMessengerPageSlice => state[StoreSliceEnum.MESSENGER],
  );
  const dispatch = useDispatch<AppDispatch>();

  return { ...state };
}
