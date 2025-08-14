import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";
import { OrdersPageSliceActions as actions } from "@/state/slices/OrdersPageSlice.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import useAppService from "@/useAppService.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import OrdersApiHooks from "@/utils/services/api/OrdersApiService.ts";

export default function useOrdersPageService() {
  const appService = useAppService();
  const state = useSelector(
    (state: RootState): IOrdersPageSlice => state[StoreSliceEnum.ORDERS],
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [getSortingOptionsForGrid] =
    DictionaryApiHooks.useLazyGetSortingOptionsForGridQuery();
  const [getListOfOrdersForGrid] =
    OrdersApiHooks.useGetListOfOrdersForGridMutation();
  const [updateUserPreferences] =
    UsersApiHooks.useUpdateUserPreferencesMutation();
  const [resetUserPreferences] =
    UsersApiHooks.useResetUserPreferencesMutation();
  const [createOrder] = OrdersApiHooks.useCreateOrderMutation();
  const [getListOfCustomersForGrid] =
    OrdersApiHooks.useGetListOfCustomersForGridMutation();
  const [getVariantsForGrid] = ProductsApiHooks.useGetVariantsForGridMutation();
  const [getBrandsForFilter] =
    ProductsApiHooks.useLazyGetBrandsForProductsFilterQuery();
  const [getCategoriesForFilter] =
    ProductsApiHooks.useLazyGetCategoriesForProductsFilterQuery();
  const [getTraitsForFilter] =
    ProductsApiHooks.useLazyGetTraitsForFilterQuery();
  const [getListOfStockActionsForGrid] =
    OrdersApiHooks.useGetListOfStockActionsForGridMutation();

  function getSortingOptionsForGridHandler() {
    return getSortingOptionsForGrid(null).then((res: any) => {
      dispatch(actions.refreshSortingOptions(res.data));
      return res.data;
    });
  }

  function getListOfOrdersForGridHandler(model) {
    dispatch(actions.setIsOrdersGridLoading(true));
    return getListOfOrdersForGrid(model).then((res: any) => {
      dispatch(actions.setIsOrdersGridLoading(false));
      dispatch(actions.refreshOrdersGridModel(res.data));
      return res.data;
    });
  }

  function updateUserPreferencesHandler(model: PreferencesModel) {
    return updateUserPreferences(model).then(() => {
      appService.getUserPreferencesHandler();
    });
  }

  function resetUserPreferencesHandler(grid) {
    return resetUserPreferences(grid).then(() => {
      appService.getUserPreferencesHandler();
    });
  }

  function createOrderHandler() {
    return createOrder().then((res: any) => {
      if (!res.error) {
        dispatch(actions.refreshSelectedOrder(res.data));
        navigate(
          `${NavUrlEnum.SALES}${NavUrlEnum.ORDERS}${NavUrlEnum.ORDER_DETAILS}/${res.data.id}`,
        );
      }
      return res.data;
    });
  }

  function getListOfCustomersForGridHandler(model) {
    return getListOfCustomersForGrid(model).then((res: any) => {
      const updatedCustomers = res.data.items.map((customer) =>
        customer.customerId === state.selectedOrder.customerId
          ? { ...customer, isSelected: true }
          : { ...customer, isSelected: false },
      );

      dispatch(
        actions.refreshCustomersGridModel({
          ...res.data,
          items: updatedCustomers,
        }),
      );
      return res.data;
    });
  }

  function getVariantsForGridHandler(data?: GridRequestModel) {
    dispatch(actions.setIsLoading(true));
    return getVariantsForGrid(data).then((res: any) => {
      dispatch(actions.setIsLoading(false));
      if (res.error) {
        return;
      } else {
        dispatch(actions.refreshVariantsGridModel(res.data));
        return res.data;
      }
    });
  }

  function getBrandsForFilterHandler() {
    return getBrandsForFilter(null).then((res: any) => {
      dispatch(actions.refreshBrands(res.data));
      return res.data;
    });
  }

  function getCategoriesForFilterHandler() {
    return getCategoriesForFilter(null).then((res: any) => {
      dispatch(actions.refreshCategories(res.data));
      return res.data;
    });
  }

  function getTraitsForFilterHandler() {
    return getTraitsForFilter().then((res: any) => {
      dispatch(
        actions.refreshSizesForFilter(
          res.data
            .filter((trait) => trait.traitTypeId === 1)
            .flatMap((trait) => trait.traitOptions),
        ),
      );
      dispatch(
        actions.refreshColorsForFilter(
          res.data
            .filter((trait) => trait.traitTypeId === 2)
            .flatMap((trait) => trait.traitOptions),
        ),
      );
      return res.data;
    });
  }

  function getListOfStockActionsForGridHandler(orderId, model) {
    return getListOfStockActionsForGrid({ orderId, model }).then((res: any) => {
      dispatch(actions.refreshStockActionsGridModel(res.data));
      return res.data;
    });
  }

  return {
    getSortingOptionsForGridHandler,
    getListOfOrdersForGridHandler,
    updateUserPreferencesHandler,
    resetUserPreferencesHandler,
    createOrderHandler,
    getListOfCustomersForGridHandler,
    getVariantsForGridHandler,
    getBrandsForFilterHandler,
    getCategoriesForFilterHandler,
    getTraitsForFilterHandler,
    getListOfStockActionsForGridHandler,
  };
}
