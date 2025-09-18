import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./PurchaseProductsPage.module.scss";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import usePurchaseProductsPageService from "@/pages/products-section/purchase-products-page/usePurchaseProductsPageService.ts";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";
import PurchaseProductsCard from "@/components/complex/custom-cards/purchase-products-card/PurchaseProductsCard.tsx";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { PurchaseProductsPageSliceActions as actions } from "@/state/slices/PurchaseProductsPageSlice.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import ProductConfigurationCard from "@/components/complex/custom-cards/product-configuration-card/ProductConfigurationCard.tsx";
import CreateProductCategoryCard from "@/components/complex/custom-cards/create-product-category-card/CreateProductCategoryCard.tsx";
import CreateProductBrandCard from "@/components/complex/custom-cards/create-product-brand-card/CreateProductBrandCard.tsx";
import ManageProductCard from "@/components/complex/custom-cards/manage-product-card/ManageProductCard.tsx";
import ProductPhotosCard from "@/components/complex/custom-cards/product-photos-card/ProductPhotosCard.tsx";
import ConnectImageCard from "@/components/complex/custom-cards/connect-image-card/ConnectImageCard.tsx";
import ChooseVariantTraitsCard from "@/components/complex/custom-cards/choose-variant-traits-card/ChooseVariantTraitsCard.tsx";
import ProductTraitConfigurationCard from "@/components/complex/custom-cards/product-trait-configuration-card/ProductTraitConfigurationCard.tsx";
import AddVariantCard from "@/components/complex/custom-cards/add-variant-card/AddVariantCard.tsx";
import VariantConfigurationCard from "@/components/complex/custom-cards/variant-configuration-card/VariantConfigurationCard.tsx";
import AddStockCard from "@/components/complex/custom-cards/add-stock-card/AddStockCard.tsx";
import DisposeStockCard from "@/components/complex/custom-cards/dispose-stock-card/DisposeStockCard.tsx";
import StockHistoryCard from "@/components/complex/custom-cards/stock-history-card/StockHistoryCard.tsx";
import VariantPhotosCard from "@/components/complex/custom-cards/variant-photos-card/VariantPhotosCard.tsx";
import ManageTraitsCard from "@/components/complex/custom-cards/manage-traits-card/ManageTraitsCard.tsx";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import SelectPurchaseCard from "@/components/complex/custom-cards/select-purchase-card/SelectPurchaseCard.tsx";
import SupplierCard from "@/components/complex/custom-cards/supplier-card/SupplierCard.tsx";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import { CompaniesListGridColumns } from "@/components/complex/grid/custom-grids/companies-list-grid/CompaniesListGridColumns.tsx";
import SupplierConfigurationCard from "@/components/complex/custom-cards/supplier-configuration-card/SupplierConfigurationCard.tsx";

