import { useParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect } from "react";

import cs from "./SupplierPage.module.scss";
import SupplierCard from "@/components/complex/custom-cards/supplier-card/SupplierCard.tsx";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import SupplierConfigurationCard from "@/components/complex/custom-cards/supplier-configuration-card/SupplierConfigurationCard.tsx";
import { SuppliersListGridColumns } from "@/components/complex/grid/custom-grids/suppliers-list-grid/SuppliersListGridColumns.tsx";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";
import { SupplierPageSliceActions as actions } from "@/state/slices/SupplierPageSlice.ts";
import useSupplierPageService from "@/pages/products-section/supplier-page/useSupplierPageService.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

export function SupplierPage() {
  // ==================================================================== UTILITIES
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) => state[StoreSliceEnum.SUPPLIER].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const { state, productsState, ...service } =
    useSupplierPageService(handleCardAction);
  const { purchaseId } = useParams();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    service.getSupplierPageDataHandler(purchaseId);
  }, [purchaseId]);

  // ==================================================================== EVENT HANDLERS
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

  // ==================================================================== LAYOUT
  return (
    <div className={cs.supplierPage}>
      <SheContextSidebar
        menuCollectionType="purchases"
        menuTitle="Report Purchase"
        counter={productsState.purchaseCounters}
        itemId={Number(purchaseId)}
        activeCards={state.activeCards}
      >
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
      </SheContextSidebar>
    </div>
  );
}
