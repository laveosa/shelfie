import cs from "./SupplierPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPage } from "@/const/interfaces/store-slices/ISupplierPage.ts";
import { useParams } from "react-router-dom";
import useSupplierPageService from "@/pages/products-section/supplier-page/useSupplierPageService.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { ManageVariantsPageSliceActions as actions } from "@/state/slices/ManageVariantsPageSlice.ts";
import React, { useEffect } from "react";

export function SupplierPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<ISupplierPage>(StoreSliceEnum.SUPPLIER);
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

  function handleCardAction(
    identifier: string,
    forceOpen: boolean = false,
    overrideActiveCards?: string[],
  ) {
    function scrollToCard(cardId: string) {
      setTimeout(() => {
        const cardElement = cardRefs.current[cardId];
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }

    const activeCards = overrideActiveCards ?? state.activeCards;
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

  return (
    <div className={cs.supplierPage}>
      <ProductMenuCard
        isLoading={productsState.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        productCounter={productsState.productCounter}
        onAction={handleCardAction}
      />
    </div>
  );
}
