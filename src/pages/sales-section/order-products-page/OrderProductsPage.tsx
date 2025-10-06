import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./OrderProductsPage.module.scss";
import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { OrderProductsPageSliceActions as actions } from "@/state/slices/OrderProductsPageSlice";
import { IOrderDetailsPageSlice } from "@/const/interfaces/store-slices/IOrderDetailsPageSlice.ts";
import FindProductsCard from "@/components/complex/custom-cards/find-products-card/FindProductsCard.tsx";
import ProductsInOrderCard from "@/components/complex/custom-cards/products-in-order-card/ProductsInOrderCard.tsx";
import useOrderProductsPageService from "@/pages/sales-section/order-products-page/useOrderProductsPageService.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";
import VariantConfigurationCard from "@/components/complex/custom-cards/variant-configuration-card/VariantConfigurationCard.tsx";
import AddStockCard from "@/components/complex/custom-cards/add-stock-card/AddStockCard.tsx";
import SelectPurchaseCard from "@/components/complex/custom-cards/select-purchase-card/SelectPurchaseCard.tsx";
import SupplierCard from "@/components/complex/custom-cards/supplier-card/SupplierCard.tsx";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import { CompaniesListGridColumns } from "@/components/complex/grid/custom-grids/companies-list-grid/CompaniesListGridColumns.tsx";
import CreateCompanyCard from "@/components/complex/custom-cards/create-company-card/CreateCompanyCard.tsx";
import CompanyConfigurationCard from "@/components/complex/custom-cards/company-configuration-card/CompanyConfigurationCard.tsx";
import LocationConfigurationCard from "@/components/complex/custom-cards/location-configuration-card/LocationConfigurationCard.tsx";
import PhotosCard from "@/components/complex/custom-cards/photos-card/PhotosCard.tsx";
import { ManageCompanyPhotosGridColumns } from "@/components/complex/grid/custom-grids/manage-company-photos-grid/ManageCompanyPhotosGridColumns.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import DisposeStockCard from "@/components/complex/custom-cards/dispose-stock-card/DisposeStockCard.tsx";
import StockHistoryCard from "@/components/complex/custom-cards/stock-history-card/StockHistoryCard.tsx";
import ManageTraitsCard from "@/components/complex/custom-cards/manage-traits-card/ManageTraitsCard.tsx";
import VariantPhotosCard from "@/components/complex/custom-cards/variant-photos-card/VariantPhotosCard.tsx";

