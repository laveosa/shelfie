import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CustomerAddressCard.module.scss";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";
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
        title={isCreate ? t("CardTitles.CreateCustomerAddress") : t("CardTitles.EditCustomerAddress")}
        className={cs.customerAddressFormCard}
        showCloseButton={true}
        showSecondaryButton={false}
        showPrimaryButton={false}
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
          {!isCreate && customerAddressId && (
          <SheCardNotification
            title={t("CardTitles.DeleteCustomerAddress")}
            text={t("ConfirmationMessages.DeleteCustomerAddress")}
            buttonColor="#EF4343"
            buttonVariant="outline"
            buttonText={t("CommonButtons.Delete")}
            buttonIcon={Trash2}
              onClick={() => {onAction("deleteCustomerAddress", customerAddressId)}}
            />
          )}
        </div>
      </SheProductCard>
    </div>
  );
} 