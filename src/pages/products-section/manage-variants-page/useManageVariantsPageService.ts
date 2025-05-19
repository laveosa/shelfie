import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { DictionaryApiHooks } from "@/utils/services/api/DictionaryApiService.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { addGridRowColor } from "@/utils/helpers/quick-helper.ts";
import { GridRowsColorsEnum } from "@/const/enums/GridRowsColorsEnum.ts";

export default function useManageVariantsPageService() {
  const [getVariantsForGrid] = ProductsApiHooks.useGetVariantsForGridMutation();
  const [createVariant] = ProductsApiHooks.useCreateVariantMutation();
  const [checkVariantCombination] =
    ProductsApiHooks.useCheckVariantCombinationMutation();
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
  const [changeVariantPosition] =
    ProductsApiHooks.useChangeVariantPositionMutation();
  const [generateProductCode] =
    ProductsApiHooks.useLazyGenerateProductCodeQuery();
  const [getTrait] = ProductsApiHooks.useLazyGetTraitQuery();
  const [getListOfTypesOfTraits] =
    DictionaryApiHooks.useLazyGetListOfTypesOfTraitsQuery();
  ProductsApiHooks.useLazyGetProductVariantsQuery();
  const [getListOfAllTraits] =
    ProductsApiHooks.useLazyGetListOfAllTraitsQuery();
  const [getListOfTraitsForProduct] =
    ProductsApiHooks.useLazyGetListOfTraitsForProductQuery();
  const [getListOfTraitsWithOptionsForProduct] =
    ProductsApiHooks.useLazyGetListOfTraitsWithOptionsForProductQuery();
  const [createNewTrait] = ProductsApiHooks.useCreateNewTraitMutation();
  const [setProductTraits] = ProductsApiHooks.useSetProductTraitsMutation();
  const [deleteTrait] = ProductsApiHooks.useDeleteTraitMutation();
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
  const [getProductPhotosForVariant] =
    ProductsApiHooks.useLazyGetProductPhotosForVariantQuery();
  const [uploadPhoto] = AssetsApiHooks.useUploadPhotoMutation();
  const [detachVariantPhoto] = ProductsApiHooks.useDetachVariantPhotoMutation();
  const [deletePhoto] = AssetsApiHooks.useDeletePhotoMutation();
  const [changePhotoPositionForVariant] =
    ProductsApiHooks.useChangePhotoPositionForVariantMutation();
  const [attachProductPhotoToVariant] =
    ProductsApiHooks.useAttachProductPhotoToVariantMutation();

  function getVariantsForGridHandler(data?: GridRequestModel) {
    return getVariantsForGrid(data).then((res: any) => {
      return res.data;
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

  function getVariantStockHistoryHandler(id) {
    return getVariantStockHistory(id).then((res: any) => {
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
      return res;
    });
  }

  function deleteTraitHandler(id) {
    return deleteTrait(id).then((res: any) => {
      return res;
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

  function getProductPhotosForVariantHandler(productId, variantId) {
    return getProductPhotosForVariant({
      productId,
      variantId,
    }).then((res: any) => {
      return res.data;
    });
  }

  function uploadPhotoHandler(model: UploadPhotoModel) {
    return uploadPhoto(model).then((res: any) => {
      return res;
    });
  }

  function detachVariantPhotoHandler(id, photoId) {
    return detachVariantPhoto({ id, photoId }).then((res: any) => {
      return res;
    });
  }

  function deletePhotoHandler(photoId) {
    return deletePhoto(photoId).then((res: any) => {
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

  function attachProductPhotoToVariantHandler(variantId, photoId) {
    return attachProductPhotoToVariant({
      variantId,
      photoId,
    }).then((res: any) => {
      return res.data;
    });
  }

  return {
    getVariantsForGridHandler,
    createVariantHandler,
    checkVariantCombinationHandler,
    getVariantDetailsHandler,
    toggleVariantIsActiveHandler,
    updateVariantDetailsHandler,
    updateVariantTraitOptionsHandler,
    increaseStockAmountForVariantHandler,
    disposeVariantFromStockHandler,
    getVariantStockHistoryHandler,
    changeVariantPositionHandler,
    generateProductCodeHandler,
    getListOfAllTraitsHandler,
    getListOfTraitsWithOptionsForProductHandler,
    getTraitHandler,
    getListOfTypesOfTraitsHandler,
    createNewTraitHandler,
    updateTraitHandler,
    setProductTraitsHandler,
    deleteTraitHandler,
    getOptionsForTraitHandler,
    createNewOptionForTraitHandler,
    updateOptionsForTraitHandler,
    deleteOptionsForTraitHandler,
    changePositionOfTraitOptionHandler,
    getProductPhotosForVariantHandler,
    uploadPhotoHandler,
    detachVariantPhotoHandler,
    deletePhotoHandler,
    changePhotoPositionForVariantHandler,
    attachProductPhotoToVariantHandler,
  };
}
