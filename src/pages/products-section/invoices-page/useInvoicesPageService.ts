import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import { InvoicesPageSliceActions as actions } from "@/state/slices/InvoicesPageSlice.ts";
import { useAppDispatch } from "@/utils/hooks/redux.ts";

export default function useInvoicesPageService() {
  const dispatch = useAppDispatch();
  const [getInvoicesForGrid] =
    PurchasesApiHooks.useGetInvoicesForGridMutation();
  const [downloadAsset] = AssetsApiHooks.useLazyDownloadAssetQuery();

  function getInvoicesForGridHandler(purchaseId: number) {
    return getInvoicesForGrid(purchaseId).then((res: any) => {
      dispatch(actions.refreshInvoicesGridModel(res.data));
      return res.data;
    });
  }

  function downloadAssetHandler(assetId: number) {
    return downloadAsset(assetId).then((res: any) => {
      return res;
    });
  }

  return {
    getInvoicesForGridHandler,
    downloadAssetHandler,
  };
}
