import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./ManageVariantsPage.module.scss";
import ManageVariantsCard from "@/components/complex/custom-cards/manage-variants-card/ManageVariantsCard.tsx";
import ChooseVariantTraitsCard from "@/components/complex/custom-cards/choose-variant-traits-card/ChooseVariantTraitsCard.tsx";
import ProductTraitConfigurationCard from "@/components/complex/custom-cards/product-trait-configuration-card/ProductTraitConfigurationCard.tsx";
import VariantConfigurationCard from "@/components/complex/custom-cards/variant-configuration-card/VariantConfigurationCard.tsx";
import AddStockCard from "@/components/complex/custom-cards/add-stock-card/AddStockCard.tsx";
import DisposeStockCard from "@/components/complex/custom-cards/dispose-stock-card/DisposeStockCard.tsx";
import StockHistoryCard from "@/components/complex/custom-cards/stock-history-card/StockHistoryCard.tsx";
import ManageTraitsCard from "@/components/complex/custom-cards/manage-traits-card/ManageTraitsCard.tsx";
import AddVariantCard from "@/components/complex/custom-cards/add-variant-card/AddVariantCard.tsx";
import VariantPhotosCard from "@/components/complex/custom-cards/variant-photos-card/VariantPhotosCard.tsx";
import SelectPurchaseCard from "@/components/complex/custom-cards/select-purchase-card/SelectPurchaseCard.tsx";
import SupplierCard from "@/components/complex/custom-cards/supplier-card/SupplierCard.tsx";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import SupplierConfigurationCard from "@/components/complex/custom-cards/supplier-configuration-card/SupplierConfigurationCard.tsx";
import { CompaniesListGridColumns } from "@/components/complex/grid/custom-grids/companies-list-grid/CompaniesListGridColumns.tsx";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";
import { ManageVariantsPageSliceActions as actions } from "@/state/slices/ManageVariantsPageSlice.ts";
import useManageVariantsPageService from "@/pages/products-section/manage-variants-page/useManageVariantsPageService.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";

