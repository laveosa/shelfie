import { merge } from "lodash";

import { AppSliceActions as appActions } from "@/state/slices/AppSlice.ts";
import { MarginsPageSliceActions as actions } from "@/state/slices/MarginsPageSlice.ts";
import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { setSelectedGridItem } from "@/utils/helpers/quick-helper.ts";
import { useToast } from "@/hooks/useToast.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { IMarginsPageSlice } from "@/const/interfaces/store-slices/IMarginsPageSlice.ts";

export function useMarginsPageService(
  handleCardAction,
  handleMultipleCardActions,
  keepOnlyCards,
) {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const { openConfirmationDialog } = useDialogService();
  const productsService = useProductsPageService();
  const state = useAppSelector<IMarginsPageSlice>(StoreSliceEnum.MARGINS);
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);

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
      dispatch(actions.refreshMarginsList(res.data.items));
      return res.data;
    });
  }

  function getMarginItemsListForGridHandler(purchaseId, model) {
    return getMarginItemsListForGrid({
      purchaseId,
      model,
    }).then((res: any) => {
      dispatch(actions.refreshMarginItemsGridRequestModel(res.data));
      return res.data;
    });
  }

  function getAllMarginsHandler() {
    return getAllMargins().then((res: any) => {
      dispatch(actions.refreshMarginsList(res.data));
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
      return res.data;
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

  function gridRequestChangeHandle(purchaseId, updates: GridRequestModel) {
    getMarginItemsListForGridHandler(purchaseId, updates);
  }

  function openSelectMarginCardHandle() {
    handleMultipleCardActions({
      selectEntityCard: true,
      salePriceManagementCard: false,
    });
    dispatch(actions.setIsSelectMarginCardLoading(true));
    getMarginsListForGridHandler(state.marginsGridRequestModel).then((res) => {
      dispatch(actions.setIsSelectMarginCardLoading(false));
      dispatch(actions.setIsMarginListGridLoading(false));
      const modifiedList = res.items.map((item) => ({
        ...item,
        isSelected: item.marginId === state.selectedMargin.marginId,
      }));
      dispatch(actions.refreshMarginsList(modifiedList));
    });
  }

  function searchEntityHandle(model) {
    dispatch(actions.setIsMarginListGridLoading(true));
    getMarginsListForGridHandler({
      ...state.marginsGridRequestModel,
      searchQuery: model,
    }).then((res) => {
      dispatch(actions.setIsMarginListGridLoading(false));
      const modifiedList = res.items.map((item) => ({
        ...item,
        isSelected: item.marginId === state.selectedMargin.marginId,
      }));
      dispatch(actions.refreshMarginsList(modifiedList));
    });
  }

  function selectMarginHandle(model, purchaseId) {
    dispatch(actions.setIsMarginForPurchaseCardLoading(true));
    connectMarginToPurchaseHandler(purchaseId, model.marginId).then((res) => {
      dispatch(actions.setIsMarginForPurchaseCardLoading(false));
      handleCardAction("selectEntityCard");
      if (res) {
        dispatch(actions.refreshActiveCards(null));
        dispatch(actions.refreshSelectedMargin(res));
        getMarginItemsListHandle(purchaseId);
        addToast({
          text: "Margin selected successfully",
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

  function detachMarginHandle(purchaseId) {
    dispatch(actions.setIsMarginForPurchaseCardLoading(true));
    detachMarginHandler(purchaseId).then((res) => {
      dispatch(actions.setIsMarginForPurchaseCardLoading(false));
      if (!res.error) {
        dispatch(actions.resetSelectedMargin());
        addToast({
          text: "Margin detached successfully",
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

  function createMarginHandle(model) {
    dispatch(actions.setIsMarginConfigurationCardLoading(true));
    createMarginHandler({ marginName: model.marginName }).then((res) => {
      if (res) {
        createMarginRulesHandler(res.marginId, model.marginRule).then(() => {
          dispatch(actions.setIsMarginConfigurationCardLoading(false));
          dispatch(actions.setIsMarginListGridLoading(true));
          dispatch(actions.setIsSelectMarginCardLoading(true));
          getMarginsListForGridHandler(state.marginsGridRequestModel).then(
            (res) => {
              dispatch(actions.setIsSelectMarginCardLoading(false));
              dispatch(actions.setIsMarginListGridLoading(false));
              const modifiedList = res.items.map((item) => ({
                ...item,
                isSelected: item.marginId === state.selectedMargin.marginId,
              }));
              dispatch(actions.refreshMarginsList(modifiedList));
            },
          );
        });
        handleCardAction("marginConfigurationCard");
        addToast({
          text: "Margin created successfully",
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

  function updateMarginHandle(model) {
    dispatch(actions.setIsMarginConfigurationCardLoading(true));
    Promise.all([
      updateMarginHandler(state.managedMargin.marginId, {
        marginName: model.marginName,
      }),
      createMarginRulesHandler(state.managedMargin.marginId, model.marginRule),
    ]).then(([margin, marginRules]) => {
      dispatch(actions.setIsMarginConfigurationCardLoading(false));
      if (margin.marginName !== state.managedMargin.marginName) {
        dispatch(actions.setIsSelectMarginCardLoading(true));
        getMarginsListForGridHandler(state.marginsGridRequestModel).then(() => {
          dispatch(actions.setIsSelectMarginCardLoading(false));
        });
      }
      if (margin && marginRules) {
        handleCardAction("marginConfigurationCard");
        addToast({
          text: "Default margin has been updated",
          type: "success",
        });
      } else {
        addToast({
          text: `${margin.error.data.detail || marginRules.error.data.detail}`,
          type: "error",
        });
      }
    });
  }

  function updateSelectedMarginHandler(model, purchaseId) {
    dispatch(actions.setIsMarginForPurchaseCardLoading(true));
    updateMarginRulesForPurchaseHandler(purchaseId, model.marginRule).then(
      (res) => {
        dispatch(actions.setIsMarginForPurchaseCardLoading(false));
        if (!res.error) {
          dispatch(
            actions.refreshSelectedMargin({
              ...state.selectedMargin,
              marginRule: res,
            }),
          );
          getMarginItemsListHandle(purchaseId);
          addToast({
            text: "Margin updated successfully",
            type: "success",
          });
        } else {
          addToast({
            text: `${res.error.data.detail}`,
            type: "error",
          });
        }
      },
    );
  }

  function manageMarginHandle(model) {
    handleMultipleCardActions({
      marginConfigurationCard: true,
      salePriceManagementCard: false,
    });
    dispatch(actions.setIsMarginConfigurationCardLoading(true));
    getMarginDetailsHandler(model.marginId).then((res) => {
      dispatch(actions.setIsMarginConfigurationCardLoading(false));
      if (res) {
        dispatch(actions.refreshManagedMargin(res));
        dispatch(
          actions.refreshMarginsList(
            setSelectedGridItem(model.marginId, state.marginsList, "marginId"),
          ),
        );
      } else {
        handleCardAction("marginConfigurationCard");
      }
    });
  }

  async function deleteMarginHandle(model, purchaseId) {
    const confirmed = await openConfirmationDialog({
      headerTitle: "Deleting margin rule",
      text: `You are about to delete the margin rule. The prices that were previously calculated using this margin, will remain intact. The margin will no longer be applied to new purchases.`,
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmed) return;

    deleteMarginHandler(model.marginId).then((res) => {
      if (!res.error) {
        dispatch(
          actions.refreshManagedMargin({
            ...state.managedMargin,
            isDeleted: true,
          }),
        );
        if (state.selectedMargin.marginId === model.marginId) {
          dispatch(actions.setIsMarginForPurchaseCardLoading(true));
          getMarginForPurchaseHandler(purchaseId).then((res) => {
            dispatch(actions.setIsMarginForPurchaseCardLoading(false));
            dispatch(actions.refreshSelectedMargin(res));
          });
        }
        addToast({
          text: "Margin deleted successfully",
          type: "success",
        });
      } else {
        addToast({
          text: res.error.data.detail,
          type: "error",
        });
      }
    });
  }

  function restoreMarginHandle(model, purchaseId) {
    dispatch(actions.setIsMarginConfigurationCardLoading(true));
    restoreMarginHandler(model.marginId).then((res) => {
      dispatch(actions.setIsMarginConfigurationCardLoading(false));
      if (!res.error) {
        dispatch(
          actions.refreshManagedMargin({
            ...state.managedMargin,
            isDeleted: false,
          }),
        );
        if (state.selectedMargin.marginId === model.marginId) {
          dispatch(actions.setIsMarginForPurchaseCardLoading(true));
          getMarginForPurchaseHandler(purchaseId).then((res) => {
            dispatch(actions.setIsMarginForPurchaseCardLoading(false));
            dispatch(actions.refreshSelectedMargin(res));
          });
        }
        addToast({
          text: "Margin restored successfully",
          type: "success",
        });
      } else {
        addToast({
          text: res.error.data.detail,
          type: "error",
        });
      }
    });
  }

  function restoreMarginRulesHandle(purchaseId) {
    dispatch(actions.setIsMarginForPurchaseCardLoading(true));
    restoreMarginRuleToDefaultHandler(purchaseId).then((res) => {
      dispatch(actions.setIsMarginForPurchaseCardLoading(false));
      if (!res.error) {
        dispatch(actions.refreshSelectedMargin(res));
        addToast({
          text: "Margin restored successfully",
          type: "success",
        });
      } else {
        addToast({
          text: res.error.data.detail,
          type: "error",
        });
      }
    });
  }

  function updateMarginItemHandle(model) {
    const updatedItems = state.marginItemsGridRequestModel.items.map((item) =>
      item.marginItemId === model.marginItemId
        ? { ...model, selectedItem: true }
        : { ...item, selectedItem: false },
    );

    dispatch(
      actions.refreshMarginItemsGridRequestModel({
        ...state.marginItemsGridRequestModel,
        items: updatedItems,
      }),
    );

    /*updateMarginItemHandler(model.marginItemId, model).then((res) => {
      const updatedItems = state.marginItemsGridRequestModel.items.map(
        (item) =>
          item.marginItemId === model.marginItemId
            ? { ...res, selectedItem: true }
            : { ...item, selectedItem: false },
      );

      dispatch(
        actions.refreshMarginItemsGridRequestModel({
          ...state.marginItemsGridRequestModel,
          items: updatedItems,
        }),
      );
    });*/
  }

  function applyMarginItemItemHandle(model) {
    applyMarginItemHandler(model).then((res) => {
      if (res) {
        const updatedItems = state.marginItemsGridRequestModel.items.map(
          (item) => (item.marginItemId === res.marginItemId ? res : item),
        );

        dispatch(
          actions.refreshMarginItemsGridRequestModel({
            ...state.marginItemsGridRequestModel,
            items: updatedItems,
          }),
        );
      } else {
        addToast({
          text: res.error.data.detail,
          type: "error",
        });
      }
    });
  }

  function applyVisibleMarginItemsHandle(purchaseId) {
    dispatch(actions.setIsMarginProductsGridLoading(true));
    applyVisibleMarginItemsHandler(
      purchaseId,
      state.marginItemsGridRequestModel,
    ).then((res) => {
      dispatch(actions.setIsMarginProductsGridLoading(false));
      if (res) {
        dispatch(actions.refreshMarginItemsGridRequestModel(res));
        addToast({
          text: "Visible margin items applied successfully",
          type: "success",
        });
      } else {
        addToast({
          text: res.error.data.detail,
          type: "error",
        });
      }
    });
  }

  function applyAllMarginItemsHandle(purchaseId) {
    dispatch(actions.setIsMarginProductsGridLoading(true));
    applyAllMarginItemsHandler(purchaseId).then((res) => {
      dispatch(actions.setIsMarginProductsGridLoading(false));
      if (res) {
        dispatch(actions.refreshMarginItemsGridRequestModel(res));
        addToast({
          text: "All margin items applied successfully",
          type: "success",
        });
      } else {
        addToast({
          text: res.error.data.detail,
          type: "error",
        });
      }
    });
  }

  function openCreateEntityCardHandle() {
    dispatch(actions.resetManagedMargin());
    handleCardAction("marginConfigurationCard", true);
  }

  function closeSelectEntityCardHandle() {
    handleCardAction("selectEntityCard");
  }

  function closeSelectMarginCardHandle() {
    handleCardAction("selectMarginCard");
  }

  function closeMarginConfigurationCardHandle() {
    handleCardAction("marginConfigurationCard");
  }

  function applyColumnsHandle(model) {
    const modifiedModel = merge({}, appState.preferences, model);
    dispatch(appActions.refreshPreferences(modifiedModel));
    productsService.updateUserPreferencesHandler(modifiedModel);
  }

  function resetColumnsHandle() {
    productsService.resetUserPreferencesHandler("salePriceManagement");
  }

  function getMarginPageDataHandle(purchaseId) {
    dispatch(actions.resetSelectedMargin());
    dispatch(actions.setIsMarginForPurchaseCardLoading(true));
    getMarginForPurchaseHandler(purchaseId).then((res) => {
      dispatch(actions.setIsMarginForPurchaseCardLoading(false));
      dispatch(actions.refreshSelectedMargin(res));
    });
    if (!productsState.purchaseCounters) {
      dispatch(actions.setIsProductMenuCardLoading(true));
      productsService
        .getPurchaseCountersHandler(Number(purchaseId))
        .then(() => dispatch(actions.setIsProductMenuCardLoading(false)));
    }
    if (state.marginsList.length === 0) {
      getAllMarginsHandler();
    }
    if (productsState.taxesList.length === 0) {
      productsService.getTaxesListHandler();
    }
    if (productsState.brands.length === 0) {
      productsService.getBrandsForFilterHandler();
    }
    if (productsState.categories.length === 0) {
      productsService.getCategoriesForFilterHandler();
    }
    if (
      productsState.sizesForFilter.length === 0 ||
      productsState.colorsForFilter.length === 0
    )
      productsService.getTraitsForFilterHandler();
    keepOnlyCards(["salePriceManagementCard"]);
  }

  function getMarginItemsListHandle(purchaseId) {
    dispatch(actions.setIsMarginProductsGridLoading(true));
    getMarginItemsListForGridHandler(
      purchaseId,
      state.marginItemsGridRequestModel,
    ).then(() => {
      dispatch(actions.setIsMarginProductsGridLoading(false));
    });
  }

  function keepSalePriceManagementCardOpenHandle() {
    if (state.activeCards.length === 0) {
      handleCardAction("salePriceManagementCard", true);
    }
  }

  return {
    state,
    appState,
    productsState,
    gridRequestChangeHandle,
    openSelectMarginCardHandle,
    searchEntityHandle,
    selectMarginHandle,
    detachMarginHandle,
    createMarginHandle,
    updateMarginHandle,
    updateSelectedMarginHandler,
    manageMarginHandle,
    deleteMarginHandle,
    restoreMarginHandle,
    restoreMarginRulesHandle,
    updateMarginItemHandle,
    applyMarginItemItemHandle,
    openCreateEntityCardHandle,
    closeSelectEntityCardHandle,
    closeSelectMarginCardHandle,
    closeMarginConfigurationCardHandle,
    applyColumnsHandle,
    resetColumnsHandle,
    applyVisibleMarginItemsHandle,
    applyAllMarginItemsHandle,
    getMarginPageDataHandle,
    getMarginItemsListHandle,
    keepSalePriceManagementCardOpenHandle,
  };
}
