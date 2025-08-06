import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/state/store.ts";
import { useNavigate, useParams } from "react-router-dom";
import { OrdersApiService as api } from "@/utils/services/api/OrdersApiService.ts";
import { CustomersPageSliceActions as actions, selectCustomersPageState } from "@/state/slices/CustomersPageSlice.ts";


export default function useCustomerOpenCartPageService() {
    const { appState, state } = useSelector(selectCustomersPageState);
    const {customerId} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

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