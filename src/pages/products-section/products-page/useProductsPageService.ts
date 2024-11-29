import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";

export default function useProductsPageService() {
  const state = useSelector(
    (state: RootState): IProductsPageSlice => state[StoreSliceEnum.PRODUCTS],
  );
  const dispatch = useDispatch<AppDispatch>();

  return { ...state };
}
