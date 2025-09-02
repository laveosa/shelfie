import { useParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect } from "react";

import cs from "./SupplierPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPageSlice } from "@/const/interfaces/store-slices/ISupplierPageSlice.ts";
import useSupplierPageService from "@/pages/products-section/supplier-page/useSupplierPageService.ts";
import { SupplierPageSliceActions as actions } from "@/state/slices/SupplierPageSlice.ts";
import SupplierCard from "@/components/complex/custom-cards/supplier-card/SupplierCard.tsx";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import SupplierConfigurationCard from "@/components/complex/custom-cards/supplier-configuration-card/SupplierConfigurationCard.tsx";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { SuppliersListGridColumns } from "@/components/complex/grid/suppliers-list-grid/SuppliersListGridColumns.tsx";
import { DataWithId } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";

export function SupplierPage() {
  const { purchaseId } = useParams();
  const service = useSupplierPageService();
  const state = useAppSelector<ISupplierPageSlice>(StoreSliceEnum.SUPPLIER);
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const { createRefCallback } = useCardActions({
    selectActiveCards: (state) => state[StoreSliceEnum.SUPPLIER].activeCards,
    refreshAction: actions.refreshActiveCards,
  });

  useEffect(() => {
    service.getSupplierPageDataHandler(purchaseId);
  }, [purchaseId]);

  async function onAction(actionType: string, payload) {
    switch (actionType) {
      case "createPurchase":
        service.createPurchaseForSupplierHandler(payload);
        break;
      case "updatePurchase":
        service.updatePurchaseForSupplierHandler(payload.purchaseId, {
          date: payload.selectedDate,
          supplierId: payload.selectedSupplier.supplierId,
          documentNotes: payload.purchaseNotes,
        });
        break;
      case "detachSupplier":
        service.detachSupplierHandler();
        break;
      case "openSelectEntityCard":
        service.openSelectEntityCardHandler();
        break;
      case "openCreateEntityCard":
        service.openCreateEntityCardHandler();
        break;
      case "createSupplier":
        service.createSupplierHandler(payload);
        break;
      case "searchEntity":
        service.searchEntityHandler(payload);
        break;
      case "selectSupplier":
        service.selectSupplierHandler(payload);
        break;
      case "manageSupplier":
        service.manageSupplierHandler(payload);
        break;
      case "updateSupplier":
        service.updateSupplierHandler(payload, purchaseId);
        break;
      case "deleteSupplier":
        service.deleteSupplierHandler(payload, purchaseId);
        break;
      case "restoreSupplier":
        service.restoreSupplierHandler(payload, purchaseId);
        break;
      case "deleteSupplierPhoto":
        service.deleteSupplierPhotoHandler(payload, purchaseId);
        break;
      case "dndSupplierPhoto":
        service.dndSupplierPhotoHandler(payload);
        break;
      case "deletePurchase":
        service.deletePurchaseHandler(payload);
        break;
      case "closeSupplierCard":
        service.closeSupplierCardHandler();
        break;
      case "closeSelectEntityCard":
        service.closeSelectEntityCardHandler();
        break;
      case "closeSupplierConfigurationCard":
        service.closeSupplierConfigurationCardHandler();
        break;
    }
  }

  return (
    <div className={cs.supplierPage}>
      <ProductMenuCard
        isLoading={state.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        itemId={Number(purchaseId)}
        counter={productsState.purchaseCounters}
      />
      <SupplierCard
        isLoading={state.isSupplierCardLoading}
        selectedPurchase={productsState.selectedPurchase}
        selectedSupplier={productsState.selectedSupplier}
        onAction={onAction}
      />
      {state.activeCards?.includes("selectEntityCard") && (
        <div ref={createRefCallback("selectEntityCard")}>
          <SelectEntityCard
            isLoading={state.isSelectSupplierCardLoading}
            isGridLoading={state.isSuppliersGridLoading}
            entityName="Supplier"
            entityCollection={state.suppliersWithLocations}
            columns={
              SuppliersListGridColumns({
                onAction,
              }) as ColumnDef<DataWithId>[]
            }
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards?.includes("supplierConfigurationCard") && (
        <div ref={createRefCallback("supplierConfigurationCard")}>
          <SupplierConfigurationCard
            isLoading={state.isSupplierConfigurationCardLoading}
            isSupplierPhotosGridLoading={state.isSupplierPhotosGridLoading}
            isPhotoUploaderLoading={state.isPhotoUploaderLoading}
            countryList={productsState.countryCodeList}
            managedSupplier={state.managedSupplier}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
}
