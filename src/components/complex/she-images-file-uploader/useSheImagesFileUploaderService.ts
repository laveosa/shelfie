import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";

export default function useSheImagesFileUploaderService() {
  const [uploadPhoto] = AssetsApiHooks.useUploadPhotoMutation();

  function uploadPhotoHandler(model: UploadPhotoModel) {
    return uploadPhoto(model).then((res: any) => {
      return res.data;
    });
  }

  return {
    uploadPhotoHandler,
  };
}
