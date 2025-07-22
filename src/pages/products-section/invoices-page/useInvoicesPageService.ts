import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";

export default function useInvoicesPageService() {
  const [getInvoicesForGrid] =
    PurchasesApiHooks.useGetInvoicesForGridMutation();
  const [downloadAsset] = AssetsApiHooks.useLazyDownloadAssetQuery();

  function getInvoicesForGridHandler(purchaseId: number) {
    return getInvoicesForGrid(purchaseId).then((res: any) => {
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
