import React from "react";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import useDialogService from "@/utils/services/DialogService.tsx";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IDialogSlice } from "@/const/interfaces/store-slices/IDialogSlice.ts";
import { getDialogComponent } from "@/utils/services/DialogRegistry.tsx";

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, config } = useAppSelector<IDialogSlice>(
    StoreSliceEnum.DIALOG,
  );
  const { handlePrimaryClick, handleSecondaryClick } = useDialogService();

  if (isOpen && config) {
    const dialogProps = {
      ...config,
      onSecondaryButtonClick: handleSecondaryClick,
      onPrimaryButtonClick: handlePrimaryClick,
    };

    const DialogComponent = getDialogComponent(config.type || "base");

    return (
      <>
        {children}
        <DialogComponent {...dialogProps}>{config.children}</DialogComponent>
      </>
    );
  }

  return <>{children}</>;
}
