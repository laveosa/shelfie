import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ProductsPageSliceActions as productsAction } from "@/state/slices/ProductsPageSlice.ts";

export default function useProductBasicDataPageService() {
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const dispatch = useAppDispatch();
  const [getAllProducts] = ProductsApiHooks.useLazyGetAllProductsQuery();

  function getAllProductsHandler() {
    dispatch(productsAction.setIsLoading(true));
    return getAllProducts(null).then((res: any) => {
      dispatch(productsAction.setIsLoading(false));
      dispatch(productsAction.refreshProducts(res.data));
      return res.data;
    });
  }

  return {
    ...productsState,
    getAllProductsHandler,
  };
}
