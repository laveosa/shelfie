import { Trans } from "react-i18next";
import React from "react";

import cs from "./SheDialog.module.scss";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ISheBaseDialog } from "@/const/interfaces/dialogs/ISheBaseDialog.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import useDialogService from "@/utils/services/DialogService.tsx";

export default function SheDialog({
  isLoading = false,
  headerTitle,
  headerTitleTransKey,
  headerText,
  headerTextTransKey,
  headerDescription,
  headerDescriptionTransKey,
  icon,
  hideCloseButton = false,
  showHeader = true,
  showFooter = true,
  children,
  width = "100%",
  maxWidth,
  minWidth,
  primaryButtonValue = "Ok",
  primaryButtonValueTransKey,
  primaryButtonModel,
  secondaryButtonValue = "Cancel",
  secondaryButtonValueTransKey,
  secondaryButtonModel,
  onSecondaryButtonClick,
  onPrimaryButtonClick,
}: ISheBaseDialog) {
  const { closeDialog } = useDialogService();
  return (
    <div className={cs.sheDialog}>
      <Dialog
        open={true}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
      >
        <div>
          <DialogContent
            className={
              !hideCloseButton
                ? cs.dialogContentWrapper
                : `${cs.dialogContentWrapper} ${cs.hideCloseButton}`
            }
            style={{ width: width, minWidth: minWidth, maxWidth: maxWidth }}
          >
            {showHeader && (
              <DialogHeader>
                <div className={cs.dialogHeader}>
                  {icon && (
                    <SheIcon className={cs.dialogHeaderIcon} icon={icon} />
                  )}
                  <div className={cs.dialogHeaderContent}>
                    <DialogTitle>
                      <Trans i18nKey={headerTitleTransKey}>
                        <span className="she-title">{headerTitle}</span>
                      </Trans>
                    </DialogTitle>
                    <Trans i18nKey={headerTextTransKey}>
                      <span className="she-text">{headerText}</span>
                    </Trans>
                    <DialogDescription>
                      <Trans i18nKey={headerDescriptionTransKey}>
                        <span className="she-subtext">{headerDescription}</span>
                      </Trans>
                    </DialogDescription>
                  </div>
                </div>
                {isLoading && <SheLoading />}
              </DialogHeader>
            )}
            <div className={cs.dialogContent}>{children}</div>
            {showFooter && (
              <DialogFooter className={cs.dialogFooter}>
                <SheButton
                  className={cs.secondaryButton}
                  variant="secondary"
                  {...secondaryButtonModel}
                  onClick={onSecondaryButtonClick}
                >
                  <Trans i18nKey={secondaryButtonValueTransKey}>
                    {secondaryButtonValue}
                  </Trans>
                </SheButton>
                <SheButton
                  className={cs.primaryButton}
                  variant="default"
                  {...primaryButtonModel}
                  onClick={onPrimaryButtonClick}
                >
                  <Trans i18nKey={primaryButtonValueTransKey}>
                    {primaryButtonValue}
                  </Trans>
                </SheButton>
              </DialogFooter>
            )}
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
