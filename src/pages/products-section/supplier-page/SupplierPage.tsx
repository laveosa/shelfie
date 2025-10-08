import { useParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect } from "react";

import cs from "./SupplierPage.module.scss";
import SupplierCard from "@/components/complex/custom-cards/supplier-card/SupplierCard.tsx";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";
import { SupplierPageSliceActions as actions } from "@/state/slices/SupplierPageSlice.ts";
import useSupplierPageService from "@/pages/products-section/supplier-page/useSupplierPageService.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import { CompaniesListGridColumns } from "@/components/complex/grid/custom-grids/companies-list-grid/CompaniesListGridColumns.tsx";
import CreateCompanyCard from "@/components/complex/custom-cards/create-company-card/CreateCompanyCard.tsx";
import CompanyConfigurationCard from "@/components/complex/custom-cards/company-configuration-card/CompanyConfigurationCard.tsx";
import LocationConfigurationCard from "@/components/complex/custom-cards/location-configuration-card/LocationConfigurationCard.tsx";
import PhotosCard from "@/components/complex/custom-cards/photos-card/PhotosCard.tsx";
import { ManageCompanyPhotosGridColumns } from "@/components/complex/grid/custom-grids/manage-company-photos-grid/ManageCompanyPhotosGridColumns.tsx";
import { ManageLocationPhotosGridColumns } from "@/components/complex/grid/custom-grids/manage-location-photos-grid/ManageLocationPhotosGridColumns.tsx";

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
          companyId: payload.selectedCompany.companyId,
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
      case "searchEntity":
        service.searchEntityHandler(payload);
        break;
      case "createCompany":
        service.createCompanyHandler(payload);
        break;
      case "closeCreateCompanyCard":
        service.closeCreateCompanyCardHandler();
        break;
      case "selectCompany":
        service.selectCompanyHandler(payload);
        break;
      case "manageCompany":
        service.manageCompanyHandler(payload);
        break;
      case "updateCompany":
        service.updateCompanyHandler(payload);
        break;
      case "deleteCompany":
        service.deleteCompanyHandler(payload);
        break;
      case "closeCompanyConfigurationCard":
        service.closeCompanyConfigurationCardHandler();
        break;
      case "manageCompanyPhotos":
        service.manageCompanyPhotosHandler();
        break;
      case "uploadPhoto":
        service.uploadPhotoHandler(payload);
        break;
      case "deleteCompanyPhoto":
        service.deleteCompanyPhotoHandler(payload);
        break;
      case "changePhotoPosition":
        service.changePhotoPositionHandler(payload);
        break;
      case "closePhotosCard":
        service.closePhotosCardHandler(payload);
        break;
      case "openLocationConfigurationCard":
        service.openLocationConfigurationCardHandler(payload);
        break;
      case "createLocation":
        service.createLocationHandler(payload);
        break;
      case "updateLocation":
        service.updateLocationHandler(payload);
        break;
      case "deleteLocation":
        service.deleteLocationHandler(payload);
        break;
      case "closeLocationConfigurationCard":
        service.closeLocationConfigurationCardHandler();
        break;
      case "manageLocationPhotos":
        service.manageLocationPhotosHandler();
        break;
      case "deleteLocationPhoto":
        service.deleteLocationPhotoHandler(payload);
        break;
      case "restoreCompany":
        service.restoreCompanyHandler(payload, purchaseId);
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
          selectedSupplier={state.selectedCompany}
          onAction={onAction}
        />
        {state.activeCards?.includes("selectEntityCard") && (
          <div ref={createRefCallback("selectEntityCard")}>
            <SelectEntityCard
              isGridLoading={state.isCompaniesGridLoading}
              entityName="Company"
              entityCollection={state.companiesGridRequestModel.items}
              columns={
                CompaniesListGridColumns({
                  onAction,
                }) as ColumnDef<DataWithId>[]
              }
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("createCompanyCard") && (
          <div ref={createRefCallback("createCompanyCard")}>
            <CreateCompanyCard
              isLoading={state.isCreateCompanyCardLoading}
              isPhotoUploaderLoading={state.isPhotoUploaderLoading}
              countryCodes={state.countryCodes}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("companyConfigurationCard") && (
          <div ref={createRefCallback("companyConfigurationCard")}>
            <CompanyConfigurationCard
              isLoading={state.isCompanyConfigurationCardLoading}
              isGridLoading={state.isLocationsGridLoading}
              company={state.managedCompany}
              countryCodes={state.countryCodes}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("companyPhotosCard") && (
          <div ref={createRefCallback("companyPhotosCard")}>
            <PhotosCard
              isImageUploaderLoading={state.isPhotoUploaderLoading}
              data={state.managedCompany?.photos}
              contextName={"Company"}
              contextId={state.managedCompany?.companyId}
              noDataText="COMPANY HAS NO PHOTOS"
              showCloseButton
              columns={
                ManageCompanyPhotosGridColumns({
                  onAction,
                }) as ColumnDef<DataWithId>[]
              }
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("locationConfigurationCard") && (
          <div ref={createRefCallback("locationConfigurationCard")}>
            <LocationConfigurationCard
              isLoading={state.isCustomerAddressDetailsLoading}
              location={state.managedLocation}
              countryCodes={state.countryCodes}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("locationPhotosCard") && (
          <div ref={createRefCallback("locationPhotosCard")}>
            <PhotosCard
              isImageUploaderLoading={state.isPhotoUploaderLoading}
              data={state.managedLocation?.photos}
              contextName={"Location"}
              contextId={state.managedLocation?.locationId}
              noDataText="LOCATION HAS NO PHOTOS"
              showCloseButton
              columns={
                ManageLocationPhotosGridColumns({
                  onAction,
                }) as ColumnDef<DataWithId>[]
              }
              onAction={onAction}
            />
          </div>
        )}
      </SheContextSidebar>
    </div>
  );
}