export function PurchaseProductsPage() {
  const {
    handleCardAction,
    handleMultipleCardActions,
    keepOnlyCards,
    createRefCallback,
  } = useCardActions({
    selectActiveCards: (state) =>
      state[StoreSliceEnum.PURCHASE_PRODUCTS].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const { purchaseId } = useParams();
  const service = usePurchaseProductsPageService(
    handleCardAction,
    handleMultipleCardActions,
    keepOnlyCards,
  );
  const productsService = useProductsPageService();
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const state = useAppSelector<IPurchaseProductsPageSlice>(
    StoreSliceEnum.PURCHASE_PRODUCTS,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );

  useEffect(() => {
    service.getPurchaseProductsPageDataHandler(purchaseId);
  }, [purchaseId]);

  useEffect(() => {
    service.getPurchasesProductsGridDataHandler(purchaseId);
  }, []);

  useEffect(() => {
    service.getVariantsForPurchaseGridDataHandler();
  }, []);

  useEffect(() => {
    service.getGridFiltersDataHandler();
  }, []);

  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "addProductToPurchase":
        service.addProductToPurchaseHandler(payload, purchaseId);
        break;
      case "updatePurchaseProduct":
        service.updatePurchaseProductHandler(payload, purchaseId);
        break;
      case "openCreateProductCard":
        service.openCreateProductCardHandler();
        break;
      case "submitProductData":
        service.submitProductDataHandler(payload);
        break;
      case "openCreateProductCategoryCard":
        service.openCreateProductCategoryCardHandler();
        break;
      case "checkCategoryName":
        service.checkCategoryNameHandler(payload);
        break;
      case "createProductCategory":
        service.createProductCategoryHandler(payload);
        break;
      case "openCreateProductBrandCard":
        service.openCreateProductBrandCardHandler();
        break;
      case "checkBrandName":
        service.checkBrandNameHandler(payload);
        break;
      case "createProductBrand":
        service.createProductBrandHandler(payload);
        break;
      case "uploadCategoryOrBrandPhoto":
        service.uploadCategoryOrBrandPhotoHandler(payload);
        break;
      case "closeProductConfigurationCard":
        service.closeProductConfigurationCardHandler();
        break;
      case "generateProductCode":
        service.generateProductCodeHandler();
        break;
      case "checkProductCode":
        service.checkProductCodeHandler(payload);
        break;
      case "openPurchaseProductsCard":
        service.openPurchaseProductsCardHandler(purchaseId);
        break;
      case "openManageProductCard":
        service.openManageProductCardHandler();
        break;
      case "manageProductData":
        service.manageProductDataHandler();
        break;
      case "manageProductPhotos":
        service.manageProductPhotosHandler();
        break;
      case "uploadPhoto":
        service.uploadPhotoHandler(payload);
        break;
      case "changePhotoPosition":
        service.changePhotoPositionHandler(payload);
        break;
      case "deletePhoto":
        service.deletePhotoHandler(payload);
        break;
      case "activatePhoto":
        service.setPhotoActivationStateHandler(payload);
        break;
      case "openConnectImageCard":
        service.openConnectImageCardHandler(payload);
        break;
      case "imageActions":
        service.imageActionsHandler(payload);
        break;
      case "closeProductPhotsCard":
        service.closeProductPhotosCardHandler();
        break;
      case "closeConnectImageCard":
        service.closeConnectImageCardHandler();
        break;
      case "manageProductTraits":
        service.manageProductTraitsHandler();
        break;
      case "addTrait":
        service.addTraitHandler();
        break;
      case "manageTrait":
        service.manageTraitHandler(payload);
        break;
      case "setProductTraits":
        service.setProductTraitsHandler(payload);
        break;
      case "deleteTrait":
        service.deleteTraitHandler(payload);
        break;
      case "createTrait":
        service.createTraitHandler(payload);
        break;
      case "updateTrait":
        service.updateTraitHandler(payload);
        break;
      case "updateOption":
        service.updateOptionHandler(payload);
        break;
      case "addOption":
        service.addOptionHandler();
        break;
      case "deleteOption":
        service.deleteOptionHandler(payload);
        break;
      case "dndTraitOption":
        service.dndTraitOptionHandler(payload);
        break;
      case "closeProductTraitConfigurationCard":
        service.closeProductTraitConfigurationCardHandler();
        break;
      case "openAddVariantCard":
        service.openAddVariantCardHandler(payload);
        break;
      case "addVariantGridAction":
        service.addVariantGridActionHandler(payload);
        break;
      case "addVariant":
        service.addVariantHandler(payload, purchaseId);
        break;
      case "addDuplicatedVariant":
        service.addDuplicatedVariantHandler(payload, purchaseId);
        break;
      case "closeAddVariantCard":
        service.closeAddVariantCardHandler();
        break;
      case "addStockAction":
        service.addStockActionHandler(payload);
        break;
      case "updateStockAction":
        service.updateStockActionHandler(payload);
        break;
      case "deleteStockAction":
        service.deleteStockActionHandler(payload, purchaseId);
        break;
      case "deleteStockActionInGrid":
        service.deleteStockActionInGridHandler(payload);
        break;
      case "manageVariant":
        service.manageVariantHandler(payload);
        break;
      case "updateVariantDetails":
        service.updateVariantDetailsHandler(payload);
        break;
      case "updateVariantTraitOptions":
        service.updateVariantTraitOptionsHandler(payload);
        break;
      case "selectPurchase":
        service.selectPurchaseHandler(payload);
        break;
      case "searchSupplier":
        service.searchSupplierHandler(payload);
        break;
      case "filterSuppliersByDate":
        service.filterSuppliersByDateHandle(payload);
        break;
      case "openSupplierCard":
        service.openSupplierCardHandler();
        break;
      case "openSelectPurchaseCard":
        service.openSelectPurchaseCardHandler(state.purchaseGridRequestModel);
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
      case "increaseStockAmount":
        service.increaseStockAmountHandler(payload);
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
      case "disposeFromStock":
        service.disposeFromStockHandler(payload);
        break;
      case "uploadPhotoToVariant":
        service.uploadPhotoToVariantHandler(payload);
        break;
      case "addPhotoToVariant":
        service.addPhotoToVariantHandler(payload);
        break;
      case "detachPhotoFromVariant":
        service.detachPhotoFromVariantHandler(payload);
        break;
      case "dndVariantPhoto":
        service.dndVariantPhotoHandler(payload);
        break;
      case "openAddStockCard":
        service.openAddStockCardHandler();
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
      case "closeCreateProductCategoryCard":
        service.closeCreateProductCategoryCardHandler();
        break;
      case "closeCreateProductBrandCard":
        service.closeCreateProductBrandCardHandler();
        break;
      case "openVariantPhotosCard":
        service.openVariantPhotosCardHandler();
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
      case "navigateToManageVariant":
        service.navigateToManageVariantHandler(payload);
        break;
      case "refreshPurchaseProductsTab":
        service.refreshPurchaseProductsTabHandler(payload);
        break;
      case "gridRequestChange":
        service.gridRequestChangeHandler(purchaseId, payload);
        break;
    }
  }

  return (
    <div className={cs.purchaseProductsPage}>
      <ProductMenuCard
        isLoading={state.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        itemId={Number(purchaseId)}
        counter={productsState.purchaseCounters}
      />
      {state.activeCards?.includes("purchaseProductsCard") && (
        <div
          className={cs.purchaseProductsCard}
          ref={createRefCallback("purchaseProductsCard")}
        >
          <PurchaseProductsCard
            isLoading={state.isPurchaseProductsCardLoading}
            isPurchaseProductsGridLoading={state.isPurchasesProductsGridLoading}
            isProductsGridLoading={state.isVariantsForPurchaseGridLoading}
            variantsGridRequestModel={state.variantsForPurchaseGridRequestModel}
            purchaseProductsGridRequestModel={
              state.purchasesProductsGridRequestModel
            }
            sortingOptions={productsState.sortingOptions}
            preferences={appState.preferences}
            brands={productsState.brands}
            categories={productsState.categories}
            colorsForFilter={productsState.colorsForFilter}
            sizesForFilter={productsState.sizesForFilter}
            variantsSkeletonQuantity={
              state.variantsForPurchaseGridRequestModel.pageSize
            }
            currencies={productsState.currenciesList}
            taxes={productsState.taxesList}
            purchaseSummary={state.purchaseSummary}
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards?.includes("manageProductCard") && (
        <div ref={createRefCallback("manageProductCard")}>
          <ManageProductCard
            isLoading={state.isManageProductCardLoading}
            purchase={productsState.selectedPurchase}
            product={state.selectedProduct}
            variants={state.purchaseProductVariants}
            currencies={productsState.currenciesList}
            taxes={productsState.taxesList}
            isVariantGridLoading={state.isVariantGridLoading}
            productTraits={productsState.listOfTraitsWithOptionsForProduct}
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards?.includes("productConfigurationCard") && (
        <div ref={createRefCallback("productConfigurationCard")}>
          <ProductConfigurationCard
            isLoading={state.isProductConfigurationCardLoading}
            product={state.selectedProduct}
            brandsList={productsState.brands}
            categoriesList={productsState.categories}
            productCode={productsState.productCode}
            showSecondaryButton={true}
            onPrimaryButtonClick={(data) => onAction("submitProductData", data)}
            onSecondaryButtonClick={() =>
              onAction("closeProductConfigurationCard")
            }
            onAction={onAction}
          />
        </div>
      )}
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
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards.includes("productPhotosCard") && (
        <div ref={createRefCallback("productPhotosCard")}>
          <ProductPhotosCard
            isLoading={state.isProductPhotosCardLoading}
            isImageUploaderLoading={state.isImageUploaderLoading}
            isGridLoading={productsState.isProductPhotosLoading}
            data={productsState.productPhotos}
            productCounter={null}
            contextId={state.selectedProduct.productId}
            showCloseButton={true}
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards.includes("connectImageCard") && (
        <div ref={createRefCallback("connectImageCard")}>
          <ConnectImageCard
            isLoading={state.isConnectImageCardLoading}
            isGridLoading={state.isVariantsGridLoading}
            variants={productsState.productVariants}
            selectedPhoto={state.selectedPhoto}
            onAction={onAction}
            onSecondaryButtonClick={() => handleCardAction("connectImageCard")}
          />
        </div>
      )}
      {state.activeCards.includes("chooseVariantTraitsCard") && (
        <div ref={createRefCallback("chooseVariantTraitsCard")}>
          <ChooseVariantTraitsCard
            isLoading={state.isChooseVariantTraitsCardLoading}
            items={productsState.traits}
            selectedItems={productsState.listOfTraitsWithOptionsForProduct}
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
            typesOfTraits={productsState.typesOfTraits}
            onSecondaryButtonClick={() =>
              handleCardAction("productTraitConfigurationCard")
            }
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards.includes("addVariantCard") && (
        <div ref={createRefCallback("addVariantCard")}>
          <AddVariantCard
            isLoading={state.isAddVariantCardLoading}
            traits={productsState.listOfTraitsWithOptionsForProduct}
            isDuplicateVariant={state.isDuplicateVariant}
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
            variant={productsState.selectedVariant}
            variantPhotos={state.variantPhotos}
            data={state.variantTraitsGridRequestModel}
            taxesList={productsState.taxesList}
            productCounter={productsState.productCounter}
            onAction={onAction}
            onGenerateProductCode={productsService.generateProductCodeHandler}
            onSecondaryButtonClick={() =>
              onAction("closeVariantConfigurationCard")
            }
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
            onSecondaryButtonClick={() => handleCardAction("disposeStockCard")}
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
      {state.activeCards.includes("variantPhotosCard") && (
        <div ref={createRefCallback("variantPhotosCard")}>
          <VariantPhotosCard
            isLoading={state.isVariantPhotosCardLoading}
            isVariantPhotoGridLoading={state.isVariantPhotoGridLoading}
            isProductPhotoGridLoading={state.isProductPhotoGridLoading}
            variantPhotos={state.variantPhotos}
            productPhotos={state.productPhotosForVariant}
            contextId={productsState.selectedVariant?.variantId}
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards.includes("manageTraitsCard") && (
        <div ref={createRefCallback("manageTraitsCard")}>
          <ManageTraitsCard
            isLoading={state.isManageTraitsCardLoading}
            traits={productsState.listOfTraitsWithOptionsForProduct}
            variant={productsState.selectedVariant}
            onAction={onAction}
            onSecondaryButtonClick={() => handleCardAction("manageTraitsCard")}
          />
        </div>
      )}
    </div>
  );
}
