import React, { useEffect, useRef } from "react";

import {
  clearSelectedGridItems,
  scrollToRefElement,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";
import cs from "./CustomerAddressesPage.module.scss";
import useCustomerAddressesPageService from "./useCustomerAddressesPageService.ts";
import CustomerAddressCard from "@/components/complex/custom-cards/customer-address-card/CustomerAddressCard.tsx";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import CustomerAddressesCard from "@/components/complex/custom-cards/customer-addresses-card/CustomerAddressesCard.tsx";
import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";

export function CustomerAddressesPage() {
  // ==================================================================== UTILITIES
  const { state, actions, customerId, dispatch, ...service } =
    useCustomerAddressesPageService();
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { openConfirmationDialog } = useDialogService();
  const sortingItems = Object.values(GridSortingEnum).map((value) => ({
    value,
    description: GridSortingEnumLabels[value],
  }));

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    service.getCustomerAddressesForGridHandler(
      state.customerAddressesGridRequestModel,
    );

    if (state.countryList?.length === 0) {
      service.getCountryCodeHandler();
    }

    if (state.customerCounter?.addressesAmount === undefined && customerId) {
      service.getCustomerInfoHandler(Number(customerId));
    }
  }, []);

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

  // ==================================================================== EVENT HANDLERS
  async function onAction(actionType: string, data?: any) {
    switch (actionType) {
      case "manageCustomerAddress":
        service.onManageCustomerAddressHandler(data);
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

        service.deleteCustomerAddressHandler(data);
        break;
      case "createCustomerAddress":
        service.onCreateCustomerAddressHandler();
        handleCardAction("customerAddressCard", "open");
        break;
      case "getCustomerAddressesForGrid":
        service.getCustomerAddressesForGridHandler(data);
        break;
      case "closeCustomerAddressCard":
        service.onCloseCustomerAddressCardHandler();
        dispatch(
          actions.refreshCustomerAddresses(
            clearSelectedGridItems(state.customerAddresses),
          ),
        );
        break;
      case "submitCustomerAddressData":
        service.resolveCustomerAddressData(data);
        break;
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div id="CustomerAddressesPage" className={cs.customerAddressesPage}>
      <SheContextSidebar
        menuCollectionType="customer"
        menuTitle="Customer"
        counter={state.customerCounter}
        itemId={Number(customerId)}
        activeCards={state.activeCards}
      >
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
              countryList={state.countryList}
              onAction={onAction}
            />
          </div>
        )}
      </SheContextSidebar>
    </div>
  );
}
