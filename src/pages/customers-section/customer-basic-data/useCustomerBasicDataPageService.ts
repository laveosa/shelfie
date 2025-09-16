import { useDispatch } from "react-redux";

import { AppDispatch } from "@/state/store.ts";
import { CustomersPageSliceActions as actions } from "@/state/slices/CustomersPageSlice";
import { ICustomersPageSlice } from "@/const/interfaces/store-slices/ICustomersPageSlice";
import { OrdersApiService as api } from "@/utils/services/api/OrdersApiService";
import { convertCustomerToRequestModel } from "@/utils/helpers/customer-helper.ts";
import { useNavigate, useParams } from "react-router-dom";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum";
import { useToast } from "@/hooks/useToast.ts";
import { useAppSelector } from "@/utils/hooks/redux";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";

export default function useCustomerBasicDataPageService() {
  const state = useAppSelector<ICustomersPageSlice>(StoreSliceEnum.CUSTOMERS);
  const { openConfirmationDialog } = useDialogService();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [updateCustomer] = api.useUpdateCustomerMutation();
  const [createCustomer] = api.useCreateCustomerMutation();
  const [getCustomer] = api.useLazyGetCustomerDetailsQuery();
  const [getCustomerInfo] = api.useLazyGetCustomerInfoQuery();
  const [deleteCustomer] = api.useDeleteCustomerMutation();
  const { customerId } = useParams();
  const { addToast } = useToast();

  function updateCustomerHandler(data: any) {
    const requestData = convertCustomerToRequestModel(data);
    dispatch(actions.setIsCustomerBasicDataLoading(true));
    return updateCustomer({
      id: state.selectedCustomer?.customerId,
      model: requestData,
    }).then((res) => {
      dispatch(actions.setIsCustomerBasicDataLoading(false));
      if (res.error) {
        return;
      } else {
        addToast({
          text: "Customer updated successfully",
          type: "info",
        });
        return res.data;
      }
    });
  }

  function createCustomerHandler(data: any) {
    const requestData = convertCustomerToRequestModel(data);
    dispatch(actions.setIsCustomerBasicDataLoading(true));
    return createCustomer(requestData).then((res) => {
      dispatch(actions.setIsCustomerBasicDataLoading(false));
      if (res.error) {
        return;
      } else {
        addToast({
          text: "New customer created successfully",
          type: "info",
        });
        dispatch(actions.refreshSelectedCustomer(res.data));
        dispatch(actions.refreshCustomers([res.data, ...state.customers]));
        navigate(
          `${NavUrlEnum.CUSTOMERS}/${NavUrlEnum.CUSTOMER_BASIC_DATA}/${res.data.customerId}`,
        );
        return res.data;
      }
    });
  }

  function getCustomerHandler() {
    if (state.selectedCustomer) {
      return state.selectedCustomer;
    }
    if (customerId) {
      dispatch(actions.setIsCustomerBasicDataLoading(true));
      return getCustomer(Number(customerId)).then((res) => {
        dispatch(actions.setIsCustomerBasicDataLoading(false));
        dispatch(actions.refreshSelectedCustomer(res.data));
        return res.data;
      });
    }
  }

  function onCancelHandler() {
    dispatch(actions.resetSelectedCustomer());
    navigate(`${NavUrlEnum.CUSTOMERS}`);
  }

  function getCustomerInfoHandler(id: number) {
    return getCustomerInfo(id).then((res) => {
      const counter = res.data;
      dispatch(actions.refreshCustomerCounter(counter));
      return res.data;
    });
  }

  async function deleteCustomerHandler(data: any) {
    const confirmedCustomerDeleting = await openConfirmationDialog({
      headerTitle: "Deleting customer",
      text: `You are about to delete customer ${data.customerName}.`,
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedCustomerDeleting) return;

    deleteCustomer(data.id).then((res) => {
      if (res.error) {
        addToast({
          text: "Failed to delete customer",
          type: "error",
        });
        return;
      } else {
        addToast({
          text: "Customer deleted successfully",
          type: "info",
        });
        dispatch(
          actions.refreshCustomers(
            state.customers.filter(
              (customer) => customer.customerId !== data.customerId,
            ),
          ),
        );
        navigate(`${NavUrlEnum.CUSTOMERS}`);
      }
    });
  }

  return {
    state,
    actions,
    customerId,
    updateCustomerHandler,
    createCustomerHandler,
    getCustomerHandler,
    onCancelHandler,
    getCustomerInfoHandler,
    deleteCustomerHandler,
  };
}
