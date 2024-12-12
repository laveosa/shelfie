import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { ProductsPageSliceActions as action } from "@/state/slices/ProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";

export default function useProductsPageService() {
  const {
    useLazyGetAllProductsQuery,
    useManageProductMutation,
    useDeleteProductMutation,
  } = ProductsApiHooks;
  const state = useAppSelector<IProductsPageSlice>(StoreSliceEnum.PRODUCTS);
  const dispatch = useAppDispatch();
  const [getAllProducts] = useLazyGetAllProductsQuery();
  const [manageProduct] = useManageProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  function getAllProductsHandler() {
    dispatch(action.setLoading(true));
    return getAllProducts(null).then((res: any) => {
      dispatch(action.setLoading(false));
      dispatch(action.setProducts(res.data));
      return res.data;
    });
  }

  function manageProductHandler(model: ProductModel) {
    return manageProduct(model).then((res: any) => {
      console.log(res);
    });
  }

  function deleteProductHandler(id: number) {
    return deleteProduct(id).then((res: any) => {
      console.log(res);
    });
  }

  return {
    ...state,
    getAllProductsHandler,
    manageProductHandler,
    deleteProductHandler,
  };
}
