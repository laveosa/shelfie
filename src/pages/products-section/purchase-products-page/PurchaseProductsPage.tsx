import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

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
import { GridModel } from "@/const/models/GridModel.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import ConnectImageCard from "@/components/complex/custom-cards/connect-image-card/ConnectImageCard.tsx";
import { setSelectedGridItem } from "@/utils/helpers/quick-helper.ts";
import ChooseVariantTraitsCard from "@/components/complex/custom-cards/choose-variant-traits-card/ChooseVariantTraitsCard.tsx";
import ProductTraitConfigurationCard from "@/components/complex/custom-cards/product-trait-configuration-card/ProductTraitConfigurationCard.tsx";
import AddVariantCard from "@/components/complex/custom-cards/add-variant-card/AddVariantCard.tsx";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import VariantConfigurationCard from "@/components/complex/custom-cards/variant-configuration-card/VariantConfigurationCard.tsx";
import AddStockCard from "@/components/complex/custom-cards/add-stock-card/AddStockCard.tsx";
import DisposeStockCard from "@/components/complex/custom-cards/dispose-stock-card/DisposeStockCard.tsx";
import StockHistoryCard from "@/components/complex/custom-cards/stock-history-card/StockHistoryCard.tsx";
import VariantPhotosCard from "@/components/complex/custom-cards/variant-photos-card/VariantPhotosCard.tsx";
import ManageTraitsCard from "@/components/complex/custom-cards/manage-traits-card/ManageTraitsCard.tsx";

