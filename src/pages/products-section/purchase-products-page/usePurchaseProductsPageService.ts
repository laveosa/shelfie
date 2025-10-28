import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  formatDate,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";
import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";
import { PurchaseProductsPageSliceActions as actions } from "@/state/slices/PurchaseProductsPageSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { useToast } from "@/hooks/useToast.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import useProductBasicDataPageService from "@/pages/products-section/product-basic-data-page/useProductBasicDataPageService.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";
import CompaniesApiHooks from "@/utils/services/api/CompaniesApiService.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { LocationModel } from "@/const/models/LocationModel.ts";

export default function usePurchaseProductsPageService(
  handleCardAction,
  handleMultipleCardActions,
  keepOnlyCards,
) {
  const state = useAppSelector<IPurchaseProductsPageSlice>(
    StoreSliceEnum.PURCHASE_PRODUCTS,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const productsService = useProductsPageService();
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { openConfirmationDialog } = useDialogService();
  const productsBasicDataService =
    useProductBasicDataPageService(handleCardAction);
  const { t } = useTranslation();

  const [getListOfPurchaseProductsForGrid] =
    PurchasesApiHooks.useGetListOfPurchaseProductsForGridMutation();
  const [addVariantToPurchaseProducts] =
    PurchasesApiHooks.useAddVariantToPurchaseProductsMutation();
  const [updatePurchaseProduct] =
    PurchasesApiHooks.useUpdatePurchaseProductMutation();
  const [deleteStockAction] = PurchasesApiHooks.useDeleteStockActionMutation();
  const [getPurchaseSummary] =
    PurchasesApiHooks.useLazyGetPurchaseSummaryQuery();
  const [deletePhoto] = AssetsApiHooks.useDeletePhotoMutation();
  const [attachProductPhotoToVariant] =
    ProductsApiHooks.useAttachProductPhotoToVariantMutation();
  const [detachVariantPhoto] = ProductsApiHooks.useDetachVariantPhotoMutation();
  const [setPhotoActivationState] =
    AssetsApiHooks.useSetPhotoActivationStateMutation();
  const [getListOfPurchasesForGrid] =
    PurchasesApiHooks.useGetListOfPurchasesForGridMutation();
  const [getPurchaseDetails] =
    PurchasesApiHooks.useLazyGetPurchaseDetailsQuery();
  const [createPurchaseForSupplier] =
    PurchasesApiHooks.useCreatePurchaseForSupplierMutation();
  const [getListOfCompaniesForGrid] =
    CompaniesApiHooks.useGetListOfCompaniesForGridMutation();
  // const [getListOfCompaniesWithLocationsForGrid] =
  //   CompaniesApiHooks.useGetListOfCompaniesWithLocationsForGridMutation();
  const [getVariantsForGrid] = ProductsApiHooks.useGetVariantsForGridMutation();
  const [getCountryCode] = DictionaryApiHooks.useLazyGetCountryCodeQuery();
  const [addNewLocationToCompany] =
    CompaniesApiHooks.useAddNewLocationToCompanyMutation();
  const [createCompany] = CompaniesApiHooks.useCreateCompanyMutation();
  const [getCompanyDetails] = CompaniesApiHooks.useLazyGetCompanyDetailsQuery();
  const [deleteCompany] = CompaniesApiHooks.useDeleteCompanyMutation();
  const [addLocationToCompany] =
    CompaniesApiHooks.useAddLocationToCompanyMutation();
  const [uploadPhoto] = AssetsApiHooks.useUploadPhotoMutation();
  const [updateCompanyDetails] =
    CompaniesApiHooks.useUpdateCompanyDetailsMutation();
  const [changePositionOfCompanyPhoto] =
    CompaniesApiHooks.useChangePositionOfCompanyPhotoMutation();
  const [changePositionOfLocationPhoto] =
    CompaniesApiHooks.useChangePositionOfLocationPhotoMutation();
  const [updateLocationDetails] =
    CompaniesApiHooks.useUpdateLocationDetailsMutation();
  const [deleteLocation] = CompaniesApiHooks.useDeleteLocationMutation();

  function getListOfPurchaseProductsForGridHandler(id: any, model) {
    return getListOfPurchaseProductsForGrid({ id, model }).then((res: any) => {
      dispatch(actions.refreshPurchasesProductsGridRequestModel(res.data));
      dispatch(actions.refreshPurchaseProducts(res.data.items));
      return res.data;
    });
  }

  function addVariantToPurchaseProductsHandler(id: any, model) {
    return addVariantToPurchaseProducts({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function updatePurchaseProductApiHandler(id: any, model) {
    return updatePurchaseProduct({ id, model }).then((res: any) => {
      return res;
    });
  }

  function deleteStockActionApiHandler(stockActionId: any) {
    return deleteStockAction(stockActionId).then((res: any) => {
      return res.data;
    });
  }

  function getPurchaseSummaryHandler(purchaseId: any) {
    return getPurchaseSummary(purchaseId).then((res: any) => {
      dispatch(actions.refreshPurchaseSummary(res.data));
      return res.data;
    });
  }

  function getPurchaseProductsPageDataHandler(purchaseId) {
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
  }

  function getPurchasesProductsGridDataHandler(purchaseId) {
    if (!productsState.createdPurchase) {
      dispatch(actions.setIsPurchasesProductsGridLoading(true));
      Promise.all([
        getListOfPurchaseProductsForGridHandler(
          purchaseId,
          state.purchasesProductsGridRequestModel,
        ),
        getPurchaseSummaryHandler(purchaseId),
      ]).then(() => {
        dispatch(actions.setIsPurchasesProductsGridLoading(false));
      });
    }
    dispatch(actions.refreshPurchasesProductsGridRequestModel({}));
  }

  function getVariantsForPurchaseGridDataHandler() {
    if (Object.keys(state.variantsForPurchaseGridRequestModel).length === 0) {
      dispatch(actions.setIsVariantsForPurchaseGridLoading(true));
      getVariantsForGrid(state.variantsForPurchaseGridRequestModel).then(
        (res) => {
          dispatch(actions.setIsVariantsForPurchaseGridLoading(false));
          dispatch(
            actions.refreshVariantsForPurchaseGridRequestModel(res.data),
          );
          dispatch(actions.refreshVariants(res.data.items));
        },
      );
    }
  }

  function getGridFiltersDataHandler() {
    if (productsState.brands.length === 0) {
      productsService.getBrandsForFilterHandler();
    }
    if (productsState.categories.length === 0) {
      productsService.getCategoriesForFilterHandler();
    }
    getCountryCodesHandler();
    if (
      state.sizesForFilter.length === 0 ||
      state.colorsForFilter.length === 0
    ) {
      productsService.getTraitsForFilterHandler();
    }
    dispatch(actions.refreshActiveCards(null));
  }

  function getCountryCodesHandler() {
    if (state.countryCodes.length === 0) {
      getCountryCode().then((res: any) => {
        dispatch(actions.refreshCountryCodes(res.data));
      });
    }
  }

  function addProductToPurchaseHandler(model, purchaseId) {
    addVariantToPurchaseProductsHandler(purchaseId, {
      variantId: model.variantId,
      ...model.data,
    }).then((res) => {
      if (res) {
        productsService.getPurchaseCountersHandler(Number(purchaseId));
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
  }

  function updatePurchaseProductHandler(model, purchaseId) {
    dispatch(
      actions.refreshPurchasesProductsGridRequestModel({
        ...state.purchasesProductsGridRequestModel,
        items: state.purchasesProductsGridRequestModel.items.map((item) =>
          item.stockActionId === model.stockActionId
            ? {
                ...item,
                unitsAmount: model.data.unitsAmount,
                stockDocumentPrice: {
                  ...item.stockDocumentPrice,
                  currencyId: model.data.currencyId,
                  taxTypeId: model.data.taxTypeId,
                  netto: model.data.nettoPrice,
                },
              }
            : item,
        ),
      }),
    );
    updatePurchaseProductApiHandler(model.stockActionId, model.data).then(
      (res) => {
        if (!res.error) {
          (getPurchaseSummaryHandler(purchaseId),
            addToast({
              text: "Product updated successfully",
              type: "success",
            }));
        } else {
          (getListOfPurchaseProductsForGridHandler(
            purchaseId,
            state.purchasesProductsGridRequestModel,
          ),
            addToast({
              text: `${res.error.data.detail}`,
              type: "error",
            }));
        }
      },
    );
  }

  function openCreateProductCardHandler() {
    dispatch(actions.resetSelectedProduct());
    handleMultipleCardActions({
      purchaseProductsCard: false,
      productConfigurationCard: true,
    });
  }

  function submitProductDataHandler(model: ProductModel) {
    dispatch(actions.setIsProductConfigurationCardLoading(true));
    productsService.createNewProductHandler(model).then((res) => {
      dispatch(actions.setIsProductConfigurationCardLoading(false));
      if (!res.error) {
        handleMultipleCardActions({
          productConfigurationCard: false,
          manageProductCard: true,
        });
        dispatch(actions.refreshSelectedProduct(res.data));
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
  }

  function openCreateProductCategoryCardHandler() {
    handleCardAction("createCategoryCard", true);
  }

  function checkCategoryNameHandler(model) {
    productsBasicDataService.checkCategoryNameHandler(model);
  }

  function createProductCategoryHandler(model: CategoryModel) {
    productsBasicDataService.createNewCategoryHandler(model);
    handleCardAction("createCategoryCard");
  }

  function openCreateProductBrandCardHandler() {
    handleCardAction("createBrandCard", true);
  }

  function checkBrandNameHandler(model) {
    productsBasicDataService.checkBrandNameHandler(model);
  }

  function createProductBrandHandler(model: BrandModel) {
    productsBasicDataService.createBrandHandler(model);
    handleCardAction("createBrandCard");
  }

  function uploadCategoryOrBrandPhotoHandler(model) {
    productsBasicDataService.uploadCategoryOrBrandPhotoHandler(model);
  }

  function closeProductConfigurationCardHandler() {
    if (!state.activeCards.includes("manageProductCard")) {
      keepOnlyCards(["purchaseProductsCard"]);
    } else {
      handleCardAction("productConfigurationCard");
    }
  }

  function generateProductCodeHandler() {
    productsBasicDataService.generateProductCodeHandler();
  }

  function checkProductCodeHandler(code: string) {
    productsService.checkProductCodeHandler({ code: code });
  }

  function openPurchaseProductsCardHandler(purchaseId) {
    keepOnlyCards(["purchaseProductsCard"]);
    dispatch(actions.setIsPurchasesProductsGridLoading(true));
    Promise.all([
      getListOfPurchaseProductsForGridHandler(
        purchaseId,
        state.purchasesProductsGridRequestModel,
      ),
      getPurchaseSummaryHandler(purchaseId),
    ]).then(() => {
      dispatch(actions.setIsPurchasesProductsGridLoading(false));
    });
  }

  function openManageProductCardHandler() {
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
      dispatch(
        actions.refreshPurchaseProductVariantsGridRequestModel(variants),
      );
      dispatch(actions.refreshPurchaseProductVariants(variants.items));
    });
  }

  function manageProductDataHandler() {
    handleCardAction("productConfigurationCard", true);
  }

  function manageProductPhotosHandler() {
    handleCardAction("productPhotosCard", true);
    dispatch(actions.setIsProductPhotosCardLoading(true));
    productsService
      .getProductPhotosHandler(Number(state.selectedProduct.productId))
      .then(() => {
        dispatch(actions.setIsProductPhotosCardLoading(false));
      });
  }

  function uploadPhotoHandler(model: UploadPhotoModel) {
    dispatch(actions.setIsPhotoUploaderLoading(true));
    return uploadPhoto(model).then((res: any) => {
      if (res.error) {
        addToast({
          text: res.error.data?.detail || "Upload failed",
          type: "error",
        });
        return res;
      }
      if (res.data.photoId) {
        dispatch(actions.setIsPhotoUploaderLoading(false));
        if (model.contextName === "Company") {
          dispatch(actions.setIsSuppliersGridLoading(true));
          getListOfCompaniesForGrid(state.companiesGridRequestModel).then(
            (res) => {
              dispatch(actions.setIsSuppliersGridLoading(false));
              const modifiedList = res.data.items.map((item) => ({
                ...item,
                isSelected: item.companyId === state.selectedCompany?.companyId,
              }));
              dispatch(
                actions.refreshCompaniesGridRequestModel({
                  ...res.data,
                  items: modifiedList,
                }),
              );
            },
          );
          dispatch(
            actions.refreshManagedCompany({
              ...state.managedCompany,
              photos: [...(state.managedCompany.photos || []), res.data],
            }),
          );
        } else {
          dispatch(
            actions.refreshManagedLocation({
              ...state.managedLocation,
              photos: [...(state.managedLocation.photos || []), res.data],
            }),
          );
        }
        addToast({
          text: "Photos added successfully",
          type: "success",
        });
      }

      return res;
    });
  }

  function changePhotoPositionHandler(model) {
    switch (model.contextName) {
      case "Company":
        changePositionOfCompanyPhoto({
          companyId: state.managedCompany.companyId,
          photoId: model.activeItem.photoId,
          index: model.newIndex,
        }).then((res) => {
          if (!res.error) {
            getCompanyDetails(state.managedCompany.companyId).then((res) => {
              dispatch(actions.refreshManagedCompany(res.data));
            });
            if (model.newIndex === 0 || model.oldIndex === 0) {
              dispatch(actions.setIsSuppliersGridLoading(true));
              getListOfCompaniesForGrid(state.companiesGridRequestModel).then(
                (res) => {
                  dispatch(actions.setIsSuppliersGridLoading(false));
                  const modifiedList = res.data.items.map((item) => ({
                    ...item,
                    isSelected:
                      item.companyId === state.selectedCompany?.companyId,
                  }));
                  dispatch(
                    actions.refreshCompaniesGridRequestModel({
                      ...res.data,
                      items: modifiedList,
                    }),
                  );
                },
              );
            }
          }
        });
        break;
      case "Location":
        changePositionOfLocationPhoto({
          locationId: state.managedLocation.locationId,
          photoId: model.activeItem.photoId,
          index: model.newIndex,
        }).then((res) => {
          if (!res.error) {
            getCompanyDetails(state.managedCompany.companyId).then((res) => {
              dispatch(actions.refreshManagedCompany(res.data));
            });
          }
        });
        break;
      default:
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
  }

  async function deletePhotoHandler(model) {
    const confirmed = await openConfirmationDialog({
      headerTitle: "Deleting product photo",
      text: "You are about to delete product photo.",
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmed) return;

    deletePhoto(model.photoId).then((res: any) => {
      if (res) {
        dispatch(
          productsActions.refreshProductPhotos(
            productsState.productPhotos.filter(
              (photo) => photo.photoId !== model.photoId,
            ),
          ),
        );
        addToast({
          text: "Photo deleted successfully",
          type: "success",
        });
      } else {
        addToast({
          text: "Photo not deleted",
          type: "error",
        });
      }
    });
  }

  function setPhotoActivationStateHandler(imageModel: ImageModel) {
    return setPhotoActivationState({
      contextName: "Product",
      contextId: state.selectedProduct.productId,
      photoId: imageModel.photoId,
      model: { isActive: !imageModel.isActive },
    }).then((res) => {
      if (!res.error) {
        dispatch(
          productsActions.refreshProductPhotos(
            productsState.productPhotos.map((photo) =>
              photo.photoId === imageModel.photoId
                ? { ...photo, isActive: !imageModel.isActive }
                : photo,
            ),
          ),
        );
      }
    });
  }

  function closeProductPhotosCardHandler() {
    handleCardAction("productPhotosCard");
  }

  function openConnectImageCardHandler(model) {
    dispatch(
      productsActions.refreshProductPhotos(
        setSelectedGridItem(
          model.photoId,
          productsState.productPhotos,
          "photoId",
        ),
      ),
    );
    dispatch(actions.refreshSelectedPhoto(model));
    dispatch(
      productsActions.refreshProductVariants(
        productsState.productVariants.map((variant) => {
          const isInSelectedPhoto = model.variants?.some(
            (photoVariant) => photoVariant.variantId === variant.variantId,
          );

          return {
            ...variant,
            isActive: isInSelectedPhoto,
          };
        }),
      ),
    );
    handleCardAction("connectImageCard", true);
  }

  function imageActionsHandler(model) {
    if (!model.row.original.isActive) {
      attachImageToVariantHandler(model);
    } else {
      detachImageFromVariantHandler(model);
    }
  }

  function attachImageToVariantHandler(model) {
    return attachProductPhotoToVariant({
      variantId: model.row.original.variantId,
      photoId: state.selectedPhoto.photoId,
    }).then((res) => {
      if (!res.error) {
        const updatedVariants = productsState.productVariants.map((variant) => {
          if (variant.variantId === model.row.original.variantId) {
            return {
              ...variant,
              isActive: true,
            };
          }
          return variant;
        });
        dispatch(productsActions.refreshProductVariants(updatedVariants));
      }
    });
  }

  function detachImageFromVariantHandler(model) {
    return detachVariantPhoto({
      id: model.row.original.variantId,
      photoId: state.selectedPhoto.photoId,
    }).then((res: any) => {
      if (!res.error) {
        const updatedVariants = productsState.productVariants.map((variant) => {
          if (variant.variantId === model.row.original.variantId) {
            return {
              ...variant,
              isActive: false,
            };
          }
          return variant;
        });
        dispatch(productsActions.refreshProductVariants(updatedVariants));
      }
    });
  }

  function closeConnectImageCardHandler() {
    handleCardAction("connectImageCard");
  }

  function manageProductTraitsHandler() {
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
  }

  function addTraitHandler() {
    dispatch(actions.setIsProductTraitConfigurationCardLoading(true));
    dispatch(actions.resetSelectedTrait());
    productsService.getListOfTypesOfTraitsHandler().then(() => {
      dispatch(actions.setIsProductTraitConfigurationCardLoading(false));
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
    ]).then(([trait, options, _types]) => {
      dispatch(actions.setIsProductTraitConfigurationCardLoading(false));
      dispatch(actions.setIsTraitOptionsGridLoading(false));
      dispatch(actions.refreshSelectedTrait(trait));
      dispatch(
        actions.refreshColorOptionsGridRequestModel({
          ...state.colorOptionsGridRequestModel,
          items: options.filter((option) => !option.isDeleted),
        }),
      );
    });
  }

  function setProductTraitsHandler(model) {
    dispatch(actions.refreshSelectedTraitsIds(model));
    dispatch(actions.setIsChooseVariantTraitsCardLoading(true));
    productsService
      .setProductTraitsHandler(state.selectedProduct.productId, model)
      .then((res) => {
        dispatch(actions.setIsChooseVariantTraitsCardLoading(false));
        if (res) {
          handleMultipleCardActions({
            chooseVariantTraitsCard: false,
            productTraitConfigurationCard: false,
          });
          productsService.getListOfTraitsWithOptionsForProductHandler(
            state.selectedProduct.productId,
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
  }

  async function deleteTraitHandler(model) {
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
      handleCardAction("productTraitConfigurationCard");
    }
  }

  function createTraitHandler(model) {
    dispatch(actions.setIsProductTraitConfigurationCardLoading(true));
    productsService.createNewTraitHandler(model).then((res) => {
      dispatch(actions.setIsProductTraitConfigurationCardLoading(false));
      if (res) {
        dispatch(actions.refreshSelectedTrait(res));
        productsService.getOptionsForTraitHandler(res.traitId).then((res) => {
          dispatch(
            actions.refreshColorOptionsGridRequestModel({
              ...state.colorOptionsGridRequestModel,
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
  }

  function updateTraitHandler(model) {
    dispatch(actions.setIsProductTraitConfigurationCardLoading(true));
    productsService
      .updateTraitHandler(state.selectedTrait.traitId, model)
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
  }

  function updateOptionHandler(model) {
    productsService
      .updateOptionsForTraitHandler(model.optionId, model.updatedModel)
      .then((res) => {
        if (res) {
          dispatch(
            actions.refreshColorOptionsGridRequestModel({
              ...state.colorOptionsGridRequestModel,
              items: state.colorOptionsGridRequestModel.items.map((item) =>
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

  function addOptionHandler() {
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
            actions.refreshColorOptionsGridRequestModel({
              ...state.colorOptionsGridRequestModel,
              items: [...state.colorOptionsGridRequestModel.items, res],
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
          dispatch(productsActions.refreshTraits(res));
        });

        dispatch(
          actions.refreshColorOptionsGridRequestModel({
            ...state.colorOptionsGridRequestModel,
            items: state.colorOptionsGridRequestModel.items.filter(
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

  function closeProductTraitConfigurationCardHandler() {
    handleCardAction("productTraitConfigurationCard");
  }

  function openAddVariantCardHandler(model) {
    handleCardAction("addVariantCard", true);
    dispatch(actions.setIsAddVariantCardLoading(true));
    productsService
      .getListOfTraitsWithOptionsForProductHandler(model.productId)
      .then(() => {
        dispatch(actions.setIsAddVariantCardLoading(false));
      });
  }

  function addVariantGridActionHandler(model) {
    keepOnlyCards(["manageProductCard"]);
    dispatch(actions.setIsProductConfigurationCardLoading(true));
    dispatch(actions.setIsVariantGridLoading(true));
    Promise.all([
      productsService.getProductDetailsHandler(model.productId),
      productsService.getListOfTraitsWithOptionsForProductHandler(
        model.productId,
      ),
      productsService.getPurchaseProductVariantsHandler(
        productsState.selectedPurchase.purchaseId,
        model.productId,
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
  }

  function addVariantHandler(model, purchaseId) {
    dispatch(actions.setIsAddVariantCardLoading(true));
    productsService
      .checkVariantCombinationHandler(state.selectedProduct.productId, model)
      .then((res) => {
        if (res) {
          productsService
            .createVariantHandler(state.selectedProduct.productId, model)
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
  }

  function addDuplicatedVariantHandler(model, purchaseId) {
    dispatch(actions.setIsAddVariantCardLoading(true));
    productsService
      .createVariantHandler(state.selectedProduct.productId, model)
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
  }

  function closeAddVariantCardHandler() {
    dispatch(actions.refreshIsDuplicateVariant(false));
    handleCardAction("addVariantCard");
  }

  function addStockActionHandler(model) {
    addVariantToPurchaseProductsHandler(model.purchase.purchaseId, {
      ...model.formData,
      variantId: model.row.original.variantId,
    }).then((res) => {
      if (!res.error) {
        dispatch(
          actions.refreshPurchaseProductVariants(
            state.purchaseProductVariants.map((item) =>
              item.variantId === model.row.original.variantId
                ? {
                    ...item,
                    variantStockActions: [
                      ...(item.variantStockActions || []),
                      res,
                    ],
                  }
                : item,
            ),
          ),
        );
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
  }

  function updateStockActionHandler(model) {
    updatePurchaseProductApiHandler(
      model.stockAction.stockActionId,
      model.formData,
    ).then((res) => {
      if (!res.error) {
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
  }

  function deleteStockActionHandler(model, purchaseId) {
    dispatch(actions.setIsVariantGridLoading(true));
    deleteStockActionApiHandler(model.stockActionId).then((res) => {
      dispatch(actions.setIsVariantsGridLoading(false));
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
        getListOfPurchaseProductsForGridHandler(
          purchaseId,
          state.purchasesProductsGridRequestModel,
        );
        dispatch(
          actions.refreshPurchaseSummary({
            ...state.purchaseSummary,
            unitsAmount: res.unitsAmount,
            expense: res.expense,
            valueAmount: res.valueAmount,
          }),
        );
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
  }

  function deleteStockActionInGridHandler(model) {
    deleteStockActionApiHandler(model.stockActionId).then((res) => {
      if (!res.error) {
        dispatch(
          actions.refreshPurchaseProducts(
            state.purchaseProducts.filter(
              (product) => product.stockActionId !== model.stockActionId,
            ),
          ),
        );
        dispatch(
          actions.refreshPurchaseSummary({
            ...state.purchaseSummary,
            unitsAmount: res.unitsAmount,
            expense: res.expense,
            valueAmount: res.valueAmount,
          }),
        );
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
  }

  function manageVariantHandler(model) {
    keepOnlyCards(["manageProductCard", "variantConfigurationCard"]);
    dispatch(actions.setIsVariantConfigurationCardLoading(true));
    dispatch(actions.setIsVariantOptionsGridLoading(true));
    dispatch(actions.setIsVariantPhotoGridLoading(true));
    Promise.all([
      productsService.getVariantDetailsHandler(model.variantId),
      productsService.getProductDetailsHandler(model.productId),
      productsService.getListOfTraitsWithOptionsForProductHandler(
        model.productId,
      ),
      productsService.getPurchaseProductVariantsHandler(
        productsState.selectedPurchase.purchaseId,
        model.productId,
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
          .getProductPhotosForVariantHandler(model.productId, model.variantId)
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
  }

  function updateVariantDetailsHandler(model) {
    dispatch(actions.setIsVariantConfigurationCardLoading(true));
    productsService
      .updateVariantDetailsHandler(model.variant.variantId, model.formattedData)
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
  }

  function updateVariantTraitOptionsHandler(model) {
    dispatch(actions.setIsManageTraitsCardLoading(true));
    productsService
      .updateVariantTraitOptionsHandler(
        model.variant.variantId,
        model.submissionData,
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

  function uploadPhotoToVariantHandler(model) {
    dispatch(actions.setIsVariantPhotosCardLoading(true));
    uploadPhoto(model).then((res: any) => {
      dispatch(actions.setIsVariantPhotosCardLoading(false));
      if (!res.error) {
        dispatch(
          actions.refreshVariantPhotos([...state.variantPhotos, res.data]),
        );
        dispatch(
          productsActions.refreshSelectedVariant({
            ...productsState.selectedVariant,
            photos: [...productsState.selectedVariant.photos, res.data],
          }),
        );
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
            const currentVariantPhotos = state.variantPhotos ?? [];

            const nextVariantPhotos = currentVariantPhotos.some(
              (p) => p.photoId === photoToMove.photoId,
            )
              ? currentVariantPhotos
              : [...currentVariantPhotos, photoToMove];

            dispatch(actions.refreshVariantPhotos(nextVariantPhotos));

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
          const currentVariantPhotos = state.variantPhotos ?? [];
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
            dispatch(actions.refreshVariantPhotos(nextVariantPhotos));
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

  function dndVariantPhotoHandler(model) {
    productsService
      .changePhotoPositionForVariantHandler(
        productsState.selectedVariant.variantId,
        model.activeItem.photoId,
        model.newIndex,
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
    dispatch(actions.setIsVariantHistoryGridLoading(true));
    Promise.all([
      productsService.getVariantStockHistoryHandler(model),
      productsService.getVariantDetailsHandler(model),
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
  }

  function openManageTraitsCardHandler() {
    handleCardAction("manageTraitsCard", true);
  }

  function closeCreateProductCategoryCardHandler() {
    handleCardAction("createCategoryCard");
  }

  function closeCreateProductBrandCardHandler() {
    handleCardAction("createBrandCard");
  }

  function openVariantPhotosCardHandler() {
    handleCardAction("variantPhotosCard", true);
  }

  function closeVariantPhotosCardHandler() {
    handleCardAction("variantPhotosCard");
  }

  function closeVariantConfigurationCardHandler() {
    handleCardAction("variantConfigurationCard");
  }

  function closeVariantHistoryCardHandler() {
    handleCardAction("variantHistoryCard");
  }

  function navigateToManageVariantHandler(model) {
    productsService.getVariantDetailsHandler(model.variantId).then((res) => {
      dispatch(productsActions.refreshSelectedVariant(res));
      dispatch(productsActions.refreshVariantPhotos(res.photos));
      dispatch(productsActions.refreshActiveTab("products"));
      navigate(
        `${NavUrlEnum.PRODUCTS}${NavUrlEnum.MANAGE_VARIANTS}/${model?.productId}`,
      );
    });
  }

  function selectPurchaseHandler(payload: PurchaseModel) {
    handleCardAction("selectPurchaseCard");
    dispatch(actions.refreshSelectedPurchase(payload));
  }

  function searchSupplierHandler(model) {
    dispatch(actions.setIsPurchaseGridLoading(true));
    getListOfPurchasesForGrid({
      ...state.purchaseGridRequestModel,
      searchQuery: model,
    }).then((res) => {
      if (res.error) return;
      const modifiedList = res.data.items.map((item) => ({
        ...item,
        isSelected: item.purchaseId === state.selectedPurchase?.purchaseId,
      }));

      dispatch(
        actions.refreshPurchaseGridRequestModel({
          ...res.data,
          items: modifiedList,
        }),
      );
    });
  }

  function filterSuppliersByDateHandle(model) {
    dispatch(actions.setIsPurchaseGridLoading(true));
    getListOfPurchasesForGrid({
      ...state.purchaseGridRequestModel,
      filter: model,
    }).then((res) => {
      if (res.error) return;
      const modifiedList = res.data.items.map((item) => ({
        ...item,
        isSelected: item.purchaseId === state.selectedPurchase?.purchaseId,
      }));

      dispatch(
        actions.refreshPurchaseGridRequestModel({
          ...res.data,
          items: modifiedList,
        }),
      );
    });
  }

  function createPurchaseForSupplierHandler(model) {
    dispatch(actions.setIsSupplierCardLoading(true));
    return createPurchaseForSupplier({
      date: model.selectedDate,
      supplierId: state.selectedCompany.companyId,
      documentNotes: model.purchaseNotes,
    }).then((res: any) => {
      dispatch(actions.refreshSelectedPurchase(res.data));
      dispatch(actions.setIsSupplierCardLoading(false));
      if (res) {
        addToast({
          text: t("SuccessMessages.PurchaseCreated"),
          type: "success",
        });
      } else {
        addToast({
          text: res.error.message,
          type: "error",
        });
      }
    });
  }

  function openSelectPurchaseCardHandler(model) {
    handleCardAction("selectPurchaseCard", true);
    getListOfPurchasesForGrid(model).then((res: any) => {
      if (res.error) return;
      const modifiedList = res.data.items.map((item) => ({
        ...item,
        isSelected: item.purchaseId === state.selectedPurchase?.purchaseId,
      }));

      dispatch(
        actions.refreshPurchaseGridRequestModel({
          ...res.data,
          items: modifiedList,
        }),
      );
    });
  }

  function openSupplierCardHandler() {
    handleCardAction("supplierCard", true);
  }

  function openSelectEntityCardHandler() {
    dispatch(productsActions.resetSelectedSupplier());
    handleCardAction("selectEntityCard", true);
    if (!state.countryCodes) {
      getCountryCodesHandler();
    }
    dispatch(actions.setIsSelectEntityCardLoading(true));
    dispatch(actions.setIsSuppliersGridLoading(true));
    getListOfCompaniesForGrid(state.companiesGridRequestModel).then((res) => {
      dispatch(actions.setIsSelectEntityCardLoading(false));
      dispatch(actions.setIsSuppliersGridLoading(false));
      const modifiedList = res.data.items.map((item) => ({
        ...item,
        isSelected: item.companyId === state.selectedCompany?.companyId,
      }));
      dispatch(
        actions.refreshCompaniesGridRequestModel({
          ...res.data,
          items: modifiedList,
        }),
      );
    });
  }

  function searchEntityHandle(model) {
    dispatch(actions.setIsSuppliersGridLoading(true));
    getListOfCompaniesForGrid({
      ...state.companiesGridRequestModel,
      searchQuery: model,
    }).then((res) => {
      dispatch(actions.setIsSuppliersGridLoading(false));
      const modifiedList = res.data.items.map((item) => ({
        ...item,
        isSelected: item.companyId === state.selectedCompany?.companyId,
      }));
      dispatch(
        actions.refreshCompaniesGridRequestModel({
          ...res.data,
          items: modifiedList,
        }),
      );
    });
  }

  function selectCompanyHandle(model: CompanyModel) {
    handleCardAction("selectEntityCard");
    dispatch(actions.refreshSelectedCompany(model));
  }

  function detachSupplierHandler() {
    handleCardAction("selectEntityCard", true);
    if (state.companiesGridRequestModel === null) {
      dispatch(actions.setIsSelectEntityCardLoading(true));
      dispatch(actions.setIsSuppliersGridLoading(true));
      getListOfCompaniesForGrid(state.companiesGridRequestModel).then((res) => {
        dispatch(actions.setIsSelectEntityCardLoading(false));
        dispatch(actions.setIsSuppliersGridLoading(false));
        const modifiedList = res.data.items.map((item) => ({
          ...item,
          isSelected: item.companyId === state.selectedCompany?.companyId,
        }));
        dispatch(
          actions.refreshCompaniesGridRequestModel({
            ...res.data,
            items: modifiedList,
          }),
        );
      });
    } else {
      const modifiedList = state.companiesGridRequestModel.items.map(
        (item) => ({
          ...item,
          isSelected: item.companyId === state.selectedCompany?.companyId,
        }),
      );
      dispatch(
        actions.refreshCompaniesGridRequestModel({
          ...state.companiesGridRequestModel,
          items: modifiedList,
        }),
      );
    }
  }

  function closeSupplierCardHandler() {
    handleCardAction("supplierCard");
  }

  function closeSelectEntityCardHandler() {
    handleCardAction("selectEntityCard");
  }

  function closeSupplierConfigurationCardHandler() {
    handleCardAction("supplierConfigurationCard");
    // dispatch(actions.resetManagedSupplier());
    // if (state.activeCards.includes("selectEntityCard")) {
    //   dispatch(
    //     actions.refreshSuppliersWithLocations(
    //       clearSelectedGridItems(state.suppliersWithLocations),
    //     ),
    //   );
    // }
  }

  function increaseStockAmountHandler(model) {
    dispatch(actions.setIsAddStockCardLoading(true));
    addVariantToPurchaseProducts({
      id: model.purchaseId,
      model: model.priceModel,
    }).then((res: any) => {
      dispatch(actions.setIsAddStockCardLoading(false));
      getPurchaseDetails(model.purchaseId).then((res: any) => {
        dispatch(actions.refreshSelectedPurchase(res.data));
      });
      if (res) {
        handleCardAction("addStockCard");
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

  function closeAddStockCardHandler() {
    handleCardAction("addStockCard");
    dispatch(actions.resetSelectedPurchase());
  }

  function refreshPurchaseProductsTabHandler(purchaseId) {
    getListOfPurchaseProductsForGridHandler(
      purchaseId,
      state.purchasesProductsGridRequestModel,
    );
    getPurchaseSummaryHandler(purchaseId);
  }

  function gridRequestChangeHandler(purchaseId, model) {
    if (model.activeTab === "purchaseProducts") {
      getListOfPurchaseProductsForGridHandler(purchaseId, model.updates);
    } else {
      getVariantsForGrid(model.updates).then((res) => {
        dispatch(actions.refreshVariantsForPurchaseGridRequestModel(res.data));
      });
    }
  }

  function openCreateEntityCardHandler() {
    handleCardAction("createCompanyCard", true);
    getCountryCodesHandler();
  }

  function createCompanyHandler(model) {
    dispatch(actions.setIsCreateCompanyCardLoading(true));
    createCompany(model.company).then((res: any) => {
      if (!res.error) {
        model.image.uploadModels.map((model) => {
          model.contextId = res.data.companyId;
          dispatch(actions.setIsImageUploaderLoading(true));
          uploadPhoto(model).then((res: any) => {
            dispatch(actions.setIsImageUploaderLoading(false));
            if (res) {
              addToast({
                text: t("SuccessMessages.ImageAdded"),
                type: "success",
              });
            } else {
              addToast({
                text: res.error.details.message,
                type: "error",
              });
            }
          });
        });
        addNewLocationToCompany({
          companyId: res.data.companyId,
          model: model.address,
        }).then(() => {
          dispatch(actions.setIsCreateCompanyCardLoading(false));
          handleCardAction("createCompanyCard");
          dispatch(actions.setIsSuppliersGridLoading(true));
          getListOfCompaniesForGrid(state.companiesGridRequestModel).then(
            (res) => {
              dispatch(actions.setIsSuppliersGridLoading(false));
              const modifiedList = res.data.items.map((item) => ({
                ...item,
                isSelected: item.companyId === state.selectedCompany?.companyId,
              }));
              dispatch(
                actions.refreshCompaniesGridRequestModel({
                  ...res.data,
                  items: modifiedList,
                }),
              );
            },
          );
        });
        addToast({
          text: "Company created successfully",
          type: "success",
        });
      } else {
        addToast({
          text: res.error.details.message,
          type: "error",
        });
      }
    });
  }

  function closeCreateCompanyCardHandler() {
    handleCardAction("createCompanyCard");
  }

  function manageCompanyHandler(model: CompanyModel) {
    handleCardAction("companyConfigurationCard", true);
    dispatch(actions.setIsCompanyConfigurationCardLoading(true));
    dispatch(actions.setIsLocationsGridLoading(true));
    getCountryCodesHandler();
    getCompanyDetails(model.companyId).then((res: any) => {
      dispatch(actions.setIsCompanyConfigurationCardLoading(false));
      dispatch(actions.setIsLocationsGridLoading(false));
      dispatch(actions.refreshManagedCompany(res.data));
    });
  }

  function updateCompanyHandler(model: CompanyModel) {
    dispatch(actions.setIsCompanyConfigurationCardLoading(true));
    updateCompanyDetails({
      companyId: state.managedCompany.companyId,
      model,
    }).then((res: any) => {
      dispatch(actions.setIsCompanyConfigurationCardLoading(false));
      if (!res.error) {
        dispatch(actions.refreshManagedCompany(res.data));
        dispatch(actions.setIsSuppliersGridLoading(true));
        getListOfCompaniesForGrid(state.companiesGridRequestModel).then(
          (res) => {
            dispatch(actions.setIsSuppliersGridLoading(false));
            const modifiedList = res.data.items.map((item) => ({
              ...item,
              isSelected: item.companyId === state.selectedCompany?.companyId,
            }));
            dispatch(
              actions.refreshCompaniesGridRequestModel({
                ...res.data,
                items: modifiedList,
              }),
            );
          },
        );
        addToast({
          text: "Company updated successfully",
          type: "success",
        });
      } else {
        addToast({
          text: "Failed to update company",
          type: "error",
        });
      }
    });
  }

  async function deleteCompanyHandler(model: CompanyModel) {
    const confirmedCompanyDeleting = await openConfirmationDialog({
      headerTitle: "Deleting company",
      text: `You are about to delete company ${model.companyName}.`,
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedCompanyDeleting) return;

    dispatch(actions.setIsCompanyConfigurationCardLoading(true));
    deleteCompany(model.companyId).then((res) => {
      if (res.error) {
        addToast({
          text: "Failed to delete company",
          type: "error",
        });
        return;
      } else {
        addToast({
          text: "Company deleted successfully",
          type: "info",
        });
        handleCardAction("companyConfigurationCard");
        dispatch(actions.setIsCompanyConfigurationCardLoading(false));
        dispatch(actions.setIsLocationsGridLoading(false));
        dispatch(actions.resetManagedCompany());
        dispatch(actions.setIsSuppliersGridLoading(true));
        getListOfCompaniesForGrid(state.companiesGridRequestModel).then(
          (res) => {
            dispatch(actions.setIsSuppliersGridLoading(false));
            const modifiedList = res.data.items.map((item) => ({
              ...item,
              isSelected: item.companyId === state.selectedCompany?.companyId,
            }));
            dispatch(
              actions.refreshCompaniesGridRequestModel({
                ...res.data,
                items: modifiedList,
              }),
            );
          },
        );
        if (
          state.selectedCompany.companyId === state.managedCompany.companyId
        ) {
          dispatch(actions.resetSelectedCompany());
        }
      }
    });
  }

  function closeCompanyConfigurationCardHandler() {
    handleCardAction("companyConfigurationCard");
    dispatch(actions.resetManagedCompany());
  }

  function manageCompanyPhotosHandler() {
    handleCardAction("companyPhotosCard", true);
  }

  async function deleteCompanyPhotoHandler(model: ImageModel) {
    const confirmedDeleteCompanyPhoto = await openConfirmationDialog({
      headerTitle: "Deleting company photo",
      text: "You are about to delete company photo.",
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedDeleteCompanyPhoto) return;
    deletePhoto(model.photoId).then((res: any) => {
      const updatedPhotos = state.managedCompany.photos.filter(
        (photo) => photo.photoId !== model.photoId,
      );
      dispatch(
        actions.refreshManagedCompany({
          ...state.managedCompany,
          photos: updatedPhotos,
        }),
      );
      dispatch(actions.setIsSuppliersGridLoading(true));
      getListOfCompaniesForGrid(state.companiesGridRequestModel).then((res) => {
        dispatch(actions.setIsSuppliersGridLoading(false));
        const modifiedList = res.data.items.map((item) => ({
          ...item,
          isSelected: item.companyId === state.selectedCompany?.companyId,
        }));
        dispatch(
          actions.refreshCompaniesGridRequestModel({
            ...res.data,
            items: modifiedList,
          }),
        );
      });
      if (!res.error) {
        addToast({
          text: "Photo deleted successfully",
          type: "success",
        });
      } else {
        addToast({
          text: "Photo not deleted",
          description: res.error.details.message,
          type: "error",
        });
      }
    });
  }

  function closePhotosCardHandler(contextName: string) {
    if (contextName === "Company") {
      handleCardAction("companyPhotosCard");
    } else {
      handleCardAction("locationPhotosCard");
    }
  }

  function openLocationConfigurationCardHandler(model: LocationModel) {
    handleCardAction("locationConfigurationCard", true);
    getCountryCodesHandler();
    if (!model) {
      dispatch(actions.resetManagedLocation());
    } else {
      dispatch(actions.refreshManagedLocation(model));
    }
  }

  function createLocationHandler(model: LocationModel) {
    dispatch(actions.setIsLocationConfigurationCardLoading(true));
    addLocationToCompany({
      companyId: state.managedCompany.companyId,
      model,
    }).then((res: any) => {
      if (!res.error) {
        handleCardAction("locationConfigurationCard");
        dispatch(actions.setIsCompanyConfigurationCardLoading(true));
        dispatch(actions.setIsLocationsGridLoading(true));
        getCompanyDetails(state.managedCompany.companyId).then((res: any) => {
          dispatch(actions.setIsCompanyConfigurationCardLoading(false));
          dispatch(actions.setIsLocationsGridLoading(false));
          dispatch(actions.refreshManagedCompany(res.data));
        });
        addToast({
          text: "Location added successfully",
          type: "success",
        });
      } else {
        addToast({
          text: res.error.data?.detail,
          type: "error",
        });
      }
    });
  }

  function deleteLocationHandler(model: LocationModel) {
    dispatch(actions.setIsLocationConfigurationCardLoading(true));
    deleteLocation(model.locationId).then((res: any) => {
      if (!res.error) {
        handleCardAction("locationConfigurationCard");
        dispatch(actions.setIsCompanyConfigurationCardLoading(true));
        dispatch(actions.setIsLocationsGridLoading(true));
        getCompanyDetails(state.managedCompany.companyId).then((res: any) => {
          dispatch(actions.setIsCompanyConfigurationCardLoading(false));
          dispatch(actions.setIsLocationsGridLoading(false));
          dispatch(actions.refreshManagedCompany(res.data));
        });
        addToast({
          text: "Location deleted successfully",
          type: "success",
        });
      } else {
        addToast({
          text: res.error.data?.detail,
          type: "error",
        });
      }
    });
  }

  function manageLocationPhotosHandler() {
    handleCardAction("locationPhotosCard", true);
  }

  function updateLocationHandler(model: LocationModel) {
    dispatch(actions.setIsLocationConfigurationCardLoading(true));
    updateLocationDetails({
      locationId: state.managedLocation.locationId,
      model,
    }).then((res: any) => {
      dispatch(actions.setIsLocationConfigurationCardLoading(false));
      if (!res.error) {
        dispatch(actions.setIsCompanyConfigurationCardLoading(true));
        getCompanyDetails(state.managedCompany.companyId).then((res: any) => {
          dispatch(actions.setIsCompanyConfigurationCardLoading(false));
          dispatch(actions.refreshManagedCompany(res.data));
        });
        addToast({
          text: "Location updated successfully",
          type: "success",
        });
      } else {
        addToast({
          text: "Failed to update location",
          type: "error",
        });
      }
    });
  }

  async function deleteLocationPhotoHandler(model: ImageModel) {
    const confirmedDeleteLocationPhoto = await openConfirmationDialog({
      headerTitle: "Deleting location photo",
      text: "You are about to delete location photo.",
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedDeleteLocationPhoto) return;
    deletePhoto(model.photoId).then((res: any) => {
      const updatedPhotos = state.managedLocation.photos.filter(
        (photo) => photo.photoId !== model.photoId,
      );
      dispatch(
        actions.refreshManagedLocation({
          ...state.managedLocation,
          photos: updatedPhotos,
        }),
      );
      if (!res.error) {
        addToast({
          text: "Photo deleted successfully",
          type: "success",
        });
      } else {
        addToast({
          text: "Photo not deleted",
          description: res.error.details.message,
          type: "error",
        });
      }
    });
  }

  function closeLocationConfigurationCardHandler() {
    handleCardAction("locationConfigurationCard");
    dispatch(actions.resetManagedLocation());
  }

  function closeSelectPurchaseCardHandler() {
    handleCardAction("selectPurchaseCard");
  }

  return {
    state,
    appState,
    productsState,
    productsService,
    getPurchaseProductsPageDataHandler,
    getPurchasesProductsGridDataHandler,
    getVariantsForPurchaseGridDataHandler,
    getGridFiltersDataHandler,
    addProductToPurchaseHandler,
    updatePurchaseProductHandler,
    openCreateProductCardHandler,
    submitProductDataHandler,
    openCreateProductCategoryCardHandler,
    checkCategoryNameHandler,
    createProductCategoryHandler,
    openCreateProductBrandCardHandler,
    checkBrandNameHandler,
    createProductBrandHandler,
    uploadCategoryOrBrandPhotoHandler,
    closeProductConfigurationCardHandler,
    generateProductCodeHandler,
    checkProductCodeHandler,
    openPurchaseProductsCardHandler,
    openManageProductCardHandler,
    manageProductDataHandler,
    manageProductPhotosHandler,
    uploadPhotoHandler,
    changePhotoPositionHandler,
    deletePhotoHandler,
    setPhotoActivationStateHandler,
    closeProductPhotosCardHandler,
    openConnectImageCardHandler,
    imageActionsHandler,
    attachImageToVariantHandler,
    detachImageFromVariantHandler,
    closeConnectImageCardHandler,
    manageProductTraitsHandler,
    addTraitHandler,
    manageTraitHandler,
    setProductTraitsHandler,
    deleteTraitHandler,
    createTraitHandler,
    updateTraitHandler,
    updateOptionHandler,
    addOptionHandler,
    deleteOptionHandler,
    dndTraitOptionHandler,
    closeProductTraitConfigurationCardHandler,
    openAddVariantCardHandler,
    addVariantGridActionHandler,
    addVariantHandler,
    addDuplicatedVariantHandler,
    closeAddVariantCardHandler,
    addStockActionHandler,
    updateStockActionHandler,
    deleteStockActionHandler,
    deleteStockActionInGridHandler,
    manageVariantHandler,
    updateVariantDetailsHandler,
    updateVariantTraitOptionsHandler,
    disposeFromStockHandler,
    uploadPhotoToVariantHandler,
    addPhotoToVariantHandler,
    detachPhotoFromVariantHandler,
    dndVariantPhotoHandler,
    openAddStockCardHandler,
    openDisposeStockCardHandler,
    openVariantHistoryCardHandler,
    openManageTraitsCardHandler,
    closeCreateProductCategoryCardHandler,
    closeCreateProductBrandCardHandler,
    openVariantPhotosCardHandler,
    closeVariantPhotosCardHandler,
    closeVariantConfigurationCardHandler,
    closeVariantHistoryCardHandler,
    navigateToManageVariantHandler,
    selectPurchaseHandler,
    searchSupplierHandler,
    filterSuppliersByDateHandle,
    openSelectPurchaseCardHandler,
    openSupplierCardHandler,
    openSelectEntityCardHandler,
    searchEntityHandle,
    selectCompanyHandle,
    detachSupplierHandler,
    createPurchaseForSupplierHandler,
    closeSupplierCardHandler,
    closeSelectEntityCardHandler,
    closeSupplierConfigurationCardHandler,
    increaseStockAmountHandler,
    closeAddStockCardHandler,
    refreshPurchaseProductsTabHandler,
    gridRequestChangeHandler,
    openCreateEntityCardHandler,
    createCompanyHandler,
    closeCreateCompanyCardHandler,
    manageCompanyHandler,
    updateCompanyHandler,
    deleteCompanyHandler,
    manageCompanyPhotosHandler,
    closeCompanyConfigurationCardHandler,
    deleteCompanyPhotoHandler,
    closePhotosCardHandler,
    openLocationConfigurationCardHandler,
    createLocationHandler,
    deleteLocationHandler,
    manageLocationPhotosHandler,
    updateLocationHandler,
    deleteLocationPhotoHandler,
    closeLocationConfigurationCardHandler,
    closeSelectPurchaseCardHandler,
  };
}
