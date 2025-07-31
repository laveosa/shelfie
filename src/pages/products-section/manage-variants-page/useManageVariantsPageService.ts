import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";

export default function useManageVariantsPageService() {
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

  return {
    getVariantsForGridHandler,
    toggleVariantIsActiveHandler,
    changeVariantPositionHandler,
    generateProductCodeHandler,
    deletePhotoHandler,
  };
}