export function PurchaseProductsPage() {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const { openConfirmationDialog } = useDialogService();
  const service = usePurchaseProductsPageService();
  const productsService = useProductsPageService();
  const state = useAppSelector<IPurchaseProductsPageSlice>(
    StoreSliceEnum.PURCHASE_PRODUCTS,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const { purchaseId } = useParams();
  const cardRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (!productsState.selectedPurchase) {
      productsService
        .getPurchaseDetailsHandler(purchaseId)
        .then((res: PurchaseModel) => {
          dispatch(productsActions.refreshSelectedPurchase(res));
        });
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
    dispatch(actions.refreshActiveCards([]));
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
    ]).then(([gridModel, purchaseSummary]) => {
      dispatch(actions.setIsPurchaseProductsCardLoading(false));
      dispatch(actions.setIsPurchasesProductsGridLoading(false));
      dispatch(actions.refreshPurchasesProductsGridModel(gridModel));
      dispatch(actions.refreshPurchaseProducts(gridModel.items));
      dispatch(actions.refreshPurchaseSummary(purchaseSummary));
    });
  }, [state.purchasesProductsGridRequestModel]);

  useEffect(() => {
    dispatch(actions.setIsPurchaseProductsCardLoading(true));
    dispatch(actions.setIsProductsGridLoading(true));
    productsService
      .getVariantsForGridHandler(productsState.variantsGridRequestModel)
      .then((res) => {
        dispatch(actions.setIsPurchaseProductsCardLoading(false));
        dispatch(actions.setIsProductsGridLoading(false));
        dispatch(productsActions.refreshVariantsGridModel(res));
        dispatch(productsActions.refreshVariants(res.items));
      });
  }, [productsState.variantsGridRequestModel]);

  useEffect(() => {
    if (productsState.brands.length === 0) {
      productsService.getBrandsForFilterHandler().then((res) => {
        dispatch(productsActions.refreshBrands(res));
      });
    }
    if (productsState.categories.length === 0) {
      productsService.getCategoriesForFilterHandler().then((res) => {
        dispatch(productsActions.refreshCategories(res));
      });
    }
    if (productsState.sortingOptions.length === 0) {
      productsService.getSortingOptionsForGridHandler().then((res) => {
        dispatch(productsActions.refreshSortingOptions(res));
      });
    }
    if (productsState.suppliers.length === 0) {
      productsService.getListOfSuppliersHandler().then((res) => {
        dispatch(productsActions.refreshSuppliers(res));
      });
    }
    dispatch(actions.refreshActiveCards(null));
  }, []);

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
    const activeCards: string[] = Array.isArray(overrideActiveCards)
      ? overrideActiveCards
      : Array.isArray(state.activeCards)
        ? state.activeCards
        : [];
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

  function handleMultipleCardActions(cardActions: Record<string, boolean>) {
    let updatedCards = new Set(state.activeCards);
    let lastAddedCard: string | null = null;

    for (const [card, shouldOpen] of Object.entries(cardActions)) {
      if (shouldOpen) {
        if (!updatedCards.has(card)) {
          updatedCards.add(card);
          lastAddedCard = card;
        }
      } else {
        updatedCards.delete(card);
      }
    }

    const updatedCardsArray = Array.from(updatedCards);
    dispatch(actions.refreshActiveCards(updatedCardsArray));

    if (lastAddedCard) {
      scrollToCard(lastAddedCard);
    }
  }

  function keepOnlyCards(openCardIdentifiers: string[] = []) {
    const currentActiveCards = Array.isArray(state.activeCards)
      ? state.activeCards
      : [];

    const cardActions = Object.fromEntries(
      currentActiveCards.map((card) => [
        card,
        openCardIdentifiers.includes(card),
      ]),
    );

    for (const card of openCardIdentifiers) {
      if (!cardActions[card]) {
        cardActions[card] = true;
      }
    }

    handleMultipleCardActions(cardActions);
  }

  useEffect(() => {
    handleCardAction("purchaseProductsCard", true);
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
              ]).then(([gridModel, purchaseSummary]) => {
                dispatch(actions.setIsPurchasesProductsGridLoading(false));
                dispatch(actions.refreshPurchasesProductsGridModel(gridModel));
                dispatch(actions.refreshPurchaseProducts(gridModel.items));
                dispatch(actions.refreshPurchaseSummary(purchaseSummary));
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
        dispatch(actions.setIsPurchaseProductsCardLoading(true));
        Promise.all([
          productsService.getSimpleListOfAllBrandsHandler(),
          productsService.getAllCategoriesByOrganizationHandler(),
        ]).then(([brands, categories]) => {
          dispatch(actions.setIsPurchaseProductsCardLoading(false));
          dispatch(actions.refreshBrands(brands));
          dispatch(actions.refreshCategories(categories));
          handleMultipleCardActions({
            purchaseProductsCard: false,
            productConfigurationCard: true,
          });
        });
        break;
      case "checkCategoryName":
        productsService
          .checkCategoryNameHandler({ categoryName: payload })
          .then((res) => {
            if (res.error) {
              addToast({
                text: `${res.error.data.detail}`,
                type: "error",
              });
            } else {
              dispatch(
                productsActions.refreshCategory({
                  ...state.category,
                  categoryName: payload,
                }),
              );
            }
          });
        break;
      case "createProductCategory":
        productsService.createNewCategoryHandler(state.category).then((res) => {
          if (res.data) {
            dispatch(productsActions.refreshCategory(res.data));
            productsService
              .getAllCategoriesByOrganizationHandler()
              .then((res) => {
                dispatch(productsActions.refreshCategories(res));
              });
            addToast({
              text: "Category created successfully",
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
      case "checkBrandName":
        productsService
          .checkBrandNameHandler({ brandName: payload })
          .then((res) => {
            if (res.error) {
              addToast({
                text: `${res.error.data.detail}`,
                type: "error",
              });
            } else {
              dispatch(
                productsActions.refreshBrand({
                  ...state.brand,
                  brandName: payload,
                }),
              );
            }
          });
        break;
      case "createProductBrand":
        productsService.createBrandHandler(state.brand).then((res) => {
          if (res.data) {
            dispatch(productsActions.refreshBrand(res.data));
            productsService.getSimpleListOfAllBrandsHandler().then((res) => {
              dispatch(productsActions.refreshBrands(res));
            });
            addToast({
              text: "Brand created successfully",
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
      case "uploadCategoryOrBrandPhoto":
        productsService.uploadPhotoHandler(payload).then((res) => {
          if (!payload.contextId) {
            addToast({
              text:
                payload.contextName === "brand"
                  ? "Create brand first"
                  : "Create category first",
              type: "error",
            });
          } else {
            if (res.data.photoId) {
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
          }
        });
        break;
      case "createProduct":
        dispatch(actions.setIsProductConfigurationCardLoading(true));
        productsService.createNewProductHandler(payload).then((res) => {
          dispatch(actions.setIsProductConfigurationCardLoading(false));
          if (res.data) {
            productsService
              .getProductDetailsHandler(res.data.productId)
              .then((res) => {
                dispatch(actions.refreshSelectedProduct(res.data));
              });
            dispatch(actions.refreshSelectedProduct(res.data));
            handleMultipleCardActions({
              productConfigurationCard: false,
              manageProductCard: true,
            });
            addToast({
              text: "Product created successfully",
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
      case "updateProduct":
        dispatch(actions.setIsProductConfigurationCardLoading(true));
        productsService
          .updateProductHandler(state.selectedProduct.productId, payload)
          .then((res) => {
            dispatch(actions.setIsProductConfigurationCardLoading(false));
            if (res.data) {
              dispatch(actions.refreshSelectedProduct(res.data));
              addToast({
                text: "Product updated successfully",
                type: "success",
              });
            } else {
              addToast({
                text: "Product not updated",
                description: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "closeCreateProductCategoryCard":
        handleCardAction("createCategoryCard");
        break;
      case "closeCreateProductBrandCard":
        handleCardAction("createBrandCard");
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
        ]).then(([traits, variants]) => {
          dispatch(actions.setIsManageProductCardLoading(false));
          dispatch(
            productsActions.refreshListOfTraitsWithOptionsForProduct(
              traits.data,
            ),
          );
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
            .then((res) => {
              dispatch(actions.setIsProductPhotosCardLoading(false));
              dispatch(productsActions.refreshProductPhotos(res));
            });
        }
        break;
      case "uploadPhoto":
        dispatch(actions.setIsImageUploaderLoading(true));
        productsService.uploadPhotoHandler(payload).then((res) => {
          dispatch(actions.setIsImageUploaderLoading(false));
          if (res.data.photoId) {
            productsService
              .getProductPhotosHandler(Number(state.selectedProduct.productId))
              .then((res) => {
                dispatch(productsActions.refreshProductPhotos(res));
              });
            productsService
              .getCountersForProductsHandler(state.selectedProduct.productId)
              .then((res) => {
                dispatch(productsActions.refreshProductCounter(res));
              });
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
        productsService
          .putPhotoInNewPositionHandler(
            state.selectedProduct.productId,
            payload.activeItem.photoId,
            payload.newIndex,
          )
          .then(() => {
            if (payload.newIndex === 0 || payload.oldIndex === 0) {
              productsService
                .getTheProductsForGridHandler(
                  productsState.gridRequestModel,
                  true,
                )
                .then((res: GridModel) => {
                  dispatch(productsActions.refreshProducts(res.items));
                });
            }
          });
        break;
      case "deletePhoto":
        const confirmed = await openConfirmationDialog({
          title: "Deleting product photo",
          text: "You are about to delete product photo.",
          primaryButtonValue: "Delete",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmed) return;

        dispatch(productsActions.setIsProductPhotosLoading(true));

        try {
          await productsService.deletePhotoHandler(payload.photoId);

          const [productPhotos, counters, photos] = await Promise.all([
            productsService.getProductPhotosHandler(
              Number(state.selectedProduct.productId),
            ),
            productsService.getCountersForProductsHandler(
              state.selectedProduct.productId,
            ),
            payload.id === 1
              ? productsService.getTheProductsForGridHandler(
                  productsState.gridRequestModel,
                  true,
                )
              : Promise.resolve({ items: [] }),
          ]);

          queueMicrotask(() => {
            dispatch(productsActions.refreshProductPhotos(productPhotos));
            dispatch(productsActions.refreshProductCounter(counters));

            if (payload.id === 1) {
              dispatch(productsActions.refreshProducts(photos.items));
            }
          });

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
                dispatch(productsActions.refreshProductPhotos(res));

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
                dispatch(productsActions.refreshProductPhotos(res));

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
        ]).then(([traits, productTrait]) => {
          dispatch(actions.setIsChooseVariantTraitsCardLoading(false));
          dispatch(productsActions.refreshTraits(traits));
          dispatch(
            productsActions.refreshListOfTraitsWithOptionsForProduct(
              productTrait,
            ),
          );
        });
        break;
      case "addTrait":
        dispatch(actions.setIsProductTraitConfigurationCardLoading(true));
        dispatch(actions.resetSelectedTrait());
        productsService.getListOfTypesOfTraitsHandler().then((res) => {
          dispatch(actions.setIsProductTraitConfigurationCardLoading(false));
          dispatch(productsActions.refreshTypesOfTraits(res));
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
          dispatch(productsActions.refreshTypesOfTraits(types));
        });
        break;
      case "setProductTraits":
        console.log("PAYLOAD", payload);
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
              productsService
                .getListOfTraitsWithOptionsForProductHandler(
                  productsState.selectedProduct.productId,
                )
                .then((res) => {
                  dispatch(
                    productsActions.refreshListOfTraitsWithOptionsForProduct(
                      res,
                    ),
                  );
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
              state.selectedProduct.productId,
            ),
            productsService.getListOfAllTraitsHandler(),
          ]);

          dispatch(
            productsActions.refreshListOfTraitsWithOptionsForProduct(
              traitsWithOptions,
            ),
          );
          dispatch(productsActions.refreshTraits(allTraits));

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
            productsService.getListOfAllTraitsHandler().then((res) => {
              dispatch(productsActions.refreshTraits(res));
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
                dispatch(productsActions.refreshTraits(res));
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
                dispatch(productsActions.refreshTraits(res));
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
          dispatch(productsActions.refreshTraits(allTraits));

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
          .then((res) => {
            dispatch(actions.setIsAddVariantCardLoading(false));
            dispatch(
              productsActions.refreshListOfTraitsWithOptionsForProduct(res),
            );
          });
        break;
      case "addVariantGridAction":
        keepOnlyCards(["manageProductCard", "addVariantCard"]);
        dispatch(actions.setIsAddVariantCardLoading(true));
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
        ]).then(([productDetails, productTraits, variants]) => {
          dispatch(actions.setIsAddVariantCardLoading(false));
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
          dispatch(
            productsActions.refreshListOfTraitsWithOptionsForProduct(
              productTraits,
            ),
          );
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
                      .getProductVariantsHandler(
                        state.selectedProduct.productId,
                      )
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
        productsService
          .createVariantHandler(state.selectedProduct.productId, payload)
          .then((res) => {
            dispatch(actions.setIsAddVariantCardLoading(false));
            if (res) {
              handleCardAction("addVariantCard");
              productsService
                .getProductVariantsHandler(state.selectedProduct.productId)
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
      case "manageVariant":
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
        ]).then(([variant, product, traits, variants]) => {
          dispatch(actions.setIsVariantConfigurationCardLoading(false));
          dispatch(actions.setIsVariantOptionsGridLoading(false));
          dispatch(actions.setIsVariantPhotoGridLoading(false));
          dispatch(actions.refreshSelectedProduct(product));
          if (variant) {
            dispatch(productsActions.refreshSelectedVariant(variant));
            dispatch(actions.refreshVariantPhotos(variant?.photos));
            dispatch(actions.setIsProductPhotoGridLoading(true));
            dispatch(
              productsActions.refreshListOfTraitsWithOptionsForProduct(traits),
            );
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
              .then((res) => {
                dispatch(actions.setIsProductPhotoGridLoading(false));
                dispatch(productsActions.refreshProductPhotos(res));
              });
            productsService
              .getCountersForProductsHandler(
                Number(state.selectedProduct.productId),
              )
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
            console.log("RES", res);
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
        break;
      case "openManageTraitsCard":
        handleCardAction("manageTraitsCard", true);
        break;
      case "openVariantPhotosCard":
        handleCardAction("variantPhotosCard", true);
        break;
      case "closeVariantPhotosCard":
        handleCardAction("variantPhotosCard");
        break;
    }
  }

  return (
    <div className={cs.purchaseProductsPage}>
      <ProductMenuCard
        isLoading={state.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        productId={Number(purchaseId)}
        counter={productsState.purchaseCounters}
      />
      {state.activeCards?.includes("purchaseProductsCard") && (
        <div
          ref={(el) => {
            cardRefs.current["purchaseProductsCard"] = el;
          }}
        >
          <PurchaseProductsCard
            isLoading={state.isPurchaseProductsCardLoading}
            isPurchaseProductsGridLoading={state.isPurchasesProductsGridLoading}
            isProductsGridLoading={state.isProductsGridLoading}
            variants={productsState.variants}
            purchaseProducts={state.purchaseProducts}
            variantsGridModel={productsState.variantsGridModel}
            purchaseProductsGridModel={state.purchasesProductsGridModel}
            sortingOptions={productsState.sortingOptions}
            preferences={appState.preferences}
            brands={productsState.brands}
            categories={productsState.categories}
            purchaseProductsSkeletonQuantity={
              state.purchasesProductsGridRequestModel.pageSize
            }
            variantsSkeletonQuantity={
              productsState.variantsGridRequestModel.pageSize
            }
            currencies={productsState.currenciesList}
            taxes={productsState.taxesList}
            purchaseSummary={state.purchaseSummary}
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards?.includes("manageProductCard") && (
        <div
          ref={(el) => {
            cardRefs.current["manageProductCard"] = el;
          }}
        >
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
        <div
          ref={(el) => {
            cardRefs.current["productConfigurationCard"] = el;
          }}
        >
          <ProductConfigurationCard
            isLoading={state.isProductConfigurationCardLoading}
            product={state.selectedProduct}
            brandsList={productsState.brands}
            categoriesList={productsState.categories}
            showSecondaryButton={true}
            onGenerateProductCode={productsService.generateProductCodeHandler}
            onProductCodeCheck={productsService.checkProductCodeHandler}
            onOpenCreateProductCategoryCard={() =>
              handleCardAction("createCategoryCard")
            }
            onOpenCreateProductBrandCard={() =>
              handleCardAction("createBrandCard")
            }
            onSecondaryButtonClick={() =>
              handleCardAction("productConfigurationCard")
            }
            onPrimaryButtonClick={(data) => {
              onAction(
                state.selectedProduct ? "updateProduct" : "createProduct",
                data,
              );
            }}
          />
        </div>
      )}
      {state.activeCards.includes("createCategoryCard") && (
        <div
          ref={(el) => {
            cardRefs.current["createCategoryCard"] = el;
          }}
        >
          <CreateProductCategoryCard
            isLoading={state.isCreateCategoryCardLoading}
            category={productsState.category}
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards.includes("createBrandCard") && (
        <div
          ref={(el) => {
            cardRefs.current["createBrandCard"] = el;
          }}
        >
          <CreateProductBrandCard
            isLoading={state.isCreateBrandCardLoading}
            brand={productsState.brand}
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards.includes("productPhotosCard") && (
        <div
          ref={(el) => {
            cardRefs.current["productPhotosCard"] = el;
          }}
        >
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
        <div
          ref={(el) => {
            cardRefs.current["connectImageCard"] = el;
          }}
        >
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
        <div
          ref={(el) => {
            cardRefs.current["chooseVariantTraitsCard"] = el;
          }}
        >
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
            typesOfTraits={productsState.typesOfTraits}
            onSecondaryButtonClick={() =>
              handleCardAction("productTraitConfigurationCard")
            }
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
            traits={productsState.listOfTraitsWithOptionsForProduct}
            isDuplicateVariant={state.isDuplicateVariant}
            onAction={onAction}
          />
        </div>
      )}
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
            onGenerateProductCode={productsService.generateProductCodeHandler}
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
            variant={productsState.selectedVariant}
            getVariantHistory={productsService.getVariantStockHistoryHandler}
            onSecondaryButtonClick={() =>
              handleCardAction("variantHistoryCard")
            }
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
      {state.activeCards.includes("manageTraitsCard") && (
        <div
          ref={(el) => {
            cardRefs.current["manageTraitsCard"] = el;
          }}
        >
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
