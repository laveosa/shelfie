import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Save } from "lucide-react";

import useAppForm from "@/utils/hooks/useAppForm.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import SheButton from "@/components/primitive/she-button/SheButton";
import AddressFormScheme from "@/utils/validation/schemes/AddressFormScheme";
import {
  AddressRequestModel,
  AddressRequestModelDefault,
} from "@/const/models/AddressRequestModel";
import cs from "./AddressForm.module.scss";
import { CountryCodeModel } from "@/const/models/CountryCodeModel";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";

interface IAddressForm {
  data?: AddressRequestModel;
  isCreate?: boolean;
  onSubmit?: (data: AddressRequestModel) => void;
  onCancel?: () => void;
  countryList?: CountryCodeModel[];
  showFooter?: boolean;
  onHandleUpData?: (data: any) => void;
}

export default function AddressForm({
  data,
  isCreate,
  onSubmit,
  onCancel,
  countryList,
  showFooter = true,
  onHandleUpData,
}: IAddressForm): React.ReactNode {
  const { t } = useTranslation();
  const form = useAppForm<AddressRequestModel>({
    mode: "onBlur",
    resolver: zodResolver(AddressFormScheme),
    defaultValues: AddressRequestModelDefault,
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  useEffect(() => {
    if (form.formState.isValid) {
      onHandleUpData?.(form.getValues());
    } else {
      onHandleUpData?.(null);
    }
  }, [form.formState.isValid]);

  // ================================================================ RENDER

  function svgStringToComponent(svgString: string): React.FC<any> {
    return (props) => (
      <span dangerouslySetInnerHTML={{ __html: svgString }} {...props} />
    );
  }

  function convertCountryCodeToSelectItems(
    data: CountryCodeModel[],
  ): ISheSelectItem<any>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.countryId,
        text: item.countryName,
        icon: svgStringToComponent(item.flagIcon),
      }),
    );
  }

  function onErrorHandler(model) {
    console.log(model);
  }

  return (
    <SheForm<AddressRequestModel>
      className={cs.addressForm}
      form={form}
      onSubmit={onSubmit}
      onError={onErrorHandler}
      onCancel={onCancel}
      view={ComponentViewEnum.STANDARD}
      hidePrimaryBtn
      hideSecondaryBtn
    >
      <SheFormField
        name="alias"
        render={({ field }) => (
          <SheInput
            label={t("AddressForm.Labels.Alias")}
            value={field.value}
            fullWidth
            placeholder={t("AddressForm.Placeholders.Alias")}
          />
        )}
      />
      <SheFormField
        name="addressLine1"
        render={({ field }) => (
          <SheInput
            label={t("AddressForm.Labels.AddressLine1")}
            value={field.value}
            fullWidth
            placeholder={t("AddressForm.Placeholders.AddressLine1")}
          />
        )}
      />
      <SheFormField
        name="addressLine2"
        render={({ field }) => (
          <SheInput
            label={t("AddressForm.Labels.AddressLine2")}
            value={field.value}
            fullWidth
            placeholder={t("AddressForm.Placeholders.AddressLine2")}
          />
        )}
      />
      <SheFormField
        name="city"
        render={({ field }) => (
          <SheInput
            label={t("AddressForm.Labels.City")}
            value={field.value}
            fullWidth
            placeholder={t("AddressForm.Placeholders.City")}
          />
        )}
      />
      <SheFormField
        name="state"
        render={({ field }) => (
          <SheInput
            label={t("AddressForm.Labels.State")}
            value={field.value}
            fullWidth
            placeholder={t("AddressForm.Placeholders.State")}
          />
        )}
      />
      <SheFormField
        name="postalCode"
        render={({ field }) => (
          <SheInput
            label={t("AddressForm.Labels.PostalCode")}
            value={field.value}
            fullWidth
            placeholder={t("AddressForm.Placeholders.PostalCode")}
          />
        )}
      />
      <FormField
        control={form.control}
        name="countryId"
        render={({ field }) => (
          <SheFormItem label={t("AddressForm.Labels.Country")}>
            <SheSelect
              selected={field.value}
              items={convertCountryCodeToSelectItems(countryList)}
              hideFirstOption
              placeholder={t("AddressForm.Placeholders.Country")}
              fullWidth
              onSelect={(value) => {
                field.onChange(value);
                void form.trigger("countryId");
              }}
            />
          </SheFormItem>
        )}
      />
      {showFooter && (
        <div
          className={cs.cardFooter}
          style={{ justifyContent: "space-between" }}
        >
          <SheButton
            variant="secondary"
            onClick={() => {
              onCancel();
            }}
            value={t("CommonButtons.Cancel")}
          />

          <SheButton
            variant="default"
            icon={isCreate ? Plus : Save}
            onClick={() => {
              form.handleSubmit(onSubmit);
            }}
            value={
              isCreate
                ? t("CustomerActions.CreateAddress")
                : t("CommonButtons.Save")
            }
          />
        </div>
      )}
    </SheForm>
  );
}
