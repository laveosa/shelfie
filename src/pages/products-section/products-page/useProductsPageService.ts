import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { useNavigate } from "react-router-dom";

import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { ProductsPageSliceActions as actions } from "@/state/slices/ProductsPageSlice.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";
import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";
import {
  addGridRowColor,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";
import useAppService from "@/useAppService.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
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

export default function useProductsPageService() {
  const appService = useAppService();
  const state = useAppSelector<IProductsPageSlice>(StoreSliceEnum.PRODUCTS);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
  const [manageProduct] = ProductsApiHooks.useManageProductMutation();
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
      dispatch(actions.refreshCategories(res.data));
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
      return res.data;
    });
  }

  function getProductDetailsHandler(id) {
    return getProductDetails(id).then((res: any) => {
      return res.data;
    });
  }

  function manageProductHandler(model: ProductModel) {
    return manageProduct(model);
  }

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

  function resetUserPreferencesHandler() {
    return resetUserPreferences().then(() => {
      appService.getUserPreferencesHandler();
    });
  }

  function getProductPhotosHandler(id: number) {
    dispatch(actions.setIsProductPhotosLoading(true));
    return getProductPhotos(id).then((res: any) => {
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
    manageProductHandler,
    deleteProductHandler,
    toggleProductActivationHandler,
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
    itemsCardItemsConvertor,
    itemCardHandler,
  };
}
