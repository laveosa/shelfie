import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { IManageVariantsPageSlice } from "@/const/interfaces/store-slices/IManageVariantsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { useToast } from "@/hooks/useToast.ts";
import { ManageVariantsPageSliceActions as actions } from "@/state/slices/ManageVariantsPageSlice.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import {
  addGridRowColor,
  clearSelectedGridItems,
  formatDate,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { GridRowsColorsEnum } from "@/const/enums/GridRowsColorsEnum.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";

export default function useManageVariantsPageService(handleCardAction) {
  const dispatch = useAppDispatch();
  const productsService = useProductsPageService();
  const state = useAppSelector<IManageVariantsPageSlice>(
    StoreSliceEnum.MANAGE_VARIANTS,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const { addToast } = useToast();
  const { openConfirmationDialog } = useDialogService();

  const [getVariantsForGrid] = ProductsApiHooks.useGetVariantsForGridMutation();
  const [toggleVariantIsActive] =
    ProductsApiHooks.useToggleVariantIsActiveMutation();
  const [changeVariantPosition] =
    ProductsApiHooks.useChangeVariantPositionMutation();
  const [generateProductCode] =
    ProductsApiHooks.useLazyGenerateProductCodeQuery();
  const [deletePhoto] = AssetsApiHooks.useDeletePhotoMutation();

  function getVariantsForGridHandler(data?: GridRequestModel) {
    return getVariantsForGrid(data).then((res: any) => {
      return res.data;
    });
  }

  function generateProductCodeHandler() {
    return generateProductCode(null).then((res: any) => {
      return res.data;
    });
  }

  function toggleVariantIsActiveHandler(id) {
    return toggleVariantIsActive(id).then((res: any) => {
      return res.data;
    });
  }

  function changeVariantPositionHandler(productId, variantId, index) {
    return changeVariantPosition({
      productId,
      variantId,
      index,
    }).then((res: any) => {
      return res.data;
    });
  }

  function deletePhotoHandler(photoId) {
    return deletePhoto(photoId).then((res: any) => {
      return res.data;
    });
  }

  function getManageVariantsPageDataHandler(productId: string) {
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
  }

  function getProductVariantsHandler(productId: string) {
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
  }

  function onProductItemClickHandler(model) {
    handleCardAction("variantPhotosCard");
    productsService.itemCardHandler(model);
  }

  function addVariantHandler(model, productId: string) {
    dispatch(actions.setIsAddVariantCardLoading(true));
    productsService
      .checkVariantCombinationHandler(productId, model)
      .then((res) => {
        if (res) {
          productsService.createVariantHandler(productId, model).then((res) => {
            dispatch(actions.setIsAddVariantCardLoading(false));
            if (res) {
              handleCardAction("addVariantCard");
              dispatch(
                productsActions.refreshProductVariants([
                  ...productsState.productVariants,
                  res,
                ]),
              );
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
  }

  function addDuplicatedVariantHandler(model, productId: string) {
    dispatch(actions.setIsAddVariantCardLoading(true));
    productsService.createVariantHandler(productId, model).then((res) => {
      dispatch(actions.setIsAddVariantCardLoading(false));
      if (res) {
        handleCardAction("addVariantCard");
        dispatch(
          productsActions.refreshProductVariants([
            ...productsState.productVariants,
            res,
          ]),
        );
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
  }

  function manageVariantHandler(model: VariantModel, productId: string) {
    handleCardAction("variantConfigurationCard", true);
    dispatch(
      productsActions.refreshProductVariants(
        setSelectedGridItem(
          model.variantId,
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
        .getProductPhotosForVariantHandler(productId, model.variantId)
        .then((res) => {
          dispatch(actions.setIsProductPhotoGridLoading(false));
          dispatch(actions.refreshProductPhotosForVariant(res));
        });
    }
    productsService.getVariantDetailsHandler(model.variantId).then((res) => {
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
  }

  function updateVariantDetailsHandler(model) {
    productsService
      .updateVariantDetailsHandler(model.variant.variantId, model.formattedData)
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
  }

  function updateVariantTraitOptions(model, productId: string) {
    handleCardAction("manageTraitsCard");
    dispatch(actions.setIsManageTraitsCardLoading(true));
    productsService
      .updateVariantTraitOptionsHandler(
        model.variant.variantId,
        model.submissionData,
      )
      .then((res) => {
        dispatch(actions.setIsManageTraitsCardLoading(false));
        if (!res.error) {
          productsService.getProductVariantsHandler(productId).then((res) => {
            dispatch(productsActions.refreshProductVariants(res));
          });
          productsService
            .getVariantDetailsHandler(model.variant.variantId)
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
  }

  function activateVariantHandler(model: VariantModel) {
    toggleVariantIsActiveHandler(model.variantId).then((res) => {
      if (res) {
        dispatch(
          productsActions.refreshProductVariants(
            productsState.productVariants.map((variant) =>
              variant.variantId === model.variantId
                ? { ...variant, isActive: !model.isActive }
                : variant,
            ),
          ),
        );
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
  }

  async function deleteVariantHandler(model) {
    const confirmedDeleteVariant = await openConfirmationDialog({
      headerTitle: "Delete Variant",
      text: `You are about to delete variant "${model.variantName}".`,
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedDeleteVariant) {
      return;
    } else {
      await productsService
        .deleteVariantHandler(model.variantId)
        .then((res) => {
          if (!res.error) {
            dispatch(
              productsActions.refreshProductVariants(
                productsState.productVariants.filter(
                  (variant) => variant.variantId !== model.variantId,
                ),
              ),
            );
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
  }

  function increaseStockAmountHandler(model) {
    dispatch(actions.setIsAddStockCardLoading(true));
    productsService
      .increaseStockAmountForVariantHandler(
        model.variant.variantId,
        model.formattedData,
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
  }

  function disposeFromStockHandler(model) {
    dispatch(actions.setIsDisposeStockCardLoading(true));
    productsService
      .disposeVariantFromStockHandler(
        model.variant.variantId,
        model.formattedData,
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
  }

  function uploadPhotoToVariantHandler(model, productId: string) {
    dispatch(actions.setIsVariantPhotosCardLoading(true));
    productsService.uploadPhotoHandler(model).then((res) => {
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
  }

  function addPhotoToVariantHandler(model) {
    productsService
      .attachProductPhotoToVariantHandler(
        productsState.selectedVariant.variantId,
        model.photoId,
      )
      .then((res) => {
        dispatch(actions.setIsVariantPhotosCardLoading(false));
        if (!res.error) {
          const photoToMove = state.productPhotosForVariant.find(
            (p) => p.photoId === model.photoId,
          );

          if (photoToMove) {
            const currentVariantPhotos = productsState.variantPhotos ?? [];

            const nextVariantPhotos = currentVariantPhotos.some(
              (p) => p.photoId === photoToMove.photoId,
            )
              ? currentVariantPhotos
              : [...currentVariantPhotos, photoToMove];

            dispatch(productsActions.refreshVariantPhotos(nextVariantPhotos));

            dispatch(
              actions.refreshProductPhotosForVariant(
                state.productPhotosForVariant.filter(
                  (p) => p.photoId !== model.photoId,
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
  }

  async function detachPhotoFromVariantHandler(model) {
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
        model.photoId,
      )
      .then((res) => {
        if (!res.error) {
          const currentVariantPhotos = productsState.variantPhotos ?? [];
          const photoToMove = currentVariantPhotos.find(
            (p) => p.photoId === model.photoId,
          );

          if (photoToMove) {
            const pool = state.productPhotosForVariant ?? [];
            const nextPool = pool.some((p) => p.photoId === photoToMove.photoId)
              ? pool
              : [...pool, photoToMove];
            dispatch(actions.refreshProductPhotosForVariant(nextPool));

            const nextVariantPhotos = currentVariantPhotos.filter(
              (p) => p.photoId !== model.photoId,
            );
            dispatch(productsActions.refreshVariantPhotos(nextVariantPhotos));
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
  }

  function changePhotoPositionHandler(model) {
    productsService
      .changePhotoPositionForVariantHandler(
        productsState.selectedVariant.variantId,
        model.activeItem.photoId,
        model.newIndex,
      )
      .then(() => {
        dispatch(actions.setIsVariantPhotoGridLoading(true));
        if (model.newIndex === 0 || model.oldIndex === 0) {
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
  }

  function addTraitHandler() {
    dispatch(actions.setIsProductTraitConfigurationCardLoading(true));
    dispatch(actions.resetSelectedTrait());
    productsService.getListOfTypesOfTraitsHandler().then((res) => {
      dispatch(actions.setIsProductTraitConfigurationCardLoading(false));
      dispatch(actions.refreshTypesOfTraits(res));
      handleCardAction("productTraitConfigurationCard", true);
      dispatch(actions.refreshSelectedTrait({}));
    });
  }

  function manageTraitHandler(model) {
    handleCardAction("productTraitConfigurationCard", true);
    dispatch(actions.setIsProductTraitConfigurationCardLoading(true));
    dispatch(actions.setIsTraitOptionsGridLoading(true));
    Promise.all([
      productsService.getTraitHandler(model),
      productsService.getOptionsForTraitHandler(model),
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
  }

  function createTraitHandler(model) {
    dispatch(actions.setIsProductTraitConfigurationCardLoading(true));
    productsService.createNewTraitHandler(model).then((res) => {
      dispatch(actions.setIsProductTraitConfigurationCardLoading(false));
      if (res) {
        dispatch(actions.refreshSelectedTrait(res));
        productsService.getOptionsForTraitHandler(res.traitId).then((res) => {
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
  }

  function updateTraitHandler(model) {
    dispatch(actions.setIsProductTraitConfigurationCardLoading(true));
    productsService
      .updateTraitHandler(state.selectedTrait.traitId, model)
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
  }

  function setProductTraitsHandler(model, productId: string) {
    dispatch(actions.refreshSelectedTraitsIds(model));
    dispatch(actions.setIsChooseVariantTraitsCardLoading(true));
    productsService.setProductTraitsHandler(productId, model).then((res) => {
      dispatch(actions.setIsChooseVariantTraitsCardLoading(false));
      if (res) {
        dispatch(actions.resetActiveCards());
        productsService
          .getListOfTraitsWithOptionsForProductHandler(productId)
          .then((res) => {
            dispatch(actions.refreshListOfTraitsWithOptionsForProduct(res));
          });
        dispatch(actions.setIsManageVariantsCardLoading(true));
        productsService.getProductVariantsHandler(productId).then((res) => {
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
  }

  async function deleteTraitHandler(model, productId: string) {
    const confirmedTraitDeleting = await openConfirmationDialog({
      headerTitle: "Deleting trait",
      text: `You are about to remove the trait ${model.traitName}. All products connected to it will loose the configuration and will require your attention to map it to the new trait.`,
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedTraitDeleting) return;

    dispatch(actions.setIsChooseVariantTraitsCardLoading(true));

    try {
      await productsService.deleteTraitHandler(model.traitId);

      const [traitsWithOptions, allTraits] = await Promise.all([
        productsService.getListOfTraitsWithOptionsForProductHandler(productId),
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
  }

  function addOptionHandler() {
    dispatch(actions.setIsTraitOptionsGridLoading(true));
    productsService
      .createNewOptionForTraitHandler(state.selectedTrait.traitId, {})
      .then((res) => {
        dispatch(actions.setIsTraitOptionsGridLoading(false));
        if (res) {
          productsService.getListOfAllTraitsHandler().then((res) => {
            dispatch(actions.refreshTraits(res));
          });
          dispatch(
            actions.refreshColorOptionsGridModel({
              ...state.colorOptionsGridModel,
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
  }

  function updateOptionHandler(model) {
    productsService
      .updateOptionsForTraitHandler(model.optionId, model.updatedModel)
      .then((res) => {
        if (res) {
          dispatch(
            actions.refreshColorOptionsGridModel({
              ...state.colorOptionsGridModel,
              items: state.colorOptionsGridModel.items.map((item) =>
                item.optionId === res.optionId ? res : item,
              ),
            }),
          );
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
  }

  async function deleteOptionHandler(model: TraitOptionModel) {
    const confirmedOptionDeleting = await openConfirmationDialog({
      headerTitle: "Deleting option",
      text: `You are about to remove the option ${model.optionName}.`,
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedOptionDeleting) return;

    productsService.deleteOptionsForTraitHandler(model.optionId).then((res) => {
      if (!res.error) {
        productsService.getListOfAllTraitsHandler().then((res) => {
          dispatch(actions.refreshTraits(res));
        });

        dispatch(
          actions.refreshColorOptionsGridModel({
            ...state.colorOptionsGridModel,
            items: state.colorOptionsGridModel.items.filter(
              (option) => option.optionId !== model.optionId,
            ),
          }),
        );

        addToast({
          text: "Option deleted successfully",
          type: "success",
        });
      } else {
        addToast({
          text: res.error?.message,
          type: "error",
        });
      }
    });
  }

  function dndTraitOptionHandler(model) {
    productsService.changePositionOfTraitOptionHandler(
      model.selectedTrait.traitId,
      model.activeItem.optionId,
      model.newIndex,
    );
  }

  function openAddVariantCardHandler() {
    dispatch(actions.refreshActiveCards([]));
    handleCardAction("addVariantCard", true, []);
    dispatch(
      productsActions.refreshProductVariants(
        clearSelectedGridItems(productsState.productVariants),
      ),
    );
  }

  function openChooseVariantTraitsCardHandler() {
    dispatch(actions.setIsChooseVariantTraitsCardLoading(true));
    productsService.getListOfAllTraitsHandler().then((res) => {
      dispatch(actions.setIsChooseVariantTraitsCardLoading(false));
      dispatch(actions.refreshTraits(res));
    });
    handleCardAction("chooseVariantTraitsCard", true);
  }

  function openAddStockCardHandler() {
    handleCardAction("addStockCard", true);
    dispatch(actions.setIsAddStockCardLoading(true));
    productsService.getCurrenciesListHandler().then((res) => {
      dispatch(actions.setIsAddStockCardLoading(false));
      dispatch(productsActions.refreshCurrenciesList(res));
    });
  }

  function openDisposeStockCardHandler() {
    handleCardAction("disposeStockCard", true);
  }

  function openVariantHistoryCardHandler(model) {
    handleCardAction("variantHistoryCard", true);
    dispatch(actions.setIsVariantHistoryCardLoading(true));
    dispatch(actions.setIsVariantsHistoryGridLoading(true));
    productsService.getVariantStockHistoryHandler(model).then((items) => {
      const data = items.map((item) => ({
        ...item,
        createdDate: formatDate(item.createdDate, "date"),
      }));
      dispatch(actions.setIsVariantHistoryCardLoading(false));
      dispatch(actions.setIsVariantsHistoryGridLoading(false));
      dispatch(actions.refreshVariantHistory(data));
    });
  }

  function openManageTraitsCardHandler() {
    handleCardAction("manageTraitsCard", true);
  }

  function openVariantPhotosCardHandler(model, productId) {
    handleCardAction("variantPhotosCard", true);
    dispatch(actions.setIsProductPhotoGridLoading(true));
    productsService
      .getProductPhotosForVariantHandler(productId, model)
      .then((res) => {
        dispatch(actions.setIsProductPhotoGridLoading(false));
        dispatch(actions.refreshProductPhotosForVariant(res));
      });
  }

  function closeProductTraitConfigurationCardHandler() {
    handleCardAction("productTraitConfigurationCard");
  }

  function closeAddVariantCardHandler() {
    dispatch(actions.refreshIsDuplicateVariant(false));
    handleCardAction("addVariantCard");
  }

  function closeVariantPhotosCardHandler() {
    handleCardAction("variantPhotosCard");
  }

  function closeVariantConfigurationCardHandler() {
    dispatch(
      productsActions.refreshProductVariants(
        clearSelectedGridItems(productsState.productVariants),
      ),
    );
    dispatch(productsActions.resetSelectedVariant());
    handleCardAction("variantConfigurationCard");
  }

  function closeVariantHistoryCardHandler() {
    handleCardAction("variantHistoryCard");
  }

  return {
    getVariantsForGridHandler,
    changeVariantPositionHandler,
    generateProductCodeHandler,
    deletePhotoHandler,
    getManageVariantsPageDataHandler,
    getProductVariantsHandler,
    onProductItemClickHandler,
    addVariantHandler,
    addDuplicatedVariantHandler,
    manageVariantHandler,
    updateVariantDetailsHandler,
    updateVariantTraitOptions,
    activateVariantHandler,
    deleteVariantHandler,
    increaseStockAmountHandler,
    disposeFromStockHandler,
    uploadPhotoToVariantHandler,
    addPhotoToVariantHandler,
    detachPhotoFromVariantHandler,
    changePhotoPositionHandler,
    addTraitHandler,
    manageTraitHandler,
    createTraitHandler,
    updateTraitHandler,
    setProductTraitsHandler,
    deleteTraitHandler,
    addOptionHandler,
    updateOptionHandler,
    deleteOptionHandler,
    dndTraitOptionHandler,
    openAddVariantCardHandler,
    openChooseVariantTraitsCardHandler,
    openAddStockCardHandler,
    openDisposeStockCardHandler,
    openVariantHistoryCardHandler,
    openManageTraitsCardHandler,
    openVariantPhotosCardHandler,
    closeProductTraitConfigurationCardHandler,
    closeAddVariantCardHandler,
    closeVariantPhotosCardHandler,
    closeVariantConfigurationCardHandler,
    closeVariantHistoryCardHandler,
  };
}
