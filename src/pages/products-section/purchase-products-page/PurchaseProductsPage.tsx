import { useNavigate, useParams } from "react-router-dom";
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
import ManageProductCard from "@/components/complex/grid/manage-product-card/ManageProductCard.tsx";
import ProductPhotosCard from "@/components/complex/custom-cards/product-photos-card/ProductPhotosCard.tsx";
import { GridModel } from "@/const/models/GridModel.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import ConnectImageCard from "@/components/complex/custom-cards/connect-image-card/ConnectImageCard.tsx";
import { setSelectedGridItem } from "@/utils/helpers/quick-helper.ts";
import ChooseVariantTraitsCard from "@/components/complex/custom-cards/choose-variant-traits-card/ChooseVariantTraitsCard.tsx";
import ProductTraitConfigurationCard from "@/components/complex/custom-cards/product-trait-configuration-card/ProductTraitConfigurationCard.tsx";
import AddVariantCard from "@/components/complex/custom-cards/add-variant-card/AddVariantCard.tsx";

export function PurchaseProductsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
  }, [purchaseId]);

  useEffect(() => {
    dispatch(actions.setIsPurchaseProductsCardLoading(true));
    dispatch(actions.setIsPurchasesProductsGridLoading(true));
    service
      .getListOfPurchaseProductsForGridHandler(
        purchaseId,
        state.purchasesProductsGridRequestModel,
      )
      .then(() => {
        dispatch(actions.setIsPurchaseProductsCardLoading(false));
        dispatch(actions.setIsPurchasesProductsGridLoading(false));
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

  useEffect(() => {
    handleCardAction("purchaseProductsCard", true);
  }, []);

  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "addProductToPurchase":
        console.log(payload);
        service
          .addVariantToPurchaseProductsHandler(purchaseId, {
            variantId: payload.variantId,
            ...payload.data,
          })
          .then((res) => {
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
        handleMultipleCardActions({
          manageProductCard: false,
          purchaseProductsCard: true,
        });
        break;
      case "openManageProductCard":
        handleCardAction("manageProductCard");
        dispatch(actions.setIsManageProductCardLoading(true));
        productsService
          .getListOfTraitsWithOptionsForProductHandler(
            productsState.selectedProduct.productId,
          )
          .then((res) => {
            dispatch(actions.setIsManageProductCardLoading(false));
            dispatch(
              productsActions.refreshListOfTraitsWithOptionsForProduct(
                res.data,
              ),
            );
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
        dispatch(actions.refreshSelectedTraitsIds(payload));
        dispatch(actions.setIsChooseVariantTraitsCardLoading(true));
        productsService
          .setProductTraitsHandler(
            productsState.selectedProduct.productId,
            payload,
          )
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
        handleMultipleCardActions({
          purchaseProductsCard: false,
          manageProductCard: true,
          addVariantCard: true,
        });
        dispatch(actions.setIsManageProductCardLoading(true));
        Promise.all([
          productsService.getProductDetailsHandler(payload.productId),
          productsService.getListOfTraitsWithOptionsForProductHandler(
            payload.productId,
          ),
        ]).then(([productDetails, productTraits]) => {
          dispatch(actions.setIsManageProductCardLoading(false));
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
        onAction={handleCardAction}
      />
      {state.activeCards?.includes("purchaseProductsCard") && (
        <div
          ref={(el) => {
            cardRefs.current["purchaseProductsCard"] = el;
          }}
        >
          <PurchaseProductsCard
            isLoading={state.isPurchaseProductsCardLoading}
            isPurchaseProductsGridLoading={state.isPurchaseProductsGridLoading}
            isProductsGridLoading={state.isProductsGriLoading}
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
            brandsList={state.brands}
            categoriesList={state.categories}
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
    </div>
  );
}
