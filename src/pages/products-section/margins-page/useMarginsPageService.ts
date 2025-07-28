import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";

export function useMarginsPageService() {
  const [getMarginsListForGrid] =
    PurchasesApiHooks.useGetMarginsListForGridMutation();
  const [getMarginItemsListForGrid] =
    PurchasesApiHooks.useGetMarginItemsListForGridMutation();
  const [getAllMargins] = PurchasesApiHooks.useLazyGetAllMarginsQuery();
  const [getMarginForPurchase] =
    PurchasesApiHooks.useLazyGetMarginForPurchaseQuery();
  const [getMarginDetails] = PurchasesApiHooks.useLazyGetMarginDetailsQuery();
  const [createMargin] = PurchasesApiHooks.useCreateMarginMutation();
  const [updateMargin] = PurchasesApiHooks.useUpdateMarginMutation();
  const [createMarginRules] = PurchasesApiHooks.useCreateMarginRulesMutation();
  const [deleteMargin] = PurchasesApiHooks.useDeleteMarginMutation();
  const [restoreMargin] = PurchasesApiHooks.useRestoreMarginMutation();
  const [connectMarginToPurchase] =
    PurchasesApiHooks.useConnectMarginToPurchaseMutation();
  const [detachMargin] = PurchasesApiHooks.useDetachMarginMutation();
  const [restoreMarginRuleToDefault] =
    PurchasesApiHooks.useRestoreMarginRuleToDefaultMutation();
  const [updateMarginItem] = PurchasesApiHooks.useUpdateMarginItemMutation();
  const [applyMarginItem] = PurchasesApiHooks.useApplyMarginItemMutation();
  const [updateMarginRulesForPurchase] =
    PurchasesApiHooks.useUpdateMarginRulesForPurchaseMutation();
  const [applyVisibleMarginItems] =
    PurchasesApiHooks.useApplyVisibleMarginItemsMutation();
  const [applyAllMarginItems] =
    PurchasesApiHooks.useApplyAllMarginItemsMutation();

  function getMarginsListForGridHandler(model) {
    return getMarginsListForGrid(model).then((res: any) => {
      return res.data;
    });
  }

  function getMarginItemsListForGridHandler(purchaseId, model) {
    return getMarginItemsListForGrid({
      purchaseId,
      model,
    }).then((res: any) => {
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
      return res;
    });
  }

  function restoreMarginHandler(marginId) {
    return restoreMargin(marginId).then((res: any) => {
      return res;
    });
  }

  function connectMarginToPurchaseHandler(purchaseId, marginId) {
    return connectMarginToPurchase({
      purchaseId,
      marginId,
    }).then((res: any) => {
      return res.data;
    });
  }

  function detachMarginHandler(purchaseId) {
    return detachMargin(purchaseId).then((res: any) => {
      return res.data;
    });
  }

  function restoreMarginRuleToDefaultHandler(purchaseId) {
    return restoreMarginRuleToDefault(purchaseId).then((res: any) => {
      return res;
    });
  }

  function updateMarginItemHandler(marginItemId, model) {
    return updateMarginItem({ marginItemId, model }).then((res: any) => {
      return res.data;
    });
  }

  function applyMarginItemHandler(marginItemId) {
    return applyMarginItem(marginItemId).then((res: any) => {
      return res.data;
    });
  }

  function updateMarginRulesForPurchaseHandler(purchaseId, model) {
    return updateMarginRulesForPurchase({
      purchaseId,
      model,
    }).then((res: any) => {
      return res.data;
    });
  }

  function applyVisibleMarginItemsHandler(purchaseId, model) {
    return applyVisibleMarginItems({
      purchaseId,
      model,
    }).then((res: any) => {
      return res.data;
    });
  }

  function applyAllMarginItemsHandler(purchaseId) {
    return applyAllMarginItems(purchaseId).then((res: any) => {
      return res.data;
    });
  }

  return {
    getMarginsListForGridHandler,
    getMarginItemsListForGridHandler,
    getAllMarginsHandler,
    getMarginForPurchaseHandler,
    createMarginHandler,
    updateMarginHandler,
    createMarginRulesHandler,
    deleteMarginHandler,
    getMarginDetailsHandler,
    restoreMarginHandler,
    connectMarginToPurchaseHandler,
    detachMarginHandler,
    restoreMarginRuleToDefaultHandler,
    updateMarginItemHandler,
    applyMarginItemHandler,
    updateMarginRulesForPurchaseHandler,
    applyVisibleMarginItemsHandler,
    applyAllMarginItemsHandler,
  };
}
