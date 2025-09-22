import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { IProfilePageSlice } from "@/const/interfaces/store-slices/IProfilePageSlice.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";
import { ProfilePageSliceActions as actions } from "@/state/slices/ProfilePageSlice.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";
import { UserModel } from "@/const/models/UserModel.ts";
import useAppService from "@/useAppService.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { useToast } from "@/hooks/useToast.ts";
import { PasswordModel } from "@/const/models/PasswordModel.ts";

export default function useProfilePageService() {
  const state = useSelector(
    (state: RootState): IProfilePageSlice => state[StoreSliceEnum.PROFILE],
  );
  const appService = useAppService();
  const dispatch = useDispatch<AppDispatch>();
  const { addToast } = useToast();

  const [getCountryCode] = DictionaryApiHooks.useLazyGetCountryCodeQuery();
  const [updateUserContactInformation] =
    UsersApiHooks.useUpdateUserContactInformationMutation();
  const [uploadPhoto] = AssetsApiHooks.useUploadPhotoMutation();
  const [updateUserPassword] = UsersApiHooks.useUpdateUserPasswordMutation();
  const [getLanguagesList] = DictionaryApiHooks.useLazyGetLanguagesListQuery();

  function getCountryCodesHandler() {
    getCountryCode().then((res: any) => {
      dispatch(actions.refreshCountryCodes(res.data));
    });
  }

  function updateUserContactInformationHandler(model: UserModel) {
    updateUserContactInformation(model).then((res: any) => {
      if (!res.error) {
        appService.getUserDetailsHandler();
      }
    });
  }

  function uploadPhotoHandler(model: UploadPhotoModel) {
    dispatch(actions.setIsImageUploaderLoading(true));
    return uploadPhoto(model).then((res: any) => {
      dispatch(actions.setIsImageUploaderLoading(false));
      if (res.error) {
        addToast({
          text: res.error.data?.detail || "Upload failed",
          type: "error",
        });
      } else {
        appService.getUserDetailsHandler();
        addToast({
          text: "Photos added successfully",
          type: "success",
        });
      }
    });
  }

  function updateUserPasswordHandler(model: PasswordModel) {
    return updateUserPassword(model).then((res: any) => {
      if (res.error) {
        addToast({
          text: res.error.data?.detail,
          type: "error",
        });
      } else {
        addToast({
          text: "Password updated successfully",
          type: "success",
        });
      }
    });
  }

  function getLanguagesListHandler() {
    getLanguagesList().then((res: any) => {
      dispatch(actions.refreshLanguagesList(res.data));
    });
  }

  return {
    getCountryCodesHandler,
    updateUserContactInformationHandler,
    uploadPhotoHandler,
    updateUserPasswordHandler,
    getLanguagesListHandler,
  };
}
