import React, { useEffect } from "react";

import cs from "./SupplierPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPageSlice } from "@/const/interfaces/store-slices/ISupplierPageSlice.ts";
import { useNavigate, useParams } from "react-router-dom";
import useSupplierPageService from "@/pages/products-section/supplier-page/useSupplierPageService.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { SupplierPageSliceActions as actions } from "@/state/slices/SupplierPageSlice.ts";
import SupplierCard from "@/components/complex/custom-cards/supplier-card/SupplierCard.tsx";
import SelectSupplierCard from "@/components/complex/custom-cards/select-supplier-card/SelectSupplierCard.tsx";
import CreateSupplierCard from "@/components/complex/custom-cards/create-supplier-card/CreateSupplierCard.tsx";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { useToast } from "@/hooks/useToast.ts";

export function SupplierPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<ISupplierPageSlice>(StoreSliceEnum.SUPPLIER);
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const service = useSupplierPageService();
  const productsService = useProductsPageService();
  const navigate = useNavigate();
  const { purchaseId } = useParams();
  const { addToast } = useToast();
  const cardRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (state.purchase) {
      dispatch(actions.setIsSupplierCardLoading(true));
      service.getPurchaseDetailsHandler(purchaseId).then(() => {
        dispatch(actions.setIsSupplierCardLoading(false));
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

  function onAction(actionType: string, payload) {
    switch (actionType) {
      case "createPurchase":
        dispatch(actions.setIsSupplierCardLoading(true));
        service
          .createPurchaseForSupplierHandler({
            date: payload.selectedDate,
            supplierId: payload.selectedSupplier.supplierId,
          })
          .then((res) => {
            dispatch(actions.setIsSupplierCardLoading(false));
            console.log("RES", res);
            if (res) {
              addToast({
                text: "Purchase created successfully",
                type: "success",
              });
            } else {
              addToast({
                text: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "deletePurchase":
        console.log("deletePurchase", payload);
        break;
      case "openSelectSupplierCard":
        handleCardAction("selectSupplierCard", true);
        dispatch(actions.setIsSelectSupplierCard(true));
        service.getListOfAllSuppliersHandler().then(() => {
          dispatch(actions.setIsSelectSupplierCard(false));
        });
        break;
      case "openCreateSupplierCard":
        handleCardAction("createSupplierCard", true);
        if (!productsState.countryCodeList) {
          dispatch(actions.setIsCreateSupplierCard(true));
          productsService.getCountryCodeHandler().then(() => {
            dispatch(actions.setIsCreateSupplierCard(false));
          });
        }
        break;
      case "createSupplier":
        console.log("FORM DATA", payload);
        dispatch(actions.setIsCreateSupplierCard(true));
        service.createSupplierHandler(payload).then((res) => {
          dispatch(actions.setIsCreateSupplierCard(false));
          if (res) {
            handleCardAction("createSupplierCard");
            payload.uploadModels.map((model) => {
              model.contextId = res.supplierId;
              productsService.uploadPhotoHandler(model).then((res) => {
                if (res) {
                  addToast({
                    text: "Image successfully added",
                    type: "success",
                  });
                } else {
                  addToast({
                    text: res.error.message,
                    type: "error",
                  });
                }
              });
            });
            service.getListOfAllSuppliersHandler().then((res) => {
              dispatch(actions.refreshSuppliers(res));
            });
            addToast({
              text: "Supplier created successfully",
              type: "success",
            });
          } else {
            addToast({
              text: res.error.message,
              type: "error",
            });
          }
        });
        break;
      case "uploadSupplierPhoto":
        console.log("Payload", payload);
        break;
      case "selectSupplier":
        handleCardAction("selectSupplierCard");
        dispatch(actions.refreshSelectedSupplier(payload));
        console.log("Payload", payload);
        break;
      case "closeSupplierCard":
        navigate(NavUrlEnum.PRODUCTS);
        dispatch(actions.refreshActiveCards([]));
        break;
      case "closeSelectSupplierCard":
        handleCardAction("selectSupplierCard");
        break;
      case "closeCreateSupplierCard":
        console.log("CLICK");
        handleCardAction("createSupplierCard");
        break;
    }
  }

  return (
    <div className={cs.supplierPage}>
      <ProductMenuCard
        isLoading={productsState.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        productId={productsState.selectedPurchase?.supplier.supplierId}
        productCounter={productsState.productCounter}
        onAction={handleCardAction}
      />
      <SupplierCard
        isLoading={state.isSupplierCardLoading}
        selectedPurchase={productsState.selectedPurchase}
        selectedSupplier={
          state.selectedSupplier ?? productsState.selectedPurchase?.supplier
        }
        onAction={onAction}
      />
      {state.activeCards?.includes("selectSupplierCard") && (
        <div
          ref={(el) => {
            cardRefs.current["selectSupplierCard"] = el;
          }}
        >
          <SelectSupplierCard
            isLoading={state.isSelectSupplierCard}
            onAction={onAction}
            suppliers={state.suppliers}
          />
        </div>
      )}
      {state.activeCards?.includes("createSupplierCard") && (
        <div
          ref={(el) => {
            cardRefs.current["createSupplierCard"] = el;
          }}
        >
          <CreateSupplierCard
            isLoading={state.isCreateSupplierCard}
            countryList={productsState.countryCodeList}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
}
