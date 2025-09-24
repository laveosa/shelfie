import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { ISizeChartPageSlice } from "@/const/interfaces/store-slices/ISizeChartPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";

export default function useSizeChartPageService() {
  const state = useAppSelector<ISizeChartPageSlice>(StoreSliceEnum.SIZE_CHART);
  const dispatch = useAppDispatch();

  const [getCountersForProducts] =
    ProductsApiHooks.useLazyGetCountersForProductsQuery();

  function getCountersForProductsHandler(id: any) {
    return getCountersForProducts(id).then((res: any) => {
      return res.data;
    });
  }

  return {
    state,
    dispatch,
    getCountersForProductsHandler,
  };
}
