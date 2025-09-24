import React, { useEffect, useRef } from "react";

import {
  clearSelectedGridItems,
  scrollToRefElement,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";
import cs from "./CustomerAddressesPage.module.scss";
import useCustomerAddressesPageService from "./useCustomerAddressesPageService.ts";
import CustomerMenuCard from "@/components/complex/custom-cards/customer-menu-card/CustomerMenuCard.tsx";
import CustomerAddressCard from "@/components/complex/custom-cards/customer-address-card/CustomerAddressCard.tsx";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import CustomerAddressesCard from "@/components/complex/custom-cards/customer-addresses-card/CustomerAddressesCard.tsx";
import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";

export function CustomerAddressesPage() {
  const {
    state,
    actions,
    customerId,
    dispatch,
    deleteCustomerAddressHandler,
    getCustomerAddressesForGridHandler,
    onManageCustomerAddressHandler,
    onCloseCustomerAddressCardHandler,
    onCreateCustomerAddressHandler,
    getCountryCodeHandler,
    resolveCustomerAddressData,
    getCustomerInfoHandler,
  } = useCustomerAddressesPageService();

  // ================================================================== EVENT
  useEffect(() => {
    getCustomerAddressesForGridHandler(state.customerAddressesGridRequestModel);

    if (state.countryList?.length === 0) {
      getCountryCodeHandler();
    }

    if (state.customerCounter?.addressesAmount === undefined && customerId) {
      getCustomerInfoHandler(Number(customerId));
    }
  }, []);

  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { openConfirmationDialog } = useDialogService();
  const sortingItems = Object.values(GridSortingEnum).map((value) => ({
    value,
    description: GridSortingEnumLabels[value],
  }));

  function handleCardAction(
    identifier: string,
    forceState?: "open" | "close" | "toggle",
  ) {
    let updatedCards: string[];

    switch (forceState) {
      case "open":
        updatedCards = state.activeCards.includes(identifier)
          ? state.activeCards
          : [...state.activeCards, identifier];
        break;
      case "close":
        updatedCards = state.activeCards.filter((card) => card !== identifier);
        break;
      case "toggle":
      default:
        updatedCards = state.activeCards.includes(identifier)
          ? state.activeCards.filter((card) => card !== identifier)
          : [...state.activeCards, identifier];
        break;
    }

    scrollToRefElement(cardRefs.current, identifier);
    dispatch(actions.refreshActiveCards(updatedCards));
  }

  async function onAction(actionType: string, data?: any) {
    switch (actionType) {
      case "manageCustomerAddress":
        onManageCustomerAddressHandler(data);
        handleCardAction("customerAddressCard", "open");
        dispatch(
          actions.refreshCustomerAddresses(
            setSelectedGridItem(
              data.addressId,
              state.customerAddresses,
              "addressId",
            ),
          ),
        );
        break;
      case "deleteCustomerAddress":
        const confirmedCustomerAddressDeleting = await openConfirmationDialog({
          headerTitle: "Deleting customer address",
          text: `You are about to delete customer address ${data.alias}.`,
          primaryButtonValue: "Delete",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmedCustomerAddressDeleting) return;

        deleteCustomerAddressHandler(data);
        break;
      case "createCustomerAddress":
        onCreateCustomerAddressHandler();
        handleCardAction("customerAddressCard", "open");
        break;
      case "getCustomerAddressesForGrid":
        getCustomerAddressesForGridHandler(data);
        break;
    }
  }

  function onSubmitCustomerAddressDataHandler(data: any) {
    resolveCustomerAddressData(data);
  }

  function onCloseCustomerAddressCard() {
    onCloseCustomerAddressCardHandler();
    dispatch(
      actions.refreshCustomerAddresses(
        clearSelectedGridItems(state.customerAddresses),
      ),
    );
  }

  return (
    <div id={cs["CustomerAddressesPage"]} className={cs.customerAddressesPage}>
      <CustomerMenuCard
        isLoading={state.isCustomerMenuCardLoading}
        title="Customer"
        counter={state.customerCounter}
        customerId={customerId}
      />
      <CustomerAddressesCard
        isLoading={state.isCustomerAddressesLoading}
        addresses={state.customerAddresses}
        gridRequestModel={state.customerAddressesGridRequestModel}
        onAction={onAction}
        sortingOptions={sortingItems}
      />

      {state.activeCards?.includes("customerAddressCard") && (
        <div
          ref={(el) => {
            cardRefs.current["customerAddressCard"] = el;
          }}
        >
          <CustomerAddressCard
            isLoading={state.isCustomerAddressDetailsLoading}
            customerAddress={state.selectedCustomerAddress}
            customerAddressId={state.selectedCustomerAddressId}
            isCreate={state.createCustomerAddress}
            onPrimaryButtonClick={(data) =>
              onSubmitCustomerAddressDataHandler(data)
            }
            onSecondaryButtonClick={onCloseCustomerAddressCard}
            countryList={state.countryList}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
}
