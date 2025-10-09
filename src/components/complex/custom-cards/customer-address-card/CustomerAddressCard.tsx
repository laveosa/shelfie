import cs from "./CustomerAddressCard.module.scss";
import AddressForm from "@/components/forms/address-form/AddressForm";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { ICustomerAddressCard } from "@/const/interfaces/complex-components/custom-cards/ICustomerAddressCard.ts";

export default function CustomerAddressCard({
  isLoading,
  customerAddress,
  countryList,
  onAction,
}: ICustomerAddressCard) {
  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.customerAddressCard}
      title={
        customerAddress?.addressId
          ? "Edit Customer Address"
          : "Create Customer Address"
      }
      titleTransKey={
        customerAddress?.addressId
          ? "CardTitles.EditCustomerAddress"
          : "CardTitles.CreateCustomerAddress"
      }
      isLoading={isLoading}
      showCloseButton
      showNotificationCard={!!customerAddress?.addressId}
      notificationCardProps={{
        title: "Delete Customer Address",
        titleTransKey: "CardTitles.DeleteCustomerAddress",
        text: "This customer address will be deleted and will no longer be available for selection or automatic connection. Past orders will remain visible.",
        textTransKey: "ConfirmationMessages.DeleteCustomerAddress",
        onClick: () =>
          onAction("deleteCustomerAddress", customerAddress?.addressId),
      }}
      onSecondaryButtonClick={() => onAction("closeCustomerAddressCard")}
    >
      <AddressForm
        data={customerAddress}
        countryList={countryList}
        onSubmit={(data) => onAction("submitCustomerAddressData", data)}
        onCancel={() => onAction("closeCustomerAddressCard")}
      />
    </SheCard>
  );
}
