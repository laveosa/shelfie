import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store.ts";
import { useParams } from "react-router-dom";
import { OrdersApiService as api } from "@/utils/services/api/OrdersApiService.ts";
import { CustomersPageSliceActions as actions } from "@/state/slices/CustomersPageSlice.ts";
import { useAppSelector } from "@/utils/hooks/redux";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum";
import { ICustomersPageSlice } from "@/const/interfaces/store-slices/ICustomersPageSlice";


export default function useCustomerOrdersPageService() {
    const state = useAppSelector<ICustomersPageSlice>(StoreSliceEnum.CUSTOMERS);
    const {customerId} = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const [getCustomerInfo] = api.useLazyGetCustomerInfoQuery();

    function getCustomerInfoHandler(id: number) {
        return getCustomerInfo(id).then((res) => {
          const counter = res.data;
          dispatch(actions.refreshCustomerCounter(counter));
          return res.data;
        });
      }




    return {
        state,
        customerId,
        getCustomerInfoHandler
    };
}