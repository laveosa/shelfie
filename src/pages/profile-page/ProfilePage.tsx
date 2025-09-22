import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";

import cs from "./ProfilePage.module.scss";
import { Separator } from "@/components/ui/separator.tsx";
import SheCardNotification
  from "@/components/complex/she-card-notification/SheCardNotification.tsx";
import {
  SheFileUploader
} from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import {
  IProductsPageSlice
} from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import useProfilePageService
  from "@/pages/profile-page/useProfilePageService.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import ContactInformationForm
  from "@/components/forms/contact-information-form/ContactInformationForm.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import PasswordChangeForm
  from "@/components/forms/password-change-form/PasswordChangeForm.tsx";
import {
  ISheSelectItem
} from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { LanguageModel } from "@/const/models/LanguageModel.ts";

export function ProfilePage() {
  const state = useAppSelector<IProductsPageSlice>(StoreSliceEnum.PROFILE);
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const service = useProfilePageService();

  useEffect(() => {
    service.getCountryCodesHandler();
    service.getLanguagesListHandler();
  }, []);

  function svgStringToComponent(svgString: string): React.FC<any> {
    return (props) => (
      <span dangerouslySetInnerHTML={{ __html: svgString }} {...props} />
    );
  }

  function convertLanguagesToSelectItems(
    data: LanguageModel[],
  ): ISheSelectItem<any>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.localeCode,
        text: item.name,
        icon: svgStringToComponent(item.flagIcon),
      }),
    );
  }

  return (
    <div className={cs.profilePage}>
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
            {/*<div className={cs.avatarImageBlock}>*/}
            {/*  {appState.userDetails?.thumbnailUrl ? (*/}
            {/*    <img*/}
            {/*      className={cs.avatarImage}*/}
            {/*      src={appState.userDetails?.thumbnailUrl}*/}
            {/*      alt={appState.userDetails?.shortName || "User"}*/}
            {/*    />*/}
            {/*  ) : appState.userDetails?.shortName ? (*/}
            {/*    <div className={cs.avatarInitials}>*/}
            {/*      {getInitials(appState.userDetails?.shortName)}*/}
            {/*    </div>*/}
            {/*  ) : (*/}
            {/*    <div className={cs.noImageIcon}>*/}
            {/*      <SheIcon icon={ImageIcon} minWidth="100px" />*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*</div>*/}
            <SheFileUploader
              className={cs.fileUploader}
              user={appState.userDetails}
              avatarImage={appState.userDetails?.thumbnail}
              uploadAreaText="Upload avatar"
              uploadAreaSubtext="Click here or drag and drop image"
              contextName="user"
              contextId={appState.userDetails?.userId}
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
              countryCodes={state.countryCodes}
              data={appState.userDetails}
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
            <SheSelect
              items={convertLanguagesToSelectItems(state.languagesList)}
              selected={appState.userDetails?.localeCode}
              hideFirstOption
              label="Language"
              fullWidth
              onSelect={(value) => service.changeLanguageHandler(value)}
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
