import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

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
import {
  scrollToRefElement,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";

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
      service.getMarginForPurchaseHandler(purchaseId).then((res) => {
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
    if (state.marginProductsGridModel.items.length === 0) {
      service
        .getMarginProductsListForGridHandler(
          purchaseId,
          state.marginProductsGriRequestModel,
        )
        .then((res) => {
          dispatch(actions.refreshMarginProductsGridModel(res));
        });
    }
  }, [purchaseId]);

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

  function keepOnlyCards(openCardIdentifiers: string[] = []) {
    const currentActiveCards = Array.isArray(state.activeCards)
      ? state.activeCards
      : [];

    const cardActions = Object.fromEntries(
      currentActiveCards.map((card) => [
        card,
        openCardIdentifiers.includes(card),
      ]),
    );

    for (const card of openCardIdentifiers) {
      if (!cardActions[card]) {
        cardActions[card] = true;
      }
    }

    handleMultipleCardActions(cardActions);
  }

  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "openSelectMarginCard":
        handleCardAction("selectMarginCard", true);
        if (state.marginsList.length === 0) {
          dispatch(actions.setIsSelectMarginCardLoading(true));
          service
            .getMarginsListForGridHandler(state.gridRequestModel)
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
            ...state.gridRequestModel,
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
        handleCardAction("selectMarginCard", true);
        if (state.marginsList.length === 0) {
          dispatch(actions.setIsSelectMarginCardLoading(true));
          service
            .getMarginsListForGridHandler(state.gridRequestModel)
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
          service.createMarginRulesHandler(
            state.managedMargin.marginId,
            payload.marginRule,
          ),
        ]).then(([margin, marginRules]) => {
          dispatch(actions.setIsMarginConfigurationCardLoading(false));
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
          title: "Deleting margin",
          text: `You are about to delete margin ${payload.marginName}.`,
          primaryButtonValue: "Delete",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmed) return;

        service.deleteMarginHandler(payload.marginId).then((res) => {
          console.log(res);
          if (res) {
            service
              .getMarginsListForGridHandler(state.gridRequestModel)
              .then((res) => {
                dispatch(actions.refreshMarginsList(res.items));
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
      {/*{state.activeCards?.includes("salePriceManagementCard") && (*/}
      {/*  <div*/}
      {/*    ref={(el) => {*/}
      {/*      cardRefs.current["salePriceManagementCard"] = el;*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <SalePriseManagementCard*/}
      {/*      isLoading={state.isSalePriceManagementCardLoading}*/}
      {/*      isGridLoading={state.isMarginProductsGridLoading}*/}
      {/*      gridModel={state.marginProductsGridModel}*/}
      {/*      gridRequestModel={state.marginProductsGriRequestModel}*/}
      {/*      onAction={onAction}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}
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
            isLoading={state.isProductConfigurationCardLoading}
            margin={state.managedMargin}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
}
