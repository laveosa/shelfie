import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";
import { SupplierPageSliceActions as actions } from "@/state/slices/SupplierPageSlice.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPageSlice } from "@/const/interfaces/store-slices/ISupplierPageSlice.ts";
import SuppliersApiHooks from "@/utils/services/api/SuppliersApiService.ts";

export default function useSupplierPageService() {
  const state = useAppSelector<ISupplierPageSlice>(StoreSliceEnum.SUPPLIER);
  const dispatch = useAppDispatch();

  const [getPurchaseDetails] =
    PurchasesApiHooks.useLazyGetPurchaseDetailsQuery();
  const [createPurchaseForSupplier] =
    PurchasesApiHooks.useCreatePurchaseForSupplierMutation();
  const [getListOfAllSuppliers] =
    SuppliersApiHooks.useLazyGetListOfAllSuppliersQuery();
  const [createSupplier] = SuppliersApiHooks.useCreateSupplierMutation();

  function getPurchaseDetailsHandler(id) {
    return getPurchaseDetails(id).then((res: any) => {
      dispatch(actions.refreshPurchase(res.data));
      return res.data;
    });
  }

  function createPurchaseForSupplierHandler(model) {
    return createPurchaseForSupplier(model).then((res: any) => {
      dispatch(actions.refreshPurchase(res.data));
      return res.data;
    });
  }

  function getListOfAllSuppliersHandler() {
    return getListOfAllSuppliers().then((res: any) => {
      dispatch(actions.refreshSuppliers(res.data));
      return res.data;
    });
  }

  function createSupplierHandler(model) {
    return createSupplier(model).then((res: any) => {
      return res.data;
    });
  }

  return {
    getPurchaseDetailsHandler,
    createPurchaseForSupplierHandler,
    getListOfAllSuppliersHandler,
    createSupplierHandler,
  };
}
