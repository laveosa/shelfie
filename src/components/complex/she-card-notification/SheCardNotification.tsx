import { Trans } from "react-i18next";
import { X } from "lucide-react";

import { ISheCardNotification } from "@/const/interfaces/complex-components/ISheCardNotification.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./SheCardNotification.module.scss";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

export default function SheCardNotification({
  className,
  title,
  titleTransKey,
  titleIcon,
  text,
  textTransKey,
  buttonText,
  buttonTextTransKey,
  buttonColor,
  buttonVariant,
  buttonIcon,
  backgroundColor,
  borderColor,
  buttonModel,
  showCloseButton = false,
  showButton = true,
  onClick,
  onClose,
}: ISheCardNotification) {
  return (
    <div
      className={`${cs.sheCardNotification} ${className}`}
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
    >
      {showCloseButton && (
        <SheButton
          className={cs.sheCardNotificationCloseButton}
          icon={X}
          variant="secondary"
          maxWidth="10px"
          minWidth="10px"
          maxHeight="10px"
          minHeight="10px"
          onClick={onClose}
        />
      )}
      <div className={cs.sheCardNotificationTextBlock}>
        {title && (
          <div className={cs.sheCardNotificationTitle}>
            {titleIcon && (
              <SheIcon icon={titleIcon} maxHeight="20px" maxWidth="20px" />
            )}
            <Trans i18nKey={titleTransKey}>{title}</Trans>
          </div>
        )}
        {text && (
          <div className={cs.sheCardNotificationText}>
            <Trans i18nKey={textTransKey}>{text}</Trans>
          </div>
        )}
      </div>
      {showButton && (
        <SheButton
          {...buttonModel}
          className={cs.sheCardNotificationButton}
          icon={buttonIcon}
          variant={buttonVariant}
          value={buttonText}
          valueTransKey={buttonTextTransKey}
          txtColor={buttonColor}
          onClick={onClick}
        />
      )}
    </div>
  );
}
