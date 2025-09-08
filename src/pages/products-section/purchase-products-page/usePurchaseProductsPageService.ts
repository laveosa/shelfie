import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";
import { PurchaseProductsPageSliceActions as actions } from "@/state/slices/PurchaseProductsPageSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { useToast } from "@/hooks/useToast.ts";

export default function usePurchaseProductsPageService(
  _handleCardAction,
  _handleMultipleCardActions,
  _keepOnlyCards,
) {
  const state = useAppSelector<IPurchaseProductsPageSlice>(
    StoreSliceEnum.PURCHASE_PRODUCTS,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const productsService = useProductsPageService();
  const dispatch = useAppDispatch();
  const { addToast } = useToast();

  const [getListOfPurchaseProductsForGrid] =
    PurchasesApiHooks.useGetListOfPurchaseProductsForGridMutation();
  const [addVariantToPurchaseProducts] =
    PurchasesApiHooks.useAddVariantToPurchaseProductsMutation();
  const [updatePurchaseProduct] =
    PurchasesApiHooks.useUpdatePurchaseProductMutation();
  const [deleteStockAction] = PurchasesApiHooks.useDeleteStockActionMutation();
  const [getPurchaseSummary] =
    PurchasesApiHooks.useLazyGetPurchaseSummaryQuery();

  function getListOfPurchaseProductsForGridHandler(id: any, model) {
    return getListOfPurchaseProductsForGrid({ id, model }).then((res: any) => {
      dispatch(actions.refreshPurchasesProductsGridModel(res.data));
      dispatch(actions.refreshPurchaseProducts(res.data.items));
      return res.data;
    });
  }

  function addVariantToPurchaseProductsHandler(id: any, model) {
    return addVariantToPurchaseProducts({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function updatePurchaseProductHandler(id: any, model) {
    return updatePurchaseProduct({ id, model }).then((res: any) => {
      return res;
    });
  }

  function deleteStockActionHandler(stockActionId: any) {
    return deleteStockAction(stockActionId).then((res: any) => {
      return res.data;
    });
  }

  function getPurchaseSummaryHandler(purchaseId: any) {
    return getPurchaseSummary(purchaseId).then((res: any) => {
      dispatch(actions.refreshPurchaseSummary(res.data));
      return res.data;
    });
  }

  function onSubmitProductDataHandler(data: any) {
    dispatch(actions.setIsProductConfigurationCardLoading(true));
    productsService.createNewProductHandler(data).then((res) => {
      dispatch(actions.setIsProductConfigurationCardLoading(false));
      if (res.data) {
        dispatch(productsActions.refreshSelectedProduct(res.data));
        productsService.getTheProductsForGridHandler(
          productsState.gridRequestModel,
        );
        addToast({
          text: "Product created successfully",
          type: "success",
        });
      } else {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
    });
  }

  return {
    getListOfPurchaseProductsForGridHandler,
    addVariantToPurchaseProductsHandler,
    updatePurchaseProductHandler,
    deleteStockActionHandler,
    getPurchaseSummaryHandler,
    onSubmitProductDataHandler,
  };
}
