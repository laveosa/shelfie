import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ProductsPageSliceActions as action } from "@/state/slices/ProductsPageSlice.ts";

export default function useCreateProductPageService() {
  const { useLazyGetAllProductsQuery } = ProductsApiHooks;
  const state = useAppSelector<IProductsPageSlice>(StoreSliceEnum.PRODUCTS);
  const dispatch = useAppDispatch();
  const [getAllProducts] = useLazyGetAllProductsQuery();

  function getAllProductsHandler() {
    dispatch(action.setLoading(true));
    return getAllProducts(null).then((res: any) => {
      dispatch(action.setLoading(false));
      dispatch(action.setProducts(res.data));
      return res.data;
    });
  }

  return {
    ...state,
    getAllProductsHandler,
  };
}
