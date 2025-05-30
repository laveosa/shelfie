import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IDialogSlice } from "@/const/interfaces/store-slices/IDialogSlice.ts";
import { ISheBaseDialog } from "@/const/interfaces/dialogs/ISheBaseDialog.ts";
import { IDialogComponent } from "@/const/interfaces/dialogs/IDialogComponent.ts";

const initialState: IDialogSlice = {
  isOpen: false,
  config: null,
};

const DialogSlice = createSlice({
  name: StoreSliceEnum.DIALOG,
  initialState,
  reducers: {
    openDialog: (
      state,
      action: PayloadAction<ISheBaseDialog | IDialogComponent>,
    ) => {
      state.isOpen = true;
      state.config = action.payload as any;
    },
    closeDialog: (state) => {
      state.isOpen = false;
      state.config = null;
    },
  },
});

export const DialogSliceActions = DialogSlice.actions;
export default DialogSlice;
