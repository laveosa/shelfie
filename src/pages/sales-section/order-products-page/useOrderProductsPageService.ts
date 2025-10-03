import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { IOrderProductsPageSlice } from "@/const/interfaces/store-slices/IOrderProductsPageSlice.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { OrderProductsPageSliceActions as actions } from "@/state/slices/OrderProductsPageSlice";
import { OrdersPageSliceActions as ordersActions } from "@/state/slices/OrdersPageSlice.ts";
import { useToast } from "@/hooks/useToast.ts";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";
import OrdersApiHooks from "@/utils/services/api/OrdersApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";
import CompaniesApiHooks from "@/utils/services/api/CompaniesApiService.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";
import { addGridRowColor, formatDate } from "@/utils/helpers/quick-helper.ts";
import { GridRowsColorsEnum } from "@/const/enums/GridRowsColorsEnum.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { LocationModel } from "@/const/models/LocationModel.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";

export default function useOrderProductsPageService(
  handleCardAction,
  handleMultipleCardActions,
) {
  const state = useSelector(
    (state: RootState): IOrderProductsPageSlice =>
      state[StoreSliceEnum.ORDER_PRODUCTS],
  );
  const ordersState = useSelector(
    (state: RootState): IOrdersPageSlice => state[StoreSliceEnum.ORDERS],
  );
  const ordersService = useOrdersPageService();
  const dispatch = useDispatch<AppDispatch>();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { openConfirmationDialog } = useDialogService();
  const { t } = useTranslation();

  const [addVariantsToOrder] = OrdersApiHooks.useAddVariantsToOrderMutation();
  const [updateStockActionInOrder] =
    OrdersApiHooks.useUpdateStockActionInOrderMutation();
  const [removeStockActionFromOrder] =
    OrdersApiHooks.useRemoveStockActionFromOrderMutation();
  const [changeVariantPosition] =
    ProductsApiHooks.useChangeVariantPositionMutation();
  const [generateProductCode] =
    ProductsApiHooks.useLazyGenerateProductCodeQuery();
  const [deletePhoto] = AssetsApiHooks.useDeletePhotoMutation();
  const [getListOfPurchasesForGrid] =
    PurchasesApiHooks.useGetListOfPurchasesForGridMutation();
  const [addVariantToPurchaseProducts] =
    PurchasesApiHooks.useAddVariantToPurchaseProductsMutation();
  const [getPurchaseDetails] =
    PurchasesApiHooks.useLazyGetPurchaseDetailsQuery();
  const [createPurchaseForSupplier] =
    PurchasesApiHooks.useCreatePurchaseForSupplierMutation();
  const [getListOfCompaniesForGrid] =
    CompaniesApiHooks.useGetListOfCompaniesForGridMutation();
  const [createCompany] = CompaniesApiHooks.useCreateCompanyMutation();
  const [uploadPhoto] = AssetsApiHooks.useUploadPhotoMutation();
  const [addNewLocationToCompany] =
    CompaniesApiHooks.useAddNewLocationToCompanyMutation();
  const [getCountryCode] = DictionaryApiHooks.useLazyGetCountryCodeQuery();
  const [getCompanyDetails] = CompaniesApiHooks.useLazyGetCompanyDetailsQuery();
  const [deleteCompany] = CompaniesApiHooks.useDeleteCompanyMutation();
  const [addLocationToCompany] =
    CompaniesApiHooks.useAddLocationToCompanyMutation();
  const [getVariantDetails] = ProductsApiHooks.useLazyGetVariantDetailsQuery();
  const [getListOfTraitsWithOptionsForProduct] =
    ProductsApiHooks.useLazyGetListOfTraitsWithOptionsForProductQuery();
  const [getTaxesList] = DictionaryApiHooks.useLazyGetTaxesListQuery();
  const [getProductPhotosForVariant] =
    ProductsApiHooks.useLazyGetProductPhotosForVariantQuery();
  const [updateVariantDetails] =
    ProductsApiHooks.useUpdateVariantDetailsMutation();
  const [updateVariantsTraitOptions] =
    ProductsApiHooks.useUpdateVariantTraitOptionsMutation();
  const [deleteVariant] = ProductsApiHooks.useDeleteVariantMutation();
  const [disposeVariantFromStock] =
    ProductsApiHooks.useDisposeVariantFromStockMutation();
  const [attachProductPhotoToVariant] =
    ProductsApiHooks.useAttachProductPhotoToVariantMutation();
  const [detachVariantPhoto] = ProductsApiHooks.useDetachVariantPhotoMutation();
  const [changePhotoPositionForVariant] =
    ProductsApiHooks.useChangePhotoPositionForVariantMutation();
  const [getListOfTypesOfTraits] =
    DictionaryApiHooks.useLazyGetListOfTypesOfTraitsQuery();
  const [getTrait] = ProductsApiHooks.useLazyGetTraitQuery();
  const [getOptionsForTrait] =
    ProductsApiHooks.useLazyGetOptionsForTraitQuery();
  const [createNewTrait] = ProductsApiHooks.useCreateNewTraitMutation();
  const [getListOfAllTraits] =
    ProductsApiHooks.useLazyGetListOfAllTraitsQuery();
  const [updateTrait] = ProductsApiHooks.useUpdateTraitMutation();
  const [setProductTraits] = ProductsApiHooks.useSetProductTraitsMutation();
  const [deleteTrait] = ProductsApiHooks.useDeleteTraitMutation();
  const [createNewOptionForTrait] =
    ProductsApiHooks.useCreateNewOptionForTraitMutation();
  const [updateOptionsForTrait] =
    ProductsApiHooks.useUpdateOptionOfTraitMutation();
  const [deleteOptionsForTrait] =
    ProductsApiHooks.useDeleteOptionOfTraitMutation();
  const [changePositionOfTraitOption] =
    ProductsApiHooks.useChangePositionOfTraitOptionMutation();
  const [getCurrenciesList] =
    DictionaryApiHooks.useLazyGetCurrenciesListQuery();
  const [getVariantStockHistory] =
    ProductsApiHooks.useLazyGetVariantStockHistoryQuery();

  function getOrderStockActionsListForGrid(orderId) {
    dispatch(actions.setIsProductsInOrderGridLoading(true));
    ordersService
      .getListOfStockActionsForGridHandler(
        orderId,
        ordersState.stockActionsGridRequestModel,
      )
      .then(() => {
        dispatch(actions.setIsProductsInOrderGridLoading(false));
      });
  }

  function getVariantsListForGrid(model: GridRequestModel) {
    dispatch(actions.setIsFindProductsGridLoading(true));
    ordersService.getVariantsForGridHandler(model).then(() => {
      dispatch(actions.setIsFindProductsGridLoading(false));
    });
  }

  function addProductHandler() {
    dispatch(actions.setIsFindProductsGridLoading(true));
    if (ordersState.brands.length === 0) {
      ordersService.getBrandsForFilterHandler();
    }
    if (ordersState.categories.length === 0) {
      ordersService.getCategoriesForFilterHandler();
    }
    if (
      ordersState.sizesForFilter.length === 0 ||
      ordersState.colorsForFilter.length === 0
    )
      ordersService.getTraitsForFilterHandler();
    ordersService
      .getVariantsForGridHandler(ordersState.variantsGridRequestModel)
      .then(() => {
        dispatch(actions.setIsFindProductsGridLoading(false));
      });
  }

  function addVariantsToOrderHandler(orderId, model) {
    dispatch(actions.setIsProductsInOrderGridLoading(true));
    return addVariantsToOrder({ orderId, model }).then((res: any) => {
      dispatch(actions.setIsProductsInOrderGridLoading(false));
      if (!res.error) {
        getOrderStockActionsListForGrid(orderId);
        // dispatch(
        //   ordersActions.refreshStockActionsGridRequestModel({
        //     ...ordersState.stockActionsGridRequestModel,
        //     items: [
        //       res.data,
        //       ...ordersState.stockActionsGridRequestModel.items,
        //     ],
        //   }),
        // );
        addToast({
          text: "Stock action added successfully",
          type: "success",
        });
      } else {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
      return res.data;
    });
  }

  function variantsGridRequestChange(updates) {
    getVariantsListForGrid(updates);
  }

  function updateStockActionInOrderHandler(stockActionId, model) {
    return updateStockActionInOrder({ stockActionId, model }).then(
      (res: any) => {
        if (!res.error) {
          addToast({
            text: "Stock action updated successfully",
            type: "success",
          });
        } else {
          addToast({
            text: `${res.error.data.detail}`,
            type: "error",
          });
        }
        console.log("RES", res.data);
        return res.data;
      },
    );
  }

  function removeStockActionFromOrderHandler(stockActionId: number) {
    return removeStockActionFromOrder(stockActionId).then((res: any) => {
      if (!res.error) {
        dispatch(
          ordersActions.refreshStockActionsGridRequestModel({
            ...ordersState.stockActionsGridRequestModel,
            items: ordersState.stockActionsGridRequestModel.items.filter(
              (item) => item.stockActionId !== stockActionId,
            ),
          }),
        );
        addToast({
          text: "Stock action deleted successfully",
          type: "success",
        });
      } else {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
      return res.data;
    });
  }

  function manageProductHandler(model: VariantModel) {
    navigate(
      `${NavUrlEnum.PRODUCTS}${NavUrlEnum.PRODUCT_BASIC_DATA}/${model.productId}`,
    );
  }

  function generateProductCodeHandler() {
    return generateProductCode(null).then((res: any) => {
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

  function getVariantDetailsHandler(id) {
    return getVariantDetails(id).then((res: any) => {
      dispatch(actions.refreshProductId(res.data.productId));
      return {
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
    });
  }

  function getListOfTraitsWithOptionsForProductHandler(id) {
    return getListOfTraitsWithOptionsForProduct(id).then((res: any) => {
      dispatch(actions.refreshListOfTraitsWithOptionsForProduct(res.data));
      return res.data;
    });
  }

  function getTaxesListHandler() {
    return getTaxesList(undefined).then((res: any) => {
      dispatch(actions.refreshTaxesList(res.data));
      return res.data;
    });
  }

  function detachVariantPhotoHandler(id, photoId) {
    return detachVariantPhoto({ id, photoId }).then((res: any) => {
      return res;
    });
  }

  function getListOfTypesOfTraitsHandler() {
    return getListOfTypesOfTraits(undefined).then((res: any) => {
      dispatch(actions.refreshTypesOfTraits(res.data));
      return res.data;
    });
  }

  function getTraitHandler(id: number) {
    return getTrait(id).then((res: any) => {
      return res.data;
    });
  }

  function getOptionsForTraitHandler(id) {
    return getOptionsForTrait(id).then((res: any) => {
      return res.data;
    });
  }

  function updateTraitsHandler(id, model) {
    return updateTrait({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function setProductsTraitsHandler(id, model) {
    return setProductTraits({ id, model }).then((res: any) => {
      return res;
    });
  }

  function createNewOptionForTraitHandler(id, model) {
    return createNewOptionForTrait({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function updateOptionsForTraitHandler(id, model) {
    return updateOptionsForTrait({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function changePositionOfTraitOptionHandler(traitId, optionId, index) {
    return changePositionOfTraitOption({
      traitId,
      optionId,
      index,
    }).then((res: any) => {
      return res;
    });
  }

  function getProductPhotosForVariantHandler(productId, variantId) {
    return getProductPhotosForVariant({
      productId,
      variantId,
    }).then((res: any) => {
      return res.data;
    });
  }

  function updateVariantTraitOptionsHandler(id, model) {
    return updateVariantsTraitOptions({ id, model }).then((res: any) => {
      return res;
    });
  }

  function manageVariantHandler(model: VariantModel) {
    handleMultipleCardActions({
      findProductsCard: false,
      variantConfigurationCard: true,
    });
    dispatch(actions.setIsVariantConfigurationCardLoading(true));
    dispatch(actions.setIsVariantOptionsGridLoading(true));
    dispatch(actions.setIsVariantPhotoGridLoading(true));
    if (state.activeCards.includes("variantPhotosCard")) {
      dispatch(actions.setIsProductPhotoGridLoading(true));
      getProductPhotosForVariantHandler(state.productId, model.variantId).then(
        (res) => {
          dispatch(actions.setIsProductPhotoGridLoading(false));
          dispatch(actions.refreshProductPhotosForVariant(res));
        },
      );
    }
    getVariantDetailsHandler(model.variantId).then((res) => {
      dispatch(actions.setIsVariantConfigurationCardLoading(false));
      dispatch(actions.setIsVariantOptionsGridLoading(false));
      dispatch(actions.setIsVariantPhotoGridLoading(false));
      if (res) {
        dispatch(actions.refreshSelectedVariant(res));
        dispatch(actions.refreshVariantPhotos(res?.photos));
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
    updateVariantDetails({
      id: model.variant.variantId,
      model: model.formattedData,
    }).then((res: any) => {
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
        dispatch(actions.refreshSelectedVariant(modifiedRes));
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

  function updateVariantTraitOptions(model) {
    handleCardAction("manageTraitsCard");
    dispatch(actions.setIsManageTraitsCardLoading(true));
    updateVariantTraitOptionsHandler(
      model.variant.variantId,
      model.submissionData,
    ).then((res) => {
      dispatch(actions.setIsManageTraitsCardLoading(false));
      if (!res.error) {
        getVariantDetailsHandler(model.variant.variantId).then((res) => {
          dispatch(actions.refreshSelectedVariant(res));
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

  function disposeVariantFromStockHandler(id, model) {
    return disposeVariantFromStock({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function attachProductPhotoToVariantHandler(variantId, photoId) {
    return attachProductPhotoToVariant({
      variantId,
      photoId,
    }).then((res: any) => {
      return res;
    });
  }

  function changePhotoPositionForVariantHandler(id, photoId, index) {
    return changePhotoPositionForVariant({
      id,
      photoId,
      index,
    }).then((res: any) => {
      return res.data;
    });
  }

  function getListOfAllTraitsHandler() {
    return getListOfAllTraits(undefined).then((res: any) => {
      dispatch(actions.refreshTraits(res.data));
      return res.data;
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
      await deleteVariant(model.variantId).then((res: any) => {
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
  }

  function increaseStockAmountHandler(model) {
    dispatch(actions.setIsAddStockCardLoading(true));
    addVariantToPurchaseProducts({
      id: model.purchaseId,
      model: model.priceModel,
    }).then((res: any) => {
      dispatch(actions.setIsAddStockCardLoading(false));
      getVariantDetailsHandler(model.priceModel.variantId).then((res) => {
        if (res) {
          dispatch(actions.refreshSelectedVariant(res));
        }
      });
      getPurchaseDetails(model.purchaseId).then((res: any) => {
        dispatch(actions.refreshSelectedPurchase(res.data));
      });
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
    disposeVariantFromStockHandler(
      model.variant.variantId,
      model.formattedData,
    ).then((res) => {
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
          actions.refreshSelectedVariant({
            ...state.selectedVariant,
            photos: [...state.selectedVariant.photos, res.data],
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
    attachProductPhotoToVariantHandler(
      state.selectedVariant.variantId,
      model.photoId,
    ).then((res) => {
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
        addToast({
          text: "Can`t attach photo to variant",
          type: "error",
        });
      }
    });
  }

  async function detachPhotoFromVariantHandler(model) {
    const confirmedDetachPhoto = await openConfirmationDialog({
      headerTitle: "Detach photo from variant",
      text: `You are about to detach photo from variant  "${state.selectedVariant.variantName}".`,
      primaryButtonValue: "Detach",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedDetachPhoto) return;

    await detachVariantPhotoHandler(
      state.selectedVariant.variantId,
      model.photoId,
    ).then((res) => {
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

  function changePhotoPositionHandler(model) {
    changePhotoPositionForVariantHandler(
      state.selectedVariant.variantId,
      model.activeItem.photoId,
      model.newIndex,
    ).then(() => {
      dispatch(actions.setIsVariantPhotoGridLoading(true));
      getVariantDetailsHandler(state.selectedVariant.variantId).then((res) => {
        dispatch(actions.setIsVariantPhotoGridLoading(false));
        dispatch(actions.refreshSelectedVariant(res));
        dispatch(actions.refreshVariantPhotos(res?.photos));
      });
    });
  }

  function addTraitHandler() {
    dispatch(actions.setIsProductTraitConfigurationCardLoading(true));
    dispatch(actions.resetSelectedTrait());
    getListOfTypesOfTraitsHandler().then((res) => {
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
      getTraitHandler(model),
      getOptionsForTraitHandler(model),
      getListOfTypesOfTraitsHandler(),
    ]).then(([trait, options, types]) => {
      dispatch(actions.setIsProductTraitConfigurationCardLoading(false));
      dispatch(actions.setIsTraitOptionsGridLoading(false));
      dispatch(actions.refreshSelectedTrait(trait));
      dispatch(
        actions.refreshColorOptionsGridRequestModel({
          ...state.colorOptionsGridRequestModel,
          items: options.filter((option) => !option.isDeleted),
        }),
      );
      dispatch(actions.refreshTypesOfTraits(types));
    });
  }

  function createTraitHandler(model) {
    dispatch(actions.setIsProductTraitConfigurationCardLoading(true));
    createNewTrait(model).then((res: any) => {
      dispatch(actions.setIsProductTraitConfigurationCardLoading(false));
      if (res) {
        dispatch(actions.refreshSelectedTrait(res));
        getOptionsForTraitHandler(res.data.traitId).then((res) => {
          dispatch(
            actions.refreshColorOptionsGridRequestModel({
              ...state.colorOptionsGridRequestModel,
              items: res.filter((option) => !option.isDeleted),
            }),
          );
        });
        getListOfAllTraitsHandler().then((res) => {
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
    updateTraitsHandler(state.selectedTrait.traitId, model).then((res) => {
      dispatch(actions.setIsProductTraitConfigurationCardLoading(false));
      if (res) {
        getListOfAllTraitsHandler().then((res) => {
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

  function setProductTraitsHandler(model) {
    dispatch(actions.refreshSelectedTraitsIds(model));
    dispatch(actions.setIsChooseVariantTraitsCardLoading(true));
    setProductsTraitsHandler(state.productId, model).then((res) => {
      dispatch(actions.setIsChooseVariantTraitsCardLoading(false));
      if (res) {
        dispatch(actions.resetActiveCards());
        getListOfTraitsWithOptionsForProductHandler(state.productId).then(
          (res) => {
            dispatch(actions.refreshListOfTraitsWithOptionsForProduct(res));
          },
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
      await deleteTrait(model.traitId);

      const [traitsWithOptions, allTraits] = await Promise.all([
        getListOfTraitsWithOptionsForProductHandler(state.productId),
        getListOfAllTraitsHandler(),
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
    createNewOptionForTraitHandler(state.selectedTrait.traitId, {}).then(
      (res) => {
        if (res) {
          getListOfAllTraitsHandler().then((res) => {
            dispatch(actions.refreshTraits(res));
          });
          dispatch(
            actions.refreshColorOptionsGridRequestModel({
              ...state.colorOptionsGridRequestModel,
              items: [...state.colorOptionsGridRequestModel.items, res],
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
      },
    );
  }

  function updateOptionHandler(model) {
    updateOptionsForTraitHandler(model.optionId, model.updatedModel).then(
      (res) => {
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
      },
    );
  }

  async function deleteOptionHandler(model: TraitOptionModel) {
    const confirmedOptionDeleting = await openConfirmationDialog({
      headerTitle: "Deleting option",
      text: `You are about to remove the option ${model.optionName}.`,
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedOptionDeleting) return;

    deleteOptionsForTrait({ id: model.optionId }).then((res: any) => {
      if (!res.error) {
        getListOfAllTraitsHandler().then((res) => {
          dispatch(actions.refreshTraits(res));
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
    changePositionOfTraitOptionHandler(
      model.selectedTrait.traitId,
      model.activeItem.optionId,
      model.newIndex,
    );
  }

  function openChooseVariantTraitsCardHandler() {
    dispatch(actions.setIsChooseVariantTraitsCardLoading(true));
    getListOfAllTraitsHandler().then((res) => {
      dispatch(actions.setIsChooseVariantTraitsCardLoading(false));
      dispatch(actions.refreshTraits(res));
    });
    handleCardAction("chooseVariantTraitsCard", true);
  }

  function openAddStockCardHandler() {
    handleMultipleCardActions({
      findProductsCard: false,
      addStockCard: true,
    });
    dispatch(actions.setIsAddStockCardLoading(true));
    getCurrenciesList().then((res) => {
      dispatch(actions.setIsAddStockCardLoading(false));
      dispatch(actions.refreshCurrenciesList(res.data));
    });
  }

  function openDisposeStockCardHandler() {
    handleCardAction("disposeStockCard", true);
    getVariantDetailsHandler(state.selectedVariant.variantId).then((res) => {
      dispatch(actions.refreshSelectedVariant(res));
    });
  }

  function openVariantHistoryCardHandler(model) {
    handleCardAction("variantHistoryCard", true);
    dispatch(actions.setIsVariantsHistoryGridLoading(true));
    getVariantStockHistory(model).then((res: any) => {
      dispatch(actions.setIsVariantsHistoryGridLoading(false));
      if (res.error) return;
      if (res) {
        const data = res.data?.map((item) => ({
          ...item,
          createdDate: formatDate(item.createdDate, "date"),
        }));
        dispatch(actions.refreshVariantHistory(data));
      }
    });
  }

  function openManageTraitsCardHandler() {
    handleCardAction("manageTraitsCard", true);
  }

  function openVariantPhotosCardHandler(model) {
    handleCardAction("variantPhotosCard", true);
    dispatch(actions.setIsProductPhotoGridLoading(true));
    getProductPhotosForVariantHandler(state.productId, model).then((res) => {
      dispatch(actions.setIsProductPhotoGridLoading(false));
      dispatch(actions.refreshProductPhotosForVariant(res));
    });
  }

  function openSelectPurchaseCardHandler(model) {
    handleCardAction("selectPurchaseCard", true);
    dispatch(actions.setIsPurchaseGridLoading(true));
    getListOfPurchasesForGrid(model).then((res: any) => {
      dispatch(actions.setIsPurchaseGridLoading(false));
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

  function closeProductTraitConfigurationCardHandler() {
    handleCardAction("productTraitConfigurationCard");
  }

  function closeVariantPhotosCardHandler() {
    handleCardAction("variantPhotosCard");
  }

  function closeVariantConfigurationCardHandler() {
    dispatch(productsActions.resetSelectedVariant());
    handleCardAction("variantConfigurationCard");
  }

  function closeVariantHistoryCardHandler() {
    handleCardAction("variantHistoryCard");
  }

  function closeSelectPurchaseCardHandler() {
    handleCardAction("selectPurchaseCard");
  }

  function selectPurchaseHandler(payload: PurchaseModel) {
    handleCardAction("selectPurchaseCard");
    dispatch(actions.refreshSelectedPurchase(payload));
  }

  function closeAddStockCardHandler() {
    handleCardAction("addStockCard");
    dispatch(actions.resetSelectedPurchase());
  }

  function searchSupplierHandle(model) {
    dispatch(actions.setIsPurchaseGridLoading(true));
    getListOfPurchasesForGrid({
      ...state.purchaseGridRequestModel,
      searchQuery: model,
    }).then((res) => {
      dispatch(actions.setIsPurchaseGridLoading(false));
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
      dispatch(actions.setIsPurchaseGridLoading(false));
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
        handleCardAction("supplierCard");
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

  function openSupplierCardHandler() {
    handleCardAction("supplierCard", true);
  }

  function openSelectEntityCardHandler() {
    dispatch(productsActions.resetSelectedSupplier());
    handleCardAction("selectEntityCard", true);
    if (!state.countryCodes) {
      getCountryCode().then(() => {});
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

  function openCreateEntityCardHandler() {
    handleCardAction("createCompanyCard", true);
    getCountryCodesHandler();
  }

  function selectCompanyHandle(model: CompanyModel) {
    handleCardAction("selectEntityCard");
    dispatch(actions.refreshSelectedCompany(model));
  }

  function createCompanyHandler(model) {
    dispatch(actions.setIsCreateCompanyCardLoading(true));
    createCompany(model.company).then((res: any) => {
      if (!res.error) {
        model.image.uploadModels.map((model) => {
          model.contextId = res.data.companyId;
          dispatch(actions.setIsPhotoUploaderLoading(true));
          uploadPhoto(model).then((res: any) => {
            dispatch(actions.setIsPhotoUploaderLoading(false));
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
        });
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
    handleCardAction("photosCard", true);
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
        addToast({
          text: "Photos added successfully",
          type: "success",
        });
      }

      return res;
    });
  }

  function closePhotosCardHandler() {
    handleCardAction("photosCard");
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

  function closeLocationConfigurationCardHandler() {
    handleCardAction("locationConfigurationCard");
    dispatch(actions.resetManagedLocation());
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

  function getCountryCodesHandler() {
    if (state.countryCodes.length === 0) {
      getCountryCode(undefined).then((res: any) => {
        dispatch(actions.refreshCountryCodes(res.data));
      });
    }
  }

  return {
    getOrderStockActionsListForGrid,
    addProductHandler,
    addVariantsToOrderHandler,
    variantsGridRequestChange,
    updateStockActionInOrderHandler,
    removeStockActionFromOrderHandler,
    manageProductHandler,
    generateProductCodeHandler,
    changeVariantPositionHandler,
    deletePhotoHandler,
    getVariantDetailsHandler,
    getListOfTraitsWithOptionsForProductHandler,
    getTaxesListHandler,
    manageVariantHandler,
    updateVariantDetailsHandler,
    updateVariantTraitOptions,
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
    openChooseVariantTraitsCardHandler,
    openAddStockCardHandler,
    openDisposeStockCardHandler,
    openVariantHistoryCardHandler,
    openManageTraitsCardHandler,
    openVariantPhotosCardHandler,
    openSelectPurchaseCardHandler,
    closeProductTraitConfigurationCardHandler,
    closeVariantPhotosCardHandler,
    closeVariantConfigurationCardHandler,
    closeVariantHistoryCardHandler,
    closeSelectPurchaseCardHandler,
    selectPurchaseHandler,
    closeAddStockCardHandler,
    searchSupplierHandle,
    filterSuppliersByDateHandle,
    createPurchaseForSupplierHandler,
    closeSupplierCardHandler,
    closeSelectEntityCardHandler,
    openSupplierCardHandler,
    openSelectEntityCardHandler,
    searchEntityHandle,
    openCreateEntityCardHandler,
    createCompanyHandler,
    closeCreateCompanyCardHandler,
    selectCompanyHandle,
    manageCompanyHandler,
    deleteCompanyHandler,
    closeCompanyConfigurationCardHandler,
    manageCompanyPhotosHandler,
    deleteCompanyPhotoHandler,
    uploadPhotoHandler,
    closePhotosCardHandler,
    openLocationConfigurationCardHandler,
    closeLocationConfigurationCardHandler,
    createLocationHandler,
    detachSupplierHandler,
    getCountryCodesHandler,
  };
}
