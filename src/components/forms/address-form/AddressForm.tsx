import { zodResolver } from "@hookform/resolvers/zod";
import React, { JSX, useEffect } from "react";

import { Plus, Save } from "lucide-react";

import cs from "./AddressForm.module.scss";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import AddressFormScheme from "@/utils/validation/schemes/AddressFormScheme";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import { IAddressForm } from "@/const/interfaces/forms/IAddressForm.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel";
import {
  AddressRequestModel,
  AddressRequestModelDefault,
} from "@/const/models/AddressRequestModel";

export default function AddressForm({
  data,
  isCreate,
  countryList,
  showFooter = true,
  onChange,
  onSubmit,
  onCancel,
}: IAddressForm): JSX.Element {
  // ==================================================================== UTILITIES
  const form = useAppForm<AddressRequestModel>({
    mode: ReactHookFormMode.BLUR,
    resolver: zodResolver(AddressFormScheme),
    defaultValues: AddressRequestModelDefault,
  });

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    form.reset(data);
  }, [data]);

  // ================================================================ PRIMARY
  function svgStringToComponent(svgString: string): React.FC<any> {
    return (props) => (
      <span dangerouslySetInnerHTML={{ __html: svgString }} {...props} />
    );
  }

  function convertCountryCodeToSelectItems(
    data: CountryCodeModel[],
  ): ISheSelectItem<number>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.countryId,
        text: item.countryName,
        icon: svgStringToComponent(item.flagIcon),
      }),
    );
  }

  // ==================================================================== LAYOUT
  return (
    <SheForm<AddressRequestModel>
      className={cs.addressForm}
      form={form}
      formPosition={DirectionEnum.CENTER}
      fullWidth
      hideFooter={!showFooter}
      primaryBtnProps={{
        value: isCreate ? "CreateAddress" : "Save",
        valueTransKey: isCreate
          ? "CustomerActions.CreateAddress"
          : "CommonButtons.Save",
        icon: isCreate ? Plus : Save,
      }}
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <SheFormField
        name="alias"
        render={({ field }) => (
          <SheInput
            value={field.value}
            minLength={2}
            maxLength={50}
            label="Alias"
            labelTransKey="AddressForm.Labels.Alias"
            placeholder="Alias"
            placeholderTransKey="AddressForm.Placeholders.Alias"
            required
            hideErrorMessage
            fullWidth
          />
        )}
      />
      <SheFormField
        name="addressLine1"
        render={({ field }) => (
          <SheInput
            value={field.value}
            minLength={5}
            maxLength={100}
            label="Address Line 1"
            labelTransKey="AddressForm.Labels.AddressLine1"
            placeholder="Enter address line 1..."
            placeholderTransKey="AddressForm.Placeholders.AddressLine1"
            required
            hideErrorMessage
            fullWidth
          />
        )}
      />
      <SheFormField
        name="addressLine2"
        render={({ field }) => (
          <SheInput
            value={field.value}
            label="Address Line 2"
            labelTransKey="AddressForm.Labels.AddressLine2"
            placeholder="Enter address line 2..."
            placeholderTransKey="AddressForm.Placeholders.AddressLine2"
            fullWidth
          />
        )}
      />
      <SheFormField
        name="city"
        render={({ field }) => (
          <SheInput
            value={field.value}
            minLength={2}
            maxLength={50}
            label="City"
            labelTransKey="AddressForm.Labels.City"
            placeholder="Enter city..."
            placeholderTransKey="AddressForm.Placeholders.City"
            required
            hideErrorMessage
            fullWidth
          />
        )}
      />
      <SheFormField
        name="state"
        render={({ field }) => (
          <SheInput
            value={field.value}
            minLength={2}
            maxLength={50}
            label="State"
            labelTransKey="AddressForm.Labels.State"
            placeholder="Enter state..."
            placeholderTransKey="AddressForm.Placeholders.State"
            required
            hideErrorMessage
            fullWidth
          />
        )}
      />
      <SheFormField
        name="postalCode"
        render={({ field }) => (
          <SheInput
            value={field.value}
            minLength={3}
            maxLength={10}
            label="Postal Code"
            labelTransKey="AddressForm.Labels.PostalCode"
            placeholder="Enter postal code..."
            placeholderTransKey="AddressForm.Placeholders.PostalCode"
            required
            hideErrorMessage
            fullWidth
          />
        )}
      />
      <SheFormField
        name="countryId"
        render={({ field }) => (
          <SheSelect
            items={convertCountryCodeToSelectItems(countryList)}
            selected={field.value}
            label="Country"
            labelTransKey="AddressForm.Labels.Country"
            placeholder="Choose country..."
            placeholderTransKey="AddressForm.Placeholders.Country"
            hideFirstOption
            required
            hideErrorMessage
            fullWidth
          />
        )}
      />
    </SheForm>
  );
}
