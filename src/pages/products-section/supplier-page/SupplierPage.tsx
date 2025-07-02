import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./SupplierPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPageSlice } from "@/const/interfaces/store-slices/ISupplierPageSlice.ts";
import useSupplierPageService from "@/pages/products-section/supplier-page/useSupplierPageService.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { SupplierPageSliceActions as actions } from "@/state/slices/SupplierPageSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import SupplierCard from "@/components/complex/custom-cards/supplier-card/SupplierCard.tsx";
import SelectSupplierCard from "@/components/complex/custom-cards/select-supplier-card/SelectSupplierCard.tsx";
import SupplierConfigurationCard from "@/components/complex/custom-cards/supplier-configuration-card/SupplierConfigurationCard.tsx";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { useToast } from "@/hooks/useToast.ts";
import {
  clearSelectedGridItems,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";

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
    if (purchaseId) {
      dispatch(actions.setIsSupplierCardLoading(true));
      dispatch(actions.setIsProductMenuCardLoading(true));
      productsService
        .getPurchaseDetailsHandler(purchaseId)
        .then((res: PurchaseModel) => {
          dispatch(actions.setIsSupplierCardLoading(false));
          dispatch(productsActions.refreshSelectedPurchase(res));
          dispatch(productsActions.refreshSelectedSupplier(res.supplier));
        });
      productsService
        .getPurchaseCountersHandler(Number(purchaseId))
        .then(() => dispatch(actions.setIsProductMenuCardLoading(false)));
    }
  }, [purchaseId]);

  dispatch(actions.refreshSelectedSupplier(null));

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
      case "updatePurchase":
        dispatch(actions.setIsSupplierCardLoading(true));
        service
          .updatePurchaseForSupplierHandler(payload.purchaseId, {
            date: payload.selectedDate,
            supplierId: payload.selectedSupplier.supplierId,
          })
          .then((res) => {
            dispatch(actions.setIsSupplierCardLoading(false));
            if (res) {
              addToast({
                text: "Purchase updated successfully",
                type: "success",
              });
            } else {
              addToast({
                text: res.error.detail.message,
                type: "error",
              });
            }
          });
        break;
      case "detachSupplier":
        dispatch(productsActions.resetSelectedSupplier());
        break;
      case "openSelectSupplierCard":
        handleCardAction("selectSupplierCard", true);
        if (!productsState.countryCodeList) {
          productsService.getCountryCodeHandler().then(() => {});
        }
        dispatch(actions.setIsSelectSupplierCardLoading(true));
        service.getListOfSuppliersForGridHandler({}).then(() => {
          dispatch(actions.setIsSelectSupplierCardLoading(false));
        });
        break;
      case "openSupplierConfigurationCard":
        dispatch(actions.refreshManagedSupplier(null));
        handleCardAction("supplierConfigurationCard", true);
        break;
      case "createSupplier":
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
            service.getListOfSuppliersHandler().then((res) => {
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
          .getListOfSuppliersForGridHandler({ searchQuery: payload })
          .then(() => {
            dispatch(actions.setIsSelectSupplierCardLoading(false));
          });
        break;
      case "selectSupplier":
        handleCardAction("selectSupplierCard");
        dispatch(productsActions.refreshSelectedSupplier(payload));
        break;
      case "manageSupplier":
        handleCardAction("supplierConfigurationCard", true);
        dispatch(actions.setIsSupplierConfigurationCardLoading(true));
        service
          .getSupplierDetailsHandler(payload.supplierId, payload.locationId)
          .then((res) => {
            dispatch(actions.setIsSupplierConfigurationCardLoading(false));
            dispatch(actions.refreshManagedSupplier(res));
          });
        dispatch(
          actions.refreshSuppliersWithLocations(
            setSelectedGridItem(
              payload.supplierId,
              state.suppliersWithLocations,
              "supplierId",
            ),
          ),
        );
        break;
      case "updateSupplier":
        dispatch(actions.setIsSupplierConfigurationCardLoading(true));
        service
          .updateSupplierHandler(
            payload,
            state.managedSupplier.supplierId,
            state.managedSupplier.locationId,
          )
          .then((res) => {
            dispatch(actions.setIsSupplierConfigurationCardLoading(false));
            if (res) {
              handleCardAction("supplierConfigurationCard");
              service.getListOfSuppliersForGridHandler({});
              dispatch(actions.refreshManagedSupplier(null));
              dispatch(
                actions.refreshSuppliersWithLocations(
                  clearSelectedGridItems(state.suppliersWithLocations),
                ),
              );
              addToast({
                text: "Supplier updated successfully",
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
        isLoading={state.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        productId={Number(purchaseId)}
        counter={productsState.purchaseCounters}
      />
      <SupplierCard
        isLoading={state.isSupplierCardLoading}
        selectedPurchase={productsState.selectedPurchase}
        selectedSupplier={productsState.selectedSupplier}
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
