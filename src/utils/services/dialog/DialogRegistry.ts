import { ComponentType } from "react";
import SheDialog from "@/components/dialogs/she-dialog/SheDialog.tsx";
import SheConfirmationDialog from "@/components/dialogs/she-confirmation-dialog/SheConfirmationDialog.tsx";

type DialogComponent = ComponentType<any>;

const dialogRegistry: Record<string, DialogComponent> = {
  base: SheDialog,
  confirmation: SheConfirmationDialog,
};

export function registerDialog(type: string, component: DialogComponent) {
  dialogRegistry[type] = component;
}

export function getDialogComponent(type: string): DialogComponent {
  return dialogRegistry[type] || dialogRegistry.base;
}
