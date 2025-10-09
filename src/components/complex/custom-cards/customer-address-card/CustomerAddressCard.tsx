import cs from "./CustomerAddressCard.module.scss";
import AddressForm from "@/components/forms/address-form/AddressForm";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { ICustomerAddressCard } from "@/const/interfaces/complex-components/custom-cards/ICustomerAddressCard.ts";

export default function CustomerAddressCard({
  isLoading,
  customerAddress,
  customerAddressId,
  isCreate,
  countryList,
  onAction,
}: ICustomerAddressCard) {
  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.customerAddressCard}
      title={isCreate ? "Create Customer Address" : "Edit Customer Address"}
      titleTransKey={
        isCreate
          ? "CardTitles.CreateCustomerAddress"
          : "CardTitles.EditCustomerAddress"
      }
      isLoading={isLoading}
      showCloseButton
      showNotificationCard={!!(!isCreate && customerAddressId)}
      notificationCardProps={{
        title: "Delete Customer Address",
        titleTransKey: "CardTitles.DeleteCustomerAddress",
        text: "This customer address will be deleted and will no longer be available for selection or automatic connection. Past orders will remain visible.",
        textTransKey: "ConfirmationMessages.DeleteCustomerAddress",
      }}
      onNotificationCardButtonClick={() =>
        onAction("deleteCustomerAddress", customerAddressId)
      }
    >
      <AddressForm
        data={customerAddress}
        countryList={countryList}
        isCreate={isCreate}
        onSubmit={(data) => onAction("submitCustomerAddressData", data)}
        onCancel={() => onAction("closeCustomerAddressCard", customerAddressId)}
      />
    </SheCard>
  );
}
