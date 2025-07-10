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
  addGridRowColor,
  clearSelectedGridItems,
  formatDate,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import { GridRowsColorsEnum } from "@/const/enums/GridRowsColorsEnum.ts";

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
  const { openConfirmationDialog } = useDialogService();
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
    if (productsState.variants.length === 0) {
      dispatch(productsActions.setIsItemsCardLoading(true));
      productsService
        .getVariantsForGridHandler(productsState.variantsGridRequestModel)
        .then((res: GridModel) => {
          dispatch(productsActions.setIsItemsCardLoading(false));
          dispatch(productsActions.refreshVariants(res.items));
        });
    }
    if (state.listOfTraitsWithOptionsForProduct.length === 0) {
      productsService
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
    dispatch(productsActions.refreshActiveTab("variants"));
  }, [productId]);

  useEffect(() => {
    if (
      !productsState.productCounter ||
      productsState.product?.productId !== productId
    ) {
      dispatch(productsActions.setIsProductMenuCardLoading(true));
      productsService
        .getCountersForProductsHandler(Number(productId))
        .then((res) => {
          dispatch(productsActions.setIsProductMenuCardLoading(false));
          dispatch(productsActions.refreshProductCounter(res));
        });
    }
    if (
      productsState.productVariants.length === 0 ||
      productsState.product?.productId !== productId
    ) {
      dispatch(actions.setIsManageVariantsCardLoading(true));
      productsService.getProductVariantsHandler(productId).then((res) => {
        dispatch(actions.setIsManageVariantsCardLoading(false));
        if (productsState.selectedVariant) {
          dispatch(
            productsActions.refreshProductVariants(
              setSelectedGridItem(
                productsState.selectedVariant.variantId,
                res,
                "variantId",
              ),
            ),
          );
          handleCardAction("variantConfigurationCard", true);
        } else {
          dispatch(productsActions.refreshProductVariants(res));
        }
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

  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "onProductItemClick":
        productsService.itemCardHandler(payload);
        break;
      case "addVariant":
        dispatch(actions.setIsAddVariantCardLoading(true));
        productsService
          .checkVariantCombinationHandler(productId, payload)
          .then((res) => {
            if (res) {
              productsService
                .createVariantHandler(productId, payload)
                .then((res) => {
                  dispatch(actions.setIsAddVariantCardLoading(false));
                  if (res) {
                    handleCardAction("addVariantCard");
                    productsService
                      .getProductVariantsHandler(productId)
                      .then((res) => {
                        dispatch(productsActions.refreshProductVariants(res));
                      });
                    addToast({
                      text: "Variant added successfully",
                      type: "success",
                    });
                  } else {
                    addToast({
                      text: "Variant not added",
                      description: res.error.message,
                      type: "error",
                    });
                  }
                });
            } else {
              dispatch(actions.setIsAddVariantCardLoading(false));
              dispatch(actions.refreshIsDuplicateVariant(true));
            }
          });
        break;
      case "addDuplicatedVariant":
        dispatch(actions.setIsAddVariantCardLoading(true));
        productsService.createVariantHandler(productId, payload).then((res) => {
          dispatch(actions.setIsAddVariantCardLoading(false));
          if (res) {
            handleCardAction("addVariantCard");
            productsService.getProductVariantsHandler(productId).then((res) => {
              dispatch(productsActions.refreshProductVariants(res));
            });
            addToast({
              text: "Variant added successfully",
              type: "success",
            });
          } else {
            addToast({
              text: "Variant not added",
              description: res.error.message,
              type: "error",
            });
          }
        });
        dispatch(actions.refreshIsDuplicateVariant(false));
        break;
      case "manageVariant":
        handleCardAction("variantConfigurationCard", true);
        dispatch(
          productsActions.refreshProductVariants(
            setSelectedGridItem(
              payload.variantId,
              productsState.productVariants,
              "variantId",
            ),
          ),
        );
        dispatch(actions.setIsVariantConfigurationCardLoading(true));
        dispatch(actions.setIsVariantOptionsGridLoading(true));
        dispatch(actions.setIsVariantPhotoGridLoading(true));
        productsService
          .getVariantDetailsHandler(payload.variantId)
          .then((res) => {
            dispatch(actions.setIsVariantConfigurationCardLoading(false));
            dispatch(actions.setIsVariantOptionsGridLoading(false));
            dispatch(actions.setIsVariantPhotoGridLoading(false));
            if (res) {
              dispatch(productsActions.refreshSelectedVariant(res));
              dispatch(actions.refreshVariantPhotos(res?.photos));
              dispatch(actions.setIsProductPhotoGridLoading(true));
            } else {
              addToast({
                text: "Variant not found",
                type: "error",
              });
              handleCardAction("variantConfigurationCard");
            }
          });
        break;
      case "updateVariantDetails":
        dispatch(actions.setIsVariantConfigurationCardLoading(true));
        productsService
          .updateVariantDetailsHandler(
            payload.variant.variantId,
            payload.formattedData,
          )
          .then((res) => {
            dispatch(actions.setIsVariantConfigurationCardLoading(false));
            if (res) {
              const modifiedRes = {
                ...res.data,
                traitOptions: addGridRowColor(res.data.traitOptions, "color", [
                  {
                    field: "isRemoved",
                    value: true,
                    color: GridRowsColorsEnum.ERROR,
                  },
                  {
                    field: "isMissing",
                    value: true,
                    color: GridRowsColorsEnum.ERROR,
                  },
                ]),
              };
              dispatch(productsActions.refreshSelectedVariant(modifiedRes));
              addToast({
                text: "Variant updated successfully",
                type: "success",
              });
            } else {
              addToast({
                text: "Variant not updated",
                description: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "updateVariantTraitOptions":
        dispatch(actions.setIsManageTraitsCardLoading(true));
        productsService
          .updateVariantTraitOptionsHandler(
            payload.variant.variantId,
            payload.submissionData,
          )
          .then((res) => {
            dispatch(actions.setIsManageTraitsCardLoading(false));
            if (res) {
              productsService
                .getProductVariantsHandler(productId)
                .then((res) => {
                  dispatch(productsActions.refreshProductVariants(res));
                });
              productsService
                .getVariantDetailsHandler(payload.variant.variantId)
                .then((res) => {
                  dispatch(productsActions.refreshSelectedVariant(res));
                });
              addToast({
                text: "Variant trait options updated successfully",
                type: "success",
              });
            } else {
              addToast({
                text: "Variant trait options not updated",
                description: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "activateVariant":
        service.toggleVariantIsActiveHandler(payload.variantId).then((res) => {
          if (res) {
            productsService.getProductVariantsHandler(productId).then((res) => {
              dispatch(productsActions.refreshProductVariants(res));
            });
            addToast({
              text: "Variant activated successfully",
              type: "success",
            });
          } else {
            addToast({
              text: "Variant not activated",
              description: res.error.message,
              type: "error",
            });
          }
        });
        break;
      case "deleteVariant":
        const confirmedDeleteVariant = await openConfirmationDialog({
          title: "Delete Variant",
          text: `You are about to delete variant "${payload.variantName}".`,
          primaryButtonValue: "Delete",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmedDeleteVariant) {
          return;
        } else {
          await productsService
            .deleteVariantHandler(payload.variantId)
            .then((res) => {
              if (!res.error) {
                handleCardAction("variantConfigurationCard");
                addToast({
                  text: "Variant deleted successfully",
                  type: "success",
                });
              } else {
                addToast({
                  text: res.error.data.detail,
                  type: "error",
                });
              }
            });
        }
        break;
      case "increaseStockAmount":
        dispatch(actions.setIsAddStockCardLoading(true));
        productsService
          .increaseStockAmountForVariantHandler(
            payload.variant.variantId,
            payload.formattedData,
          )
          .then((res) => {
            dispatch(actions.setIsAddStockCardLoading(false));
            if (res) {
              addToast({
                text: "Stock increased successfully",
                type: "success",
              });
            } else {
              addToast({
                text: "Stock not increased",
                description: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "disposeFromStock":
        dispatch(actions.setIsDisposeStockCardLoading(true));
        productsService
          .disposeVariantFromStockHandler(
            payload.variant.variantId,
            payload.formattedData,
          )
          .then((res) => {
            dispatch(actions.setIsDisposeStockCardLoading(false));
            if (res) {
              addToast({
                text: "Variant disposed successfully",
                type: "success",
              });
            } else {
              addToast({
                text: "Variant not disposed",
                description: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "changeVariantPosition":
        service.changeVariantPositionHandler(
          productId,
          payload.activeItem.variantId,
          payload.newIndex,
        );
        break;
      case "uploadPhotoToVariant":
        dispatch(actions.setIsVariantPhotosCardLoading(true));
        productsService.uploadPhotoHandler(payload).then((res) => {
          dispatch(actions.setIsVariantPhotosCardLoading(false));
          if (res) {
            dispatch(actions.setIsVariantPhotoGridLoading(true));
            dispatch(actions.setIsProductPhotoGridLoading(true));
            productsService
              .getVariantDetailsHandler(payload.contextId)
              .then((res) => {
                dispatch(actions.setIsVariantPhotoGridLoading(false));
                dispatch(productsActions.refreshSelectedVariant(res));
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
            addToast({
              text: "Photo uploaded successfully",
              type: "success",
            });
          } else {
            addToast({
              text: "Photo not uploaded",
              description: res.error.message,
              type: "error",
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
        productsService
          .attachProductPhotoToVariantHandler(
            productsState.selectedVariant.variantId,
            payload.photoId,
          )
          .then((res) => {
            dispatch(actions.setIsVariantPhotosCardLoading(false));
            if (res) {
              dispatch(actions.setIsVariantPhotoGridLoading(true));
              productsService
                .getVariantDetailsHandler(
                  productsState.selectedVariant.variantId,
                )
                .then((res) => {
                  dispatch(actions.setIsVariantPhotoGridLoading(false));
                  dispatch(actions.refreshVariantPhotos(res?.photos));
                  dispatch(productsActions.refreshSelectedVariant(res));
                });
              addToast({
                text: "Photo added to variant successfully",
                type: "success",
              });
            } else {
              addToast({
                text: "Photo not added to variant",
                description: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "detachPhotoFromVariant":
        const confirmedDetachPhoto = await openConfirmationDialog({
          title: "Detach photo from variant",
          text: `You are about to detach photo from variant  "${productsState.selectedVariant.variantName}".`,
          primaryButtonValue: "Detach",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmedDetachPhoto) return;

        try {
          await productsService.detachVariantPhotoHandler(
            productsState.selectedVariant.variantId,
            payload.photoId.toString(),
          );

          dispatch(actions.setIsVariantPhotoGridLoading(true));

          const variantDetails = await productsService.getVariantDetailsHandler(
            productsState.selectedVariant.variantId,
          );

          dispatch(actions.refreshVariantPhotos(variantDetails?.photos));

          addToast({
            text: "Photo was detached successfully",
            type: "success",
          });
        } catch (error: any) {
          addToast({
            text: error.message || "Failed to detach photo",
            type: "error",
          });
        } finally {
          dispatch(actions.setIsVariantPhotoGridLoading(false));
        }
        break;
      case "dndVariantPhoto":
        productsService
          .changePhotoPositionForVariantHandler(
            productsState.selectedVariant.variantId,
            payload.activeItem.photoId,
            payload.newIndex,
          )
          .then(() => {
            dispatch(actions.setIsVariantPhotoGridLoading(true));
            productsService
              .getVariantDetailsHandler(productsState.selectedVariant.variantId)
              .then((res) => {
                dispatch(actions.setIsVariantPhotoGridLoading(false));
                dispatch(productsActions.refreshSelectedVariant(res));
                dispatch(actions.refreshVariantPhotos(res?.photos));
              });
          });
        break;
      case "addTrait":
        dispatch(actions.setIsProductTraitConfigurationCardLoading(true));
        dispatch(actions.resetSelectedTrait());
        productsService.getListOfTypesOfTraitsHandler().then((res) => {
          dispatch(actions.setIsProductTraitConfigurationCardLoading(false));
          dispatch(actions.refreshTypesOfTraits(res));
          handleCardAction("productTraitConfigurationCard", true);
          dispatch(actions.refreshSelectedTrait({}));
        });
        break;
      case "manageTrait":
        handleCardAction("productTraitConfigurationCard", true);
        dispatch(actions.setIsProductTraitConfigurationCardLoading(true));
        dispatch(actions.setIsTraitOptionsGridLoading(true));
        Promise.all([
          productsService.getTraitHandler(payload),
          productsService.getOptionsForTraitHandler(payload),
          productsService.getListOfTypesOfTraitsHandler(),
        ]).then(([trait, options, types]) => {
          dispatch(actions.setIsProductTraitConfigurationCardLoading(false));
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
        dispatch(actions.setIsProductTraitConfigurationCardLoading(true));
        productsService.createNewTraitHandler(payload).then((res) => {
          dispatch(actions.setIsProductTraitConfigurationCardLoading(false));
          if (res) {
            dispatch(actions.refreshSelectedTrait(res));
            productsService
              .getOptionsForTraitHandler(res.traitId)
              .then((res) => {
                dispatch(
                  actions.refreshColorOptionsGridModel({
                    ...state.colorOptionsGridModel,
                    items: res.filter((option) => !option.isDeleted),
                  }),
                );
              });
            productsService.getListOfAllTraitsHandler().then((res) => {
              dispatch(actions.refreshTraits(res));
            });
            addToast({
              text: "Trait created successfully",
              type: "success",
            });
          } else {
            addToast({
              text: "Trait not created",
              description: res.error.message,
              type: "error",
            });
          }
        });
        break;
      case "updateTrait":
        dispatch(actions.setIsProductTraitConfigurationCardLoading(true));
        productsService
          .updateTraitHandler(state.selectedTrait.traitId, payload)
          .then((res) => {
            dispatch(actions.setIsProductTraitConfigurationCardLoading(false));
            if (res) {
              productsService.getListOfAllTraitsHandler().then((res) => {
                dispatch(actions.refreshTraits(res));
              });
              addToast({
                text: "Trait updated successfully",
                type: "success",
              });
            } else {
              addToast({
                text: "Trait not updated",
                description: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "setProductTraits":
        dispatch(actions.refreshSelectedTraitsIds(payload));
        dispatch(actions.setIsChooseVariantTraitsCardLoading(true));
        productsService
          .setProductTraitsHandler(productId, payload)
          .then((res) => {
            dispatch(actions.setIsChooseVariantTraitsCardLoading(false));
            if (res) {
              handleMultipleCardActions([
                "chooseVariantTraitsCard",
                "productTraitConfigurationCard",
              ]);
              productsService
                .getListOfTraitsWithOptionsForProductHandler(productId)
                .then((res) => {
                  dispatch(
                    actions.refreshListOfTraitsWithOptionsForProduct(res),
                  );
                });
              dispatch(actions.setIsManageVariantsCardLoading(true));
              productsService
                .getProductVariantsHandler(productId)
                .then((res) => {
                  dispatch(actions.setIsManageVariantsCardLoading(false));
                  dispatch(productsActions.refreshProductVariants(res));
                });
              addToast({
                text: "Traits set successfully",
                type: "success",
              });
            } else {
              addToast({
                text: "Traits not set",
                description: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "deleteTrait":
        const confirmedTraitDeleting = await openConfirmationDialog({
          title: "Deleting trait",
          text: `You are about to remove the trait ${payload.traitName}. All products connected to it will loose the configuration and will require your attention to map it to the new trait.`,
          primaryButtonValue: "Delete",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmedTraitDeleting) return;

        dispatch(actions.setIsChooseVariantTraitsCardLoading(true));

        try {
          await productsService.deleteTraitHandler(payload.traitId);

          const [traitsWithOptions, allTraits] = await Promise.all([
            productsService.getListOfTraitsWithOptionsForProductHandler(
              productId,
            ),
            productsService.getListOfAllTraitsHandler(),
          ]);

          dispatch(
            actions.refreshListOfTraitsWithOptionsForProduct(traitsWithOptions),
          );
          dispatch(actions.refreshTraits(allTraits));

          addToast({
            text: "Trait deleted successfully",
            type: "success",
          });
        } catch (error: any) {
          addToast({
            text: error.message || "Failed to delete trait",
            type: "error",
          });
        } finally {
          dispatch(actions.setIsChooseVariantTraitsCardLoading(false));
          handleCardAction("productTraitConfigurationCard");
        }
        break;
      case "updateOption":
        dispatch(actions.setIsTraitOptionsGridLoading(true));
        productsService
          .updateOptionsForTraitHandler(payload.optionId, payload.updatedModel)
          .then((res) => {
            dispatch(actions.setIsTraitOptionsGridLoading(false));
            if (res) {
              productsService
                .getOptionsForTraitHandler(state.selectedTrait.traitId)
                .then((options) => {
                  dispatch(
                    actions.refreshColorOptionsGridModel({
                      ...state.colorOptionsGridModel,
                      items: options.filter((option) => !option.isDeleted),
                    }),
                  );
                });
              addToast({
                text: "Option updated successfully",
                type: "success",
              });
            } else {
              addToast({
                text: "Option not updated",
                description: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "addOption":
        dispatch(actions.setIsTraitOptionsGridLoading(true));
        productsService
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
              productsService.getListOfAllTraitsHandler().then((res) => {
                dispatch(actions.refreshTraits(res));
              });
              addToast({
                text: "Option created successfully",
                type: "success",
              });
            } else {
              addToast({
                text: "Option not created",
                description: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "deleteOption":
        const confirmedOptionDeleting = await openConfirmationDialog({
          title: "Deleting option",
          text: `You are about to remove the option ${payload.optionName}.`,
          primaryButtonValue: "Delete",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmedOptionDeleting) return;

        dispatch(actions.setIsTraitOptionsGridLoading(true));

        try {
          await productsService.deleteOptionsForTraitHandler(payload.optionId);

          const [options, allTraits] = await Promise.all([
            productsService.getOptionsForTraitHandler(
              state.selectedTrait.traitId,
            ),
            productsService.getListOfAllTraitsHandler(),
          ]);

          dispatch(
            actions.refreshColorOptionsGridModel({
              ...state.colorOptionsGridModel,
              items: options.filter((option) => !option.isDeleted),
            }),
          );
          dispatch(actions.refreshTraits(allTraits));

          addToast({
            text: "Option deleted successfully",
            type: "success",
          });
        } catch (error: any) {
          addToast({
            text: error.message || "Failed to delete option",
            type: "error",
          });
        } finally {
          dispatch(actions.setIsTraitOptionsGridLoading(false));
        }

        break;
      case "dndTraitOption":
        productsService.changePositionOfTraitOptionHandler(
          payload.selectedTrait.traitId,
          payload.activeItem.optionId,
          payload.newIndex,
        );
        break;
      case "openAddVariantCard":
        dispatch(actions.refreshActiveCards([]));
        handleCardAction("addVariantCard", true, []);
        dispatch(
          productsActions.refreshProductVariants(
            clearSelectedGridItems(productsState.productVariants),
          ),
        );
        break;
      case "openChooseVariantTraitsCard":
        dispatch(actions.setIsChooseVariantTraitsCardLoading(true));
        productsService.getListOfAllTraitsHandler().then((res) => {
          dispatch(actions.setIsChooseVariantTraitsCardLoading(false));
          dispatch(actions.refreshTraits(res));
        });
        handleCardAction("chooseVariantTraitsCard", true);
        break;
      case "openAddStockCard":
        handleCardAction("addStockCard", true);
        dispatch(actions.setIsAddStockCardLoading(true));
        productsService.getCurrenciesListHandler().then((res) => {
          dispatch(actions.setIsAddStockCardLoading(false));
          dispatch(productsActions.refreshCurrenciesList(res));
        });
        break;
      case "openDisposeStockCard":
        handleCardAction("disposeStockCard", true);
        break;
      case "openVariantHistoryCard":
        handleCardAction("variantHistoryCard", true);
        dispatch(actions.setIsVariantHistoryCardLoading(true));
        dispatch(actions.setIsVariantsHistoryGridLoading(true));
        productsService.getVariantStockHistoryHandler(payload).then((items) => {
          const data = items.map((item) => ({
            ...item,
            createdDate: formatDate(item.createdDate, "date"),
          }));
          dispatch(actions.setIsVariantHistoryCardLoading(false));
          dispatch(actions.setIsVariantsHistoryGridLoading(false));
          dispatch(actions.refreshVariantHistory(data));
        });
        break;
      case "openManageTraitsCard":
        handleCardAction("manageTraitsCard", true);
        break;
      case "openVariantPhotosCard":
        handleCardAction("variantPhotosCard", true);
        dispatch(actions.setIsProductPhotoGridLoading(true));
        productsService
          .getProductPhotosForVariantHandler(productId, payload)
          .then((res) => {
            dispatch(actions.setIsProductPhotoGridLoading(false));
            dispatch(actions.refreshProductPhotosForVariant(res));
          });
        break;
      case "closeProductTraitConfigurationCard":
        handleCardAction("productTraitConfigurationCard");
        break;
      case "closeAddVariantCard":
        dispatch(actions.refreshIsDuplicateVariant(false));
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
        dispatch(productsActions.resetSelectedVariant());
        handleCardAction("variantConfigurationCard");
        break;
      case "closeVariantHistoryCard":
        handleCardAction("variantHistoryCard");
        break;
    }
  }

  return (
    <div className={cs.manageVariantsPage}>
      <ItemsCard
        isLoading={productsState.isItemsCardLoading}
        isItemsLoading={productsState.isVariantsLoading}
        title="Variants"
        data={variantsForItemsCard}
        skeletonQuantity={productsState.variants?.length}
        selectedItem={productsState.selectedVariant?.variantId}
        onAction={(data) => onAction("onProductItemClick", data)}
      />
      <ProductMenuCard
        isLoading={productsState.isProductMenuCardLoading}
        title="Manage Product"
        itemsCollection="products"
        counter={productsState.productCounter}
        onAction={handleCardAction}
        productId={Number(productId)}
        activeCards={state.activeCards}
      />
      <ManageVariantsCard
        isLoading={state.isManageVariantsCardLoading}
        isVariantsLoading={productsState.isProductVariantsLoading}
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
            isLoading={state.isVariantConfigurationCardLoading}
            isVariantOptionsGridLoading={state.isVariantOptionsGridLoading}
            isVariantPhotoGridLoading={state.isVariantPhotoGridLoading}
            variant={productsState.selectedVariant}
            variantPhotos={state.variantPhotos}
            data={state.variantTraitsGridModel}
            taxesList={productsState.taxesList}
            productCounter={productsState.productCounter}
            onAction={onAction}
            onGenerateProductCode={service.generateProductCodeHandler}
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
        <div
          ref={(el) => {
            cardRefs.current["disposeStockCard"] = el;
          }}
        >
          <DisposeStockCard
            isLoading={state.isDisposeStockCardLoading}
            variant={productsState.selectedVariant}
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
            isLoading={state.isVariantHistoryCardLoading}
            isGridLoading={state.isVariantHistoryGridLoading}
            variant={productsState.selectedVariant}
            data={state.variantHistory}
            onAction={onAction}
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
            isLoading={state.isAddVariantCardLoading}
            traits={state.listOfTraitsWithOptionsForProduct}
            isDuplicateVariant={state.isDuplicateVariant}
            onAction={onAction}
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
            isLoading={state.isManageTraitsCardLoading}
            traits={state.listOfTraitsWithOptionsForProduct}
            variant={productsState.selectedVariant}
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
        <div
          ref={(el) => {
            cardRefs.current["productTraitConfigurationCard"] = el;
          }}
        >
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
        <div
          ref={(el) => {
            cardRefs.current["variantPhotosCard"] = el;
          }}
        >
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
    </div>
  );
}
