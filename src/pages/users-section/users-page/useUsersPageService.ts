import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { IUsersPageSlice } from "@/const/interfaces/store-slices/IUsersPageSlice.ts";

export default function useUsersPageService() {
  const state = useSelector(
    (state: RootState): IUsersPageSlice => state[StoreSliceEnum.USERS],
  );
  const dispatch = useDispatch<AppDispatch>();

  return { ...state };
}
