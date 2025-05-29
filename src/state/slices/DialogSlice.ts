import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IDialogSlice } from "@/const/interfaces/store-slices/IDialogSlice.ts";
import { DialogConfig } from "@/utils/services/DialogService.tsx";

const initialState: IDialogSlice = {
  isOpen: false,
  config: null,
};

function openDialog(state: IDialogSlice, action: PayloadAction<DialogConfig>) {
  state.isOpen = true;
  state.config = action.payload;
}

function closeDialog(state: IDialogSlice) {
  state.isOpen = false;
  state.config = null;
}

const DialogSlice = createSlice({
  name: StoreSliceEnum.DIALOG,
  initialState,
  reducers: {
    openDialog,
    closeDialog,
  },
});

export const DialogSliceActions = DialogSlice.actions;
export default DialogSlice;
