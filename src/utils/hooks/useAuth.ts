import { useSelector } from "react-redux";

import { RootState } from "@/state/store.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";

export default function useAuth() {
  const { user } = useSelector(
    (state: RootState): IAppSlice => state[StoreSliceEnum.APP],
  );

  if (user === undefined) {
    throw new Error("user not found in local environment");
  }

  return user;
}
