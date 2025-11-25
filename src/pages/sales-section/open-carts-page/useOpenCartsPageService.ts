import { useNavigate } from "react-router-dom";
import { merge } from "lodash";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { useToast } from "@/hooks/useToast.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import UsersApiHooks from "@/utils/services/api/UsersApiService.ts";
import useAppService from "@/useAppService.ts";
import { OpenCartsPageSliceActions as actions } from "@/state/slices/OpenCartsPageSlice.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { convertCustomerToRequestModel } from "@/utils/helpers/customer-helper.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import OrdersApiHooks from "@/utils/services/api/OrdersApiService.ts";
import { OrdersPageSliceActions as ordersActions } from "@/state/slices/OrdersPageSlice.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { formatDate } from "@/utils/helpers/quick-helper.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";

export default function useOpenCartsPageService(
  handleCardAction,
  _handleMultipleCardActions,
) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const appService = useAppService();
  const productsService = useProductsPageService();
  const state = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.OPEN_CARTS);
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const { openConfirmationDialog } = useDialogService();

  const [updateUserPreferences] =
    UsersApiHooks.useUpdateUserPreferencesMutation();
  const [resetUserPreferences] =
    UsersApiHooks.useResetUserPreferencesMutation();
  const [getVariantsForGrid] = ProductsApiHooks.useGetVariantsForGridMutation();
  const [getBrandsForFilter] =
    ProductsApiHooks.useLazyGetBrandsForProductsFilterQuery();
  const [getCategoriesForFilter] =
    ProductsApiHooks.useLazyGetCategoriesForProductsFilterQuery();
  const [getTraitsForFilter] =
    ProductsApiHooks.useLazyGetTraitsForFilterQuery();
  const [updateCustomer] = OrdersApiHooks.useUpdateCustomerMutation();
  const [deleteCustomer] = OrdersApiHooks.useDeleteCustomerMutation();
  const [getListOfCustomersForGrid] =
    OrdersApiHooks.useGetListOfCustomersForGridMutation();
  const [getCustomer] = OrdersApiHooks.useLazyGetCustomerDetailsQuery();
  const [createCustomer] = OrdersApiHooks.useCreateCustomerMutation();
  const [getCartsListForGrid] = OrdersApiHooks.useGetCartsListForGridMutation();
  const [getCartDetails] = OrdersApiHooks.useLazyGetCartDetailsQuery();
  const [createCart] = OrdersApiHooks.useCreateCartMutation();
  const [updateCartCustomer] = OrdersApiHooks.useUpdateCartCustomerMutation();
  const [addVariantToCart] = OrdersApiHooks.useAddVariantToCartMutation();
  const [deleteStockActionFromCart] =
    OrdersApiHooks.useDeleteStockActionFromCartMutation();
  const [getProductVariants] =
    ProductsApiHooks.useLazyGetProductVariantsQuery();
  const [cancelCart] = OrdersApiHooks.useCancelCartMutation();
  const [createOrder] = OrdersApiHooks.useCreateOrderMutation();
  const [assignCustomerToOrder] =
    OrdersApiHooks.useAssignCustomerToOrderMutation();
  const [addVariantsToOrder] = OrdersApiHooks.useAddVariantsToOrderMutation();
  const [removeStockActionFromOrder] =
    OrdersApiHooks.useRemoveStockActionFromOrderMutation();
  const [updateCartPrepackedStatus] =
    OrdersApiHooks.useUpdateCartPrepackedStatusMutation();
  const [getVariantStockHistory] =
    ProductsApiHooks.useLazyGetVariantStockHistoryQuery();
  const [getCartsWithSearchedProduct] =
    OrdersApiHooks.useLazyGetCartsWithSearchedProductQuery();
  const [updateStockActionPriceInCart] =
    OrdersApiHooks.useUpdateStockActionPriceInCartMutation();

  function getListOfCartsForGridHandler(model) {
    dispatch(actions.setIsOpenCartsGridLoading(true));
    return getCartsListForGrid(model).then((res: any) => {
      dispatch(actions.setIsOpenCartsGridLoading(false));
      dispatch(actions.refreshOpenCartsGridRequestModel(res.data));
      return res.data;
    });
  }

  function handleGridRequestChange(updates: GridRequestModel) {
    getListOfCartsForGridHandler(updates);
  }

  function prepackedStatusFilterChangeHandler(status: string) {
    getListOfCartsForGridHandler({
      ...state.openCartsGridRequestModel,
      filter: {
        ...state.openCartsGridRequestModel.filter,
        prepackedCartStatus: status,
      },
    });
  }

  function updateUserPreferencesHandler(model: PreferencesModel) {
    const modifiedModel = merge({}, appState.preferences, model);
    return updateUserPreferences(modifiedModel).then(() => {
      appService.getUserPreferencesHandler();
    });
  }

  function resetUserPreferencesHandler(grid) {
    return resetUserPreferences(grid).then(() => {
      appService.getUserPreferencesHandler();
    });
  }

  function manageCartHandler(cartId: number) {
    handleCardAction("customerCartCard", true);
    dispatch(actions.setIsCartContentGridLoading(true));
    getCartDetails(cartId).then((res: any) => {
      dispatch(actions.setIsCartContentGridLoading(false));
      dispatch(actions.refreshManagedCart(res.data));
      dispatch(
        actions.resetSelectedCustomer({
          ...res.data.customer,
          customerId: res.data.customerId,
        }),
      );
    });
  }

  function createCartHandler() {
    handleCardAction("customerCartCard", true);
    dispatch(actions.resetManagedCart());
  }

  function closeCustomerCartCardHandler() {
    handleCardAction("customerCartCard");
    dispatch(actions.resetManagedCart());
  }

  function manageCustomerHandler(customer: CustomerModel) {
    navigate(
      `${NavUrlEnum.CUSTOMERS}${NavUrlEnum.CUSTOMER_BASIC_DATA}/${customer.customerId}`,
    );
  }

  function updateCustomerHandler(data: any) {
    const requestData = convertCustomerToRequestModel(data);
    dispatch(actions.setIsCustomerCardLoading(true));
    return updateCustomer({
      id: state.selectedCustomer?.customerId,
      model: requestData,
    }).then((res) => {
      dispatch(actions.setIsCustomerCardLoading(false));
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
      }
    });
  }

  function closeCustomerCardHandler() {
    dispatch(actions.resetManagedCustomer());
    handleCardAction("customerCard");
  }

  function openFindProductsCardHandler() {
    handleCardAction("findProductsCard", true);
    if (!state.brands) {
      getBrandsForFilter(null).then((res: any) => {
        dispatch(actions.refreshBrands(res.data));
      });
    }
    if (!state.categories) {
      getCategoriesForFilter(null).then((res: any) => {
        dispatch(actions.refreshCategories(res.data));
      });
    }
    if (!state.sizesForFilter || !state.colorsForFilter) {
      getTraitsForFilter().then((res: any) => {
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
    getVariantsListForGrid(state.variantsGridRequestModel);
  }

  function getVariantsListForGrid(model: GridRequestModel) {
    dispatch(actions.setIsFindProductsGridLoading(true));
    getVariantsForGrid(model).then((res: any) => {
      dispatch(actions.setIsFindProductsGridLoading(false));
      if (res.error) {
        return;
      } else {
        dispatch(actions.refreshVariantsGridRequestModel(res.data));
      }
    });
  }

  function variantsGridRequestChange(updates) {
    getVariantsListForGrid(updates);
  }

  function closeFindProductsCardHandler() {
    handleCardAction("findProductsCard");
  }

  function getListOfCustomersForGridHandler(model) {
    handleCardAction("selectEntityCard", true);
    return getListOfCustomersForGrid(model).then((res: any) => {
      const updatedCustomers = res.data.items.map((customer) => {
        const targetCustomerId =
          state.activeCardForCustomers === "shipmentConfigurationCard"
            ? state.selectedShipment?.customerId
            : state.selectedCustomer?.customerId;
        return {
          ...customer,
          isSelected: customer.customerId === targetCustomerId,
        };
      });
      dispatch(
        actions.refreshCustomersGridRequestModel({
          ...res.data,
          items: updatedCustomers,
        }),
      );
      return res.data;
    });
  }

  function openSelectEntityCardHandler() {
    handleCardAction("selectEntityCard", true);
    return getListOfCustomersForGrid(state.customersGridRequestModel).then(
      (res: any) => {
        dispatch(actions.setIsSelectEntityGridLoading(false));
        const updatedCustomers = res.data.items.map((item) => {
          return {
            ...item,
            isSelected: item.customerId === state.selectedCustomer?.customerId,
          };
        });
        dispatch(
          actions.refreshCustomersGridRequestModel({
            ...res.data,
            items: updatedCustomers,
          }),
        );
      },
    );
  }

  function selectCustomerHandler(customer: CustomerModel) {
    handleCardAction("selectEntityCard");
    dispatch(actions.refreshSelectedCustomer(customer));
    dispatch(actions.setIsCartContentGridLoading(true));
    createCart({ customerId: customer.customerId }).then((res) => {
      dispatch(actions.setIsCartContentGridLoading(false));
      dispatch(actions.refreshManagedCart(res.data));
      dispatch(
        actions.refreshOpenCartsGridRequestModel({
          ...state.openCartsGridRequestModel,
          items: [...state.openCartsGridRequestModel.items, res.data],
        }),
      );
    });
  }

  function openCreateEntityCardHandler() {
    handleCardAction("customerCard", true);
  }

  function searchEntityHandle(model) {
    dispatch(actions.setIsSelectEntityGridLoading(true));
    return getListOfCustomersForGrid({
      ...state.customersGridRequestModel,
      searchQuery: model,
    }).then((res: any) => {
      dispatch(actions.setIsSelectEntityGridLoading(false));
      const updatedCustomers = res.data.items.map((customer) => {
        const targetCustomerId = state.activeCards.includes(
          "shipmentConfigurationCard",
        )
          ? state.selectedShipment?.customerId
          : state.selectedCustomer?.customerId;

        return {
          ...customer,
          isSelected: customer.customerId === targetCustomerId,
        };
      });
      dispatch(
        ordersActions.refreshCustomersGridRequestModel({
          ...res.data,
          items: updatedCustomers,
        }),
      );
    });
  }

  function closeSelectEntityCardHandler() {
    handleCardAction("selectEntityCard");
  }

  function openCustomerCardHandler(model?: CustomerModel) {
    handleCardAction("customerCard", true);
    getCustomer(
      state.activeCards.includes("ShipmentConfigurationCard")
        ? state.selectedShipment.customerId
        : model.customerId,
    ).then((res: any) => {
      dispatch(actions.refreshManagedCustomer(res.data));
    });
  }

  function createCustomerHandler(data: any) {
    const requestData = convertCustomerToRequestModel(data);
    dispatch(actions.setIsCustomerCardLoading(true));
    return createCustomer(requestData).then((res) => {
      dispatch(actions.setIsCustomerCardLoading(false));
      if (res.error) {
        return;
      } else {
        addToast({
          text: "New customer created successfully",
          type: "info",
        });
        handleCardAction("customerCard");
        dispatch(
          ordersActions.refreshCustomersGridRequestModel({
            ...state.customersGridRequestModel,
            items: [res.data, ...state.customersGridRequestModel.items],
          }),
        );
        return res.data;
      }
    });
  }

  function addVariantToCartHandler(model) {
    addVariantToCart({
      model: {
        variantId: model.variantId,
        quantity: model.amount,
      },
      cartId: state.managedCart.id,
    }).then((res) => {
      dispatch(actions.refreshManagedCart(res.data));
    });
  }

  function openSendMessageCardHandler() {
    handleCardAction("sendMessageCard", true);
    // handleMultipleCardActions({
    //   sendMessageCard: true,
    //   CustomerCartCard: true,
    // });
    getListOfCustomersForGrid({}).then((res: any) => {
      dispatch(actions.refreshCustomersGridRequestModel(res.data));
    });
  }

  function closeSendMessageCardHandler() {
    handleCardAction("sendMessageCard");
  }

  function openReplaceVariantCardHandler(model: any) {
    handleCardAction("replaceVariantCard", true);
    dispatch(actions.refreshSelectedVariant(model));
    dispatch(actions.setIsReplaceVariantGridLoading(true));
    getProductVariants(model.productId).then((res: any) => {
      dispatch(actions.setIsReplaceVariantGridLoading(false));
      const modifiedList = res.data.map((item) => ({
        ...item,
        isSelected: item.variantId === model.variantId,
      }));
      dispatch(actions.refreshVariantsList(modifiedList));
    });
  }

  function deleteStockActionHandler(model: any) {
    deleteStockActionFromCart({
      cartId: state.managedCart.id,
      stockActionId: model.stockActionId,
    }).then((res) => {
      if (res.error) {
        addToast({
          text: "Failed to delete stock action",
          type: "error",
        });
        return;
      } else {
        dispatch(
          actions.refreshManagedCart({
            ...state.managedCart,
            stockActions: state.managedCart.stockActions.filter(
              (stockAction) =>
                stockAction.stockActionId !== model.stockActionId,
            ),
          }),
        );
        addToast({
          text: "Stock action deleted successfully",
          type: "info",
        });
      }
    });
  }

  function closeReplaceVariantCardHandler() {
    dispatch(actions.resetSelectedVariant());
    handleCardAction("replaceVariantCard");
  }

  async function cancelCartHandler() {
    const confirmedCancelCart = await openConfirmationDialog({
      headerTitle: "Cancelling cart",
      text: `You are about to cancel cart ${state.managedCart.id}. All the items will be removed from the cart. Are you sure you want to proceed?`,
      primaryButtonValue: "Proceed",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedCancelCart) return;

    dispatch(actions.setIsCustomerCardLoading(true));
    cancelCart(state.managedCart.id).then((res) => {
      dispatch(actions.setIsCustomerCardLoading(false));
      if (res.error) {
        addToast({
          text: "Failed to cancel cart",
          type: "error",
        });
        return;
      } else {
        dispatch(actions.refreshActiveCards(undefined));
        dispatch(actions.resetManagedCart());
        dispatch(
          actions.refreshOpenCartsGridRequestModel({
            ...state.openCartsGridRequestModel,
            items: state.openCartsGridRequestModel.items.filter(
              (item) => item.id !== state.managedCart.id,
            ),
          }),
        );
        addToast({
          text: "Cart cancelled successfully",
          type: "info",
        });
      }
    });
  }

  function createOrderHandler() {
    handleCardAction("createOrderCard", true);
    dispatch(actions.setIsCreateOrderCardLoading(true));
    createOrder().then((res) => {
      if (res.error) {
        addToast({
          text: "Failed to create order",
          type: "error",
        });
      } else {
        assignCustomerToOrder({
          orderId: res.data.orderId,
          customerId: state.managedCart.customerId,
        }).then((res: any) => {
          dispatch(actions.setIsCreateOrderCardLoading(false));
          dispatch(actions.refreshSelectedOrder(res.data));
          dispatch(
            actions.refreshManagedCart({
              ...state.managedCart,
              stockActions: state.managedCart.stockActions.map(
                (stockAction) => ({
                  ...stockAction,
                  checked: false,
                }),
              ),
            }),
          );
          addToast({
            text: "Order created successfully",
            type: "info",
          });
        });
      }
    });
  }

  function createNewOrderHandler() {
    handleCardAction("createOrderCard");
    addToast({
      text: "Order created successfully",
      type: "info",
    });
  }

  function closeCreateOrderCardHandler() {
    handleCardAction("createOrderCard");
  }

  function removeVariantFromOrderHandler(model) {
    removeStockActionFromOrder(model.stockActionId).then((res: any) => {
      if (res.error) {
        addToast({
          text: "Failed to remove variant from order",
          type: "error",
        });
      } else {
        dispatch(
          actions.refreshManagedCart({
            ...state.managedCart,
            stockActions: state.managedCart.stockActions.map((stockAction) => {
              stockAction.stockActionId === model.stockActionId
                ? { ...stockAction, checked: false }
                : stockAction;
            }),
          }),
        );
        addToast({
          text: "Variant removed from order successfully",
          type: "info",
        });
      }
    });
  }

  function addVariantToOrderHandler(model) {
    addVariantsToOrder({
      orderId: state.selectedOrder.orderId,
      model: {
        variantId: model.variantId,
        amount: model.allocatedUnitsAmount,
      },
    }).then((res: any) => {
      if (res.error) {
        addToast({
          text: "Failed to add variant to order",
          type: "error",
        });
      } else {
        dispatch(
          actions.refreshManagedCart({
            ...state.managedCart,
            stockActions: state.managedCart.stockActions.map((stockAction) => {
              stockAction.stockActionId === model.stockActionId
                ? { ...stockAction, checked: true }
                : stockAction;
            }),
          }),
        );
        addToast({
          text: "Variant added to order successfully",
          type: "info",
        });
      }
    });
  }

  function updateCartPrepackedStatusHandler(status: string) {
    updateCartPrepackedStatus({
      cartId: state.managedCart.id,
      model: { prepackedCartStatus: status },
    }).then((res) => {
      if (!res.error) {
        dispatch(actions.refreshManagedCart(res.data));
        dispatch(
          actions.refreshOpenCartsGridRequestModel({
            ...state.openCartsGridRequestModel,
            items: state.openCartsGridRequestModel.items.map((item) =>
              item.id === state.managedCart.id
                ? { ...item, prepackedCartStatus: status }
                : item,
            ),
          }),
        );
        addToast({
          text: "Cart prepacked status updated successfully",
          type: "info",
        });
      } else {
        addToast({
          text: "Failed to update cart prepacked status",
          type: "error",
        });
      }
    });
  }

  function manageProductHandler(productId: number) {
    navigate(
      `${NavUrlEnum.PRODUCTS}${NavUrlEnum.PRODUCT_BASIC_DATA}/${productId}`,
    );
  }

  function manageVariantHandler(model: any) {
    // navigate(
    //   `${NavUrlEnum.PRODUCTS}${NavUrlEnum.MANAGE_VARIANTS}/${variantId}`,
    // );
    productsService.getVariantDetailsHandler(model.variantId).then((res) => {
      dispatch(productsActions.refreshSelectedVariant(res));
      dispatch(productsActions.refreshVariantPhotos(res.photos));
      navigate(
        `${NavUrlEnum.PRODUCTS}${NavUrlEnum.MANAGE_VARIANTS}/${model?.productId}`,
      );
    });
  }

  function stockChangeHistoryHandler(model: any) {
    handleCardAction("variantHistoryCard", true);
    dispatch(actions.refreshSelectedVariant(model));
    dispatch(actions.setIsVariantsHistoryGridLoading(true));
    getVariantStockHistory(model.variantId).then((res: any) => {
      dispatch(actions.setIsVariantsHistoryGridLoading(false));
      if (res.error) return;
      if (res) {
        const data = res.data?.map((item) => ({
          ...item,
          createdDate: formatDate(item.createdDate, "date"),
        }));
        dispatch(actions.refreshVariantHistory(data));
      }
    });
  }

  function closeVariantHistoryCardHandler() {
    handleCardAction("variantHistoryCard");
    dispatch(actions.resetSelectedVariant());
  }

  function openCartsWithSpecificProductCardHandler(model: any) {
    handleCardAction("cartsWithSpecificProductCard", true);
    dispatch(actions.refreshSelectedVariant(model));
    dispatch(actions.setIsCartsWithSpecificProductGridLoading(true));
    getCartsWithSearchedProduct({
      cartId: state.managedCart.id,
      stockActionId: model.stockActionId,
    }).then((res: any) => {
      dispatch(actions.setIsCartsWithSpecificProductGridLoading(false));
      dispatch(actions.refreshCartsWithSpecificProduct(res.data.items));
    });
  }

  function closeCartsWithSpecificProductCardHandler() {
    dispatch(actions.resetSelectedVariant());
    handleCardAction("cartsWithSpecificProductCard");
  }

  function updateStockActionPriceHandler(model) {
    updateStockActionPriceInCart({
      cartId: state.managedCart.id,
      stockActionId: model.data.stockActionId,
      model: { brutto: model.value },
    }).then((res) => {
      if (!res.error) {
        addToast({
          text: "Stock action price updated successfully",
          type: "info",
        });
      } else {
        addToast({
          text: "Failed to update stock action price",
          type: "error",
        });
      }
    });
  }

  return {
    state,
    appState,
    dispatch,
    getListOfCartsForGridHandler,
    updateUserPreferencesHandler,
    resetUserPreferencesHandler,
    handleGridRequestChange,
    manageCartHandler,
    createCartHandler,
    closeCustomerCartCardHandler,
    manageCustomerHandler,
    updateCustomerHandler,
    deleteCustomerHandler,
    closeCustomerCardHandler,
    openFindProductsCardHandler,
    variantsGridRequestChange,
    closeFindProductsCardHandler,
    getListOfCustomersForGridHandler,
    openSelectEntityCardHandler,
    selectCustomerHandler,
    openCreateEntityCardHandler,
    searchEntityHandle,
    closeSelectEntityCardHandler,
    openCustomerCardHandler,
    createCustomerHandler,
    addVariantToCartHandler,
    openSendMessageCardHandler,
    closeSendMessageCardHandler,
    openReplaceVariantCardHandler,
    deleteStockActionHandler,
    closeReplaceVariantCardHandler,
    cancelCartHandler,
    createOrderHandler,
    createNewOrderHandler,
    closeCreateOrderCardHandler,
    removeVariantFromOrderHandler,
    addVariantToOrderHandler,
    updateCartPrepackedStatusHandler,
    prepackedStatusFilterChangeHandler,
    manageProductHandler,
    manageVariantHandler,
    stockChangeHistoryHandler,
    closeVariantHistoryCardHandler,
    openCartsWithSpecificProductCardHandler,
    closeCartsWithSpecificProductCardHandler,
    updateStockActionPriceHandler,
  };
}
