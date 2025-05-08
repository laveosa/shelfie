import { useAppDispatch } from "@/utils/hooks/redux.ts";

import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { ProductGalleryPageSliceActions as action } from "@/state/slices/ProductGalleryPageSlice.ts";

export default function useProductGalleryPageService() {
  const dispatch = useAppDispatch();

  const [getTheProductsForGrid] =
    ProductsApiHooks.useGetTheProductsForGridMutation();
  // const [getProductPhotos] = ProductsApiHooks.useLazyGetProductPhotosQuery();
  const [uploadPhoto] = AssetsApiHooks.useUploadPhotoMutation();
  // const [getCountersForProducts] =
  //   ProductsApiHooks.useLazyGetCountersForProductsQuery();
  const [putPhotoInNewPosition] =
    ProductsApiHooks.usePutPhotoInNewPositionMutation();
  const [deletePhoto] = AssetsApiHooks.useDeletePhotoMutation();
  const [getProductVariants] =
    ProductsApiHooks.useLazyGetProductVariantsQuery();
  const [attachProductPhotoToVariant] =
    ProductsApiHooks.useAttachProductPhotoToVariantMutation();

  function getTheProductsForGridHandler(data?: GridRequestModel) {
    dispatch(action.setIsLoading(true));
    return getTheProductsForGrid(data).then((res: any) => {
      dispatch(action.setIsLoading(false));
      if (res.error) {
        return;
      } else {
        return res.data;
      }
    });
  }

  function uploadPhotoHandler(model: UploadPhotoModel) {
    return uploadPhoto(model).then((res: any) => {
      return res;
    });
  }

  // function getCountersForProductsHandler(id: any) {
  //   return getCountersForProducts(id).then((res: any) => {
  //     return res.data;
  //   });
  // }

  // function getProductPhotosHandler(id: number) {
  //   dispatch(action.setIsProductPhotosLoading(true));
  //   return getProductPhotos(id).then((res: any) => {
  //     dispatch(action.setIsProductPhotosLoading(false));
  //     return res.data;
  //   });
  // }

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

  function getProductVariantsHandler(id: any) {
    return getProductVariants(id).then((res: any) => {
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
    getTheProductsForGridHandler,
    // getProductPhotosHandler,
    // getCountersForProductsHandler,
    uploadPhotoHandler,
    putPhotoInNewPositionHandler,
    deletePhotoHandler,
    getProductVariantsHandler,
    attachProductPhotoToVariantHandler,
  };
}
