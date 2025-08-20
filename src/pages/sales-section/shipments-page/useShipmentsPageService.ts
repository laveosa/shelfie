import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { useToast } from "@/hooks/useToast.ts";
import OrdersApiHooks from "@/utils/services/api/OrdersApiService.ts";
import { IShipmentsPageSlice } from "@/const/interfaces/store-slices/IShipmentsPageSlice.ts";
import { ShipmentsPageSliceActions as actions } from "@/state/slices/ShipmentsPageSlice.ts";

export default function useShipmentsPageService() {
  const state = useSelector(
    (state: RootState): IShipmentsPageSlice => state[StoreSliceEnum.SHIPMENTS],
  );
  const dispatch = useDispatch<AppDispatch>();
  const { addToast } = useToast();

  const [getShipmentsListForForGrid] =
    OrdersApiHooks.useGetShipmentsListForForGridMutation();

  function getShipmentsListForForGridHandler(model) {
    dispatch(actions.setIsShipmentsCardLoading(true));
    dispatch(actions.setIsShipmentsGridLoading(true));
    return getShipmentsListForForGrid(model).then((res: any) => {
      dispatch(actions.setIsShipmentsCardLoading(false));
      dispatch(actions.setIsShipmentsGridLoading(false));
      dispatch(actions.refreshShipmentsGridModel(res.data));
      return res;
    });
  }

  return {
    getShipmentsListForForGridHandler,
  };
}
