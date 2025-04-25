import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { useToast } from "@/hooks/useToast.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
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

export function ManageVariantsPage() {
  const dispatch = useAppDispatch();
  const service = useManageVariantsPageService();
  const state = useAppSelector<IManageVariantsPageSlice>(
    StoreSliceEnum.MANAGE_VARIANTS,
  );
  const { addToast } = useToast();
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    service
      .getTheProductsForGridHandler(state.gridRequestModel)
      .then((res: GridModel) => {
        dispatch(actions.refreshProducts(res.items));
      });

    service.getListOfTypesOfTraitsHandler().then((res) => {
      dispatch(actions.refreshTypesOfTraits(res));
    });

    service
      .getCountersForProductsHandler(productId)
      .then((res: ProductCounterModel) => {
        dispatch(actions.refreshProductCounter(res));
      });
    service
      .getListOfTraitsWithOptionsForProductHandler(productId)
      .then((res) => {
        dispatch(actions.refreshListOfTraitsWithOptionsForProduct(res));
      });
    service.getProductPhotosHandler(Number(productId)).then((res) => {
      dispatch(actions.refreshProductPhotos(res));
    });
    service.getTaxesListHandler().then((res) => {
      dispatch(actions.refreshTaxesList(res));
    });
    service.getCurrenciesListHandler().then((res) => {
      dispatch(actions.refreshCurrenciesList(res));
    });
  }, [productId]);

  useEffect(() => {
    service.getListOfAllTraitsHandler().then((res) => {
      dispatch(actions.refreshTraits(res));
    });
  }, [state.selectedTrait]);

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

  function handleCardAction(identifier: string, forceOpen: boolean = false) {
    let updatedCards: string[];

    if (forceOpen) {
      updatedCards = state.activeCards.includes(identifier)
        ? state.activeCards
        : [...state.activeCards, identifier];
    } else {
      updatedCards = state.activeCards.filter((card) => card !== identifier);
    }

    dispatch(actions.refreshActiveCards(updatedCards));
  }

  function handleMultipleCardActions(
    cardIdentifiers: string[],
    forceOpen = false,
  ) {
    let updatedCards = [...state.activeCards];

    if (forceOpen) {
      for (const card of cardIdentifiers) {
        if (!updatedCards.includes(card)) {
          updatedCards.push(card);
        }
      }
    } else {
      updatedCards = updatedCards.filter(
        (card) => !cardIdentifiers.includes(card),
      );
    }

    dispatch(actions.refreshActiveCards(updatedCards));
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
        service.getVariantDetailsHandler(payload.variantId).then((res) => {
          dispatch(actions.refreshSelectedVariant(res));
          dispatch(actions.refreshVariantPhotos(res?.photos));
          handleCardAction("variantConfigurationCard", true);
        });
        break;
      case "updateVariantDetails":
        console.log("VARIANT", payload);
        service
          .updateVariantDetailsHandler(
            payload.variant.variantId,
            payload.formattedData,
          )
          .then((res) => {
            console.log("SELECTED VARIANT", res);
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
        console.log("StockAmount", payload);
        service
          .increaseStockAmountForVariantHandler(
            payload.variant.variantId,
            payload.formattedData,
          )
          .then((res) => {
            console.log("SELECTED VARIANT", res);
          });
        break;
      case "disposeFromStock":
        console.log("DisposeFromStock", payload);
        service
          .disposeVariantFromStockHandler(
            payload.variant.variantId,
            payload.formattedData,
          )
          .then((res) => {
            console.log("SELECTED VARIANT", res);
          });
        break;
      case "changeVariantPosition":
        console.log("DisposeFromStock", payload);
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
          .then((res) => {
            console.log("Attached PHOTO", res);
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
            payload.variant.variantId,
            payload.row.original.photoId.toString(),
          )
          .then((res) => {
            if (res) {
              service
                .getVariantDetailsHandler(payload.variant.variantId)
                .then((res) => {
                  dispatch(actions.refreshSelectedVariant(res));
                });
            }
          });
        break;
      case "dndVariantPhoto":
        console.log("DnD action:", payload);
        service
          .changePhotoPositionForVariantHandler(
            state.selectedVariant.variantId,
            payload.activeItem.photoId,
            payload.newIndex,
          )
          .then((res) => {
            console.log("RES", res);
            service
              .getVariantDetailsHandler(state.selectedVariant.variantId)
              .then((res) => {
                dispatch(actions.refreshSelectedVariant(res));
                dispatch(actions.refreshVariantPhotos(res?.photos));
              });
          });
        break;
      case "addTrait":
        handleCardAction("productTraitConfigurationCard", true);
        dispatch(actions.refreshSelectedTrait({}));
        break;
      case "manageTrait":
        Promise.all([
          service.getTraitHandler(payload),
          service.getOptionsForTraitHandler(payload),
        ]).then(([trait, options]) => {
          dispatch(actions.refreshSelectedTrait(trait));
          dispatch(
            actions.refreshColorOptionsGridModel({
              ...state.colorOptionsGridModel,
              items: options.filter((option) => !option.isDeleted),
            }),
          );
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
          }
        });
        break;
      case "updateTrait":
        console.log("PAYLOAD", payload);
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
        console.log("DnD action:", payload);
        service
          .changePositionOfTraitOptionHandler(
            payload.selectedTrait.traitId,
            payload.activeItem.optionId,
            payload.newIndex,
          )
          .then((res) => {
            console.log("RES", res);
          });
        break;
      case "openAddVariantCard":
        handleCardAction("addVariantCard", true);
        break;
      case "openChooseVariantTraitsCard":
        handleCardAction("chooseVariantTraitsCard", true);
        break;
      case "openAddStockCard":
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
        handleCardAction("variantPhotosCard", true);
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
          title={productId ? "Manage Variant" : "Create Variant"}
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
      )}
      {state.activeCards.includes("addStockCard") && (
        <AddStockCard
          onAction={onAction}
          taxTypes={state.taxesList}
          currencyTypes={state.currenciesList}
          variant={state.selectedVariant}
          onSecondaryButtonClick={() => handleCardAction("addStockCard")}
        />
      )}
      {state.activeCards.includes("disposeStockCard") && (
        <DisposeStockCard
          variant={state.selectedVariant}
          onAction={onAction}
          onSecondaryButtonClick={() => handleCardAction("disposeStockCard")}
        />
      )}
      {state.activeCards.includes("variantHistoryCard") && (
        <StockHistoryCard
          variant={state.selectedVariant}
          getVariantHistory={service.getVariantStockHistoryHandler}
          onSecondaryButtonClick={() => handleCardAction("variantHistoryCard")}
        />
      )}
      {state.activeCards.includes("addVariantCard") && (
        <AddVariantCard
          onAction={onAction}
          traits={state.listOfTraitsWithOptionsForProduct}
        />
      )}
      {state.activeCards.includes("manageTraitsCard") && (
        <ManageTraitsCard
          traits={state.listOfTraitsWithOptionsForProduct}
          variant={state.selectedVariant}
          onAction={onAction}
          onSecondaryButtonClick={() => handleCardAction("manageTraitsCard")}
        />
      )}
      {state.activeCards.includes("chooseVariantTraitsCard") && (
        <ChooseVariantTraitsCard
          items={state.traits}
          selectedItems={state.listOfTraitsWithOptionsForProduct}
          onAction={onAction}
          onSecondaryButtonClick={() =>
            handleCardAction("chooseVariantTraitsCard")
          }
        />
      )}
      {state.activeCards.includes("productTraitConfigurationCard") && (
        <ProductTraitConfigurationCard
          data={state.colorOptionsGridModel}
          selectedTrait={state.selectedTrait}
          typesOfTraits={state.typesOfTraits}
          onSecondaryButtonClick={() =>
            handleCardAction("productTraitConfigurationCard")
          }
          onAction={onAction}
        />
      )}
      {state.activeCards.includes("variantPhotosCard") && (
        <VariantPhotosCard
          variantPhotos={state.variantPhotos}
          productPhotos={state.productPhotos}
          contextId={state.selectedVariant?.variantId}
          onAction={onAction}
        />
      )}
    </div>
  );
}
