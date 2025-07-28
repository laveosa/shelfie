import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { merge } from "lodash";

import {
  scrollToRefElement,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";
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
import SelectMarginCard from "@/components/complex/custom-cards/select-margin-card/SelectMarginCard.tsx";
import MarginConfigurationCard from "@/components/complex/custom-cards/margin-configuration-card/MarginConfigurationCard.tsx";
import SalePriseManagementCard from "@/components/complex/custom-cards/sale-price-management-card/SalePriceManagementCard.tsx";
import { AppSliceActions as appActions } from "@/state/slices/AppSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

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
  const cardRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

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
      service.getAllMarginsHandler().then((res) => {
        dispatch(actions.refreshMarginsList(res));
      });
    }
    if (productsState.taxesList.length === 0) {
      productsService.getTaxesListHandler();
    }
    if (productsState.sortingOptions.length === 0) {
      productsService.getSortingOptionsForGridHandler();
    }
    if (productsState.brands.length === 0) {
      productsService.getBrandsForFilterHandler().then((res) => {
        dispatch(productsActions.refreshBrands(res));
      });
    }
    if (productsState.categories.length === 0) {
      productsService.getCategoriesForFilterHandler().then((res) => {
        dispatch(productsActions.refreshCategories(res));
      });
    }
    if (
      productsState.sizesForFilter.length === 0 ||
      productsState.colorsForFilter.length === 0
    )
      productsService.getTraitsForFilterHandler().then((res) => {
        dispatch(
          productsActions.refreshSizesForFilter(
            res
              .filter((trait) => trait.traitTypeId === 1)
              .flatMap((trait) => trait.traitOptions),
          ),
        );
        dispatch(
          productsActions.refreshColorsForFilter(
            res
              .filter((trait) => trait.traitTypeId === 2)
              .flatMap((trait) => trait.traitOptions),
          ),
        );
      });
    handleCardAction("salePriceManagementCard", true);
  }, [purchaseId]);

  useEffect(() => {
    service
      .getMarginItemsListForGridHandler(
        purchaseId,
        state.marginItemsGriRequestModel,
      )
      .then((res) => {
        dispatch(actions.refreshMarginItemsGridModel(res));
      });
  }, [state.marginItemsGriRequestModel]);

  function handleCardAction(
    identifier: string,
    forceOpen: boolean = false,
    overrideActiveCards?: string[],
  ) {
    const activeCards: string[] = Array.isArray(overrideActiveCards)
      ? overrideActiveCards
      : Array.isArray(state.activeCards)
        ? state.activeCards
        : [];
    let updatedCards: string[];

    if (forceOpen) {
      if (!activeCards.includes(identifier)) {
        updatedCards = [...activeCards, identifier];
        dispatch(actions.refreshActiveCards(updatedCards));
        scrollToRefElement(cardRefs.current, identifier);
      } else {
        dispatch(actions.refreshActiveCards(activeCards));
      }
    } else {
      updatedCards = activeCards.filter((card) => card !== identifier);
      dispatch(actions.refreshActiveCards(updatedCards));
    }
  }

  function handleMultipleCardActions(cardActions: Record<string, boolean>) {
    let updatedCards = new Set(state.activeCards);
    let lastAddedCard: string | null = null;

    for (const [card, shouldOpen] of Object.entries(cardActions)) {
      if (shouldOpen) {
        if (!updatedCards.has(card)) {
          updatedCards.add(card);
          lastAddedCard = card;
        }
      } else {
        updatedCards.delete(card);
      }
    }

    const updatedCardsArray = Array.from(updatedCards);
    dispatch(actions.refreshActiveCards(updatedCardsArray));

    if (lastAddedCard) {
      scrollToRefElement(cardRefs.current, lastAddedCard);
    }
  }

  function handleGridRequestChange(updates: GridRequestModel) {
    if (updates.brands || updates.categories || updates.filter) {
      dispatch(
        actions.refreshMarginItemsGriRequestModel({
          ...state.marginItemsGriRequestModel,
          currentPage: 1,
          ...updates,
        }),
      );
    } else {
      dispatch(
        actions.refreshMarginItemsGriRequestModel({
          ...state.marginItemsGriRequestModel,
          ...updates,
        }),
      );
    }
  }

  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "openSelectMarginCard":
        handleMultipleCardActions({
          selectMarginCard: true,
          salePriceManagementCard: false,
        });
        if (state.marginsList.length === 0) {
          dispatch(actions.setIsSelectMarginCardLoading(true));
          service
            .getMarginsListForGridHandler(state.marginsGridRequestModel)
            .then((res) => {
              dispatch(actions.setIsSelectMarginCardLoading(false));
              dispatch(actions.refreshMarginsList(res.items));
            });
        }
        break;
      case "searchMargin":
        dispatch(actions.setIsMarginListGridLoading(true));
        service
          .getMarginsListForGridHandler({
            ...state.marginsGridRequestModel,
            searchQuery: payload,
          })
          .then((res) => {
            dispatch(actions.setIsMarginListGridLoading(false));
            console.log(res);
            dispatch(actions.refreshMarginsList(res.items));
          });
        break;
      case "selectMargin":
        dispatch(actions.setIsMarginForPurchaseCardLoading(true));
        service
          .connectMarginToPurchaseHandler(purchaseId, payload.marginId)
          .then((res) => {
            dispatch(actions.setIsMarginForPurchaseCardLoading(false));
            handleCardAction("selectMarginCard");
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
            .then((res) => {
              dispatch(actions.setIsSelectMarginCardLoading(false));
              dispatch(actions.refreshMarginsList(res.items));
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
        service.createMarginHandler(payload.marginName).then((res) => {
          if (res) {
            service
              .createMarginRulesHandler(res.marginId, payload.marginRule)
              .then((res) => {
                if (res) {
                  dispatch(actions.setIsSelectMarginCardLoading(true));
                  service.getAllMarginsHandler().then((res) => {
                    dispatch(actions.setIsSelectMarginCardLoading(false));
                    dispatch(actions.refreshMarginsList(res));
                  });
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
        });
        break;
      case "updateMargin":
        dispatch(actions.setIsMarginConfigurationCardLoading(true));
        Promise.all([
          service.updateMarginHandler(state.managedMargin.marginId, {
            marginName: payload.marginName,
          }),
          state.selectedMargin.marginId === state.managedMargin.marginId
            ? service.updateMarginRulesForPurchaseHandler(
                purchaseId,
                payload.marginRule,
              )
            : service.createMarginRulesHandler(
                state.managedMargin.marginId,
                payload.marginRule,
              ),
        ]).then(([margin, marginRules]) => {
          dispatch(actions.setIsMarginConfigurationCardLoading(false));
          if (margin.marginId === state.selectedMargin.marginId) {
            dispatch(actions.setIsMarginForPurchaseCardLoading(true));
            service.getMarginForPurchaseHandler(purchaseId).then((res) => {
              dispatch(actions.setIsMarginForPurchaseCardLoading(false));
              dispatch(actions.refreshSelectedMargin(res));
            });
          } else {
            if (margin.marginName !== state.managedMargin.marginName) {
              dispatch(actions.setIsSelectMarginCardLoading(true));
              service
                .getMarginsListForGridHandler(state.marginsGridRequestModel)
                .then((res) => {
                  dispatch(actions.setIsSelectMarginCardLoading(false));
                  dispatch(actions.refreshMarginsList(res.items));
                });
            }
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
            service.getMarginDetailsHandler(payload.marginId).then((res) => {
              dispatch(actions.refreshManagedMargin(res));
            });
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
            service.getMarginDetailsHandler(payload.marginId).then((res) => {
              dispatch(actions.refreshManagedMargin(res));
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
              service
                .getMarginItemsListForGridHandler(
                  purchaseId,
                  state.marginItemsGriRequestModel,
                )
                .then((res) => {
                  dispatch(actions.refreshMarginItemsGridModel(res));
                });
            }
          });
        break;
      case "applyMarginItem":
        console.log("Apply Margin item", payload);
        service.applyMarginItemHandler(payload).then((res) => {
          if (res) {
            service
              .getMarginItemsListForGridHandler(
                purchaseId,
                state.marginItemsGriRequestModel,
              )
              .then((res) => {
                dispatch(actions.refreshMarginItemsGridModel(res));
              });
          }
        });
        break;
      case "openCreateMarginCard":
        dispatch(actions.resetManagedMargin());
        handleCardAction("marginConfigurationCard", true);
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
              service
                .getMarginsListForGridHandler(state.marginsGridRequestModel)
                .then((res) => {
                  dispatch(actions.refreshMarginsList(res.items));
                });
            } else {
            }
          });
        break;
      case "applyAllMarginItems":
        service.applyAllMarginItemsHandler(purchaseId);
        break;
    }
  }

  return (
    <div className={cs.marginPage}>
      <ProductMenuCard
        isLoading={state.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        productId={Number(purchaseId)}
        counter={productsState.purchaseCounters}
      />
      <MarginForPurchaseCard
        isLoading={state.isMarginForPurchaseCardLoading}
        margin={state.selectedMargin}
        onAction={onAction}
      />
      {state.activeCards?.includes("salePriceManagementCard") && (
        <div
          ref={(el) => {
            cardRefs.current["salePriceManagementCard"] = el;
          }}
        >
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
      {state.activeCards?.includes("selectMarginCard") && (
        <div
          ref={(el) => {
            cardRefs.current["selectMarginCard"] = el;
          }}
        >
          <SelectMarginCard
            isLoading={state.isSelectMarginCardLoading}
            isMarginListGridLoading={state.isMarginListGridLoading}
            margins={state.marginsList}
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards?.includes("marginConfigurationCard") && (
        <div
          ref={(el) => {
            cardRefs.current["marginConfigurationCard"] = el;
          }}
        >
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
