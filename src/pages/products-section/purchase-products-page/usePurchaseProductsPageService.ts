import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";
import { PurchaseProductsPageSliceActions as actions } from "@/state/slices/PurchaseProductsPageSlice.ts";

export default function usePurchaseProductsPageService() {
  const state = useAppSelector<IPurchaseProductsPageSlice>(
    StoreSliceEnum.PURCHASE_PRODUCTS,
  );
  const dispatch = useAppDispatch();

  const [getListOfPurchaseProductsForGrid] =
    PurchasesApiHooks.useGetListOfPurchaseProductsForGridMutation();
  const [addVariantToPurchaseProducts] =
    PurchasesApiHooks.useAddVariantToPurchaseProductsMutation();
  const [updatePurchaseProduct] =
    PurchasesApiHooks.useUpdatePurchaseProductMutation();

  function getListOfPurchaseProductsForGridHandler(id: any, model) {
    return getListOfPurchaseProductsForGrid({ id, model }).then((res: any) => {
      dispatch(actions.refreshPurchasesProductsGridModel(res.data));
      dispatch(actions.refreshPurchaseProducts(res.data.items));
      return res.data;
    });
  }

  function addVariantToPurchaseProductsHandler(id: any, model) {
    return addVariantToPurchaseProducts({ id, model }).then((res: any) => {
      return res;
    });
  }

  function updatePurchaseProductHandler(id: any, model) {
    return updatePurchaseProduct({ id, model }).then((res: any) => {
      return res;
    });
  }

  return {
    getListOfPurchaseProductsForGridHandler,
    addVariantToPurchaseProductsHandler,
    updatePurchaseProductHandler,
  };
}
