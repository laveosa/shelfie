import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./ProductBasicDataPage.module.scss";
import ProductConfigurationCard from "@/components/complex/custom-cards/product-configuration-card/ProductConfigurationCard.tsx";
import CreateProductCategoryCard from "@/components/complex/custom-cards/create-product-category-card/CreateProductCategoryCard.tsx";
import CreateProductBrandCard from "@/components/complex/custom-cards/create-product-brand-card/CreateProductBrandCard.tsx";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";
import { ProductBasicDataPageSliceActions as actions } from "@/state/slices/ProductBasicDataPageSlice.ts";
import useProductBasicDataPageService from "@/pages/products-section/product-basic-data-page/useProductBasicDataPageService.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import { CompaniesListGridColumns } from "@/components/complex/grid/custom-grids/companies-list-grid/CompaniesListGridColumns.tsx";
import CreateCompanyCard from "@/components/complex/custom-cards/create-company-card/CreateCompanyCard.tsx";
import CompanyConfigurationCard from "@/components/complex/custom-cards/company-configuration-card/CompanyConfigurationCard.tsx";
import PhotosCard from "@/components/complex/custom-cards/photos-card/PhotosCard.tsx";
import { ManageCompanyPhotosGridColumns } from "@/components/complex/grid/custom-grids/manage-company-photos-grid/ManageCompanyPhotosGridColumns.tsx";
import LocationConfigurationCard from "@/components/complex/custom-cards/location-configuration-card/LocationConfigurationCard.tsx";
import { ManageLocationPhotosGridColumns } from "@/components/complex/grid/custom-grids/manage-location-photos-grid/ManageLocationPhotosGridColumns.tsx";

export function ProductBasicDataPage() {
  // ==================================================================== UTILITIES
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) =>
      state[StoreSliceEnum.PRODUCT_BASIC_DATA].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const { state, productsState, productsService, ...service } =
    useProductBasicDataPageService(handleCardAction);
  const { productId } = useParams();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    service.getProductsHandler(productsState.productsGridRequestModel);
    service.getCategoriesHandler();
    service.getBrandsHandler();
    service.getCountersForProductsHandler(Number(productId));
    service.getProductDetailsHandler(Number(productId));
    service.getCountryCodesHandler();
  }, [productId]);

  // ==================================================================== EVENT HANDLERS
  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "itemsCardClick":
        service.itemCardClickHandler(payload);
        break;
      case "submitProductData":
        service.onSubmitProductDataHandler(productId, payload);
        break;
      case "checkCategoryName":
        service.checkCategoryNameHandler(payload);
        break;
      case "createProductCategory":
        service.createNewCategoryHandler(payload);
        break;
      case "checkBrandName":
        service.checkBrandNameHandler(payload);
        break;
      case "createProductBrand":
        service.createBrandHandler(payload);
        break;
      case "gotoProductsPage":
        service.gotoProductsPageHandler();
        break;
      case "generateProductCode":
        service.generateProductCodeHandler();
        break;
      case "checkProductCode":
        service.checkProductCodeHandler(payload);
        break;
      case "openCreateProductCategoryCard":
        handleCardAction("createCategoryCard", true);
        break;
      case "openCreateProductBrandCard":
        handleCardAction("createBrandCard", true);
        break;
      case "closeCreateProductCategoryCard":
        handleCardAction("createCategoryCard");
        break;
      case "closeCreateProductBrandCard":
        handleCardAction("createBrandCard");
        break;
      case "openSelectEntityCard":
        service.openSelectEntityCardHandler();
        break;
      case "searchEntity":
        service.searchEntityHandler(payload);
        break;
      case "selectCompany":
        service.selectCompanyHandler(payload);
        break;
      case "openCreateEntityCard":
        service.openCreateEntityCardHandler();
        break;
      case "closeSelectEntityCard":
        service.closeSelectEntityCardHandler();
        break;
      case "createCompany":
        service.createCompanyHandler(payload);
        break;
      case "closeCreateCompanyCard":
        service.closeCreateCompanyCardHandler();
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
      case "deleteLocation":
        service.deleteLocationHandler(payload);
        break;
      case "updateLocation":
        service.updateLocationHandler(payload);
        break;
      case "manageLocationPhotos":
        service.manageLocationPhotosHandler();
        break;
      case "deleteLocationPhoto":
        service.deleteLocationPhotoHandler(payload);
        break;
      case "closeLocationConfigurationCard":
        service.closeLocationConfigurationCardHandler();
        break;
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.productBasicDataPage}>
      <SheContextSidebar
        menuCollectionType="products"
        menuTitle="Manage Product"
        isListLoading={productsState.isItemsCardLoading}
        listItems={productsState[productsState.activeTab]}
        showListItems
        selectedId={
          productsState.activeTab === "products"
            ? productId
            : productsState.selectedVariant?.variantId
        }
        skeletonQuantity={
          productsState.activeTab === "products"
            ? productsState.products?.length
            : productsState.variants?.length
        }
        activeTab={productsState.activeTab}
        counter={productsState.productCounter}
        itemId={Number(productId)}
        activeCards={state.activeCards}
        onAction={(item) => onAction("itemsCardClick", item)}
      >
        <ProductConfigurationCard
          isLoading={state.isProductConfigurationCardLoading}
          product={productsState.product}
          productId={productId}
          brandsList={productsState.brands}
          categoriesList={productsState.categories}
          countryCodesList={state.countryCodes}
          productCode={productsState.productCode}
          onAction={onAction}
        />
        {state.activeCards.includes("createCategoryCard") && (
          <div ref={createRefCallback("createCategoryCard")}>
            <CreateProductCategoryCard
              isLoading={state.isCreateCategoryCardLoading}
              isPhotoUploaderLoading={productsState.isPhotoUploaderLoading}
              category={productsState.category}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("createBrandCard") && (
          <div ref={createRefCallback("createBrandCard")}>
            <CreateProductBrandCard
              isLoading={state.isCreateBrandCardLoading}
              isPhotoUploaderLoading={productsState.isPhotoUploaderLoading}
              brand={productsState.brand}
              selectedCompany={state.selectedCompany}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("selectEntityCard") && (
          <div ref={createRefCallback("selectEntityCard")}>
            <SelectEntityCard
              isLoading={state.isSelectEntityCardLoading}
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
              columns={ManageCompanyPhotosGridColumns({
                onAction,
              })}
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
              columns={ManageLocationPhotosGridColumns({
                onAction,
              })}
              onAction={onAction}
            />
          </div>
        )}
      </SheContextSidebar>
    </div>
  );
}
