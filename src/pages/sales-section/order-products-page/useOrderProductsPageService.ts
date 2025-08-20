import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import useAppService from "@/useAppService.ts";
import { IOrderProductsPageSlice } from "@/const/interfaces/store-slices/IOrderProductsPageSlice.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { OrderProductsPageSliceActions as actions } from "@/state/slices/OrderProductsPageSlice";
import { OrdersPageSliceActions as ordersActions } from "@/state/slices/OrdersPageSlice.ts";
import { useToast } from "@/hooks/useToast.ts";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";
import OrdersApiHooks from "@/utils/services/api/OrdersApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export default function useOrderProductsPageService() {
  const appService = useAppService();
  const state = useSelector(
    (state: RootState): IOrderProductsPageSlice =>
      state[StoreSliceEnum.ORDER_PRODUCTS],
  );
  const ordersState = useSelector(
    (state: RootState): IOrdersPageSlice => state[StoreSliceEnum.ORDERS],
  );
  const ordersService = useOrdersPageService();
  const dispatch = useDispatch<AppDispatch>();
  const { addToast } = useToast();

  const [addVariantsToOrder] = OrdersApiHooks.useAddVariantsToOrderMutation();
  const [updateStockActionInOrder] =
    OrdersApiHooks.useUpdateStockActionInOrderMutation();
  const [removeStockActionFromOrder] =
    OrdersApiHooks.useRemoveStockActionFromOrderMutation();

  function getOrderStockActionsListForGrid(orderId) {
    dispatch(actions.setIsProductsInOrderGridLoading(true));
    ordersService
      .getListOfStockActionsForGridHandler(
        orderId,
        ordersState.stockActionsGridRequestModel,
      )
      .then(() => {
        dispatch(actions.setIsProductsInOrderGridLoading(false));
      });
  }

  function getVariantsListForGrid(model: GridRequestModel) {
    dispatch(actions.setIsFindProductsGridLoading(true));
    ordersService.getVariantsForGridHandler(model).then(() => {
      dispatch(actions.setIsFindProductsGridLoading(false));
    });
  }

  function addProductHandler() {
    dispatch(actions.setIsFindProductsGridLoading(true));
    if (ordersState.brands.length === 0) {
      ordersService.getBrandsForFilterHandler();
    }
    if (ordersState.categories.length === 0) {
      ordersService.getCategoriesForFilterHandler();
    }
    if (
      ordersState.sizesForFilter.length === 0 ||
      ordersState.colorsForFilter.length === 0
    )
      ordersService.getTraitsForFilterHandler();
    ordersService
      .getVariantsForGridHandler(ordersState.variantsGridRequestModel)
      .then(() => {
        dispatch(actions.setIsFindProductsGridLoading(false));
      });
  }

  function addVariantsToOrderHandler(orderId, model) {
    dispatch(actions.setIsProductsInOrderGridLoading(true));
    return addVariantsToOrder({ orderId, model }).then((res: any) => {
      dispatch(actions.setIsProductsInOrderGridLoading(false));
      if (!res.error) {
        dispatch(
          ordersActions.refreshStockActionsGridModel({
            ...ordersState.stockActionsGridModel,
            items: [res.data, ...ordersState.stockActionsGridModel.items],
          }),
        );
        addToast({
          text: "Stock action added successfully",
          type: "success",
        });
      } else {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
      return res.data;
    });
  }

  function variantsGridRequestChange(updates) {
    let gridRequestModel;
    if (updates.filter) {
      gridRequestModel = dispatch(
        ordersActions.refreshVariantsGridRequestModel({
          ...ordersState.variantsGridRequestModel,
          currentPage: 1,
          filter: {
            ...ordersState.variantsGridRequestModel.filter,
            ...updates.filter,
          },
        }),
      );
    } else {
      gridRequestModel = dispatch(
        ordersActions.refreshVariantsGridRequestModel({
          ...ordersState.variantsGridRequestModel,
          ...updates,
        }),
      );
    }
    getVariantsListForGrid(gridRequestModel.payload);
  }

  function updateStockActionInOrderHandler(stockActionId, model) {
    return updateStockActionInOrder({ stockActionId, model }).then(
      (res: any) => {
        if (!res.error) {
          addToast({
            text: "Stock action updated successfully",
            type: "success",
          });
        } else {
          addToast({
            text: `${res.error.data.detail}`,
            type: "error",
          });
        }
        console.log("RES", res.data);
        return res.data;
      },
    );
  }

  function removeStockActionFromOrderHandler(stockActionId: number) {
    return removeStockActionFromOrder(stockActionId).then((res: any) => {
      if (!res.error) {
        dispatch(
          ordersActions.refreshStockActionsGridModel({
            ...ordersState.stockActionsGridModel,
            items: ordersState.stockActionsGridModel.items.filter(
              (item) => item.stockActionId !== stockActionId,
            ),
          }),
        );
        addToast({
          text: "Stock action deleted successfully",
          type: "success",
        });
      } else {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
      return res.data;
    });
  }

  return {
    getOrderStockActionsListForGrid,
    getVariantsListForGrid,
    addProductHandler,
    addVariantsToOrderHandler,
    variantsGridRequestChange,
    updateStockActionInOrderHandler,
    removeStockActionFromOrderHandler,
  };
}
