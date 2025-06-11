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
import SupplierConfigurationCard from "@/components/complex/custom-cards/supplier-configuration-card/SupplierConfigurationCard.tsx";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { useToast } from "@/hooks/useToast.ts";
import {
  clearSelectedGridItems,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";

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
      case "detachSupplier":
        dispatch(actions.resetSelectedSupplier());
        break;
      case "openSelectSupplierCard":
        handleCardAction("selectSupplierCard", true);
        dispatch(actions.setIsSelectSupplierCardLoading(true));
        service.getListOfSuppliersWithLocationsHandler({}).then((res) => {
          console.log("RES", res);
          dispatch(actions.setIsSelectSupplierCardLoading(false));
        });
        break;
      case "openSupplierConfigurationCard":
        dispatch(actions.refreshManagedSupplier(null));
        handleCardAction("supplierConfigurationCard", true);
        if (!productsState.countryCodeList) {
          dispatch(actions.setIsSupplierConfigurationCardLoading(true));
          productsService.getCountryCodeHandler().then(() => {
            dispatch(actions.setIsSupplierConfigurationCardLoading(false));
          });
        }
        break;
      case "createSupplier":
        console.log("FORM DATA", payload);
        dispatch(actions.setIsSupplierConfigurationCardLoading(true));
        service.createSupplierHandler(payload).then((res) => {
          dispatch(actions.setIsSupplierConfigurationCardLoading(false));
          if (res) {
            handleCardAction("supplierConfigurationCard");
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
      case "searchSupplier":
        handleCardAction("searchSupplier");
        dispatch(actions.setIsSelectSupplierCardLoading(true));
        service
          .getListOfSuppliersWithLocationsHandler({ searchQuery: payload })
          .then(() => {
            dispatch(actions.setIsSelectSupplierCardLoading(false));
          });
        break;
      case "selectSupplier":
        handleCardAction("selectSupplierCard");
        dispatch(actions.refreshSelectedSupplier(payload));
        console.log("Payload", payload);
        break;
      case "manageSupplier":
        handleCardAction("supplierConfigurationCard", true);
        dispatch(actions.refreshManagedSupplier(payload));
        dispatch(
          actions.refreshSuppliersWithLocations(
            setSelectedGridItem(
              payload.supplierId,
              state.suppliersWithLocations,
              "supplierId",
            ),
          ),
        );
        console.log("Payload", payload);
        break;
      case "closeSupplierCard":
        navigate(NavUrlEnum.PRODUCTS);
        dispatch(actions.refreshActiveCards([]));
        break;
      case "closeSelectSupplierCard":
        handleCardAction("selectSupplierCard");
        break;
      case "closeSupplierConfigurationCard":
        handleCardAction("supplierConfigurationCard");
        dispatch(actions.resetManagedSupplier());
        dispatch(
          actions.refreshSuppliersWithLocations(
            clearSelectedGridItems(state.suppliersWithLocations),
          ),
        );
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
          state.selectedSupplier
          // state.selectedSupplier ?? productsState.selectedPurchase?.supplier
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
            isLoading={state.isSelectSupplierCardLoading}
            onAction={onAction}
            suppliers={state.suppliersWithLocations}
          />
        </div>
      )}
      {state.activeCards?.includes("supplierConfigurationCard") && (
        <div
          ref={(el) => {
            cardRefs.current["supplierConfigurationCard"] = el;
          }}
        >
          <SupplierConfigurationCard
            isLoading={state.isSupplierConfigurationCardLoading}
            countryList={productsState.countryCodeList}
            managedSupplier={state.managedSupplier}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
}
