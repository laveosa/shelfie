import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";
import { OrdersPageSliceActions as actions } from "@/state/slices/OrdersPageSlice.ts";
import OrderApiHooks from "@/utils/services/api/OrderApiService.ts";

export default function useOrdersPageService() {
  const state = useSelector(
    (state: RootState): IOrdersPageSlice => state[StoreSliceEnum.ORDERS],
  );
  const dispatch = useDispatch<AppDispatch>();

  const [getSortingOptionsForGrid] =
    DictionaryApiHooks.useLazyGetSortingOptionsForGridQuery();
  const [getListOfOrdersForGrid] =
    OrderApiHooks.useGetListOfOrdersForGridMutation();

  function getSortingOptionsForGridHandler() {
    return getSortingOptionsForGrid(null).then((res: any) => {
      dispatch(actions.refreshSortingOptions(res.data));
      return res.data;
    });
  }

  function getListOfOrdersForGridHandler(model) {
    dispatch(actions.setIsOrdersGridLoading(true));
    return getListOfOrdersForGrid(model).then((res: any) => {
      dispatch(actions.setIsOrdersGridLoading(false));
      dispatch(actions.refreshOrdersGridModel(res.data));
      return res.data;
    });
  }

  return { getSortingOptionsForGridHandler, getListOfOrdersForGridHandler };
}
