import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import useAppService from "@/useAppService.ts";
import { IOrderProductsPageSlice } from "@/const/interfaces/store-slices/IOrderProductsPageSlice.ts";
import OrderApiHooks from "@/utils/services/api/OrderApiService.ts";

export default function useOrderProductsPageService() {
  const appService = useAppService();
  const state = useSelector(
    (state: RootState): IOrderProductsPageSlice =>
      state[StoreSliceEnum.ORDER_PRODUCTS],
  );
  const dispatch = useDispatch<AppDispatch>();

  const [addVariantsToOrder] = OrderApiHooks.useAddVariantsToOrderMutation();

  function addVariantsToOrderHandler(orderId, model) {
    return addVariantsToOrder({ orderId, model }).then((res: any) => {
      console.log("RES", res.data);
      return res.data;
    });
  }

  return {
    addVariantsToOrderHandler,
  };
}
