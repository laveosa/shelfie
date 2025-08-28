import { useCallback } from "react";
import { ISheBaseDialog } from "@/const/interfaces/dialogs/ISheBaseDialog.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { DialogSliceActions } from "@/state/slices/DialogSlice.ts";
import { IDialogSlice } from "@/const/interfaces/store-slices/IDialogSlice.ts";
import { ISheConfirmationDialog } from "@/const/interfaces/dialogs/ISheConfirmationDialog.ts";
import { IDialogComponent } from "@/const/interfaces/dialogs/IDialogComponent.ts";

let globalResolver: ((value: boolean) => void) | null = null;

export default function useDialogService() {
  const dispatch = useAppDispatch();
  const dialogState = useAppSelector<IDialogSlice>(StoreSliceEnum.DIALOG);

  const openDialog = useCallback(
    (config: ISheBaseDialog | IDialogComponent): Promise<boolean> => {
      return new Promise((resolve) => {
        if ("component" in config) {
          // Handle custom component
          const { props } = config;
          dispatch(
            DialogSliceActions.openDialog({
              type: config.type,
              props: props || {},
            }),
          );
        } else {
          // Handle base dialog
          dispatch(
            DialogSliceActions.openDialog({
              type: config.type || "base",
              ...config,
            }),
          );
        }

        globalResolver = resolve;
      });
    },
    [dispatch],
  );

  const closeDialog = useCallback(() => {
    dispatch(DialogSliceActions.closeDialog());
  }, [dispatch]);

  const handlePrimaryClick = useCallback(() => {
    if (globalResolver) {
      const resolver = globalResolver;
      globalResolver = null;
      resolver(true);
    }
    closeDialog();
  }, [closeDialog]);

  const handleSecondaryClick = useCallback(() => {
    if (globalResolver) {
      const resolver = globalResolver;
      globalResolver = null;
      resolver(false);
    }
    closeDialog();
  }, [closeDialog]);

  const openConfirmationDialog = useCallback(
    (options: ISheConfirmationDialog): Promise<boolean> => {
      return openDialog({
        type: "confirmation",
        primaryButtonValue: options.primaryButtonValue || "Confirm",
        secondaryButtonValue: options.secondaryButtonValue || "Cancel",
        ...options,
      });
    },
    [openDialog],
  );

  return {
    ...dialogState,
    openDialog,
    openConfirmationDialog,
    closeDialog,
    handlePrimaryClick,
    handleSecondaryClick,
  };
}
