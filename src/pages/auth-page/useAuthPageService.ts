import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { IAuthPageSlice } from "@/const/interfaces/store-slices/IAuthPageSlice.ts";

export default function useAuthPageService() {
  const state = useSelector(
    (state: RootState): IAuthPageSlice => state[StoreSliceEnum.AUTH],
  );
  const dispatch = useDispatch<AppDispatch>();

  return { ...state };
}
