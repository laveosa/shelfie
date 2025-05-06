import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { useToast } from "@/hooks/useToast.ts";
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
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import { GridModel } from "@/const/models/GridModel.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { setSelectedGridItem } from "@/utils/helpers/quick-helper.ts";

export function ManageVariantsPage() {
  const dispatch = useAppDispatch();
  const service = useManageVariantsPageService();
  const state = useAppSelector<IManageVariantsPageSlice>(
    StoreSliceEnum.MANAGE_VARIANTS,
  );
  const { addToast } = useToast();
  const { productId } = useParams();
  const navigate = useNavigate();
  const cardRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    service
      .getTheProductsForGridHandler(state.gridRequestModel)
      .then((res: GridModel) => {
        dispatch(actions.refreshProducts(res.items));
      });
    service
      .getListOfTraitsWithOptionsForProductHandler(productId)
      .then((res) => {
        dispatch(actions.refreshListOfTraitsWithOptionsForProduct(res));
      });
    service
      .getTaxesListHandler()
      .then((res) => dispatch(actions.refreshTaxesList(res)));
  }, [productId]);

  useEffect(() => {
    service.getCountersForProductsHandler(productId).then((res) => {
      dispatch(actions.refreshProductCounter(res));
    });
    service.getProductVariantsHandler(productId).then((res) => {
      dispatch(actions.refreshProductVariants(res));
    });
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

  function handleCardAction(identifier: string, forceOpen: boolean = false) {
    let updatedCards: string[];

    if (forceOpen) {
      if (!state.activeCards.includes(identifier)) {
        updatedCards = [...state.activeCards, identifier];
        dispatch(actions.refreshActiveCards(updatedCards));
        scrollToCard(identifier);
      } else {
        updatedCards = state.activeCards;
        dispatch(actions.refreshActiveCards(updatedCards));
      }
    } else {
      updatedCards = state.activeCards.filter((card) => card !== identifier);
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
        navigate(
          `${NavUrlEnum.PRODUCTS}${NavUrlEnum.PRODUCT_VARIANTS}/${payload.productId}`,
        );
        break;
      case "addVariant":
        service.createVariantHandler(productId, payload).then((res) => {
          handleCardAction("addVariantCard");
          dispatch(actions.refreshVariants(res));
        });
        break;
      case "manageVariant":
        handleCardAction("variantConfigurationCard", true);
        dispatch(
          actions.refreshProductVariants(
            setSelectedGridItem(payload.variantId, state.productVariants),
          ),
        );
        service.getVariantDetailsHandler(payload.variantId).then((res) => {
          dispatch(actions.refreshSelectedVariant(res));
          dispatch(actions.refreshVariantPhotos(res?.photos));
        });
        break;
      case "updateVariantDetails":
        service
          .updateVariantDetailsHandler(
            payload.variant.variantId,
            payload.formattedData,
          )
          .then((res) => {
            service.getVariantDetailsHandler(res.variantId).then((res) => {
              dispatch(actions.refreshSelectedVariant(res));
            });
          });
        break;
      case "updateVariantTraitOptions":
        service
          .updateVariantTraitOptionsHandler(
            payload.variant.variantId,
            payload.submissionData,
          )
          .then(() => {
            service.getProductVariantsHandler(productId).then((res) => {
              dispatch(actions.refreshProductVariants(res));
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
          service.getProductVariantsHandler(productId).then((res) => {
            dispatch(actions.refreshProductVariants(res));
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
            service.getVariantDetailsHandler(payload.contextId).then((res) => {
              dispatch(actions.refreshSelectedVariant(res));
              dispatch(actions.refreshVariantPhotos(res?.photos));
            });
            service.getProductPhotosHandler(Number(productId)).then((res) => {
              dispatch(actions.refreshProductPhotos(res));
            });
            service.getCountersForProductsHandler(productId).then((res) => {
              dispatch(actions.refreshProductCounter(res));
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
            service
              .getVariantDetailsHandler(state.selectedVariant.variantId)
              .then((res) => {
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
              service
                .getVariantDetailsHandler(state.selectedVariant.variantId)
                .then((res) => {
                  dispatch(actions.refreshVariantPhotos(res?.photos));
                });
            }
          });
        break;
      case "dndVariantPhoto":
        service
          .changePhotoPositionForVariantHandler(
            state.selectedVariant.variantId,
            payload.activeItem.photoId,
            payload.newIndex,
          )
          .then(() => {
            service
              .getVariantDetailsHandler(state.selectedVariant.variantId)
              .then((res) => {
                dispatch(actions.refreshSelectedVariant(res));
                dispatch(actions.refreshVariantPhotos(res?.photos));
              });
          });
        break;
      case "addTrait":
        service.getListOfTypesOfTraitsHandler().then((res) => {
          dispatch(actions.refreshTypesOfTraits(res));
          handleCardAction("productTraitConfigurationCard", true);
          dispatch(actions.refreshSelectedTrait({}));
        });
        break;
      case "manageTrait":
        Promise.all([
          service.getTraitHandler(payload),
          service.getOptionsForTraitHandler(payload),
          service.getListOfTypesOfTraitsHandler(),
        ]).then(([trait, options, types]) => {
          dispatch(actions.refreshSelectedTrait(trait));
          dispatch(
            actions.refreshColorOptionsGridModel({
              ...state.colorOptionsGridModel,
              items: options.filter((option) => !option.isDeleted),
            }),
          );
          dispatch(actions.refreshTypesOfTraits(types));
          handleCardAction("productTraitConfigurationCard", true);
        });
        break;
      case "createTrait":
        service.createNewTraitHandler(payload).then((res) => {
          if (res) {
            dispatch(actions.refreshSelectedTrait(res));
            const index = 0;
            const optionData = {
              optionName: `Default option ${index + 1}`,
              ...(res.traitTypeId !== 1 && { optionColor: "#fff" }),
            };
            service
              .createNewOptionForTraitHandler(res.traitId, optionData)
              .then((optionRes) => {
                if (optionRes) {
                  dispatch(
                    actions.refreshColorOptionsGridModel({
                      ...state.colorOptionsGridModel,
                      items: [
                        ...(state.colorOptionsGridModel.items || []),
                        optionRes,
                      ],
                    }),
                  );
                }
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
          service
            .getListOfTraitsWithOptionsForProductHandler(productId)
            .then((res) => {
              dispatch(actions.refreshListOfTraitsWithOptionsForProduct(res));
            });
        });
        break;
      case "updateOption":
        service
          .updateOptionsForTraitHandler(payload.optionId, payload.updatedModel)
          .then((res) => {
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
        service
          .createNewOptionForTraitHandler(state.selectedTrait.traitId, {
            optionColor: "#fff",
            optionName: "Default option",
          })
          .then((res) => {
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
        service.deleteOptionsForTraitHandler(payload.optionId).then(() => {
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
        handleCardAction("addVariantCard", true);
        break;
      case "openChooseVariantTraitsCard":
        service.getListOfAllTraitsHandler().then((res) => {
          dispatch(actions.refreshTraits(res));
        });
        handleCardAction("chooseVariantTraitsCard", true);
        break;
      case "openAddStockCard":
        service.getCurrenciesListHandler().then((res) => {
          dispatch(actions.refreshCurrenciesList(res));
        });
        handleCardAction("addStockCard", true);
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
        service.getProductPhotosHandler(Number(productId)).then((res) => {
          dispatch(actions.refreshProductPhotos(res));
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
    }
  }

  return (
    <div className={cs.manageVariantsPage}>
      <div className={cs.borderlessCards}>
        <ItemsCard
          title="Products"
          data={state.products}
          selectedItem={productId}
          onAction={(item) => onAction("onProductItemClick", item)}
        />
        <ProductMenuCard
          title="Manage Product"
          productCounter={state.productCounter}
          onAction={handleCardAction}
          productId={Number(productId)}
          activeCards={state.activeCards}
        />
      </div>
      <ManageVariantsCard
        variants={state.productVariants}
        traits={state.listOfTraitsWithOptionsForProduct}
        onAction={onAction}
      />
      {state.activeCards.includes("variantConfigurationCard") && (
        <div
          ref={(el) => {
            cardRefs.current["variantConfigurationCard"] = el;
          }}
        >
          <VariantConfigurationCard
            variant={state.selectedVariant}
            data={state.variantTraitsGridModel}
            taxesList={state.taxesList}
            onAction={onAction}
            onGenerateProductCode={service.generateProductCodeHandler}
            onSecondaryButtonClick={() =>
              handleCardAction("variantConfigurationCard")
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
            taxTypes={state.taxesList}
            currencyTypes={state.currenciesList}
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
            variantPhotos={state.variantPhotos}
            productPhotos={state.productPhotos}
            contextId={state.selectedVariant?.variantId}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
}
