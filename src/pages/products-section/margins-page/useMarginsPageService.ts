import { useAppDispatch } from "@/utils/hooks/redux.ts";
import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";

export default function useMarginsPageService() {
  const dispatch = useAppDispatch();

  const [getAllMargins] = PurchasesApiHooks.useLazyGetAllMarginsQuery();
  const [getMarginForPurchase] =
    PurchasesApiHooks.useLazyGetMarginForPurchaseQuery();

  function getAllMarginsHandler() {
    return getAllMargins().then((res: any) => {
      return res.data;
    });
  }

  function getMarginForPurchaseHandler(purchaseId) {
    return getMarginForPurchase(purchaseId).then((res: any) => {
      return res.data;
    });
  }

  return {
    getAllMarginsHandler,
    getMarginForPurchaseHandler,
  };
}
