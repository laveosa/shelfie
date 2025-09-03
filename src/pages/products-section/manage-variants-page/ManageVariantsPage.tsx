import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import {
  addGridRowColor,
  clearSelectedGridItems,
  formatDate,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";
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
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import { GridRowsColorsEnum } from "@/const/enums/GridRowsColorsEnum.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";

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
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) =>
      state[StoreSliceEnum.MANAGE_VARIANTS].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const { openConfirmationDialog } = useDialogService();
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
    if (productsState.products === null) {
      dispatch(productsActions.setIsItemsCardLoading(true));
      productsService
        .getTheProductsForGridHandler(productsState.productsGridRequestModel)
        .then(() => {
          dispatch(productsActions.setIsItemsCardLoading(false));
        });
    }
    if (productsState.variants?.length === 0) {
      dispatch(productsActions.setIsItemsCardLoading(true));
      productsService
        .getVariantsForGridHandler(productsState.variantsGridRequestModel)
        .then(() => {
          dispatch(productsActions.setIsItemsCardLoading(false));
        });
    }
    if (productsState.selectedVariant) {
      productsService
        .getVariantDetailsHandler(productsState.selectedVariant.variantId)
        .then((res) => {
          dispatch(productsActions.refreshSelectedVariant(res));
          dispatch(productsActions.refreshVariantPhotos(res.photos));
        });
    }
    if (state.listOfTraitsWithOptionsForProduct.length === 0) {
      productsService
        .getListOfTraitsWithOptionsForProductHandler(productId)
        .then((res) =>
          dispatch(actions.refreshListOfTraitsWithOptionsForProduct(res)),
        );
    }
    if (productsState.taxesList.length === 0) {
      productsService.getTaxesListHandler();
    }
  }, [productId]);

  useEffect(() => {
    if (
      !productsState.productCounter ||
      productsState.product?.productId !== productId
    ) {
      dispatch(productsActions.setIsProductMenuCardLoading(true));
      productsService
        .getCountersForProductsHandler(Number(productId))
        .then(() => {
          dispatch(productsActions.setIsProductMenuCardLoading(false));
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

  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "onProductItemClick":
        handleCardAction("variantPhotosCard");
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
        if (state.activeCards.includes("variantPhotosCard")) {
          dispatch(actions.setIsProductPhotoGridLoading(true));
          productsService
            .getProductPhotosForVariantHandler(productId, payload.variantId)
            .then((res) => {
              dispatch(actions.setIsProductPhotoGridLoading(false));
              dispatch(actions.refreshProductPhotosForVariant(res));
            });
        }
        productsService
          .getVariantDetailsHandler(payload.variantId)
          .then((res) => {
            dispatch(actions.setIsVariantConfigurationCardLoading(false));
            dispatch(actions.setIsVariantOptionsGridLoading(false));
            dispatch(actions.setIsVariantPhotoGridLoading(false));
            if (res) {
              dispatch(productsActions.refreshSelectedVariant(res));
              dispatch(productsActions.refreshVariantPhotos(res?.photos));
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
        productsService
          .updateVariantDetailsHandler(
            payload.variant.variantId,
            payload.formattedData,
          )
          .then((res) => {
            if (res) {
              const modifiedRes = {
                ...res,
                traitOptions: addGridRowColor(res.traitOptions, "color", [
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
        handleCardAction("manageTraitsCard");
        dispatch(actions.setIsManageTraitsCardLoading(true));
        productsService
          .updateVariantTraitOptionsHandler(
            payload.variant.variantId,
            payload.submissionData,
          )
          .then((res) => {
            dispatch(actions.setIsManageTraitsCardLoading(false));
            if (!res.error) {
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
          headerTitle: "Delete Variant",
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
        console.log(payload);
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
          if (!res.error) {
            dispatch(
              productsActions.refreshVariantPhotos([
                ...productsState.variantPhotos,
                res.data,
              ]),
            );
            dispatch(
              productsActions.refreshSelectedVariant({
                ...productsState.selectedVariant,
                photos: [...productsState.selectedVariant.photos, res.data],
              }),
            );
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
            if (!res.error) {
              const photoToMove = state.productPhotosForVariant.find(
                (p) => p.photoId === payload.photoId,
              );

              if (photoToMove) {
                const currentVariantPhotos = productsState.variantPhotos ?? [];

                const nextVariantPhotos = currentVariantPhotos.some(
                  (p) => p.photoId === photoToMove.photoId,
                )
                  ? currentVariantPhotos
                  : [...currentVariantPhotos, photoToMove];

                dispatch(
                  productsActions.refreshVariantPhotos(nextVariantPhotos),
                );

                dispatch(
                  actions.refreshProductPhotosForVariant(
                    state.productPhotosForVariant.filter(
                      (p) => p.photoId !== payload.photoId,
                    ),
                  ),
                );
              }
              addToast({
                text: "Photo added to variant successfully",
                type: "success",
              });
            } else {
            }
          });
        break;
      case "detachPhotoFromVariant":
        const confirmedDetachPhoto = await openConfirmationDialog({
          headerTitle: "Detach photo from variant",
          text: `You are about to detach photo from variant  "${productsState.selectedVariant.variantName}".`,
          primaryButtonValue: "Detach",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmedDetachPhoto) return;

        await productsService
          .detachVariantPhotoHandler(
            productsState.selectedVariant.variantId,
            payload.photoId,
          )
          .then((res) => {
            if (!res.error) {
              const currentVariantPhotos = productsState.variantPhotos ?? [];
              const photoToMove = currentVariantPhotos.find(
                (p) => p.photoId === payload.photoId,
              );

              if (photoToMove) {
                const pool = state.productPhotosForVariant ?? [];
                const nextPool = pool.some(
                  (p) => p.photoId === photoToMove.photoId,
                )
                  ? pool
                  : [...pool, photoToMove];
                dispatch(actions.refreshProductPhotosForVariant(nextPool));

                const nextVariantPhotos = currentVariantPhotos.filter(
                  (p) => p.photoId !== payload.photoId,
                );
                dispatch(
                  productsActions.refreshVariantPhotos(nextVariantPhotos),
                );
              }

              addToast({
                text: "Photo was detached successfully",
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
      case "dndVariantPhoto":
        productsService
          .changePhotoPositionForVariantHandler(
            productsState.selectedVariant.variantId,
            payload.activeItem.photoId,
            payload.newIndex,
          )
          .then(() => {
            dispatch(actions.setIsVariantPhotoGridLoading(true));
            if (payload.newIndex === 0 || payload.oldIndex === 0) {
              productsService
                .getVariantsForGridHandler(productsState.gridRequestModel)
                .then((res) =>
                  dispatch(productsActions.refreshVariants(res.items)),
                );
            }
            productsService
              .getVariantDetailsHandler(productsState.selectedVariant.variantId)
              .then((res) => {
                dispatch(actions.setIsVariantPhotoGridLoading(false));
                dispatch(productsActions.refreshSelectedVariant(res));
                dispatch(productsActions.refreshVariantPhotos(res?.photos));
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
              dispatch(actions.resetActiveCards());
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
          headerTitle: "Deleting trait",
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
              dispatch(
                actions.refreshColorOptionsGridModel({
                  items: [...state.colorOptionsGridModel.items, res],
                }),
              );
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
          headerTitle: "Deleting option",
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
