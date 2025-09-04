import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import cs from "@/pages/products-section/manage-variants-page/ManageVariantsPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import useManageVariantsPageService from "@/pages/products-section/manage-variants-page/useManageVariantsPageService.ts";
import { IManageVariantsPageSlice } from "@/const/interfaces/store-slices/IManageVariantsPageSlice.ts";
import { ManageVariantsPageSliceActions as actions } from "@/state/slices/ManageVariantsPageSlice.ts";
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
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";

export function ManageVariantsPage() {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const service = useManageVariantsPageService();
  const productsService = useProductsPageService();
  const state = useAppSelector<IManageVariantsPageSlice>(
    StoreSliceEnum.MANAGE_VARIANTS,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) =>
      state[StoreSliceEnum.MANAGE_VARIANTS].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const productsForItemsCard = productsService.itemsCardItemsConvertor(
    productsState.products,
    {
      idKey: "productId",
      nameKey: "productName",
      imageKeyPath: "image.thumbnailUrl",
      type: "product",
    },
  );

  const variantsForItemsCard = productsService.itemsCardItemsConvertor(
    productsState.variants,
    {
      idKey: "variantId",
      nameKey: "variantName",
      imageKeyPath: "photo.thumbnailUrl",
      type: "variant",
    },
  );

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
    }
  }

  return (
    <div className={cs.manageVariantsPage}>
      <ItemsCard
        isLoading={productsState.isItemsCardLoading}
        isItemsLoading={
          productsState.activeTab === "products"
            ? productsState.isProductsLoading
            : productsState.isVariantsLoading
        }
        title={productsState.activeTab === "products" ? "Products" : "Variants"}
        data={
          productsState.activeTab === "products"
            ? productsForItemsCard
            : variantsForItemsCard
        }
        selectedItem={
          productsState.activeTab === "products"
            ? productId
            : productsState.selectedVariant?.variantId
        }
        skeletonQuantity={
          productsState.activeTab === "products"
            ? productsState.products?.length
            : productsState.variants?.length
        }
        onAction={(data) => onAction("onProductItemClick", data)}
      />
      <ProductMenuCard
        isLoading={productsState.isProductMenuCardLoading}
        title="Manage Product"
        itemsCollection="products"
        counter={productsState.productCounter}
        onAction={handleCardAction}
        itemId={Number(productId)}
        activeCards={state.activeCards}
      />
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
            data={state.variantTraitsGridModel}
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
            onAction={onAction}
            taxTypes={productsState.taxesList}
            currencyTypes={productsState.currenciesList}
            variant={productsState.selectedVariant}
            onSecondaryButtonClick={() => handleCardAction("addStockCard")}
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
            onSecondaryButtonClick={() => handleCardAction("manageTraitsCard")}
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
            data={state.colorOptionsGridModel}
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
    </div>
  );
}
