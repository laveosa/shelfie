import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";
import { SupplierPageSliceActions as actions } from "@/state/slices/SupplierPageSlice.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPage } from "@/const/interfaces/store-slices/ISupplierPage.ts";

export default function useSupplierPageService() {
  const state = useAppSelector<ISupplierPage>(StoreSliceEnum.SUPPLIER);
  const dispatch = useAppDispatch();

  const [getPurchaseDetails] =
    PurchasesApiHooks.useLazyGetPurchaseDetailsQuery();

  function getPurchaseDetailsHandler(id) {
    return getPurchaseDetails(id).then((res: any) => {
      dispatch(actions.refreshPurchase(res.data));
      return res.data;
    });
  }

  return {
    getPurchaseDetailsHandler,
  };
}
