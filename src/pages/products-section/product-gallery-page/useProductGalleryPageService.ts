import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";

export default function useProductGalleryPageService() {
  const [getProductPhotos] = ProductsApiHooks.useLazyGetProductPhotosQuery();
  const [uploadPhoto] = AssetsApiHooks.useUploadPhotoMutation();
  const [getCountersForProducts] =
    ProductsApiHooks.useLazyGetCountersForProductsQuery();
  const [putPhotoInNewPosition] =
    ProductsApiHooks.usePutPhotoInNewPositionMutation();
  const [deletePhoto] = AssetsApiHooks.useDeletePhotoMutation();

  function uploadPhotoHandler(model: UploadPhotoModel) {
    return uploadPhoto(model).then((res: any) => {
      return res;
    });
  }

  function getCountersForProductsHandler(id: any) {
    return getCountersForProducts(id).then((res: any) => {
      return res.data;
    });
  }

  function getProductPhotosHandler(id: number) {
    return getProductPhotos(id).then((res: any) => {
      return res.data;
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

  return {
    getProductPhotosHandler,
    getCountersForProductsHandler,
    uploadPhotoHandler,
    putPhotoInNewPositionHandler,
    deletePhotoHandler,
  };
}
