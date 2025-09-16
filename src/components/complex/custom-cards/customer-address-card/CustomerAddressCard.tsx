import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CustomerAddressCard.module.scss";
import { CountryCodeModel } from "@/const/models/CountryCodeModel";
import AddressForm from "@/components/forms/address-form/AddressForm";
import { Trash2 } from "lucide-react";
import { AddressRequestModel } from "@/const/models/AddressRequestModel";
import { useTranslation } from "react-i18next";

interface ICustomerAddressCard {
  isLoading?: boolean;
  customerAddress?: AddressRequestModel;
  customerAddressId?: number;
  isCreate?: boolean;
  onPrimaryButtonClick: (data: any) => void;
  onSecondaryButtonClick?: () => void;
  showCloseButton?: boolean;
  countryList?: CountryCodeModel[];
  onAction: (action: string, data?: any) => void;
}

export default function CustomerAddressCard({
  isLoading,
  customerAddress,
  customerAddressId,
  isCreate,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  countryList,
  onAction,
}: ICustomerAddressCard) {
  const { t } = useTranslation();

  function onSubmit(data) {
    onPrimaryButtonClick(data);
  }

  return (
    <div>
      <SheProductCard
        loading={isLoading}
        className={cs.customerAddressFormCard}
        title={
          isCreate
            ? t("CardTitles.CreateCustomerAddress")
            : t("CardTitles.EditCustomerAddress")
        }
        showCloseButton={true}
        showNotificationCard={!!(!isCreate && customerAddressId)}
        notificationCardProps={{
          title: "Delete Customer Address",
          titleTransKey: "CardTitles.DeleteCustomerAddress",
          text: "This customer address will be deleted and will no longer be available for selection or automatic connection. Past orders will remain visible.",
          textTransKey: "ConfirmationMessages.DeleteCustomerAddress",
          buttonText: "Delete",
          buttonTextTransKey: "CommonButtons.Delete",
          buttonColor: "#EF4343",
          buttonIcon: Trash2,
          onClick: () => onAction("deleteCustomerAddress", customerAddressId),
        }}
        onSecondaryButtonClick={onSecondaryButtonClick}
      >
        <div className={cs.customerCardContent}>
          <div className={cs.customerAddressForm}>
            <AddressForm
              data={customerAddress}
              isCreate={isCreate}
              onSubmit={onSubmit}
              countryList={countryList}
              onCancel={onSecondaryButtonClick}
            />
          </div>
        </div>
      </SheProductCard>
    </div>
  );
}
