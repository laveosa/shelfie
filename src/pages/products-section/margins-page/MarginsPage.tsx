import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { merge } from "lodash";

import { setSelectedGridItem } from "@/utils/helpers/quick-helper.ts";
import { MarginsPageSliceActions as actions } from "@/state/slices/MarginsPageSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { useToast } from "@/hooks/useToast.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { useMarginsPageService } from "@/pages/products-section/margins-page/useMarginsPageService.ts";
import cs from "./MarginsPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import MarginForPurchaseCard from "@/components/complex/custom-cards/margin-for-purchase-card/MarginForPurchaseCard.tsx";
import MarginConfigurationCard from "@/components/complex/custom-cards/margin-configuration-card/MarginConfigurationCard.tsx";
import SalePriseManagementCard from "@/components/complex/custom-cards/sale-price-management-card/SalePriceManagementCard.tsx";
import { AppSliceActions as appActions } from "@/state/slices/AppSlice.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import { DataWithId } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { MarginsListGridColumns } from "@/components/complex/grid/margins-list-grid/MarginsListGridColumns.tsx";

export function MarginsPage() {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const { openConfirmationDialog } = useDialogService();
  const service = useMarginsPageService();
  const productsService = useProductsPageService();
  const state = useAppSelector<IPurchaseProductsPageSlice>(
    StoreSliceEnum.MARGINS,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const { purchaseId } = useParams();
  const { handleCardAction, handleMultipleCardActions, createRefCallback } =
    useCardActions({
      selectActiveCards: (state) => state[StoreSliceEnum.MARGINS].activeCards,
      refreshAction: actions.refreshActiveCards,
    });

  useEffect(() => {
    if (!state.selectedMargin) {
      dispatch(actions.setIsMarginForPurchaseCardLoading(true));
      service.getMarginForPurchaseHandler(purchaseId).then((res) => {
        dispatch(actions.setIsMarginForPurchaseCardLoading(false));
        dispatch(actions.refreshSelectedMargin(res));
      });
    }
    if (!productsState.purchaseCounters) {
      dispatch(actions.setIsProductMenuCardLoading(true));
      productsService
        .getPurchaseCountersHandler(Number(purchaseId))
        .then(() => dispatch(actions.setIsProductMenuCardLoading(false)));
    }
    if (state.marginsList.length === 0) {
      service.getAllMarginsHandler();
    }
    if (productsState.taxesList.length === 0) {
      productsService.getTaxesListHandler();
    }
    if (productsState.sortingOptions.length === 0) {
      productsService.getSortingOptionsForGridHandler();
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
    handleCardAction("salePriceManagementCard", true);
  }, [purchaseId]);

  useEffect(() => {
    dispatch(actions.setIsMarginProductsGridLoading(true));
    service
      .getMarginItemsListForGridHandler(
        purchaseId,
        state.marginItemsGriRequestModel,
      )
      .then(() => {
        dispatch(actions.setIsMarginProductsGridLoading(false));
      });
  }, [state.marginItemsGriRequestModel]);

  useEffect(() => {
    if (state.activeCards.length === 0) {
      handleCardAction("salePriceManagementCard", true);
    }
  }, [state.activeCards]);

  function handleGridRequestChange(updates: GridRequestModel) {
    if ("searchQuery" in updates || "currentPage" in updates) {
      dispatch(
        actions.refreshMarginItemsGriRequestModel({
          ...state.marginItemsGriRequestModel,
          ...updates,
        }),
      );
    } else {
      dispatch(
        actions.refreshMarginItemsGriRequestModel({
          ...state.marginItemsGriRequestModel,
          currentPage: 1,
          filter: {
            ...state.marginItemsGriRequestModel.filter,
            ...updates,
          },
        }),
      );
    }
  }

  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "openSelectMarginCard":
        handleMultipleCardActions({
          selectEntityCard: true,
          salePriceManagementCard: false,
        });
        dispatch(actions.setIsSelectMarginCardLoading(true));
        service
          .getMarginsListForGridHandler(state.marginsGridRequestModel)
          .then((res) => {
            dispatch(actions.setIsSelectMarginCardLoading(false));
            dispatch(actions.setIsMarginListGridLoading(false));
            const modifiedList = res.items.map((item) => ({
              ...item,
              isSelected: item.marginId === state.selectedMargin.marginId,
            }));
            dispatch(actions.refreshMarginsList(modifiedList));
          });
        break;
      case "searchEntity":
        dispatch(actions.setIsMarginListGridLoading(true));
        service
          .getMarginsListForGridHandler({
            ...state.marginsGridRequestModel,
            searchQuery: payload,
          })
          .then((res) => {
            dispatch(actions.setIsMarginListGridLoading(false));
            dispatch(actions.setIsMarginListGridLoading(false));
            const modifiedList = res.items.map((item) => ({
              ...item,
              isSelected: item.marginId === state.selectedMargin.marginId,
            }));
            dispatch(actions.refreshMarginsList(modifiedList));
          });
        break;
      case "selectMargin":
        dispatch(actions.setIsMarginForPurchaseCardLoading(true));
        service
          .connectMarginToPurchaseHandler(purchaseId, payload.marginId)
          .then((res) => {
            dispatch(actions.setIsMarginForPurchaseCardLoading(false));
            handleCardAction("selectEntityCard");
            if (res) {
              dispatch(actions.refreshActiveCards(null));
              dispatch(actions.refreshSelectedMargin(res));
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
        break;
      case "replaceMargin":
        handleMultipleCardActions({
          selectMarginCard: true,
          salePriceManagementCard: false,
        });
        if (state.marginsList.length === 0) {
          dispatch(actions.setIsSelectMarginCardLoading(true));
          service
            .getMarginsListForGridHandler(state.marginsGridRequestModel)
            .then(() => {
              dispatch(actions.setIsSelectMarginCardLoading(false));
            });
        }
        break;
      case "detachMargin":
        dispatch(actions.setIsMarginForPurchaseCardLoading(true));
        service.detachMarginHandler(purchaseId).then((res) => {
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
        break;
      case "createMargin":
        dispatch(actions.setIsMarginConfigurationCardLoading(true));
        service
          .createMarginHandler({ marginName: payload.marginName })
          .then((res) => {
            if (res) {
              service
                .createMarginRulesHandler(res.marginId, payload.marginRule)
                .then(() => {
                  dispatch(actions.setIsMarginConfigurationCardLoading(false));
                  dispatch(actions.setIsMarginListGridLoading(true));
                  dispatch(actions.setIsSelectMarginCardLoading(true));
                  service
                    .getMarginsListForGridHandler(state.marginsGridRequestModel)
                    .then((res) => {
                      dispatch(actions.setIsSelectMarginCardLoading(false));
                      dispatch(actions.setIsMarginListGridLoading(false));
                      const modifiedList = res.items.map((item) => ({
                        ...item,
                        isSelected:
                          item.marginId === state.selectedMargin.marginId,
                      }));
                      dispatch(actions.refreshMarginsList(modifiedList));
                    });
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
        break;
      case "updateMargin":
        dispatch(actions.setIsMarginConfigurationCardLoading(true));
        Promise.all([
          service.updateMarginHandler(state.managedMargin.marginId, {
            marginName: payload.marginName,
          }),
          service.createMarginRulesHandler(state.managedMargin.marginId, {
            ...payload.marginRule,
            nearest9: payload.nearest9,
            roundTo: payload.roundTo,
          }),
        ]).then(([margin, marginRules]) => {
          dispatch(actions.setIsMarginConfigurationCardLoading(false));
          if (margin.marginName !== state.managedMargin.marginName) {
            dispatch(actions.setIsSelectMarginCardLoading(true));
            service
              .getMarginsListForGridHandler(state.marginsGridRequestModel)
              .then(() => {
                dispatch(actions.setIsSelectMarginCardLoading(false));
              });
          }
          if (margin && marginRules) {
            addToast({
              text: "Margin updated successfully",
              type: "success",
            });
          } else {
            addToast({
              text: `${margin.error.data.detail || marginRules.error.data.detail}`,
              type: "error",
            });
          }
        });
        break;
      case "updateSelectedMargin":
        dispatch(actions.setIsMarginForPurchaseCardLoading(true));
        service
          .updateMarginRulesForPurchaseHandler(purchaseId, {
            ...payload.marginRule,
            nearest9: payload.nearest9,
            roundTo: payload.roundTo,
          })
          .then((res) => {
            dispatch(actions.setIsMarginForPurchaseCardLoading(false));
            if (!res.error) {
              dispatch(
                actions.refreshSelectedMargin({
                  ...state.selectedMargin,
                  marginRule: res,
                }),
              );
              dispatch(actions.setIsMarginProductsGridLoading(true));
              service
                .getMarginItemsListForGridHandler(
                  purchaseId,
                  state.marginItemsGriRequestModel,
                )
                .then(() => {
                  dispatch(actions.setIsMarginProductsGridLoading(false));
                });
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
          });
        break;
      case "manageSelectedMargin":
        handleMultipleCardActions({
          marginConfigurationCard: true,
          salePriceManagementCard: false,
        });
        dispatch(actions.refreshManagedMargin(payload));
        break;
      case "manageMargin":
        handleCardAction("marginConfigurationCard", true);
        dispatch(actions.setIsMarginConfigurationCardLoading(true));
        service.getMarginDetailsHandler(payload.marginId).then((res) => {
          dispatch(actions.setIsMarginConfigurationCardLoading(false));
          if (res) {
            dispatch(actions.refreshManagedMargin(res));
            dispatch(
              actions.refreshMarginsList(
                setSelectedGridItem(
                  payload.marginId,
                  state.marginsList,
                  "marginId",
                ),
              ),
            );
          } else {
            handleCardAction("marginConfigurationCard");
          }
        });
        break;
      case "deleteMargin":
        const confirmed = await openConfirmationDialog({
          title: "Deleting margin rule",
          text: `You are about to delete the margin rule. The prices that were previously calculated using this margin, will remain intact. The margin will no longer be applied to new purchases.`,
          primaryButtonValue: "Delete",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmed) return;

        service.deleteMarginHandler(payload.marginId).then((res) => {
          if (!res.error) {
            dispatch(
              actions.refreshManagedMargin({
                ...state.managedMargin,
                isDeleted: true,
              }),
            );
            if (state.selectedMargin.marginId === payload.marginId) {
              dispatch(actions.setIsMarginForPurchaseCardLoading(true));
              service.getMarginForPurchaseHandler(purchaseId).then((res) => {
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
        break;
      case "restoreMargin":
        dispatch(actions.setIsMarginConfigurationCardLoading(true));
        service.restoreMarginHandler(payload.marginId).then((res) => {
          dispatch(actions.setIsMarginConfigurationCardLoading(false));
          if (!res.error) {
            dispatch(
              actions.refreshManagedMargin({
                ...state.managedMargin,
                isDeleted: false,
              }),
            );
            if (state.selectedMargin.marginId === payload.marginId) {
              dispatch(actions.setIsMarginForPurchaseCardLoading(true));
              service.getMarginForPurchaseHandler(purchaseId).then((res) => {
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
        break;
      case "restoreMarginRules":
        dispatch(actions.setIsMarginForPurchaseCardLoading(true));
        service.restoreMarginRuleToDefaultHandler(purchaseId).then((res) => {
          dispatch(actions.setIsMarginForPurchaseCardLoading(false));
          if (!res.error) {
            service.getMarginForPurchaseHandler(purchaseId).then((res) => {
              dispatch(actions.refreshSelectedMargin(res));
            });
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
        break;
      case "updateMarginItem":
        service
          .updateMarginItemHandler(payload.marginItemId, payload)
          .then((res) => {
            if (res) {
              const updatedItems = state.marginItemsGridModel.items.map(
                (item) => (item.marginItemId === res.marginItemId ? res : item),
              );

              dispatch(
                actions.refreshMarginItemsGridModel({
                  ...state.marginItemsGridModel,
                  items: updatedItems,
                }),
              );
            }
          });
        break;
      case "applyMarginItem":
        service.applyMarginItemHandler(payload).then((res) => {
          if (res) {
            const updatedItems = state.marginItemsGridModel.items.map((item) =>
              item.marginItemId === res.marginItemId ? res : item,
            );

            dispatch(
              actions.refreshMarginItemsGridModel({
                ...state.marginItemsGridModel,
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
        break;
      case "openCreateEntityCard":
        dispatch(actions.resetManagedMargin());
        handleCardAction("marginConfigurationCard", true);
        break;
      case "closeSelectEntityCard":
        handleCardAction("selectEntityCard");
        break;
      case "closeSelectMarginCard":
        handleCardAction("selectMarginCard");
        break;
      case "closeMarginConfigurationCard":
        handleCardAction("marginConfigurationCard");
        break;
      case "applyColumns":
        const modifiedModel = merge({}, appState.preferences, payload);
        dispatch(appActions.refreshPreferences(modifiedModel));
        productsService.updateUserPreferencesHandler(modifiedModel);
        break;
      case "resetColumns":
        productsService.resetUserPreferencesHandler("products");
        break;
      case "gridRequestChange":
        handleGridRequestChange(payload);
        break;
      case "brandFilter":
        handleGridRequestChange({ filter: { brands: payload } });
        break;
      case "categoryFilter":
        handleGridRequestChange({ filter: { categories: payload } });
        break;
      case "applyVisibleMarginItems":
        dispatch(actions.setIsMarginProductsGridLoading(true));
        service
          .applyVisibleMarginItemsHandler(
            purchaseId,
            state.marginItemsGriRequestModel,
          )
          .then((res) => {
            dispatch(actions.setIsMarginProductsGridLoading(false));
            if (res) {
              dispatch(actions.refreshMarginItemsGridModel(res));
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
        break;
      case "applyAllMarginItems":
        dispatch(actions.setIsMarginProductsGridLoading(true));
        service.applyAllMarginItemsHandler(purchaseId).then((res) => {
          dispatch(actions.setIsMarginProductsGridLoading(false));
          if (res) {
            dispatch(actions.refreshMarginItemsGridModel(res));
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
        break;
    }
  }

  return (
    <div className={cs.marginPage}>
      <ProductMenuCard
        isLoading={state.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        itemId={Number(purchaseId)}
        counter={productsState.purchaseCounters}
      />
      <MarginForPurchaseCard
        isLoading={state.isMarginForPurchaseCardLoading}
        margin={state.selectedMargin}
        onAction={onAction}
      />
      {state.activeCards?.includes("salePriceManagementCard") && (
        <div ref={createRefCallback("salePriceManagementCard")}>
          <SalePriseManagementCard
            isLoading={state.isSalePriceManagementCardLoading}
            isGridLoading={state.isMarginProductsGridLoading}
            brands={productsState.brands}
            categories={productsState.categories}
            sizes={productsState.sizesForFilter}
            colors={productsState.colorsForFilter}
            taxes={productsState.taxesList}
            sortingOptions={productsState.sortingOptions}
            gridModel={state.marginItemsGridModel}
            gridRequestModel={state.marginItemsGriRequestModel}
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards?.includes("selectEntityCard") && (
        <div ref={createRefCallback("selectEntityCard")}>
          <SelectEntityCard
            isLoading={state.isSelectMarginCardLoading}
            isGridLoading={state.isMarginListGridLoading}
            entityName="Margin"
            entityCollection={state.marginsList}
            columns={
              MarginsListGridColumns({
                onAction,
              }) as ColumnDef<DataWithId>[]
            }
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards?.includes("marginConfigurationCard") && (
        <div ref={createRefCallback("marginConfigurationCard")}>
          <MarginConfigurationCard
            isLoading={state.isMarginConfigurationCardLoading}
            margin={state.managedMargin}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
}
