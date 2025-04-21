import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { DictionaryApiHooks } from "@/utils/services/api/DictionaryApiService.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";

export default function useManageVariantsPageService() {
  const [getVariantsForGrid] = ProductsApiHooks.useGetVariantsForGridMutation();
  const [getProductVariants] =
    ProductsApiHooks.useLazyGetProductVariantsQuery();
  const [getListOfAllTraits] =
    ProductsApiHooks.useLazyGetListOfAllTraitsQuery();
  const [getVariantDetails] = ProductsApiHooks.useLazyGetVariantDetailsQuery();
  const [toggleVariantIsActive] =
    ProductsApiHooks.useToggleVariantIsActiveMutation();
  const [updateVariantDetails] =
    ProductsApiHooks.useUpdateVariantDetailsMutation();
  const [updateVariantTraitOptions] =
    ProductsApiHooks.useUpdateVariantTraitOptionsMutation();
  const [increaseStockAmountForVariant] =
    ProductsApiHooks.useIncreaseStockAmountForVariantMutation();
  const [disposeVariantFromStock] =
    ProductsApiHooks.useDisposeVariantFromStockMutation();
  const [getVariantStockHistory] =
    ProductsApiHooks.useLazyGetVariantStockHistoryQuery();
  const [generateProductCode] =
    ProductsApiHooks.useLazyGenerateProductCodeQuery();
  const [getTrait] = ProductsApiHooks.useLazyGetTraitQuery();
  const [getCountersForProducts] =
    ProductsApiHooks.useLazyGetCountersForProductsQuery();
  const [getListOfTypesOfTraits] =
    DictionaryApiHooks.useLazyGetListOfTypesOfTraitsQuery();
  const [getListOfTraitsForProduct] =
    ProductsApiHooks.useLazyGetListOfTraitsForProductQuery();
  const [getListOfTraitsWithOptionsForProduct] =
    ProductsApiHooks.useLazyGetListOfTraitsWithOptionsForProductQuery();
  const [createNewTrait] = ProductsApiHooks.useCreateNewTraitMutation();
  const [setProductTraits] = ProductsApiHooks.useSetProductTraitsMutation();
  const [getOptionsForTrait] =
    ProductsApiHooks.useLazyGetOptionsForTraitQuery();
  const [createNewOptionForTrait] =
    ProductsApiHooks.useCreateNewOptionForTraitMutation();
  const [updateOptionsForTrait] =
    ProductsApiHooks.useUpdateOptionOfTraitMutation();
  const [deleteOptionsForTrait] =
    ProductsApiHooks.useDeleteOptionOfTraitMutation();
  const [updateTrait] = ProductsApiHooks.useUpdateTraitMutation();
  const [createVariant] = ProductsApiHooks.useCreateVariantMutation();
  const [getProductPhotos] = ProductsApiHooks.useLazyGetProductPhotosQuery();
  const [uploadPhoto] = AssetsApiHooks.useUploadPhotoMutation();
  const [detachVariantPhoto] = ProductsApiHooks.useDetachVariantPhotoMutation();
  const [getTaxesList] = DictionaryApiHooks.useLazyGetTaxesListQuery();
  const [getCurrenciesList] =
    DictionaryApiHooks.useLazyGetCurrenciesListQuery();

  function getVariantsForGridHandler(data?: GridRequestModel) {
    return getVariantsForGrid(data).then((res: any) => {
      return res.data;
    });
  }

  function getProductVariantsHandler(id: any) {
    return getProductVariants(id).then((res: any) => {
      return res.data;
    });
  }

  function getCountersForProductsHandler(id: any) {
    return getCountersForProducts(id).then((res: any) => {
      return res.data;
    });
  }

  function createVariantHandler(id, model) {
    return createVariant({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function getVariantDetailsHandler(id) {
    return getVariantDetails(id).then((res: any) => {
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

  function updateVariantDetailsHandler(id, model) {
    return updateVariantDetails({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function updateVariantTraitOptionsHandler(id, model) {
    return updateVariantTraitOptions({ id, model }).then((res: any) => {
      return res.data;
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

  function getVariantStockHistoryHandler(id) {
    return getVariantStockHistory(id).then((res: any) => {
      return res.data;
    });
  }

  function getListOfAllTraitsHandler() {
    return getListOfAllTraits().then((res: any) => {
      return res.data;
    });
  }

  function getListOfTraitsWithOptionsForProductHandler(id) {
    return getListOfTraitsWithOptionsForProduct(id).then((res: any) => {
      return res.data;
    });
  }

  function getListOfTraitsForProductHandler(id) {
    return getListOfTraitsForProduct(id).then((res: any) => {
      return res.data;
    });
  }

  function getTraitHandler(id: number) {
    return getTrait(id).then((res: any) => {
      return res.data;
    });
  }

  function getListOfTypesOfTraitsHandler() {
    return getListOfTypesOfTraits().then((res: any) => {
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

  function setProductTraitsHandler(id, model) {
    return setProductTraits({ id, model }).then((res: any) => {
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
      return res.data;
    });
  }

  function getProductPhotosHandler(id: number) {
    return getProductPhotos(id).then((res: any) => {
      return res.data;
    });
  }

  function uploadPhotoHandler(model: UploadPhotoModel) {
    return uploadPhoto(model).then((res: any) => {
      return res;
    });
  }

  function detachVariantPhotoHandler({ id, photoId }) {
    return detachVariantPhoto({ id, photoId }).then((res: any) => {
      return res;
    });
  }

  function getTaxesListHandler() {
    return getTaxesList().then((res: any) => {
      return res.data;
    });
  }

  function getCurrenciesListHandler() {
    return getCurrenciesList().then((res: any) => {
      return res.data;
    });
  }

  return {
    getVariantsForGridHandler,
    getProductVariantsHandler,
    getCountersForProductsHandler,
    createVariantHandler,
    getVariantDetailsHandler,
    toggleVariantIsActiveHandler,
    updateVariantDetailsHandler,
    updateVariantTraitOptionsHandler,
    increaseStockAmountForVariantHandler,
    disposeVariantFromStockHandler,
    getVariantStockHistoryHandler,
    generateProductCodeHandler,
    getListOfAllTraitsHandler,
    getListOfTraitsForProductHandler,
    getListOfTraitsWithOptionsForProductHandler,
    getTraitHandler,
    getListOfTypesOfTraitsHandler,
    createNewTraitHandler,
    updateTraitHandler,
    setProductTraitsHandler,
    getOptionsForTraitHandler,
    createNewOptionForTraitHandler,
    updateOptionsForTraitHandler,
    deleteOptionsForTraitHandler,
    getProductPhotosHandler,
    uploadPhotoHandler,
    detachVariantPhotoHandler,
    getTaxesListHandler,
    getCurrenciesListHandler,
  };
}
