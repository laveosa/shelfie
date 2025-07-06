import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
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
import { setSelectedGridItem } from "@/utils/helpers/quick-helper.ts";

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
    if (!productsState.selectedPurchase) {
      productsService
        .getPurchaseDetailsHandler(purchaseId)
        .then((res: PurchaseModel) => {
          dispatch(productsActions.refreshSelectedPurchase(res));
        });
    }
    service.getMarginForPurchaseHandler(purchaseId).then((res) => {
      dispatch(actions.refreshSelectedMargin(res));
    });
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
  }, [purchaseId]);

  function scrollToCard(cardId: string) {
    setTimeout(() => {
      const cardElement = cardRefs.current[cardId];
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }

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
        scrollToCard(identifier);
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
      scrollToCard(lastAddedCard);
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
        dispatch(actions.setIsSelectMarginCardLoading(true));
        service.getAllMarginsHandler().then((res) => {
          dispatch(actions.setIsSelectMarginCardLoading(false));
          dispatch(actions.refreshMarginsList(res.data));
        });
        break;
      case "searchMargin":
        dispatch(actions.setIsMarginListGridLoading(true));
        service
          .getMarginsListForGridHandler({ searchQuery: payload })
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
              dispatch(actions.refreshSelectedMargin(res));
              addToast({
                text: "Margin added successfully",
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
      case "detachMargin":
        dispatch(actions.setIsMarginForPurchaseCardLoading(true));
        service.detachMarginHandler(purchaseId).then((res) => {
          dispatch(actions.setIsMarginForPurchaseCardLoading(false));
          if (!res.error) {
            dispatch(actions.refreshSelectedMargin(null));
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
      case "openCreateMarginCard":
        handleCardAction("marginConfigurationCard", true);
        break;
      case "closeSelectMarginCard":
        handleCardAction("selectMarginCard");
        break;
      case "closeMarginConfigurationCard":
        handleCardAction("marginConfigurationCard");
        break;
      case "createMargin":
        dispatch(actions.setIsMarginConfigurationCardLoading(true));
        service.createMarginHandler(payload).then((res) => {
          dispatch(actions.refreshManagedMargin(res));
          if (res) {
            service.updateMarginHandler(res.marginId, payload);
          }
          console.log("RES", res);
        });
        break;
      case "updateMargin":
        console.log("PAYLOAD", payload);
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
