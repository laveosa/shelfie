import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { ITransmissionsPageSlice } from "@/const/interfaces/store-slices/ITransmissionsPageSlice.ts";

export default function useTransmissionsPageService() {
  const state = useSelector(
    (state: RootState): ITransmissionsPageSlice =>
      state[StoreSliceEnum.TRANSMISSIONS],
  );
  const dispatch = useDispatch<AppDispatch>();

  return { ...state };
}
