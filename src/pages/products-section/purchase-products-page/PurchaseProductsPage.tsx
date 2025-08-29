import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";

import {
  formatDate,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";
import cs from "./PurchaseProductsPage.module.scss";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import usePurchaseProductsPageService from "@/pages/products-section/purchase-products-page/usePurchaseProductsPageService.ts";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";
import PurchaseProductsCard from "@/components/complex/custom-cards/purchase-products-card/PurchaseProductsCard.tsx";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { PurchaseProductsPageSliceActions as actions } from "@/state/slices/PurchaseProductsPageSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import ProductConfigurationCard from "@/components/complex/custom-cards/product-configuration-card/ProductConfigurationCard.tsx";
import CreateProductCategoryCard from "@/components/complex/custom-cards/create-product-category-card/CreateProductCategoryCard.tsx";
import CreateProductBrandCard from "@/components/complex/custom-cards/create-product-brand-card/CreateProductBrandCard.tsx";
import { useToast } from "@/hooks/useToast.ts";
import ManageProductCard from "@/components/complex/custom-cards/manage-product-card/ManageProductCard.tsx";
import ProductPhotosCard from "@/components/complex/custom-cards/product-photos-card/ProductPhotosCard.tsx";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
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
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import useProductBasicDataPageService from "@/pages/products-section/product-basic-data-page/useProductBasicDataPageService.ts";

export function PurchaseProductsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { openConfirmationDialog } = useDialogService();
  const service = usePurchaseProductsPageService();
  const productsService = useProductsPageService();
  const productsBasicDataService = useProductBasicDataPageService();
  const state = useAppSelector<IPurchaseProductsPageSlice>(
    StoreSliceEnum.PURCHASE_PRODUCTS,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const { purchaseId } = useParams();
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

  useEffect(() => {
    if (!productsState.selectedPurchase) {
      productsService.getPurchaseDetailsHandler(purchaseId);
    }
    if (!productsState.purchaseCounters) {
      dispatch(actions.setIsProductMenuCardLoading(true));
      productsService
        .getPurchaseCountersHandler(Number(purchaseId))
        .then(() => dispatch(actions.setIsProductMenuCardLoading(false)));
    }
    if (productsState.currenciesList.length === 0) {
      productsService.getCurrenciesListHandler();
    }
    if (productsState.taxesList.length === 0) {
      productsService.getTaxesListHandler();
    }
    productsService.getTraitsForFilterHandler();
    keepOnlyCards(["purchaseProductsCard"]);
    dispatch(productsActions.refreshActiveTab("purchases"));
  }, [purchaseId]);

  useEffect(() => {
    dispatch(actions.setIsPurchaseProductsCardLoading(true));
    dispatch(actions.setIsPurchasesProductsGridLoading(true));
    Promise.all([
      service.getListOfPurchaseProductsForGridHandler(
        purchaseId,
        state.purchasesProductsGridRequestModel,
      ),
      service.getPurchaseSummaryHandler(purchaseId),
    ]).then(() => {
      dispatch(actions.setIsPurchaseProductsCardLoading(false));
      dispatch(actions.setIsPurchasesProductsGridLoading(false));
    });
  }, [state.purchasesProductsGridRequestModel]);

  useEffect(() => {
    dispatch(actions.setIsPurchaseProductsCardLoading(true));
    dispatch(actions.setIsVariantsForPurchaseGridLoading(true));
    productsService
      .getVariantsForGridHandler(state.variantsForPurchaseGridRequestModel)
      .then((res) => {
        dispatch(actions.setIsPurchaseProductsCardLoading(false));
        dispatch(actions.setIsVariantsForPurchaseGridLoading(false));
        dispatch(actions.refreshVariantsForPurchaseGridModel(res));
        dispatch(actions.refreshVariants(res.items));
      });
  }, [state.variantsForPurchaseGridRequestModel]);

  useEffect(() => {
    if (productsState.brands.length === 0) {
      productsService.getBrandsForFilterHandler();
    }
    if (productsState.categories.length === 0) {
      productsService.getCategoriesForFilterHandler();
    }
    if (productsState.sortingOptions.length === 0) {
      productsService.getSortingOptionsForGridHandler();
    }
    if (productsState.suppliers.length === 0) {
      productsService.getListOfSuppliersHandler();
    }
    if (
      state.sizesForFilter.length === 0 ||
      state.colorsForFilter.length === 0
    ) {
      productsService.getTraitsForFilterHandler();
    }
    dispatch(actions.refreshActiveCards(null));
  }, []);

  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "addProductToPurchase":
        service
          .addVariantToPurchaseProductsHandler(purchaseId, {
            variantId: payload.variantId,
            ...payload.data,
          })
          .then((res) => {
            if (res) {
              dispatch(actions.setIsPurchasesProductsGridLoading(true));
              Promise.all([
                service.getListOfPurchaseProductsForGridHandler(
                  purchaseId,
                  state.purchasesProductsGridRequestModel,
                ),
                service.getPurchaseSummaryHandler(purchaseId),
              ]).then(() => {
                dispatch(actions.setIsPurchasesProductsGridLoading(false));
              });
              addToast({
                text: "Variant added successfully",
                type: "success",
              });
            } else {
              addToast({
                text: `${res.error.data.detail}`,
                type: "error",
              });
            }
          });
        break;
      case "updatePurchaseProduct":
        service
          .updatePurchaseProductHandler(payload.stockActionId, payload.data)
          .then((res) => {
            if (!res.error) {
              dispatch(actions.setIsPurchasesProductsGridLoading(true));
              service
                .getListOfPurchaseProductsForGridHandler(
                  purchaseId,
                  state.purchasesProductsGridRequestModel,
                )
                .then(() =>
                  dispatch(actions.setIsPurchasesProductsGridLoading(false)),
                );
              addToast({
                text: "Product updated successfully",
                type: "success",
              });
            } else {
              addToast({
                text: `${res.error.data.detail}`,
                type: "error",
              });
            }
          });
        break;
      case "openCreateProductCard":
        dispatch(actions.resetSelectedProduct());
        dispatch(actions.setIsPurchaseProductsCardLoading(true));
        Promise.all([
          productsService.getSimpleListOfAllBrandsHandler(),
          productsService.getAllCategoriesByOrganizationHandler(),
        ]).then(() => {
          dispatch(actions.setIsPurchaseProductsCardLoading(false));
          handleMultipleCardActions({
            purchaseProductsCard: false,
            productConfigurationCard: true,
          });
        });
        break;
      case "submitProductData":
        service.onSubmitProductDataHandler(payload);
        handleMultipleCardActions({
          productConfigurationCard: false,
          purchaseProductsCard: true,
        });
        break;
      case "checkCategoryName":
        productsBasicDataService.checkCategoryNameHandler(payload);
        break;
      case "createProductCategory":
        productsBasicDataService.createNewCategoryHandler(payload);
        handleCardAction("createCategoryCard");
        break;
      case "checkBrandName":
        productsBasicDataService.checkBrandNameHandler(payload);
        break;
      case "createProductBrand":
        productsBasicDataService.createBrandHandler(payload);
        handleCardAction("createBrandCard");
        break;
      case "uploadCategoryOrBrandPhoto":
        productsBasicDataService.uploadCategoryOrBrandPhotoHandler(payload);
        break;
      case "closeProductConfigurationCard":
        if (!state.activeCards.includes("manageProductCard")) {
          keepOnlyCards(["purchaseProductsCard"]);
        } else {
          handleCardAction("productConfigurationCard");
        }
        break;
      case "generateProductCode":
        productsBasicDataService.generateProductCodeHandler();
        break;
      case "checkProductCode":
        productsService.checkProductCodeHandler(payload);
        break;
      case "openPurchaseProductsCard":
        keepOnlyCards(["purchaseProductsCard"]);
        break;
      case "openManageProductCard":
        handleCardAction("manageProductCard");
        dispatch(actions.setIsManageProductCardLoading(true));
        Promise.all([
          productsService.getListOfTraitsWithOptionsForProductHandler(
            productsState.selectedProduct.productId,
          ),
          productsService.getPurchaseProductVariantsHandler(
            state.selectedPurchase.purchaseId,
            productsState.selectedProduct.productId,
          ),
        ]).then(([_traits, variants]) => {
          dispatch(actions.setIsManageProductCardLoading(false));
          dispatch(actions.refreshPurchaseProductVariantsGridModel(variants));
          dispatch(actions.refreshPurchaseProductVariants(variants.items));
        });
        break;
      case "manageProductData":
        handleCardAction("productConfigurationCard", true);
        break;
      case "manageProductPhotos":
        handleCardAction("productPhotosCard", true);
        if (productsState.productPhotos.length === 0) {
          dispatch(actions.setIsProductPhotosCardLoading(true));
          productsService
            .getProductPhotosHandler(Number(state.selectedProduct.productId))
            .then(() => {
              dispatch(actions.setIsProductPhotosCardLoading(false));
            });
        }
        break;
      case "uploadPhoto":
        dispatch(actions.setIsImageUploaderLoading(true));
        productsService.uploadPhotoHandler(payload).then((res) => {
          dispatch(actions.setIsImageUploaderLoading(false));
          if (res.data.photoId) {
            productsService.getProductPhotosHandler(
              Number(state.selectedProduct.productId),
            );
            productsService.getCountersForProductsHandler(
              state.selectedProduct.productId,
            );
            addToast({
              text: "Photos added successfully",
              type: "success",
            });
          } else {
            addToast({
              text: `${res.error.data.detail}`,
              type: "error",
            });
          }
        });
        break;
      case "changePhotoPosition":
        productsService.putPhotoInNewPositionHandler(
          state.selectedProduct.productId,
          payload.activeItem.photoId,
          payload.newIndex,
        );
        break;
      case "deletePhoto":
        const confirmed = await openConfirmationDialog({
          headerTitle: "Deleting product photo",
          text: "You are about to delete product photo.",
          primaryButtonValue: "Delete",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmed) return;

        dispatch(productsActions.setIsProductPhotosLoading(true));

        try {
          await productsService.deletePhotoHandler(payload.photoId);

          productsService.getProductPhotosHandler(
            Number(state.selectedProduct.productId),
          );

          addToast({
            text: "Photo deleted successfully",
            type: "success",
          });
        } catch (error: any) {
          addToast({
            text: "Photo not deleted",
            description: error.message,
            type: "error",
          });
        } finally {
          dispatch(productsActions.setIsProductPhotosLoading(false));
        }
        break;
      case "openConnectImageCard":
        dispatch(actions.setIsConnectImageCardLoading(true));
        dispatch(actions.setIsVariantsGridLoading(true));
        productsService
          .getProductVariantsHandler(state.selectedProduct.productId)
          .then((res) => {
            dispatch(actions.setIsConnectImageCardLoading(false));
            dispatch(actions.setIsVariantsGridLoading(false));
            dispatch(productsActions.refreshProductVariants(res));
          });
        dispatch(
          productsActions.refreshProductPhotos(
            setSelectedGridItem(
              payload.photoId,
              productsState.productPhotos,
              "photoId",
            ),
          ),
        );
        dispatch(actions.refreshSelectedPhoto(payload));
        handleCardAction("connectImageCard", true);
        break;
      case "connectImageToVariant":
        productsService
          .attachProductPhotoToVariantHandler(
            payload.variantId,
            state.selectedPhoto.photoId,
          )
          .then(() => {
            productsService
              .getProductPhotosHandler(Number(state.selectedProduct.productId))
              .then((res) => {
                const selectedPhoto = res.find(
                  (photo) => state.selectedPhoto.photoId === photo.photoId,
                );
                dispatch(
                  productsActions.refreshProductPhotos(
                    setSelectedGridItem(
                      state.selectedPhoto.photoId,
                      productsState.productPhotos,
                      "photoId",
                    ),
                  ),
                );
                dispatch(actions.refreshSelectedPhoto(selectedPhoto));
              });
          });
        break;
      case "detachImageFromVariant":
        productsService
          .detachVariantPhotoHandler(
            payload.variantId,
            state.selectedPhoto.photoId,
          )
          .then(() => {
            productsService
              .getProductPhotosHandler(Number(state.selectedProduct.productId))
              .then((res) => {
                const selectedPhoto = res.find(
                  (photo) => state.selectedPhoto.photoId === photo.photoId,
                );
                dispatch(
                  productsActions.refreshProductPhotos(
                    setSelectedGridItem(
                      state.selectedPhoto.photoId,
                      productsState.productPhotos,
                      "photoId",
                    ),
                  ),
                );
                dispatch(actions.refreshSelectedPhoto(selectedPhoto));
              });
          });
        break;
      case "closeProductPhotsCard":
        handleCardAction("productPhotosCard");
        break;
      case "manageProductTraits":
        handleCardAction("chooseVariantTraitsCard", true);
        dispatch(actions.setIsChooseVariantTraitsCardLoading(true));
        Promise.all([
          productsService.getListOfAllTraitsHandler(),
          productsService.getListOfTraitsWithOptionsForProductHandler(
            state.selectedProduct.productId,
          ),
        ]).then(() => {
          dispatch(actions.setIsChooseVariantTraitsCardLoading(false));
        });
        break;
      case "addTrait":
        dispatch(actions.setIsProductTraitConfigurationCardLoading(true));
        dispatch(actions.resetSelectedTrait());
        productsService.getListOfTypesOfTraitsHandler().then(() => {
          dispatch(actions.setIsProductTraitConfigurationCardLoading(false));
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
        ]).then(([trait, options, _types]) => {
          dispatch(actions.setIsProductTraitConfigurationCardLoading(false));
          dispatch(actions.setIsTraitOptionsGridLoading(false));
          dispatch(actions.refreshSelectedTrait(trait));
          dispatch(
            actions.refreshColorOptionsGridModel({
              ...state.colorOptionsGridModel,
              items: options.filter((option) => !option.isDeleted),
            }),
          );
        });
        break;
      case "setProductTraits":
        dispatch(actions.refreshSelectedTraitsIds(payload));
        dispatch(actions.setIsChooseVariantTraitsCardLoading(true));
        productsService
          .setProductTraitsHandler(state.selectedProduct.productId, payload)
          .then((res) => {
            dispatch(actions.setIsChooseVariantTraitsCardLoading(false));
            if (res) {
              handleMultipleCardActions({
                chooseVariantTraitsCard: false,
                productTraitConfigurationCard: false,
              });
              productsService.getListOfTraitsWithOptionsForProductHandler(
                productsState.selectedProduct.productId,
              );
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

          await Promise.all([
            productsService.getListOfTraitsWithOptionsForProductHandler(
              state.selectedProduct.productId,
            ),
            productsService.getListOfAllTraitsHandler(),
          ]);

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
        }
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
            productsService.getListOfAllTraitsHandler();
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
              productsService.getListOfAllTraitsHandler();
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
              productsService.getListOfAllTraitsHandler();
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

          const [options, _allTraits] = await Promise.all([
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
      case "closeProductTraitConfigurationCard":
        handleCardAction("productTraitConfigurationCard");
        break;
      case "openAddVariantCard":
        handleCardAction("addVariantCard", true);
        dispatch(actions.setIsAddVariantCardLoading(true));
        productsService
          .getListOfTraitsWithOptionsForProductHandler(payload.productId)
          .then(() => {
            dispatch(actions.setIsAddVariantCardLoading(false));
          });
        break;
      case "addVariantGridAction":
        keepOnlyCards(["manageProductCard"]);
        dispatch(actions.setIsProductConfigurationCardLoading(true));
        dispatch(actions.setIsVariantGridLoading(true));
        Promise.all([
          productsService.getProductDetailsHandler(payload.productId),
          productsService.getListOfTraitsWithOptionsForProductHandler(
            payload.productId,
          ),
          productsService.getPurchaseProductVariantsHandler(
            productsState.selectedPurchase.purchaseId,
            payload.productId,
          ),
        ]).then(([productDetails, _productTraits, variants]) => {
          dispatch(actions.setIsProductConfigurationCardLoading(false));
          dispatch(actions.setIsVariantGridLoading(false));
          if (productDetails) {
            dispatch(actions.refreshSelectedProduct(productDetails));
          } else {
            handleMultipleCardActions({
              purchaseProductsCard: true,
              manageProductCard: false,
            });
            addToast({
              text: "Something gone wrong",
              type: "error",
            });
          }
          dispatch(actions.refreshPurchaseProductVariants(variants));
        });
        break;
      case "addVariant":
        dispatch(actions.setIsAddVariantCardLoading(true));
        productsService
          .checkVariantCombinationHandler(
            state.selectedProduct.productId,
            payload,
          )
          .then((res) => {
            if (res) {
              productsService
                .createVariantHandler(state.selectedProduct.productId, payload)
                .then((res) => {
                  dispatch(actions.setIsAddVariantCardLoading(false));
                  if (res) {
                    handleCardAction("addVariantCard");
                    productsService
                      .getPurchaseProductVariantsHandler(
                        purchaseId,
                        state.selectedProduct.productId,
                      )
                      .then((res) => {
                        dispatch(actions.refreshPurchaseProductVariants(res));
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
        productsService
          .createVariantHandler(state.selectedProduct.productId, payload)
          .then((res) => {
            dispatch(actions.setIsAddVariantCardLoading(false));
            if (res) {
              handleCardAction("addVariantCard");
              productsService
                .getPurchaseProductVariantsHandler(
                  purchaseId,
                  state.selectedProduct.productId,
                )
                .then((res) => {
                  dispatch(actions.refreshPurchaseProductVariants(res));
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
      case "closeAddVariantCard":
        dispatch(actions.refreshIsDuplicateVariant(false));
        handleCardAction("addVariantCard");
        break;
      case "addStockAction":
        dispatch(actions.setIsVariantGridLoading(true));
        service
          .addVariantToPurchaseProductsHandler(payload.purchase.purchaseId, {
            ...payload.formData,
            variantId: payload.row.original.variantId,
          })
          .then((res) => {
            if (res) {
              productsService
                .getPurchaseProductVariantsHandler(
                  productsState.selectedPurchase.purchaseId,
                  state.selectedProduct.productId,
                )
                .then((res) => {
                  dispatch(actions.setIsVariantGridLoading(false));
                  dispatch(actions.refreshPurchaseProductVariants(res));
                });
              addToast({
                text: "Stock action added successfully",
                type: "success",
              });
            } else {
              addToast({
                text: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "updateStockAction":
        dispatch(actions.setIsVariantGridLoading(true));
        service
          .updatePurchaseProductHandler(
            payload.stockAction.stockActionId,
            payload.formData,
          )
          .then((res) => {
            if (res) {
              productsService
                .getPurchaseProductVariantsHandler(
                  productsState.selectedPurchase.purchaseId,
                  state.selectedProduct.productId,
                )
                .then((res) => {
                  dispatch(actions.setIsVariantGridLoading(false));
                  dispatch(actions.refreshPurchaseProductVariants(res));
                });
              addToast({
                text: "Stock action updated successfully",
                type: "success",
              });
            } else {
              addToast({
                text: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "deleteStockAction":
        dispatch(actions.setIsVariantGridLoading(true));
        service.deleteStockActionHandler(payload.stockActionId).then((res) => {
          dispatch(actions.setIsVariantsGridLoading(false));
          console.log("DELETE", res);
          if (res) {
            productsService
              .getPurchaseProductVariantsHandler(
                productsState.selectedPurchase.purchaseId,
                state.selectedProduct.productId,
              )
              .then((res) => {
                dispatch(actions.setIsVariantGridLoading(false));
                dispatch(actions.refreshPurchaseProductVariants(res));
              });
            addToast({
              text: "Stock action deleted successfully",
              type: "success",
            });
          } else {
            addToast({
              text: res.error.message,
              type: "error",
            });
          }
        });
        break;
      case "deleteStockActionInGrid":
        service.deleteStockActionHandler(payload.stockActionId).then((res) => {
          if (res) {
            dispatch(actions.setIsPurchasesProductsGridLoading(true));
            service
              .getListOfPurchaseProductsForGridHandler(
                purchaseId,
                state.purchasesProductsGridRequestModel,
              )
              .then(() => {
                dispatch(actions.setIsPurchasesProductsGridLoading(false));
              });
            addToast({
              text: "Stock action deleted successfully",
              type: "success",
            });
          } else {
            addToast({
              text: res.error.message,
              type: "error",
            });
          }
        });
        break;
      case "manageVariant":
        console.log(payload);
        keepOnlyCards(["manageProductCard", "variantConfigurationCard"]);
        dispatch(actions.setIsVariantConfigurationCardLoading(true));
        dispatch(actions.setIsVariantOptionsGridLoading(true));
        dispatch(actions.setIsVariantPhotoGridLoading(true));
        Promise.all([
          productsService.getVariantDetailsHandler(payload.variantId),
          productsService.getProductDetailsHandler(payload.productId),
          productsService.getListOfTraitsWithOptionsForProductHandler(
            payload.productId,
          ),
          productsService.getPurchaseProductVariantsHandler(
            productsState.selectedPurchase.purchaseId,
            payload.productId,
          ),
        ]).then(([variant, product, _traits, variants]) => {
          dispatch(actions.setIsVariantConfigurationCardLoading(false));
          dispatch(actions.setIsVariantOptionsGridLoading(false));
          dispatch(actions.setIsVariantPhotoGridLoading(false));
          dispatch(actions.refreshSelectedProduct(product));
          if (variant) {
            dispatch(productsActions.refreshSelectedVariant(variant));
            dispatch(actions.refreshVariantPhotos(variant?.photos));
            dispatch(actions.setIsProductPhotoGridLoading(true));
            dispatch(actions.refreshPurchaseProductVariants(variants));
            productsService
              .getProductPhotosForVariantHandler(
                payload.productId,
                payload.variantId,
              )
              .then((res) => {
                dispatch(actions.setIsProductPhotoGridLoading(false));
                dispatch(actions.refreshProductPhotosForVariant(res));
              });
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
              dispatch(productsActions.refreshSelectedVariant(res));
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
                .getProductVariantsHandler(state.selectedProduct.productId)
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
      case "increaseStockAmount":
        console.log("PAYLOAD", payload);
        // dispatch(actions.setIsAddStockCardLoading(true));
        // productsService
        //   .increaseStockAmountForVariantHandler(
        //     payload.variant.variantId,
        //     payload.formattedData,
        //   )
        //   .then((res) => {
        //     dispatch(actions.setIsAddStockCardLoading(false));
        //     if (res) {
        //       addToast({
        //         text: "Stock increased successfully",
        //         type: "success",
        //       });
        //     } else {
        //       addToast({
        //         text: "Stock not increased",
        //         description: res.error.message,
        //         type: "error",
        //       });
        //     }
        //   });
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
              .getProductPhotosHandler(Number(state.selectedProduct.productId))
              .then(() => {
                dispatch(actions.setIsProductPhotoGridLoading(false));
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
      // case "deletePhoto":
      //   console.log("PHOTO DELETE", payload);
      //   // service.deletePhotoHandler(payload).then((res) => {
      //   //   if (res) {
      //   //     service.getVariantDetailsHandler(payload.contextId).then((res) => {
      //   //       dispatch(actions.refreshSelectedVariant(res));
      //   //       dispatch(actions.refreshVariantPhotos(res?.photos));
      //   //     });
      //   //   }
      //   // });
      //   break;
      case "addPhotoToVariant":
        productsService
          .attachProductPhotoToVariantHandler(
            productsState.selectedVariant.variantId,
            payload.photoId,
          )
          .then((res) => {
            if (!res.error) {
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
          headerTitle: "Detach photo from variant",
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
        dispatch(actions.setIsVariantHistoryGridLoading(true));
        Promise.all([
          productsService.getVariantStockHistoryHandler(payload),
          productsService.getVariantDetailsHandler(payload),
        ]).then(([historyItems, variant]) => {
          const historyData = historyItems.map((item) => ({
            ...item,
            createdDate: formatDate(item.createdDate, "date"),
          }));
          dispatch(actions.setIsVariantHistoryCardLoading(false));
          dispatch(actions.setIsVariantHistoryGridLoading(false));
          dispatch(actions.refreshVariantHistory(historyData));
          dispatch(productsActions.refreshSelectedVariant(variant));
        });
        break;
      case "openManageTraitsCard":
        handleCardAction("manageTraitsCard", true);
        break;
      case "openCreateProductCategoryCard":
        handleCardAction("createCategoryCard", true);
        break;
      case "openCreateProductBrandCard":
        handleCardAction("createBrandCard", true);
        break;
      case "closeCreateProductCategoryCard":
        handleCardAction("createCategoryCard");
        break;
      case "closeCreateProductBrandCard":
        handleCardAction("createBrandCard");
        break;
      case "openVariantPhotosCard":
        handleCardAction("variantPhotosCard", true);
        break;
      case "closeVariantPhotosCard":
        handleCardAction("variantPhotosCard");
        break;
      case "closeVariantConfigurationCard":
        handleCardAction("variantConfigurationCard");
        break;
      case "closeVariantHistoryCard":
        handleCardAction("variantHistoryCard");
        break;
      case "navigateToManageVariant":
        productsService
          .getVariantDetailsHandler(payload.variantId)
          .then((res) => {
            dispatch(productsActions.refreshSelectedVariant(res));
            dispatch(productsActions.refreshVariantPhotos(res.photos));
            navigate(
              `${NavUrlEnum.PRODUCTS}${NavUrlEnum.MANAGE_VARIANTS}/${payload?.productId}`,
            );
          });
        break;
    }
  }

  useEffect(() => {
    console.log(state.selectedProduct);
  }, [state.selectedProduct]);

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
        <div ref={createRefCallback("purchaseProductsCard")}>
          <PurchaseProductsCard
            isLoading={state.isPurchaseProductsCardLoading}
            isPurchaseProductsGridLoading={state.isPurchasesProductsGridLoading}
            isProductsGridLoading={state.isVariantsForPurchaseGridLoading}
            variants={state.variants}
            purchaseProducts={state.purchaseProducts}
            variantsGridModel={state.variantsForPurchaseGridModel}
            purchaseProductsGridModel={state.purchasesProductsGridModel}
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
            variants={state.productVariants}
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
            data={state.colorOptionsGridModel}
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
            data={state.variantTraitsGridModel}
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
