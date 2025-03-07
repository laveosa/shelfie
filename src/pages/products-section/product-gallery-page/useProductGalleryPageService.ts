import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";

export default function useProductGalleryPageService() {
  const [getProductPhotos] = ProductsApiHooks.useLazyGetProductPhotosQuery();
  const [uploadPhoto] = AssetsApiHooks.useUploadPhotoMutation();

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

  return {
    getProductPhotosHandler,
    uploadPhotoHandler,
  };
}
