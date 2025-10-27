import React, { useEffect } from "react";

import { Trash2 } from "lucide-react";

import cs from "./ProfilePage.module.scss";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";
import ContactInformationForm from "@/components/forms/contact-information-form/ContactInformationForm.tsx";
import PasswordChangeForm from "@/components/forms/password-change-form/PasswordChangeForm.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { SheFileUploader } from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { convertToSelectItems } from "@/utils/converters/primitive-components/she-select-convertors.ts";
import useProfilePageService from "@/pages/profile-page/useProfilePageService.ts";
import { useIsMobile } from "@/utils/hooks/useIsMobile.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";

export function ProfilePage() {
  const state = useAppSelector<IProductsPageSlice>(StoreSliceEnum.PROFILE);
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const service = useProfilePageService();
  const isMobile = useIsMobile();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    service.getCountryCodesHandler();
    service.getLanguagesListHandler();
  }, []);

  // ==================================================================== LAYOUT
  return (
    <div className={`${cs.profilePage} ${isMobile ? cs.isMobile : ""}`}>
      <div className={cs.profilePageContent}>
        <div className={cs.profilePageTitle}>
          <span className="she-title">Account</span>
        </div>
        <Separator />
        <div className={cs.profilePageBlock}>
          <div className={cs.profilePageTextBlock}>
            <span className={cs.cardSubtitle}>Avatar</span>
            <span className="she-text">Your personal image</span>
          </div>
          <div className={cs.profilePageContentBlock}>
            <SheFileUploader
              className={cs.fileUploader}
              isLoading={state.isImageUploaderLoading}
              user={appState.user}
              avatarImage={appState.user?.thumbnail}
              uploadAreaText="Upload avatar"
              uploadAreaSubtext="Click here or drag and drop image"
              contextName="user"
              maxFiles={1}
              contextId={appState.user?.userId}
              onUpload={(data) => service.uploadPhotoHandler(data)}
            />
          </div>
        </div>
        <Separator />
        <div className={cs.profilePageBlock}>
          <div className={cs.profilePageTextBlock}>
            <span className={cs.cardSubtitle}>Contact Information</span>
            <span className="she-text">
              Credentials you will use to authenticate in the system
            </span>
          </div>
          <div className={cs.profilePageContentBlock}>
            <ContactInformationForm
              countryCodes={convertToSelectItems(state.countryCodes, {
                text: "countryName",
                value: "countryId",
                icon: "flagIcon",
              })}
              data={appState.user}
              onSubmit={(data) =>
                service.updateUserContactInformationHandler(data)
              }
            />
          </div>
        </div>
        <Separator />
        <div className={cs.profilePageBlock}>
          <div className={cs.profilePageTextBlock}>
            <span className={cs.cardSubtitle}>Password</span>
            <div className={cs.passwordBlock}>
              <span className="she-text">Password requirements :</span>
              <ul className={cs.passwordRulesList}>
                <li>At least 8 characters long</li>
                <li>At least one uppercase character</li>
                <li>Password must include a special character</li>
              </ul>
            </div>
          </div>
          <div className={cs.profilePageContentBlock}>
            <PasswordChangeForm
              onSubmit={(data) => service.updateUserPasswordHandler(data)}
            />
          </div>
        </div>
        <Separator />
        <div className={cs.profilePageBlock}>
          <div className={cs.profilePageTextBlock}>
            <span className={cs.cardSubtitle}>Language</span>
            <span className="she-text">
              Your language of choice for system text
            </span>
          </div>
          <div className={cs.profilePageContentBlock}>
            <SheSelect<string>
              items={convertToSelectItems(state.languagesList, {
                text: "name",
                value: "localeCode",
                icon: "flagIcon",
              })}
              selected={appState.user?.localeCode}
              hideFirstOption
              label="Language"
              fullWidth
              onSelect={service.changeLanguageHandler}
            />
          </div>
        </div>
        <Separator />
        <div className={cs.cardNotificationWrapper}>
          <SheCardNotification
            className={cs.cardNotification}
            title="Delete Account"
            text="Your account will be removed and you will loose access to the system."
            buttonColor="#FF0000"
            buttonIcon={Trash2}
            buttonText="Delete"
            buttonVariant="outline"
          />
        </div>
      </div>
    </div>
  );
}