export function OrderProductsPage() {
  // ==================================================================== UTILITIES
  const { handleCardAction, createRefCallback, handleMultipleCardActions } =
    useCardActions({
      selectActiveCards: (state) =>
        state[StoreSliceEnum.ORDER_PRODUCTS].activeCards,
      refreshAction: actions.refreshActiveCards,
    });
  const state = useAppSelector<IOrderDetailsPageSlice>(
    StoreSliceEnum.ORDER_PRODUCTS,
  );
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const service = useOrderProductsPageService(
    handleCardAction,
    handleMultipleCardActions,
  );
  const sortingItems = Object.values(GridSortingEnum).map((value) => ({
    value,
    description: GridSortingEnumLabels[value],
  }));
  const { orderId } = useParams();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    service.getOrderStockActionsListForGrid(orderId);
  }, [orderId]);

  useEffect(() => {
    service.getVariantDetailsHandler(2);
  }, [orderId]);

  // ==================================================================== EVENT HANDLERS
  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "addProduct":
        handleCardAction("findProductsCard", true);
        service.addProductHandler();
        break;
      case "addVariantToOrder":
        service.addVariantsToOrderHandler(orderId, {
          variantId: payload.variantId,
          amount: payload.amount,
        });
        break;
      case "variantsGridRequestChange":
        service.variantsGridRequestChange(payload);
        break;
      case "closeFindProductsCard":
        handleCardAction("findProductsCard");
        break;
      case "updateStockAction":
        service.updateStockActionInOrderHandler(
          payload.row.original.stockActionId,
          payload.formData,
        );
        break;
      case "removeStockAction":
        service.removeStockActionFromOrderHandler(
          payload.original.stockActionId,
        );
        break;
      case "manageProduct":
        service.manageProductHandler(payload);
        break;
      case "manageVariant":
        service.manageVariantHandler(payload);
        break;
      case "updateVariantDetails":
        service.updateVariantDetailsHandler(payload);
        break;
      case "updateVariantTraitOptions":
        service.updateVariantTraitOptions(payload);
        break;
      case "deleteVariant":
        service.deleteVariantHandler(payload);
        break;
      case "increaseStockAmount":
        service.increaseStockAmountHandler(payload);
        break;
      case "disposeFromStock":
        service.disposeFromStockHandler(payload);
        break;
      case "uploadPhotoToVariant":
        service.uploadPhotoToVariantHandler(payload);
        break;
      case "deletePhoto":
        console.log("PHOTO DELETE", payload);
        break;
      case "addPhotoToVariant":
        service.addPhotoToVariantHandler(payload);
        break;
      case "detachPhotoFromVariant":
        service.detachPhotoFromVariantHandler(payload);
        break;
      case "dndVariantPhoto":
        service.changePhotoPositionHandler(payload);
        break;
      case "openAddStockCard":
        service.openAddStockCardHandler();
        break;
      case "selectPurchase":
        service.selectPurchaseHandler(payload);
        break;
      case "searchSupplier":
        service.searchSupplierHandle(payload);
        break;
      case "filterSuppliersByDate":
        service.filterSuppliersByDateHandle(payload);
        break;
      case "openDisposeStockCard":
        service.openDisposeStockCardHandler();
        break;
      case "openVariantHistoryCard":
        service.openVariantHistoryCardHandler(payload);
        break;
      case "openManageTraitsCard":
        service.openManageTraitsCardHandler();
        break;
      case "openVariantPhotosCard":
        service.openVariantPhotosCardHandler(payload);
        break;
      case "openSelectPurchaseCard":
        service.openSelectPurchaseCardHandler(state.purchaseGridRequestModel);
        break;
      case "openSupplierCard":
        service.openSupplierCardHandler();
        break;
      case "openSelectEntityCard":
        service.openSelectEntityCardHandler();
        break;
      case "searchEntity":
        service.searchEntityHandle(payload);
        break;
      case "openCreateEntityCard":
        service.openCreateEntityCardHandler();
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
        console.log("UPDATE COMPANY", payload);
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
      case "closePhotosCard":
        service.closePhotosCardHandler();
        break;
      case "openLocationConfigurationCard":
        service.openLocationConfigurationCardHandler(payload);
        break;
      case "createLocation":
        service.createLocationHandler(payload);
        break;
      case "manageLocation":
        console.log("MANAGE LOCATION");
        break;
      case "deleteLocation":
        console.log("DELETE LOCATION");
        break;
      case "closeLocationConfigurationCard":
        service.closeLocationConfigurationCardHandler();
        break;
      case "selectCompany":
        service.selectCompanyHandle(payload);
        break;
      case "detachSupplier":
        service.detachSupplierHandler();
        break;
      case "createPurchase":
        service.createPurchaseForSupplierHandler(payload);
        break;
      case "closeVariantPhotosCard":
        service.closeVariantPhotosCardHandler();
        break;
      case "closeVariantConfigurationCard":
        service.closeVariantConfigurationCardHandler();
        break;
      case "closeVariantHistoryCard":
        service.closeVariantHistoryCardHandler();
        break;
      case "closeSelectPurchaseCard":
        service.closeSelectPurchaseCardHandler();
        break;
      case "closeAddStockCard":
        service.closeAddStockCardHandler();
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
    <div className={cs.orderProductsPage}>
      <SheContextSidebar
        menuCollectionType="order"
        menuTitle="Order"
        itemId={Number(orderId)}
        counter={ordersState.productCounter}
      >
        <ProductsInOrderCard
          isLoading={state.isProductsInOrderCardLoading}
          isGridLoading={state.isProductsInOrderGridLoading}
          stockActions={ordersState.stockActionsGridRequestModel.items}
          onAction={onAction}
        />
        {state.activeCards?.includes("findProductsCard") && (
          <div
            className={cs.findProductsCard}
            ref={createRefCallback("findProductsCard")}
          >
            <FindProductsCard
              isLoading={state.isFindProductsCardLoading}
              isGridLoading={state.isFindProductsGridLoading}
              variants={ordersState.variantsGridRequestModel.items}
              gridRequestModel={ordersState.variantsGridRequestModel}
              preferences={appState.preferences}
              sortingOptions={sortingItems}
              colorsForFilter={ordersState.colorsForFilter}
              sizesForFilter={ordersState.sizesForFilter}
              categories={ordersState.categories}
              brands={ordersState.brands}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("variantConfigurationCard") && (
          <div ref={createRefCallback("variantConfigurationCard")}>
            <VariantConfigurationCard
              isLoading={state.isVariantConfigurationCardLoading}
              isVariantOptionsGridLoading={state.isVariantOptionsGridLoading}
              isVariantPhotoGridLoading={state.isVariantPhotoGridLoading}
              variant={state.selectedVariant}
              variantPhotos={state.variantPhotos}
              data={state.variantTraitsGridRequestModel}
              taxesList={state.taxesList}
              productCounter={state.productCounter}
              onAction={onAction}
              onGenerateProductCode={service.generateProductCodeHandler}
            />
          </div>
        )}
        {state.activeCards.includes("addStockCard") && (
          <div ref={createRefCallback("addStockCard")}>
            <AddStockCard
              isLoading={state.isAddStockCardLoading}
              taxTypes={state.taxesList}
              currencyTypes={state.currenciesList}
              variant={state.selectedVariant}
              purchase={state.selectedPurchase}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("selectPurchaseCard") && (
          <div ref={createRefCallback("selectPurchaseCard")}>
            <SelectPurchaseCard
              isLoading={state.isSelectPurchaseCardLoading}
              isGridLoading={state.isPurchaseGridLoading}
              purchases={state.purchaseGridRequestModel.items}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("supplierCard") && (
          <div ref={createRefCallback("supplierCard")}>
            <SupplierCard
              isLoading={state.isSupplierCardLoading}
              selectedPurchase={state.selectedPurchase}
              selectedSupplier={state.selectedCompany}
              showCloseButton={true}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards?.includes("selectEntityCard") && (
          <div ref={createRefCallback("selectEntityCard")}>
            <SelectEntityCard
              isLoading={state.isSelectEntityCardLoading}
              isGridLoading={state.isSuppliersGridLoading}
              entityName="Company"
              entityCollection={state.companiesGridRequestModel?.items}
              columns={CompaniesListGridColumns({
                onAction,
              })}
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
        {state.activeCards.includes("photosCard") && (
          <div ref={createRefCallback("photosCard")}>
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
        {state.activeCards.includes("disposeStockCard") && (
          <div ref={createRefCallback("disposeStockCard")}>
            <DisposeStockCard
              isLoading={state.isDisposeStockCardLoading}
              variant={state.selectedVariant}
              onAction={onAction}
              onSecondaryButtonClick={() =>
                handleCardAction("disposeStockCard")
              }
            />
          </div>
        )}
        {state.activeCards.includes("variantHistoryCard") && (
          <div ref={createRefCallback("variantHistoryCard")}>
            <StockHistoryCard
              isLoading={state.isVariantHistoryCardLoading}
              isGridLoading={state.isVariantsHistoryGridLoading}
              variant={state.selectedVariant}
              data={state.variantHistory}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("manageTraitsCard") && (
          <div ref={createRefCallback("manageTraitsCard")}>
            <ManageTraitsCard
              isLoading={state.isManageTraitsCardLoading}
              traits={state.listOfTraitsWithOptionsForProduct}
              variant={state.selectedVariant}
              onAction={onAction}
              onSecondaryButtonClick={() =>
                handleCardAction("manageTraitsCard")
              }
            />
          </div>
        )}
        {state.activeCards.includes("variantPhotosCard") && (
          <div ref={createRefCallback("variantPhotosCard")}>
            <VariantPhotosCard
              isLoading={state.isVariantPhotosCardLoading}
              isVariantPhotoGridLoading={state.isVariantPhotoGridLoading}
              isProductPhotoGridLoading={state.isProductPhotoGridLoading}
              variantPhotos={state.variantPhotos}
              productPhotos={state.productPhotosForVariant}
              contextId={state.selectedVariant?.variantId}
              onAction={onAction}
            />
          </div>
        )}
      </SheContextSidebar>
    </div>
  );
}
