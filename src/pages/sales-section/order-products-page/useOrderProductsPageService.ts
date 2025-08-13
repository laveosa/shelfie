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

  function addProductHandler() {
    dispatch(actions.setIsFindProductsGridLoading(true));
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
    if (updates.brands || updates.categories || updates.filter) {
      dispatch(
        ordersActions.refreshVariantsGridRequestModel({
          ...ordersState.variantsGridRequestModel,
          currentPage: 1,
          ...updates,
        }),
      );
    } else {
      dispatch(
        ordersActions.refreshVariantsGridRequestModel({
          ...ordersState.variantsGridRequestModel,
          ...updates,
        }),
      );
    }
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
    addProductHandler,
    addVariantsToOrderHandler,
    variantsGridRequestChange,
    updateStockActionInOrderHandler,
    removeStockActionFromOrderHandler,
  };
}
