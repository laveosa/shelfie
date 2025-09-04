import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { useToast } from "@/hooks/useToast.ts";
import { ShipmentDetailsPageSliceActions as actions } from "@/state/slices/ShipmentDetailsPageSlice.ts";
import { ShipmentsPageSliceActions as shipmentsActions } from "@/state/slices/ShipmentsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import OrdersApiHooks from "@/utils/services/api/OrdersApiService.ts";
import { IShipmentDetailsPageSlice } from "@/const/interfaces/store-slices/IShipmentDetailsPageSlice.ts";

export default function useShipmentDetailsPageService() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const state = useAppSelector<IShipmentDetailsPageSlice>(
    StoreSliceEnum.SHIPMENT_DETAILS,
  );

  const [getShipmentDetails] = OrdersApiHooks.useLazyGetShipmentDetailsQuery();

  function getShipmentDetailsHandler(shipmentId: number) {
    dispatch(actions.setIsShipmentConfigurationCardLoading(true));
    return getShipmentDetails(shipmentId).then((res: any) => {
      dispatch(actions.setIsShipmentConfigurationCardLoading(false));
      dispatch(shipmentsActions.refreshSelectedShipment(res.data));
      return res;
    });
  }

  return {
    getShipmentDetailsHandler,
  };
}
