import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import { InvoicesPageSliceActions as actions } from "@/state/slices/InvoicesPageSlice.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { useToast } from "@/hooks/useToast.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IInvoicesPageSlice } from "@/const/interfaces/store-slices/IInvoicesPageSlice.ts";

export default function useInvoicesPageService(handleCardAction) {
  const dispatch = useAppDispatch();
  const productsService = useProductsPageService();
  const state = useAppSelector<IInvoicesPageSlice>(StoreSliceEnum.INVOICES);
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const { addToast } = useToast();
  const { openConfirmationDialog } = useDialogService();

  const [getInvoicesForGrid] =
    PurchasesApiHooks.useGetInvoicesForGridMutation();
  const [downloadAsset] = AssetsApiHooks.useLazyDownloadAssetQuery();

  function getPurchaseCountersHandler(purchaseId: number) {
    if (!productsState.purchaseCounters) {
      dispatch(actions.setIsProductMenuCardLoading(true));
      productsService
        .getPurchaseCountersHandler(purchaseId)
        .then(() => dispatch(actions.setIsProductMenuCardLoading(false)));
      dispatch(actions.setIsProductMenuCardLoading(false));
    }
  }

  function getInvoicesForGridHandler(purchaseId: number) {
    dispatch(actions.setIsInvoiceCardGridLoading(true));
    return getInvoicesForGrid(purchaseId).then((res: any) => {
      dispatch(actions.setIsInvoiceCardGridLoading(false));
      dispatch(actions.refreshInvoicesGridRequestModel(res.data));
      return res.data;
    });
  }

  function uploadInvoiceHandler(purchaseId: number, model) {
    dispatch(actions.setIsFileUploaderLoading(true));
    productsService.uploadPhotoHandler(model).then((res) => {
      dispatch(actions.setIsFileUploaderLoading(false));
      if (res.data.assetId) {
        dispatch(actions.setIsProductMenuCardLoading(true));
        dispatch(actions.setIsInvoiceCardGridLoading(true));
        Promise.all([
          productsService.getPurchaseCountersHandler(Number(purchaseId)),
          getInvoicesForGridHandler(Number(purchaseId)),
        ]).then(() => {
          dispatch(actions.setIsProductMenuCardLoading(false));
          dispatch(actions.setIsInvoiceCardGridLoading(false));
        });
        addToast({
          text: "Invoice added successfully",
          type: "success",
        });
      } else {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
    });
  }

  async function deleteInvoiceHandler(model, purchaseId) {
    const confirmedDeleteInvoice = await openConfirmationDialog({
      headerTitle: "Delete Invoice",
      text: `You are about to delete invoice "${model.row.original.originalName}".`,
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });
    if (!confirmedDeleteInvoice) {
    } else {
      model.table.options.meta?.hideRow(model.row.original.id);
      await productsService
        .deletePhotoHandler(model.row.original.assetId)
        .then((res) => {
          productsService.getPurchaseCountersHandler(Number(purchaseId));
          if (state.invoicesGridRequestModel.items.length === 1) {
            dispatch(
              actions.refreshInvoicesGridRequestModel({
                ...state.invoicesGridRequestModel,
                items: [],
              }),
            );
          }
          if (!res) {
            addToast({
              text: "Invoice deleted successfully",
              type: "success",
            });
          } else {
            model.table.options.meta?.unhideRow(model.row.original.id);
            addToast({
              text: res.error.data.detail,
              type: "error",
            });
          }
        });
    }
    if (model.row.original.url === state.previewUrl) {
      handleCardAction("invoicePreviewCard");
    }
  }

  function downloadAssetHandler(assetId: number) {
    return downloadAsset(assetId).then((res: any) => {
      return res;
    });
  }

  function downloadInvoice(model) {
    downloadAssetHandler(model.assetId).then((res) => {
      if (res?.data instanceof Blob) {
        const url = window.URL.createObjectURL(res.data);

        const a = document.createElement("a");
        a.href = url;
        a.download = "invoice.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        addToast({
          text: "Invoice is downloading",
          type: "success",
        });
      } else {
        addToast({
          text: res.error.data.detail,
          type: "error",
        });
      }
    });
  }

  function previewInvoiceHandler(model) {
    handleCardAction("invoicePreviewCard", true);
    dispatch(actions.refreshPreviewUrl(model.url));
  }

  function closeInvoicePreviewCardHandler() {
    handleCardAction("invoicePreviewCard");
    dispatch(actions.refreshPreviewUrl(null));
  }

  return {
    state,
    productsState,
    getPurchaseCountersHandler,
    getInvoicesForGridHandler,
    uploadInvoiceHandler,
    deleteInvoiceHandler,
    downloadInvoice,
    previewInvoiceHandler,
    closeInvoicePreviewCardHandler,
  };
}
