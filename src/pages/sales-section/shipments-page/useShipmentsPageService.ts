import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { useToast } from "@/hooks/useToast.ts";
import OrdersApiHooks from "@/utils/services/api/OrdersApiService.ts";
import { IShipmentsPageSlice } from "@/const/interfaces/store-slices/IShipmentsPageSlice.ts";
import { ShipmentsPageSliceActions as actions } from "@/state/slices/ShipmentsPageSlice.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export default function useShipmentsPageService() {
  const state = useSelector(
    (state: RootState): IShipmentsPageSlice => state[StoreSliceEnum.SHIPMENTS],
  );
  const dispatch = useDispatch<AppDispatch>();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [getShipmentsListForForGrid] =
    OrdersApiHooks.useGetShipmentsListForForGridMutation();
  const [createShipment] = OrdersApiHooks.useCreateShipmentMutation();

  function getShipmentsListForForGridHandler(model) {
    dispatch(actions.setIsShipmentsGridLoading(true));
    return getShipmentsListForForGrid(model).then((res: any) => {
      dispatch(actions.setIsShipmentsGridLoading(false));
      dispatch(actions.refreshShipmentsGridModel(res.data));
      return res;
    });
  }

  function createShipmentHandler() {
    dispatch(actions.setIsShipmentsCardLoading(true));
    return createShipment().then((res: any) => {
      dispatch(actions.setIsShipmentsCardLoading(false));
      dispatch(actions.refreshSelectedShipment(res.data));
      navigate(
        `${NavUrlEnum.SALES}${NavUrlEnum.SHIPMENTS}${NavUrlEnum.SHIPMENT_DETAILS}/${res.data.shipmentId}`,
      );
      return res.data;
    });
  }

  function manageShipmentHandler(shipment) {
    navigate(
      `${NavUrlEnum.SALES}${NavUrlEnum.SHIPMENTS}${NavUrlEnum.SHIPMENT_DETAILS}/${shipment.shipmentId}`,
    );
  }

  return {
    getShipmentsListForForGridHandler,
    createShipmentHandler,
    manageShipmentHandler,
  };
}
