import { useAppDispatch } from "@/utils/hooks/redux.ts";
import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";

export function useMarginsPageService() {
  const dispatch = useAppDispatch();

  const [getMarginsListForGrid] =
    PurchasesApiHooks.useGetListOfPurchaseProductsForGridMutation();
  const [getAllMargins] = PurchasesApiHooks.useLazyGetAllMarginsQuery();
  const [getMarginForPurchase] =
    PurchasesApiHooks.useLazyGetMarginForPurchaseQuery();
  const [getMarginDetails] = PurchasesApiHooks.useLazyGetMarginDetailsQuery();
  const [createMargin] = PurchasesApiHooks.useCreateMarginMutation();
  const [updateMargin] = PurchasesApiHooks.useUpdateMarginMutation();
  const [createMarginRules] = PurchasesApiHooks.useCreateMarginRulesMutation();
  const [deleteMargin] = PurchasesApiHooks.useDeleteMarginMutation();
  const [restoreMargin] = PurchasesApiHooks.useRestoreMarginMutation();

  function getMarginsListForGridHandler(model) {
    return getMarginsListForGrid(model).then((res: any) => {
      return res.data;
    });
  }

  function getAllMarginsHandler() {
    return getAllMargins().then((res: any) => {
      return res.data;
    });
  }

  function getMarginForPurchaseHandler(purchaseId) {
    return getMarginForPurchase(purchaseId).then((res: any) => {
      return res.data;
    });
  }

  function getMarginDetailsHandler(marginId) {
    return getMarginDetails(marginId).then((res: any) => {
      return res.data;
    });
  }

  function createMarginHandler(model) {
    return createMargin(model).then((res: any) => {
      return res.data;
    });
  }

  function updateMarginHandler(marginId, model) {
    return updateMargin({ marginId, model }).then((res: any) => {
      return res.data;
    });
  }

  function createMarginRulesHandler(marginId, model) {
    return createMarginRules({ marginId, model }).then((res: any) => {
      return res.data;
    });
  }

  function deleteMarginHandler(marginId) {
    return deleteMargin(marginId).then((res: any) => {
      return res.data;
    });
  }

  function restoreMarginHandler(marginId) {
    return restoreMargin(marginId).then((res: any) => {
      return res.data;
    });
  }

  return {
    getMarginsListForGridHandler,
    getAllMarginsHandler,
    getMarginForPurchaseHandler,
    createMarginHandler,
    updateMarginHandler,
    createMarginRulesHandler,
    deleteMarginHandler,
    getMarginDetailsHandler,
    restoreMarginHandler,
  };
}
