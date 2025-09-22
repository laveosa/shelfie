import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { useNavigate } from "react-router-dom";
import { merge } from "lodash";

import {
  ProductsPageSliceActions as productsActions,
  ProductsPageSliceActions as actions,
} from "@/state/slices/ProductsPageSlice.ts";
import {
  addGridRowColor,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";
import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";
import useAppService from "@/useAppService.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { GridRowsColorsEnum } from "@/const/enums/GridRowsColorsEnum.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import SuppliersApiHooks from "@/utils/services/api/SuppliersApiService.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { useToast } from "@/hooks/useToast.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import { AppSliceActions as appActions } from "@/state/slices/AppSlice.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";

export default function useProductsPageService() {
  const appService = useAppService();
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const state = useAppSelector<IProductsPageSlice>(StoreSliceEnum.PRODUCTS);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { openConfirmationDialog } = useDialogService();

  const [getTheProductsForGrid] =
    ProductsApiHooks.useGetTheProductsForGridMutation();
  const [getVariantsForGrid] = ProductsApiHooks.useGetVariantsForGridMutation();
  const [getListOfPurchasesForGrid] =
    PurchasesApiHooks.useGetListOfPurchasesForGridMutation();
  const [getBrandsForFilter] =
    ProductsApiHooks.useLazyGetBrandsForProductsFilterQuery();
  const [getCategoriesForFilter] =
    ProductsApiHooks.useLazyGetCategoriesForProductsFilterQuery();
  const [getListOfSuppliers] =
    SuppliersApiHooks.useLazyGetListOfSuppliersQuery();
  const [getCountersForProducts] =
    ProductsApiHooks.useLazyGetCountersForProductsQuery();
  const [getProductDetails] = ProductsApiHooks.useLazyGetProductDetailQuery();
  // const [manageProduct] = ProductsApiHooks.useManageProductMutation();
  const [deleteProduct] = ProductsApiHooks.useDeleteProductMutation();
  const [toggleProductActivation] =
    ProductsApiHooks.useToggleProductActivationMutation();
  const [updateUserPreferences] =
    UsersApiHooks.useUpdateUserPreferencesMutation();
  const [resetUserPreferences] =
    UsersApiHooks.useResetUserPreferencesMutation();
  const [getSortingOptionsForGrid] =
    DictionaryApiHooks.useLazyGetSortingOptionsForGridQuery();
  const [getProductPhotos] = ProductsApiHooks.useLazyGetProductPhotosQuery();
  const [getProductVariants] =
    ProductsApiHooks.useLazyGetProductVariantsQuery();
  const [getTaxesList] = DictionaryApiHooks.useLazyGetTaxesListQuery();
  const [getCurrenciesList] =
    DictionaryApiHooks.useLazyGetCurrenciesListQuery();
  const [getVariantDetails] = ProductsApiHooks.useLazyGetVariantDetailsQuery();
  const [getPurchaseDetails] =
    PurchasesApiHooks.useLazyGetPurchaseDetailsQuery();
  const [getCountryCode] = DictionaryApiHooks.useLazyGetCountryCodeQuery();
  const [uploadPhoto] = AssetsApiHooks.useUploadPhotoMutation();
  const [getPurchaseCounters] =
    PurchasesApiHooks.useLazyGetPurchaseCountersQuery();
  const [getTraitsForFilter] =
    ProductsApiHooks.useLazyGetTraitsForFilterQuery();
  const [generateProductCode] =
    ProductsApiHooks.useLazyGenerateProductCodeQuery();
  const [getSimpleListOfAllBrands] =
    ProductsApiHooks.useLazyGetSimpleListOfAllBrandsQuery();
  const [getAllCategoriesByOrganization] =
    ProductsApiHooks.useLazyGetAllCategoriesByOrganizationQuery();
  const [checkProductCode] = ProductsApiHooks.useCheckProductCodeMutation();
  const [checkBrandName] = ProductsApiHooks.useCheckBrandNameMutation();
  const [checkCategoryName] = ProductsApiHooks.useCheckCategoryNameMutation();
  const [createNewProduct] = ProductsApiHooks.useCreateNewProductMutation();
  const [updateProduct] = ProductsApiHooks.useUpdateProductMutation();
  const [createNewCategory] = ProductsApiHooks.useCreateNewCategoryMutation();
  const [createBrand] = ProductsApiHooks.useCreateBrandMutation();
  const [putPhotoInNewPosition] =
    ProductsApiHooks.usePutPhotoInNewPositionMutation();
  const [deletePhoto] = AssetsApiHooks.useDeletePhotoMutation();
  const [getListOfAllTraits] =
    ProductsApiHooks.useLazyGetListOfAllTraitsQuery();
  const [attachProductPhotoToVariant] =
    ProductsApiHooks.useAttachProductPhotoToVariantMutation();
  const [detachVariantPhoto] = ProductsApiHooks.useDetachVariantPhotoMutation();
  const [getTrait] = ProductsApiHooks.useLazyGetTraitQuery();
  const [getListOfTypesOfTraits] =
    DictionaryApiHooks.useLazyGetListOfTypesOfTraitsQuery();
  ProductsApiHooks.useLazyGetProductVariantsQuery();
  const [getListOfTraitsWithOptionsForProduct] =
    ProductsApiHooks.useLazyGetListOfTraitsWithOptionsForProductQuery();
  const [setProductTraits] = ProductsApiHooks.useSetProductTraitsMutation();
  const [deleteTrait] = ProductsApiHooks.useDeleteTraitMutation();
  const [getListOfTraitsForProduct] =
    ProductsApiHooks.useLazyGetListOfTraitsForProductQuery();
  const [createNewTrait] = ProductsApiHooks.useCreateNewTraitMutation();
  const [getOptionsForTrait] =
    ProductsApiHooks.useLazyGetOptionsForTraitQuery();
  const [createNewOptionForTrait] =
    ProductsApiHooks.useCreateNewOptionForTraitMutation();
  const [updateOptionsForTrait] =
    ProductsApiHooks.useUpdateOptionOfTraitMutation();
  const [deleteOptionsForTrait] =
    ProductsApiHooks.useDeleteOptionOfTraitMutation();
  const [updateTrait] = ProductsApiHooks.useUpdateTraitMutation();
  const [changePositionOfTraitOption] =
    ProductsApiHooks.useChangePositionOfTraitOptionMutation();
  const [createVariant] = ProductsApiHooks.useCreateVariantMutation();
  const [checkVariantCombination] =
    ProductsApiHooks.useCheckVariantCombinationMutation();
  const [getPurchaseProductVariants] =
    PurchasesApiHooks.useLazyGetPurchaseProductVariantsQuery();
  const [getVariantStockHistory] =
    ProductsApiHooks.useLazyGetVariantStockHistoryQuery();
  const [getProductPhotosForVariant] =
    ProductsApiHooks.useLazyGetProductPhotosForVariantQuery();
  const [updateVariantDetails] =
    ProductsApiHooks.useUpdateVariantDetailsMutation();
  const [updateVariantTraitOptions] =
    ProductsApiHooks.useUpdateVariantTraitOptionsMutation();
  const [increaseStockAmountForVariant] =
    ProductsApiHooks.useIncreaseStockAmountForVariantMutation();
  const [disposeVariantFromStock] =
    ProductsApiHooks.useDisposeVariantFromStockMutation();
  const [changePhotoPositionForVariant] =
    ProductsApiHooks.useChangePhotoPositionForVariantMutation();
  const [deleteVariant] = ProductsApiHooks.useDeleteVariantMutation();
  const [deleteSupplier] = SuppliersApiHooks.useDeleteSupplierMutation();
  const [restoreSupplier] = SuppliersApiHooks.useRestoreSupplierMutation();
  const [deletePurchase] = PurchasesApiHooks.useDeletePurchaseMutation();
  const [toggleVariantIsActive] =
    ProductsApiHooks.useToggleVariantIsActiveMutation();

  //-------------------------------------------------API

  function getTheProductsForGridHandler(
    data?: GridRequestModel,
    isForceRefresh?: boolean,
  ) {
    if (isForceRefresh) {
      dispatch(actions.setIsLoading(true));
      dispatch(actions.setIsProductsLoading(true));
      return getTheProductsForGrid(data).then((res: any) => {
        dispatch(actions.setIsProductsLoading(false));
        dispatch(actions.setIsLoading(false));
        if (res.error) {
          return;
        } else {
          dispatch(actions.refreshProductsGridRequestModel(res.data));
          dispatch(actions.refreshProducts(res.data.items));
          return res.data;
        }
      });
    } else {
      if (state.products === null) {
        dispatch(actions.setIsLoading(true));
        dispatch(actions.setIsProductsLoading(true));
        return getTheProductsForGrid(data).then((res: any) => {
          dispatch(actions.setIsLoading(false));
          dispatch(actions.setIsProductsLoading(false));
          if (res.error) {
            return;
          } else {
            dispatch(actions.refreshProductsGridRequestModel(res.data));
            dispatch(actions.refreshProducts(res.data.items));
            return res.data;
          }
        });
      }
    }
  }

  function getListOfPurchasesForGridHandler(data?: GridRequestModel) {
    dispatch(actions.setIsLoading(true));
    return getListOfPurchasesForGrid(data).then((res: any) => {
      dispatch(actions.setIsLoading(false));
      if (res.error) {
        return;
      } else {
        dispatch(actions.refreshPurchasesGridRequestModel(res.data));
        dispatch(actions.refreshPurchases(res.data.items));
        return res.data;
      }
    });
  }

  function getBrandsForFilterHandler() {
    return getBrandsForFilter(null).then((res: any) => {
      dispatch(actions.refreshBrands(res.data));
      return res.data;
    });
  }

  function getVariantsForGridHandler(data?: GridRequestModel) {
    dispatch(actions.setIsLoading(true));
    return getVariantsForGrid(data).then((res: any) => {
      dispatch(actions.setIsLoading(false));
      if (res.error) {
        return;
      } else {
        dispatch(actions.refreshVariantsGridRequestModel(res.data));
        dispatch(actions.refreshVariants(res.data.items));
        return res.data;
      }
    });
  }

  function getCategoriesForFilterHandler() {
    return getCategoriesForFilter(null).then((res: any) => {
      dispatch(actions.refreshCategories(res.data));
      return res.data;
    });
  }

  function getListOfSuppliersHandler() {
    return getListOfSuppliers(null).then((res: any) => {
      dispatch(actions.refreshSuppliers(res.data));
      return res.data;
    });
  }

  function getSortingOptionsForGridHandler() {
    return getSortingOptionsForGrid(null).then((res: any) => {
      dispatch(actions.refreshSortingOptions(res.data));
      return res.data;
    });
  }

  function getCountersForProductsHandler(id: any) {
    return getCountersForProducts(id).then((res: any) => {
      dispatch(actions.refreshProductCounter(res.data));
      return res.data;
    });
  }

  function getProductDetailsHandler(id) {
    return getProductDetails(id).then((res: any) => {
      dispatch(actions.refreshProduct(res.data));
      return res.data;
    });
  }

  // function manageProductHandler(model: ProductModel) {
  //   return manageProduct(model);
  // }

  function deleteProductHandler(id: number) {
    return deleteProduct(id).then((res: any) => {
      return res;
    });
  }

  function toggleProductActivationHandler(productId) {
    return toggleProductActivation(productId).then((res: any) => {
      return res;
    });
  }

  function updateUserPreferencesHandler(model: PreferencesModel) {
    return updateUserPreferences(model).then(() => {
      appService.getUserPreferencesHandler();
    });
  }

  function resetUserPreferencesHandler(grid) {
    return resetUserPreferences(grid).then(() => {
      appService.getUserPreferencesHandler();
    });
  }

  function getProductPhotosHandler(id: number) {
    dispatch(actions.setIsProductPhotosLoading(true));
    return getProductPhotos(id).then((res: any) => {
      dispatch(productsActions.refreshProductPhotos(res.data));
      dispatch(actions.setIsProductPhotosLoading(false));
      return res.data;
    });
  }

  function getProductVariantsHandler(id: any) {
    dispatch(actions.setIsProductVariantsLoading(true));
    return getProductVariants(id).then((res: any) => {
      dispatch(actions.setIsProductVariantsLoading(false));
      const modifiedRes = {
        ...res,
        data: addGridRowColor(res.data, "color", [
          {
            field: "showAlert",
            value: true,
            color: GridRowsColorsEnum.ERROR,
          },
        ]),
      };

      return modifiedRes.data;
    });
  }

  function getTaxesListHandler() {
    return getTaxesList().then((res: any) => {
      dispatch(actions.refreshTaxesList(res.data));
      return res.data;
    });
  }

  function getCurrenciesListHandler() {
    return getCurrenciesList().then((res: any) => {
      dispatch(actions.refreshCurrenciesList(res.data));
      return res.data;
    });
  }

  function getVariantDetailsHandler(id) {
    return getVariantDetails(id).then((res: any) => {
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

      return modifiedRes;
    });
  }

  function getPurchaseDetailsHandler(id) {
    return getPurchaseDetails(id).then((res: any) => {
      dispatch(actions.refreshSelectedPurchase(res.data));
      return res.data;
    });
  }

  function getCountryCodeHandler() {
    return getCountryCode(null).then((res: any) => {
      if (res.data) {
        dispatch(actions.refreshCountryCodeList(res.data));
      }
      return res;
    });
  }

  function uploadPhotoHandler(model: UploadPhotoModel) {
    return uploadPhoto(model).then((res: any) => {
      return res;
    });
  }

  function getPurchaseCountersHandler(purchaseId: number) {
    return getPurchaseCounters(purchaseId).then((res: any) => {
      dispatch(actions.refreshPurchaseCounters(res.data));
      return res.data;
    });
  }

  function getTraitsForFilterHandler() {
    return getTraitsForFilter().then((res: any) => {
      dispatch(
        actions.refreshSizesForFilter(
          res.data
            .filter((trait) => trait.traitTypeId === 1)
            .flatMap((trait) => trait.traitOptions),
        ),
      );
      dispatch(
        actions.refreshColorsForFilter(
          res.data
            .filter((trait) => trait.traitTypeId === 2)
            .flatMap((trait) => trait.traitOptions),
        ),
      );
      return res.data;
    });
  }

  function generateProductCodeHandler() {
    return generateProductCode(null).then((res: any) => {
      return res.data;
    });
  }

  function getSimpleListOfAllBrandsHandler() {
    return getSimpleListOfAllBrands(null).then((res: any) => {
      dispatch(actions.refreshBrands(res.data));
      return res.data;
    });
  }

  function getAllCategoriesByOrganizationHandler() {
    return getAllCategoriesByOrganization(null).then((res: any) => {
      dispatch(actions.refreshCategories(res.data));
      return res.data;
    });
  }

  function checkProductCodeHandler(code) {
    return checkProductCode(code).then((res: any) => {
      return res.data;
    });
  }

  function checkBrandNameHandler(brandName) {
    return checkBrandName(brandName).then((res: any) => {
      return res;
    });
  }

  function checkCategoryNameHandler(categoryName) {
    return checkCategoryName(categoryName).then((res: any) => {
      return res;
    });
  }

  function createNewProductHandler(model) {
    return createNewProduct(model).then((res: any) => {
      return res;
    });
  }

  function updateProductHandler(productId, model) {
    return updateProduct({ productId, model }).then((res: any) => {
      return res;
    });
  }

  function createNewCategoryHandler(model) {
    return createNewCategory(model).then((res: any) => {
      return res;
    });
  }

  function createBrandHandler(model) {
    return createBrand(model).then((res: any) => {
      return res;
    });
  }

  function putPhotoInNewPositionHandler(productId, photoId, index) {
    return putPhotoInNewPosition({
      productId,
      photoId,
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

  function getListOfAllTraitsHandler() {
    return getListOfAllTraits().then((res: any) => {
      dispatch(actions.refreshTraits(res.data));
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

  function detachVariantPhotoHandler(id, photoId) {
    return detachVariantPhoto({ id, photoId }).then((res: any) => {
      return res;
    });
  }

  function getTraitHandler(id: number) {
    return getTrait(id).then((res: any) => {
      return res.data;
    });
  }

  function getListOfTypesOfTraitsHandler() {
    return getListOfTypesOfTraits().then((res: any) => {
      dispatch(actions.refreshTypesOfTraits(res.data));
      return res.data;
    });
  }

  function getListOfTraitsWithOptionsForProductHandler(id) {
    return getListOfTraitsWithOptionsForProduct(id).then((res: any) => {
      dispatch(actions.refreshListOfTraitsWithOptionsForProduct(res.data));
      return res.data;
    });
  }

  function setProductTraitsHandler(id, model) {
    return setProductTraits({ id, model }).then((res: any) => {
      return res;
    });
  }

  function deleteTraitHandler(id) {
    return deleteTrait(id).then((res: any) => {
      return res;
    });
  }

  function getListOfTraitsForProductHandler(id) {
    return getListOfTraitsForProduct(id).then((res: any) => {
      return res.data;
    });
  }

  function createNewTraitHandler(model) {
    return createNewTrait(model).then((res: any) => {
      return res.data;
    });
  }

  function updateTraitHandler(id, model) {
    return updateTrait({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function getOptionsForTraitHandler(id) {
    return getOptionsForTrait(id).then((res: any) => {
      return res.data;
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

  function deleteOptionsForTraitHandler(id) {
    return deleteOptionsForTrait(id).then((res: any) => {
      return res;
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

  function createVariantHandler(id, model) {
    return createVariant({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function checkVariantCombinationHandler(id, model) {
    return checkVariantCombination({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function getPurchaseProductVariantsHandler(purchaseId, productId) {
    return getPurchaseProductVariants({
      purchaseId,
      productId,
    }).then((res: any) => {
      return res.data;
    });
  }

  function getVariantStockHistoryHandler(id) {
    return getVariantStockHistory(id).then((res: any) => {
      return res.data;
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

  function updateVariantDetailsHandler(id, model) {
    return updateVariantDetails({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function updateVariantTraitOptionsHandler(id, model) {
    return updateVariantTraitOptions({ id, model }).then((res: any) => {
      return res;
    });
  }

  function increaseStockAmountForVariantHandler(id, model) {
    return increaseStockAmountForVariant({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function disposeVariantFromStockHandler(id, model) {
    return disposeVariantFromStock({ id, model }).then((res: any) => {
      return res.data;
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

  function deleteVariantHandler(variantId) {
    return deleteVariant(variantId).then((res: any) => {
      return res;
    });
  }

  function deleteSupplierHandler(supplierId) {
    return deleteSupplier(supplierId).then((res: any) => {
      return res;
    });
  }

  function restoreSupplierHandler(supplierId) {
    return restoreSupplier(supplierId).then((res: any) => {
      return res;
    });
  }

  function deletePurchaseHandler(purchaseId) {
    return deletePurchase(purchaseId).then((res: any) => {
      return res;
    });
  }

  //----------------------------------------------------ACTIONS

  function activateProductHandler(model) {
    toggleProductActivationHandler(model.productId).then((res: any) => {
      if (!res.error) {
        dispatch(
          actions.refreshProductsGridRequestModel({
            ...state.productsGridRequestModel,
            items: state.productsGridRequestModel.items.map((product) =>
              product.productId === model.productId
                ? { ...product, isActive: !model.isActive }
                : product,
            ),
          }),
        );
        addToast({
          text: "Product successfully activated",
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

  async function deleteProductActionHandler(data) {
    const confirmedDeleteProduct = await openConfirmationDialog({
      headerTitle: "Delete Product",
      text: `You are about to delete product "${data.row.original.productName}".`,
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedDeleteProduct) {
      return;
    } else {
      data.table.options.meta?.hideRow(data.row.original.id);
      await deleteProductHandler(data.row.original.productId).then((res) => {
        if (!res.error) {
          addToast({
            text: "Product deleted successfully",
            type: "success",
          });
        } else {
          data.table.options.meta?.unhideRow(data.row.original.id);
          addToast({
            text: res.error.data.detail,
            type: "error",
          });
        }
      });
    }
  }

  async function deleteVariantActionHandler(data) {
    const confirmedDeleteVariant = await openConfirmationDialog({
      headerTitle: "Delete Variant",
      text: `You are about to delete variant "${data.row.original.variantName}".`,
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedDeleteVariant) {
    } else {
      data.table.options.meta?.hideRow(data.row.original.id);
      await deleteVariantHandler(data.row.original.variantId).then((res) => {
        if (!res.error) {
          addToast({
            text: "Variant deleted successfully",
            type: "success",
          });
        } else {
          data.table.options.meta?.unhideRow(data.row.original.id);
          addToast({
            text: res.error.data.detail,
            type: "error",
          });
        }
      });
    }
  }

  async function deletePurchaseActionHandler(data) {
    const confirmedDeletePurchase = await openConfirmationDialog({
      headerTitle: "Delete Purchase",
      text: `You are about to delete purchase "${data.row.original.purchaseId}".`,
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedDeletePurchase) {
    } else {
      data.table.options.meta?.hideRow(data.row.original.id);
      await deletePurchaseHandler(data.row.original.purchaseId).then((res) => {
        if (!res.error) {
          addToast({
            text: "Purchase deleted successfully",
            type: "success",
          });
        } else {
          data.table.options.meta?.unhideRow(data.row.original.id);
          addToast({
            text: res.error.data.detail,
            type: "error",
          });
        }
      });
    }
  }

  function manageProductActionHandler(productId: any) {
    dispatch(actions.resetProduct());
    navigate(
      `${NavUrlEnum.PRODUCTS}${NavUrlEnum.PRODUCT_BASIC_DATA}/${productId}`,
    );
  }

  function manageVariantActionHandler(variantId: number, productId: number) {
    dispatch(
      actions.refreshSelectedVariant({
        variantId,
      }),
    );
    navigate(
      `${NavUrlEnum.PRODUCTS}${NavUrlEnum.MANAGE_VARIANTS}/${productId}`,
    );
  }

  function managePurchaseActionHandler(purchaseId: number) {
    navigate(`${NavUrlEnum.PRODUCTS}${NavUrlEnum.SUPPLIER}/${purchaseId}`);
  }

  function addProductActionHandler() {
    navigate(`${NavUrlEnum.PRODUCTS}${NavUrlEnum.PRODUCT_BASIC_DATA}`);
  }

  function reportPurchaseActionHandler() {
    dispatch(actions.resetSelectedPurchase());
    dispatch(actions.resetSelectedSupplier());
    navigate(`${NavUrlEnum.PRODUCTS}${NavUrlEnum.SUPPLIER}/`);
  }

  function gridRequestChangeHandler(updates: any) {
    console.log(updates);

    if (state.activeTab === "products") {
      getTheProductsForGridHandler(updates, true);
    } else if (state.activeTab === "variants") {
      getVariantsForGridHandler(updates);
    } else if (state.activeTab === "purchases") {
      getListOfPurchasesForGridHandler(updates);
    }
  }

  function applyColumnsActionHandler(model: PreferencesModel) {
    const modifiedModel = merge({}, appState.preferences, model);
    dispatch(appActions.refreshPreferences(modifiedModel));
    updateUserPreferencesHandler(modifiedModel);
  }

  function resetColumnsActionHandler() {
    resetUserPreferencesHandler(state.activeTab);
  }

  function tabChangeActionHandler(value: string) {
    if (value === state.activeTab) return;
    dispatch(actions.refreshActiveTab(value));
  }

  function activateVariantActionHandler(model) {
    toggleVariantIsActive(model.variantId).then((res: any) => {
      if (!res.error) {
        dispatch(
          actions.refreshVariantsGridRequestModel({
            ...state.variantsGridRequestModel,
            items: state.variantsGridRequestModel.items.map((variant) =>
              variant.variantId === model.variantId
                ? { ...variant, isActive: !model.isActive }
                : variant,
            ),
          }),
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
  //----------------------------------------------------LOGIC

  function itemsCardItemsConvertor(
    items: any[],
    options: {
      idKey: string;
      nameKey: string;
      imageKeyPath?: string;
      type?: string;
    },
  ): any[] {
    const { idKey, nameKey, imageKeyPath, type } = options;

    return items?.map((item) => {
      const id = item[idKey];
      const name = item[nameKey];
      const imageUrl = imageKeyPath
        ? imageKeyPath.split(".").reduce((acc, key) => acc?.[key], item)
        : undefined;

      return {
        id,
        name,
        imageUrl,
        originalItem: item,
        type,
      };
    });
  }

  function itemCardHandler({ item, type }) {
    switch (type) {
      case "product":
        dispatch(actions.resetProductCounter());
        dispatch(actions.refreshProductPhotos([]));
        dispatch(actions.resetProduct());
        dispatch(actions.refreshProductVariants([]));
        dispatch(actions.resetSelectedVariant());
        navigate(
          `${ApiUrlEnum.PRODUCTS}${ApiUrlEnum.PRODUCT_BASIC_DATA}/${item.productId}`,
        );
        break;
      case "variant":
        getVariantDetailsHandler(item.variantId).then((res) => {
          dispatch(actions.refreshSelectedVariant(res));
          dispatch(actions.refreshVariantPhotos(res.photos));
          navigate(
            `${NavUrlEnum.PRODUCTS}${NavUrlEnum.MANAGE_VARIANTS}/${item?.productId}`,
          );
          dispatch(
            actions.refreshProductVariants(
              setSelectedGridItem(
                item.variantId,
                state.productVariants,
                "variantId",
              ),
            ),
          );
        });
        break;
    }
  }

  return {
    getTheProductsForGridHandler,
    getVariantsForGridHandler,
    getListOfPurchasesForGridHandler,
    getBrandsForFilterHandler,
    getCategoriesForFilterHandler,
    getListOfSuppliersHandler,
    getSortingOptionsForGridHandler,
    getCountersForProductsHandler,
    getProductDetailsHandler,
    updateUserPreferencesHandler,
    resetUserPreferencesHandler,
    getProductPhotosHandler,
    getProductVariantsHandler,
    getTaxesListHandler,
    getCurrenciesListHandler,
    getVariantDetailsHandler,
    getPurchaseDetailsHandler,
    getCountryCodeHandler,
    uploadPhotoHandler,
    getPurchaseCountersHandler,
    getTraitsForFilterHandler,
    itemsCardItemsConvertor,
    itemCardHandler,
    generateProductCodeHandler,
    getSimpleListOfAllBrandsHandler,
    getAllCategoriesByOrganizationHandler,
    checkProductCodeHandler,
    checkBrandNameHandler,
    checkCategoryNameHandler,
    createNewProductHandler,
    updateProductHandler,
    createNewCategoryHandler,
    createBrandHandler,
    putPhotoInNewPositionHandler,
    deletePhotoHandler,
    getListOfAllTraitsHandler,
    attachProductPhotoToVariantHandler,
    detachVariantPhotoHandler,
    getTraitHandler,
    getListOfTypesOfTraitsHandler,
    getListOfTraitsWithOptionsForProductHandler,
    setProductTraitsHandler,
    deleteTraitHandler,
    createNewTraitHandler,
    updateTraitHandler,
    getOptionsForTraitHandler,
    createNewOptionForTraitHandler,
    updateOptionsForTraitHandler,
    deleteOptionsForTraitHandler,
    changePositionOfTraitOptionHandler,
    createVariantHandler,
    checkVariantCombinationHandler,
    getPurchaseProductVariantsHandler,
    getVariantStockHistoryHandler,
    getProductPhotosForVariantHandler,
    updateVariantDetailsHandler,
    updateVariantTraitOptionsHandler,
    increaseStockAmountForVariantHandler,
    disposeVariantFromStockHandler,
    changePhotoPositionForVariantHandler,
    deleteVariantHandler,
    deleteSupplierHandler,
    restoreSupplierHandler,
    deletePurchaseHandler,
    activateProductHandler,
    deleteProductActionHandler,
    deleteVariantActionHandler,
    deletePurchaseActionHandler,
    manageProductActionHandler,
    manageVariantActionHandler,
    managePurchaseActionHandler,
    addProductActionHandler,
    reportPurchaseActionHandler,
    gridRequestChangeHandler,
    applyColumnsActionHandler,
    resetColumnsActionHandler,
    tabChangeActionHandler,
    activateVariantActionHandler,
  };
}
