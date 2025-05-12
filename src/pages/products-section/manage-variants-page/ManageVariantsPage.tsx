import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { useToast } from "@/hooks/useToast.ts";
import cs from "@/pages/products-section/manage-variants-page/ManageVariantsPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import useManageVariantsPageService from "@/pages/products-section/manage-variants-page/useManageVariantsPageService.ts";
import { IManageVariantsPageSlice } from "@/const/interfaces/store-slices/IManageVariantsPageSlice.ts";
import { ManageVariantsPageSliceActions as actions } from "@/state/slices/ManageVariantsPageSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice";
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
import {
  clearSelectedGridItems,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";

export function ManageVariantsPage() {
  const dispatch = useAppDispatch();
  const service = useManageVariantsPageService();
  const productsService = useProductsPageService();
  const state = useAppSelector<IManageVariantsPageSlice>(
    StoreSliceEnum.MANAGE_VARIANTS,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const { addToast } = useToast();
  const { productId } = useParams();
  const cardRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (productsState.products === null) {
      productsService
        .getTheProductsForGridHandler(productsState.gridRequestModel)
        .then((res: GridModel) => {
          dispatch(productsActions.refreshProducts(res.items));
        });
    }
    if (state.listOfTraitsWithOptionsForProduct.length === 0) {
      service
        .getListOfTraitsWithOptionsForProductHandler(productId)
        .then((res) => {
          dispatch(actions.refreshListOfTraitsWithOptionsForProduct(res));
        });
    }
    if (productsState.taxesList.length === 0) {
      productsService
        .getTaxesListHandler()
        .then((res) => dispatch(productsActions.refreshTaxesList(res)));
    }
  }, [productId]);

  useEffect(() => {
    if (!productsState.productCounter) {
      productsService
        .getCountersForProductsHandler(Number(productId))
        .then((res) => {
          dispatch(productsActions.refreshProductCounter(res));
        });
    }
    if (productsState.productVariants.length === 0) {
      productsService.getProductVariantsHandler(productId).then((res) => {
        dispatch(productsActions.refreshProductVariants(res));
      });
    }
  }, [state.variants, productId]);

  useEffect(() => {
    return () => {
      dispatch(actions.refreshActiveCards([]));
    };
  }, [dispatch]);

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
    const activeCards = overrideActiveCards ?? state.activeCards;
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

  function handleMultipleCardActions(
    cardIdentifiers: string[],
    forceOpen = false,
  ) {
    let updatedCards = [...state.activeCards];
    let lastAddedCard = null;

    if (forceOpen) {
      for (const card of cardIdentifiers) {
        if (!updatedCards.includes(card)) {
          updatedCards.push(card);
          lastAddedCard = card;
        }
      }

      dispatch(actions.refreshActiveCards(updatedCards));

      if (lastAddedCard) {
        scrollToCard(lastAddedCard);
      }
    } else {
      updatedCards = updatedCards.filter(
        (card) => !cardIdentifiers.includes(card),
      );
      dispatch(actions.refreshActiveCards(updatedCards));
    }
  }

  function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "onProductItemClick":
        productsService.itemCardHandler(payload);
        break;
      case "addVariant":
        service.createVariantHandler(productId, payload).then((res) => {
          if (res) {
            handleCardAction("addVariantCard");
            productsService.getProductVariantsHandler(productId).then((res) => {
              dispatch(productsActions.refreshProductVariants(res));
            });
          }
        });
        break;
      case "manageVariant":
        handleCardAction("variantConfigurationCard", true);
        dispatch(
          productsActions.refreshProductVariants(
            setSelectedGridItem(
              payload.variantId,
              productsState.productVariants,
            ),
          ),
        );
        dispatch(actions.setIsVariantOptionsGridLoading(true));
        dispatch(actions.setIsVariantPhotoGridLoading(true));
        service.getVariantDetailsHandler(payload.variantId).then((res) => {
          dispatch(actions.setIsVariantOptionsGridLoading(false));
          dispatch(actions.setIsVariantPhotoGridLoading(false));
          dispatch(actions.refreshSelectedVariant(res));
          dispatch(actions.refreshVariantPhotos(res?.photos));
        });
        break;
      case "updateVariantDetails":
        service.updateVariantDetailsHandler(
          payload.variant.variantId,
          payload.formattedData,
        );
        break;
      case "updateVariantTraitOptions":
        service
          .updateVariantTraitOptionsHandler(
            payload.variant.variantId,
            payload.submissionData,
          )
          .then(() => {
            productsService.getProductVariantsHandler(productId).then((res) => {
              dispatch(productsActions.refreshProductVariants(res));
            });
            service
              .getVariantDetailsHandler(payload.variant.variantId)
              .then((res) => {
                dispatch(actions.refreshSelectedVariant(res));
              });
          });
        break;
      case "activateVariant":
        service.toggleVariantIsActiveHandler(payload.variantId).then(() => {
          productsService.getProductVariantsHandler(productId).then((res) => {
            dispatch(productsActions.refreshProductVariants(res));
          });
        });
        break;
      case "increaseStockAmount":
        service.increaseStockAmountForVariantHandler(
          payload.variant.variantId,
          payload.formattedData,
        );
        break;
      case "disposeFromStock":
        service.disposeVariantFromStockHandler(
          payload.variant.variantId,
          payload.formattedData,
        );
        break;
      case "changeVariantPosition":
        service.changeVariantPositionHandler(
          productId,
          payload.activeItem.variantId,
          payload.newIndex,
        );
        break;
      case "uploadPhotoToVariant":
        service.uploadPhotoHandler(payload).then((res) => {
          if (res) {
            dispatch(actions.setIsVariantPhotoGridLoading(true));
            dispatch(actions.setIsProductPhotoGridLoading(true));
            service.getVariantDetailsHandler(payload.contextId).then((res) => {
              dispatch(actions.setIsVariantPhotoGridLoading(false));
              dispatch(actions.refreshSelectedVariant(res));
              dispatch(actions.refreshVariantPhotos(res?.photos));
            });
            productsService
              .getProductPhotosHandler(Number(productId))
              .then((res) => {
                dispatch(actions.setIsProductPhotoGridLoading(false));
                dispatch(productsActions.refreshProductPhotos(res));
              });
            productsService
              .getCountersForProductsHandler(Number(productId))
              .then((res) => {
                dispatch(productsActions.refreshProductCounter(res));
              });
          }
        });
        break;
      case "deletePhoto":
        console.log("PHOTO DELETE", payload);
        // service.deletePhotoHandler(payload).then((res) => {
        //   if (res) {
        //     service.getVariantDetailsHandler(payload.contextId).then((res) => {
        //       dispatch(actions.refreshSelectedVariant(res));
        //       dispatch(actions.refreshVariantPhotos(res?.photos));
        //     });
        //   }
        // });
        break;
      case "addPhotoToVariant":
        service
          .attachProductPhotoToVariantHandler(
            state.selectedVariant.variantId,
            payload.photoId,
          )
          .then(() => {
            dispatch(actions.setIsVariantPhotoGridLoading(true));
            service
              .getVariantDetailsHandler(state.selectedVariant.variantId)
              .then((res) => {
                dispatch(actions.setIsVariantPhotoGridLoading(false));
                dispatch(actions.refreshVariantPhotos(res?.photos));
                dispatch(actions.refreshSelectedVariant(res));
              });
          });
        break;
      case "detachPhotoFromVariant":
        service
          .detachVariantPhotoHandler(
            state.selectedVariant.variantId,
            payload.photoId.toString(),
          )
          .then((res) => {
            if (res) {
              dispatch(actions.setIsVariantPhotoGridLoading(true));
              service
                .getVariantDetailsHandler(state.selectedVariant.variantId)
                .then((res) => {
                  dispatch(actions.setIsVariantPhotoGridLoading(false));
                  dispatch(actions.refreshVariantPhotos(res?.photos));
                });
            }
          });
        break;
      case "dndVariantPhoto":
        service.changePhotoPositionForVariantHandler(
          state.selectedVariant.variantId,
          payload.activeItem.photoId,
          payload.newIndex,
        );
        // .then(() => {
        //   dispatch(actions.setIsVariantPhotoGridLoading(true));
        //   service
        //     .getVariantDetailsHandler(state.selectedVariant.variantId)
        //     .then((res) => {
        //       dispatch(actions.setIsVariantPhotoGridLoading(false));
        //       dispatch(actions.refreshSelectedVariant(res));
        //       dispatch(actions.refreshVariantPhotos(res?.photos));
        //     });
        // });
        break;
      case "addTrait":
        dispatch(actions.resetSelectedTrait());
        service.getListOfTypesOfTraitsHandler().then((res) => {
          dispatch(actions.refreshTypesOfTraits(res));
          handleCardAction("productTraitConfigurationCard", true);
          dispatch(actions.refreshSelectedTrait({}));
        });
        break;
      case "manageTrait":
        handleCardAction("productTraitConfigurationCard", true);
        dispatch(actions.setIsTraitOptionsGridLoading(true));
        Promise.all([
          service.getTraitHandler(payload),
          service.getOptionsForTraitHandler(payload),
          service.getListOfTypesOfTraitsHandler(),
        ]).then(([trait, options, types]) => {
          dispatch(actions.setIsTraitOptionsGridLoading(false));
          dispatch(actions.refreshSelectedTrait(trait));
          dispatch(
            actions.refreshColorOptionsGridModel({
              ...state.colorOptionsGridModel,
              items: options.filter((option) => !option.isDeleted),
            }),
          );
          dispatch(actions.refreshTypesOfTraits(types));
        });
        break;
      case "createTrait":
        service.createNewTraitHandler(payload).then((res) => {
          if (res) {
            dispatch(actions.refreshSelectedTrait(res));
            service.getOptionsForTraitHandler(res.traitId).then((res) => {
              dispatch(
                actions.refreshColorOptionsGridModel({
                  ...state.colorOptionsGridModel,
                  items: res.filter((option) => !option.isDeleted),
                }),
              );
            });
            service.getListOfAllTraitsHandler().then((res) => {
              dispatch(actions.refreshTraits(res));
            });
          }
        });
        break;
      case "updateTrait":
        service
          .updateTraitHandler(state.selectedTrait.traitId, payload)
          .then((res) => {
            if (res) {
              service.getListOfAllTraitsHandler().then((res) => {
                dispatch(actions.refreshTraits(res));
              });
            }
          });
        break;
      case "setProductTraits":
        dispatch(actions.refreshSelectedTraitsIds(payload));
        service.setProductTraitsHandler(productId, payload).then(() => {
          handleMultipleCardActions([
            "chooseVariantTraitsCard",
            "productTraitConfigurationCard",
          ]);

          service
            .getListOfTraitsWithOptionsForProductHandler(productId)
            .then((res) => {
              dispatch(actions.refreshListOfTraitsWithOptionsForProduct(res));
            });
        });
        break;
      case "updateOption":
        dispatch(actions.setIsTraitOptionsGridLoading(true));
        service
          .updateOptionsForTraitHandler(payload.optionId, payload.updatedModel)
          .then((res) => {
            dispatch(actions.setIsTraitOptionsGridLoading(false));
            if (res) {
              service
                .getOptionsForTraitHandler(state.selectedTrait.traitId)
                .then((options) => {
                  dispatch(
                    actions.refreshColorOptionsGridModel({
                      ...state.colorOptionsGridModel,
                      items: options.filter((option) => !option.isDeleted),
                    }),
                  );
                });
            }
          });
        break;
      case "addOption":
        dispatch(actions.setIsTraitOptionsGridLoading(true));
        service
          .createNewOptionForTraitHandler(state.selectedTrait.traitId, {
            optionColor: "#fff",
            optionName: "Default option",
          })
          .then((res) => {
            dispatch(actions.setIsTraitOptionsGridLoading(false));
            if (res) {
              dispatch(
                actions.refreshColorOptionsGridModel({
                  ...state.colorOptionsGridModel,
                  items: [...state.colorOptionsGridModel.items, res],
                }),
              );
              service.getListOfAllTraitsHandler().then((res) => {
                dispatch(actions.refreshTraits(res));
              });
            }
          });
        break;
      case "deleteOption":
        dispatch(actions.setIsTraitOptionsGridLoading(true));
        service.deleteOptionsForTraitHandler(payload.optionId).then(() => {
          dispatch(actions.setIsTraitOptionsGridLoading(false));
          service
            .getOptionsForTraitHandler(state.selectedTrait.traitId)
            .then((options) => {
              dispatch(
                actions.refreshColorOptionsGridModel({
                  ...state.colorOptionsGridModel,
                  items: options.filter((option) => !option.isDeleted),
                }),
              );
            });
          service.getListOfAllTraitsHandler().then((res) => {
            dispatch(actions.refreshTraits(res));
          });
        });
        break;
      case "dndTraitOption":
        service.changePositionOfTraitOptionHandler(
          payload.selectedTrait.traitId,
          payload.activeItem.optionId,
          payload.newIndex,
        );
        break;
      case "openAddVariantCard":
        dispatch(actions.refreshActiveCards([]));
        handleCardAction("addVariantCard", true, []);
        break;
      case "openChooseVariantTraitsCard":
        service.getListOfAllTraitsHandler().then((res) => {
          dispatch(actions.refreshTraits(res));
        });
        handleCardAction("chooseVariantTraitsCard", true);
        break;
      case "openAddStockCard":
        productsService.getCurrenciesListHandler().then((res) => {
          dispatch(productsActions.refreshCurrenciesList(res));
          handleCardAction("addStockCard", true);
        });
        break;
      case "openDisposeStockCard":
        handleCardAction("disposeStockCard", true);
        break;
      case "openVariantHistoryCard":
        handleCardAction("variantHistoryCard", true);
        break;
      case "openManageTraitsCard":
        handleCardAction("manageTraitsCard", true);
        break;
      case "openVariantPhotosCard":
        dispatch(actions.setIsProductPhotoGridLoading(true));
        productsService
          .getProductPhotosHandler(Number(productId))
          .then((res) => {
            dispatch(actions.setIsProductPhotoGridLoading(false));
            dispatch(productsActions.refreshProductPhotos(res));
            handleCardAction("variantPhotosCard", true);
          });
        break;
      case "closeProductTraitConfigurationCard":
        handleCardAction("productTraitConfigurationCard");
        break;
      case "closeAddVariantCard":
        handleCardAction("addVariantCard");
        break;
      case "closeVariantPhotosCard":
        handleCardAction("variantPhotosCard");
        break;
      case "closeVariantConfigurationCard":
        dispatch(
          productsActions.refreshProductVariants(
            clearSelectedGridItems(productsState.productVariants),
          ),
        );
        handleCardAction("variantConfigurationCard");
        break;
    }
  }

  return (
    <div className={cs.manageVariantsPage}>
      <div className={cs.borderlessCards}>
        <ItemsCard
          isLoading={productsState.isProductsLoading}
          title="Products"
          data={productsState.products}
          selectedItem={productId}
          skeletonQuantity={productsState.products?.length}
          onAction={(item) => onAction("onProductItemClick", item)}
        />
        <ProductMenuCard
          title="Manage Product"
          productCounter={productsState.productCounter}
          onAction={handleCardAction}
          productId={Number(productId)}
          activeCards={state.activeCards}
        />
      </div>
      <ManageVariantsCard
        isLoading={productsState.isProductVariantsLoading}
        variants={productsState.productVariants}
        traits={state.listOfTraitsWithOptionsForProduct}
        productCounter={productsState.productCounter}
        onAction={onAction}
      />
      {state.activeCards.includes("variantConfigurationCard") && (
        <div
          ref={(el) => {
            cardRefs.current["variantConfigurationCard"] = el;
          }}
        >
          <VariantConfigurationCard
            isVariantOptionsGridLoading={state.isVariantOptionsGridLoading}
            isVariantPhotoGridLoading={state.isVariantPhotoGridLoading}
            variant={state.selectedVariant}
            data={state.variantTraitsGridModel}
            taxesList={productsState.taxesList}
            productCounter={productsState.productCounter}
            onAction={onAction}
            onGenerateProductCode={service.generateProductCodeHandler}
            onSecondaryButtonClick={() =>
              onAction("closeVariantConfigurationCard")
            }
          />
        </div>
      )}
      {state.activeCards.includes("addStockCard") && (
        <div
          ref={(el) => {
            cardRefs.current["addStockCard"] = el;
          }}
        >
          <AddStockCard
            onAction={onAction}
            taxTypes={productsState.taxesList}
            currencyTypes={productsState.currenciesList}
            variant={state.selectedVariant}
            onSecondaryButtonClick={() => handleCardAction("addStockCard")}
          />
        </div>
      )}
      {state.activeCards.includes("disposeStockCard") && (
        <div
          ref={(el) => {
            cardRefs.current["disposeStockCard"] = el;
          }}
        >
          <DisposeStockCard
            variant={state.selectedVariant}
            onAction={onAction}
            onSecondaryButtonClick={() => handleCardAction("disposeStockCard")}
          />
        </div>
      )}
      {state.activeCards.includes("variantHistoryCard") && (
        <div
          ref={(el) => {
            cardRefs.current["variantHistoryCard"] = el;
          }}
        >
          <StockHistoryCard
            variant={state.selectedVariant}
            getVariantHistory={service.getVariantStockHistoryHandler}
            onSecondaryButtonClick={() =>
              handleCardAction("variantHistoryCard")
            }
          />
        </div>
      )}
      {state.activeCards.includes("addVariantCard") && (
        <div
          ref={(el) => {
            cardRefs.current["addVariantCard"] = el;
          }}
        >
          <AddVariantCard
            onAction={onAction}
            traits={state.listOfTraitsWithOptionsForProduct}
          />
        </div>
      )}
      {state.activeCards.includes("manageTraitsCard") && (
        <div
          ref={(el) => {
            cardRefs.current["manageTraitsCard"] = el;
          }}
        >
          <ManageTraitsCard
            traits={state.listOfTraitsWithOptionsForProduct}
            variant={state.selectedVariant}
            onAction={onAction}
            onSecondaryButtonClick={() => handleCardAction("manageTraitsCard")}
          />
        </div>
      )}
      {state.activeCards.includes("chooseVariantTraitsCard") && (
        <div
          ref={(el) => {
            cardRefs.current["chooseVariantTraitsCard"] = el;
          }}
        >
          <ChooseVariantTraitsCard
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
        <div
          ref={(el) => {
            cardRefs.current["productTraitConfigurationCard"] = el;
          }}
        >
          <ProductTraitConfigurationCard
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
        <div
          ref={(el) => {
            cardRefs.current["variantPhotosCard"] = el;
          }}
        >
          <VariantPhotosCard
            isVariantPhotoGridLoading={state.isVariantPhotoGridLoading}
            isProductPhotoGridLoading={state.isProductPhotoGridLoading}
            variantPhotos={state.variantPhotos}
            productPhotos={productsState.productPhotos}
            contextId={state.selectedVariant?.variantId}
            productCounter={productsState.productCounter}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
}