export function ManageVariantsPage() {
  // ==================================================================== UTILITIES
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) =>
      state[StoreSliceEnum.MANAGE_VARIANTS].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const { state, productsState, productsService, dispatch, ...service } =
    useManageVariantsPageService(handleCardAction);
  const { productId } = useParams();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    service.getManageVariantsPageDataHandler(productId);
  }, [productId]);

  useEffect(() => {
    service.getProductVariantsHandler(productId);
  }, [state.variants, productId]);

  useEffect(() => {
    return () => {
      dispatch(actions.refreshActiveCards([]));
    };
  }, [dispatch]);

  // ==================================================================== EVENT HANDLERS
  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "onProductItemClick":
        service.onProductItemClickHandler(payload);
        break;
      case "addVariant":
        service.addVariantHandler(payload, productId);
        break;
      case "addDuplicatedVariant":
        service.addDuplicatedVariantHandler(payload, productId);
        break;
      case "manageVariant":
        service.manageVariantHandler(payload, productId);
        break;
      case "updateVariantDetails":
        service.updateVariantDetailsHandler(payload);
        break;
      case "updateVariantTraitOptions":
        service.updateVariantTraitOptions(payload, productId);
        break;
      case "activateVariant":
        service.activateVariantHandler(payload);
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
      case "changeVariantPosition":
        service.changeVariantPositionHandler(
          productId,
          payload.activeItem.variantId,
          payload.newIndex,
        );
        break;
      case "uploadPhotoToVariant":
        service.uploadPhotoToVariantHandler(payload, productId);
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
      case "addTrait":
        service.addTraitHandler();
        break;
      case "manageTrait":
        service.manageTraitHandler(payload);
        break;
      case "createTrait":
        service.createTraitHandler(payload);
        break;
      case "updateTrait":
        service.updateTraitHandler(payload);
        break;
      case "setProductTraits":
        service.setProductTraitsHandler(payload, productId);
        break;
      case "deleteTrait":
        service.deleteTraitHandler(payload, productId);
        break;
      case "addOption":
        service.addOptionHandler();
        break;
      case "updateOption":
        service.updateOptionHandler(payload);
        break;
      case "deleteOption":
        service.deleteOptionHandler(payload);
        break;
      case "dndTraitOption":
        service.dndTraitOptionHandler(payload);
        break;
      case "openAddVariantCard":
        service.openAddVariantCardHandler();
        break;
      case "openChooseVariantTraitsCard":
        service.openChooseVariantTraitsCardHandler();
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
        service.openVariantPhotosCardHandler(payload, productId);
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
      case "selectCompany":
        service.selectCompanyHandle(payload);
        break;
      case "detachSupplier":
        service.detachSupplierHandler();
        break;
      case "createPurchase":
        service.createPurchaseForSupplierHandler(payload);
        break;
      case "closeProductTraitConfigurationCard":
        service.closeProductTraitConfigurationCardHandler();
        break;
      case "closeAddVariantCard":
        service.closeAddVariantCardHandler();
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
      case "closeSupplierConfigurationCard":
        service.closeSupplierConfigurationCardHandler();
        break;
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.manageVariantsPage}>
      <SheContextSidebar
        menuCollectionType="products"
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
        onAction={(data) => onAction("onProductItemClick", data)}
      >
        <ManageVariantsCard
          isLoading={state.isManageVariantsCardLoading}
          isVariantsLoading={productsState.isProductVariantsLoading}
          variants={productsState.productVariants}
          traits={productsState.listOfTraitsWithOptionsForProduct}
          productCounter={productsState.productCounter}
          onAction={onAction}
        />
        {state.activeCards.includes("variantConfigurationCard") && (
          <div ref={createRefCallback("variantConfigurationCard")}>
            <VariantConfigurationCard
              isLoading={state.isVariantConfigurationCardLoading}
              isVariantOptionsGridLoading={state.isVariantOptionsGridLoading}
              isVariantPhotoGridLoading={state.isVariantPhotoGridLoading}
              variant={productsState.selectedVariant}
              variantPhotos={productsState.variantPhotos}
              data={state.variantTraitsGridRequestModel}
              taxesList={productsState.taxesList}
              productCounter={productsState.productCounter}
              onAction={onAction}
              onGenerateProductCode={service.generateProductCodeHandler}
            />
          </div>
        )}
        {state.activeCards.includes("addStockCard") && (
          <div ref={createRefCallback("addStockCard")}>
            <AddStockCard
              isLoading={state.isAddStockCardLoading}
              taxTypes={productsState.taxesList}
              currencyTypes={productsState.currenciesList}
              variant={productsState.selectedVariant}
              purchase={state.selectedPurchase}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("selectPurchaseCard") && (
          <div ref={createRefCallback("selectPurchaseCard")}>
            <SelectPurchaseCard
              isLoading={state.setIsSelectPurchaseCardLoading}
              isGridLoading={state.setIsPurchaseGridLoading}
              purchases={state.purchaseGridRequestModel.items}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("supplierCard") && (
          <div ref={createRefCallback("supplierCard")}>
            <SupplierCard
              isLoading={state.isSupplierCardLoading}
              selectedPurchase={productsState.selectedPurchase}
              selectedSupplier={state.selectedCompany}
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
        {state.activeCards.includes("disposeStockCard") && (
          <div ref={createRefCallback("disposeStockCard")}>
            <DisposeStockCard
              isLoading={state.isDisposeStockCardLoading}
              variant={productsState.selectedVariant}
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
              isGridLoading={state.isVariantHistoryGridLoading}
              variant={productsState.selectedVariant}
              data={state.variantHistory}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("addVariantCard") && (
          <div ref={createRefCallback("addVariantCard")}>
            <AddVariantCard
              isLoading={state.isAddVariantCardLoading}
              traits={state.listOfTraitsWithOptionsForProduct}
              isDuplicateVariant={state.isDuplicateVariant}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("manageTraitsCard") && (
          <div ref={createRefCallback("manageTraitsCard")}>
            <ManageTraitsCard
              isLoading={state.isManageTraitsCardLoading}
              traits={state.listOfTraitsWithOptionsForProduct}
              variant={productsState.selectedVariant}
              onAction={onAction}
              onSecondaryButtonClick={() =>
                handleCardAction("manageTraitsCard")
              }
            />
          </div>
        )}
        {state.activeCards.includes("chooseVariantTraitsCard") && (
          <div ref={createRefCallback("chooseVariantTraitsCard")}>
            <ChooseVariantTraitsCard
              isLoading={state.isChooseVariantTraitsCardLoading}
              items={state.traits}
              selectedItems={state.listOfTraitsWithOptionsForProduct}
              onAction={onAction}
              onSecondaryButtonClick={() =>
                handleCardAction("chooseVariantTraitsCard")
              }
            />
          </div>
        )}
        {state.activeCards.includes("productTraitConfigurationCard") && (
          <div ref={createRefCallback("productTraitConfigurationCard")}>
            <ProductTraitConfigurationCard
              isLoading={state.isProductTraitConfigurationCardLoading}
              isGridLoading={state.isTraitOptionsGridLoading}
              data={state.colorOptionsGridRequestModel}
              selectedTrait={state.selectedTrait}
              typesOfTraits={state.typesOfTraits}
              onSecondaryButtonClick={() =>
                handleCardAction("productTraitConfigurationCard")
              }
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("variantPhotosCard") && (
          <div ref={createRefCallback("variantPhotosCard")}>
            <VariantPhotosCard
              isLoading={state.isVariantPhotosCardLoading}
              isVariantPhotoGridLoading={state.isVariantPhotoGridLoading}
              isProductPhotoGridLoading={state.isProductPhotoGridLoading}
              variantPhotos={productsState.variantPhotos}
              productPhotos={state.productPhotosForVariant}
              contextId={productsState.selectedVariant?.variantId}
              onAction={onAction}
            />
          </div>
        )}
      </SheContextSidebar>
    </div>
  );
}
