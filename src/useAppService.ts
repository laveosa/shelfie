import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";

export default function useAppService() {
  const state = useSelector(
    (state: RootState): IAppSlice => state[StoreSliceEnum.APP],
  );
  const dispatch = useDispatch<AppDispatch>();

  return { ...state };
}
