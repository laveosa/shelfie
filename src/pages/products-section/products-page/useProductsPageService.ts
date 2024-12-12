import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";

export default function useProductsPageService() {
  const {
    useGetAllProductsQuery,
    useManageProductMutation,
    useDeleteProductMutation,
  } = ProductsApiHooks;
  const state = useAppSelector<IProductsPageSlice>(StoreSliceEnum.PRODUCTS);
  const dispatch = useAppDispatch();
  const { data: products, isLoading: isProductsLoading } =
    useGetAllProductsQuery(null);
  const [manageProduct, manageProductQuery] = useManageProductMutation();

  return { ...state };
}
