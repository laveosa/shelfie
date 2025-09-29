import React, { JSX } from "react";

import { Trash2 } from "lucide-react";

import cs from "./SheCardFooter.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";
import { ISheCardFooter } from "@/const/interfaces/complex-components/ISheCardFooter.ts";

export default function SheCardFooter({
  footerClassName: className = "",
  footerStyle: style,
  showFooter,
  view,
  showNotificationCard,
  notificationCardProps,
  isMinimized,
  isLoading,
  showPrimaryButton,
  primaryButtonTitle = "OK",
  primaryButtonTitleTransKey,
  primaryButtonDisabled,
  primaryButtonProps,
  showSecondaryButton,
  secondaryButtonTitle = "CANCEL",
  secondaryButtonTitleTransKey,
  secondaryButtonDisabled,
  secondaryButtonProps,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}: ISheCardFooter): JSX.Element {
  // ==================================================================== SIDE EFFECTS

  // ==================================================================== EVENT HANDLERS

  // ==================================================================== LAYOUT
  if (
    !showFooter ||
    isMinimized ||
    (!showSecondaryButton && !showPrimaryButton && !showNotificationCard)
  ) {
    return null;
  }

  return (
    <div
      className={`${cs.sheCardFooter} ${className} ${cs[view]}`}
      style={style}
    >
      {showNotificationCard && (
        <div className={cs.sheCardFooterCardNotificationContainer}>
          <SheCardNotification
            className={cs.sheCardFooterCardNotification}
            buttonColor="#EF4343"
            buttonVariant="outline"
            buttonText="Delete"
            buttonTextTransKey="CommonButtons.Delete"
            buttonIcon={Trash2}
            {...notificationCardProps}
          />
        </div>
      )}
      {(showSecondaryButton || showPrimaryButton) && (
        <div
          className={cs.sheCardFooterButtonsContainer}
          style={{
            justifyContent:
              showSecondaryButton && showPrimaryButton
                ? "space-between"
                : "flex-end",
          }}
        >
          {showSecondaryButton && (
            <SheButton
              value={secondaryButtonTitle}
              valueTransKey={secondaryButtonTitleTransKey}
              disabled={secondaryButtonDisabled || isLoading}
              variant="secondary"
              minWidth="100px"
              onClick={onSecondaryButtonClick}
              {...secondaryButtonProps}
            />
          )}
          {showPrimaryButton && (
            <SheButton
              value={primaryButtonTitle}
              valueTransKey={primaryButtonTitleTransKey}
              disabled={primaryButtonDisabled}
              isLoading={isLoading}
              minWidth="100px"
              onClick={onPrimaryButtonClick}
              {...primaryButtonProps}
            />
          )}
        </div>
      )}
    </div>
  );
}
