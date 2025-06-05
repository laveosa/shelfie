import React, { useEffect } from "react";

import cs from "./SupplierPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPageSlice } from "@/const/interfaces/store-slices/ISupplierPageSlice.ts";
import { useParams } from "react-router-dom";
import useSupplierPageService from "@/pages/products-section/supplier-page/useSupplierPageService.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { SupplierPageSliceActions as actions } from "@/state/slices/SupplierPageSlice.ts";
import SupplierCard from "@/components/complex/custom-cards/supplier-card/SupplierCard.tsx";
import SelectSupplierCard from "@/components/complex/custom-cards/select-supplier-card/SelectSupplierCard.tsx";
import CreateSupplierCard from "@/components/complex/custom-cards/create-supplier-card/CreateSupplierCard.tsx";

export function SupplierPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<ISupplierPageSlice>(StoreSliceEnum.SUPPLIER);
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const service = useSupplierPageService();
  const productsService = useProductsPageService();
  const { purchaseId } = useParams();
  const cardRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (!state.purchase) {
      service.getPurchaseDetailsHandler(purchaseId);
    }
  }, [purchaseId]);

  useEffect(() => {
    return () => {
      dispatch(actions.refreshActiveCards([]));
    };
  }, [dispatch]);

  useEffect(() => {
    console.log("CARDS", state.activeCards);
  }, [state.activeCards]);

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

  function onAction(actionType: string, payload) {
    switch (actionType) {
      case "createPurchase":
        console.log("Payload", payload);
        service.createPurchaseForSupplierHandler(payload).then((res) => {
          console.log("RES", res);
        });
        break;
      case "openSelectSupplierCard":
        handleCardAction("selectSupplierCard", true);
        service.getListOfAllSuppliersHandler();
        console.log("Payload", payload);
        break;
      case "openCreateSupplierCard":
        handleCardAction("createSupplierCard", true);
        console.log("Payload selectSupplierCard", payload);
        if (!productsState.countryCodeList) {
          productsService.getCountryCodeHandler();
        }
        break;
      case "createSupplier":
        handleCardAction("createSupplierCard");
        console.log("Payload", payload);
        break;
      case "uploadSupplierPhoto":
        console.log("Payload", payload);
        break;
      case "selectSupplier":
        handleCardAction("selectSupplierCard");
        console.log("Payload", payload);
        break;
    }
  }

  return (
    <div className={cs.supplierPage}>
      <ProductMenuCard
        isLoading={productsState.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        productId={productsState.selectedSupplier?.supplierId}
        productCounter={productsState.productCounter}
        onAction={handleCardAction}
      />
      <SupplierCard
        selectedSupplier={productsState.selectedSupplier}
        onAction={onAction}
      />
      {state.activeCards?.includes("selectSupplierCard") && (
        <div
          ref={(el) => {
            cardRefs.current["selectSupplierCard"] = el;
          }}
        >
          <SelectSupplierCard onAction={onAction} suppliers={state.suppliers} />
        </div>
      )}
      {state.activeCards?.includes("createSupplierCard") && (
        <div
          ref={(el) => {
            cardRefs.current["createSupplierCard"] = el;
          }}
        >
          <CreateSupplierCard
            countryList={productsState.countryCodeList}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
}
