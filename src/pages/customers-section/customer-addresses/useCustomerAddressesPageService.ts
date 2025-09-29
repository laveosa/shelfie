import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/state/store.ts";
import { CustomersPageSliceActions as actions } from "@/state/slices/CustomersPageSlice";
import { OrdersApiService as api } from "@/utils/services/api/OrdersApiService";
import { DictionaryApiHooks } from "@/utils/services/api/DictionaryApiService";
import { AddressRequestModelDefault } from "@/const/models/AddressRequestModel";
import {
  convertAddressToRequestModel,
  createAddressRequestModel,
} from "@/utils/helpers/address-helper";
import { clearSelectedGridItems } from "@/utils/helpers/quick-helper";
import { useAppSelector } from "@/utils/hooks/redux";
import { useToast } from "@/hooks/useToast.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum";
import { AddressModel } from "@/const/models/AddressModel";
import { GridRequestModel } from "@/const/models/GridRequestModel";
import { ICustomersPageSlice } from "@/const/interfaces/store-slices/ICustomersPageSlice";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice";

export default function useCustomerAddressesPageService() {
  const state = useAppSelector<ICustomersPageSlice>(StoreSliceEnum.CUSTOMERS);
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);

  const dispatch = useDispatch<AppDispatch>();

  const [updateCustomerAddress] = api.useUpdateCustomerAddressMutation();
  const [createCustomerAddress] = api.useCreateCustomerAddressMutation();
  const [getCustomerAddressDetails] =
    api.useLazyGetCustomerAddressDetailsQuery();
  const [deleteCustomerAddress] = api.useDeleteCustomerAddressMutation();
  const [getCustomerAddressesForGrid] =
    api.useGetCustomerAddressesForGridMutation();
  const [getCountryCode] = DictionaryApiHooks.useLazyGetCountryCodeQuery();
  const [getCustomerInfo] = api.useLazyGetCustomerInfoQuery();
  const { customerId } = useParams();
  const { addToast } = useToast();

  function getCustomerAddressesForGridHandler(data?: GridRequestModel) {
    // if (_.isEqual(data, state.customerAddressesGridRequestModel)) return;

    dispatch(actions.setIsCustomerAddressesLoading(true));

    return getCustomerAddressesForGrid({
      model: data,
      id: Number(customerId),
    }).then((res: any) => {
      dispatch(actions.setIsCustomerAddressesLoading(false));

      if (!res.error) {
        const filteredItems = res.data.items.filter(
          (item: any) => !item.isDeleted,
        );
        dispatch(actions.refreshCustomerAddressesGridRequestModel(res.data));
        dispatch(actions.refreshCustomerAddresses(filteredItems));
      }
      return res;
    });
  }

  function resolveCustomerAddressData(data: any) {
    const requestModel = createAddressRequestModel(
      data.alias,
      data.addressLine1,
      data.addressLine2,
      data.city,
      data.state,
      data.postalCode,
      data.countryId,
    );
    if (!!state.selectedCustomerAddressId) {
      return updateCustomerAddressHandler(requestModel);
    } else {
      return createCustomerAddressHandler(requestModel);
    }
  }

  function updateCustomerAddressHandler(data: any) {
    const requestData = convertAddressToRequestModel(data);
    dispatch(actions.setIsCustomerAddressDetailsLoading(true));
    return updateCustomerAddress({
      id: state.selectedCustomerAddressId,
      model: requestData,
    }).then((res) => {
      dispatch(actions.setIsCustomerAddressDetailsLoading(false));
      if (res.error) {
        return;
      } else {
        const updatedAddresses = state.customerAddresses.map((address) =>
          address.addressId === state.selectedCustomerAddressId
            ? res.data
            : address,
        );
        dispatch(actions.refreshCustomerAddresses(updatedAddresses));
        onCloseCustomerAddressCardHandler();
        addToast({
          text: "Customer address updated successfully",
          type: "info",
        });
        return res.data;
      }
    });
  }

  function createCustomerAddressHandler(data: any) {
    const requestData = convertAddressToRequestModel(data);

    dispatch(actions.setIsCustomerAddressDetailsLoading(true));
    return createCustomerAddress({
      id: Number(customerId),
      model: requestData,
    }).then((res) => {
      dispatch(actions.setIsCustomerAddressDetailsLoading(false));
      if (res.error) {
        return;
      } else {
        addToast({
          text: "New customer address created successfully",
          type: "info",
        });
        // Add new address at the top of the list
        const updatedAddresses = [res.data, ...state.customerAddresses];
        onCloseCustomerAddressCardHandler();
        dispatch(actions.refreshCustomerAddresses(updatedAddresses));
        return res.data;
      }
    });
  }

  function deleteCustomerAddressHandler(id: number) {
    // Take a copy of the record to be deleted
    const addressToDelete = state.customerAddresses.find(
      (address) => address.addressId === id,
    );

    // Remove the record from state
    const updatedAddresses = state.customerAddresses.filter(
      (address) => address.addressId !== id,
    );
    dispatch(
      actions.refreshCustomerAddresses(
        clearSelectedGridItems(updatedAddresses),
      ),
    );

    onCloseCustomerAddressCardHandler();

    return deleteCustomerAddress(id).then((res) => {
      if (res.error) {
        if (
          addressToDelete &&
          !state.customerAddresses.some(
            (address) => address.addressId === addressToDelete.addressId,
          )
        ) {
          const restoredAddresses = [
            ...state.customerAddresses,
            addressToDelete,
          ];
          dispatch(
            actions.refreshCustomerAddresses(
              clearSelectedGridItems(restoredAddresses),
            ),
          );
        }
        addToast({
          text: "Failed to delete customer address",
          type: "error",
        });
        return;
      } else {
        addToast({
          text: "Customer address deleted successfully",
          type: "info",
        });
        return res.data;
      }
    });
  }

  function getCustomerAddressDetailsHandler(id: number) {
    return getCustomerAddressDetails(id).then((res) => {
      return res.data;
    });
  }

  function onManageCustomerAddressHandler(data: AddressModel) {
    dispatch(actions.setCreateCustomerAddress(false));
    dispatch(
      actions.refreshSelectedCustomerAddress(
        convertAddressToRequestModel(data),
      ),
    );
    dispatch(actions.refreshSelectedCustomerAddressId(data.addressId));
  }

  function onCloseCustomerAddressCardHandler() {
    dispatch(actions.refreshActiveCards([]));
    dispatch(actions.refreshSelectedCustomerAddressId(null));
    dispatch(actions.refreshSelectedCustomerAddress(null));
    //dispatch(actions.refreshCustomerAddresses(clearSelectedGridItems(state.customerAddresses)));
  }

  function onCreateCustomerAddressHandler() {
    dispatch(actions.setCreateCustomerAddress(true));
    dispatch(
      actions.refreshSelectedCustomerAddress(AddressRequestModelDefault),
    );
    dispatch(actions.refreshSelectedCustomerAddressId(null));
  }

  function getCountryCodeHandler() {
    return getCountryCode(null).then((res: any) => {
      if (res.data) {
        dispatch(actions.refreshCountryList(res.data));
      }
      return res;
    });
  }

  function getCustomerInfoHandler(id: number) {
    return getCustomerInfo(id).then((res) => {
      const counter = res.data;
      dispatch(actions.refreshCustomerCounter(counter));
      return res.data;
    });
  }

  return {
    state,
    appState,
    actions,
    customerId,
    dispatch,
    getCustomerAddressDetailsHandler,
    deleteCustomerAddressHandler,
    getCustomerAddressesForGridHandler,
    onManageCustomerAddressHandler,
    onCloseCustomerAddressCardHandler,
    onCreateCustomerAddressHandler,
    getCountryCodeHandler,
    resolveCustomerAddressData,
    getCustomerInfoHandler,
  };
}
