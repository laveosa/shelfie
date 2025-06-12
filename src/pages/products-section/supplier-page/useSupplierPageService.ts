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
  const [getListOfSuppliers] =
    SuppliersApiHooks.useLazyGetListOfSuppliersQuery();
  const [getListOfSuppliersForGrid] =
    SuppliersApiHooks.useGetListOfSuppliersForGridMutation();
  const [getSupplierDetails] =
    SuppliersApiHooks.useLazyGetSupplierDetailsQuery();
  const [createSupplier] = SuppliersApiHooks.useCreateSupplierMutation();
  const [updateSupplier] = SuppliersApiHooks.useUpdateSupplierMutation();

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

  function getListOfSuppliersHandler() {
    return getListOfSuppliers().then((res: any) => {
      dispatch(actions.refreshSuppliers(res.data));
      return res.data;
    });
  }

  function getListOfSuppliersForGridHandler(model) {
    return getListOfSuppliersForGrid(model).then((res: any) => {
      dispatch(actions.refreshSuppliersWithLocations(res.data.items));
      return res.data;
    });
  }

  function getSupplierDetailsHandler(supplierId, locationId) {
    return getSupplierDetails({ supplierId, locationId }).then((res: any) => {
      return res.data;
    });
  }

  function createSupplierHandler(model) {
    return createSupplier(model).then((res: any) => {
      return res.data;
    });
  }

  function updateSupplierHandler(model, supplierId, locationId) {
    return updateSupplier({
      model,
      supplierId,
      locationId,
    }).then((res: any) => {
      return res.data;
    });
  }

  return {
    getPurchaseDetailsHandler,
    createPurchaseForSupplierHandler,
    getListOfSuppliersHandler,
    getListOfSuppliersForGridHandler,
    getSupplierDetailsHandler,
    createSupplierHandler,
    updateSupplierHandler,
  };
}
