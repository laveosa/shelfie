import { Trans } from "react-i18next";
import React from "react";
import cs from "./SheConfirmationDialog.module.scss";
import { ISheConfirmationDialog } from "@/const/interfaces/dialogs/ISheConfirmationDialog.ts";
import SheDialog from "@/components/dialogs/she-dialog/SheDialog.tsx";

export default function SheConfirmationDialog({
  title,
  titleTransKey,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  primaryButtonValue,
  secondaryButtonValue,
  primaryButtonModel,
}: ISheConfirmationDialog) {
  return (
    <div className={cs.sheConfirmationDialog}>
      <SheDialog
        primaryButtonValue={primaryButtonValue}
        secondaryButtonValue={secondaryButtonValue}
        onPrimaryButtonClick={onPrimaryButtonClick}
        primaryButtonModel={primaryButtonModel}
        onSecondaryButtonClick={onSecondaryButtonClick}
      >
        <div className={cs.confirmationDialogContent}>
          {title && (
            <div className={cs.confirmationDialogTitle}>
              <Trans i18nKey={titleTransKey}>
                <span className="she-title">{title}</span>
              </Trans>
            </div>
          )}
          {text && (
            <div className={cs.confirmationDialogText}>
              <Trans i18nKey={textTransKey}>
                <span className="she-text">{text}</span>
              </Trans>
            </div>
          )}
          {description && (
            <div className={cs.confirmationDialogDescription}>
              <Trans i18nKey={descriptionTransKey}>
                <span className="she-subtext">{description}</span>
              </Trans>
            </div>
          )}
        </div>
      </SheDialog>
    </div>
  );
}
