import React, { useEffect } from "react";

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
import { Plus, Save } from "lucide-react";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";

interface IAddressForm {
  data: AddressRequestModel;
  isCreate: boolean;
  onSubmit: (data: AddressRequestModel) => void;
  onCancel: () => void;
  countryList: CountryCodeModel[];
}

export default function AddressForm({
  data,
  isCreate,
  onSubmit,
  onCancel,
  countryList,
}: IAddressForm): React.ReactNode {
  const form = useAppForm<AddressRequestModel>({
    mode: "onBlur",
    resolver: zodResolver(AddressFormScheme),
    defaultValues: AddressRequestModelDefault,
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  // ================================================================ RENDER

  function convertCountriesToSelectItems(): ISheSelectItem<any>[] {
    return countryList?.map(
      (item): ISheSelectItem<any> => ({
        value: item.countryId,
        text: item.countryName,
      }),
    );
  }

  function onErrorHandler(model) {
    console.log(model);
  }

  return (
    <div className={cs.addressForm}>
      <SheForm<AddressRequestModel>
        form={form}
        onSubmit={onSubmit}
        onError={onErrorHandler}
        onCancel={onCancel}
        view={ComponentViewEnum.STANDARD}
        hideFooter
      >
        <SheFormField
          name="alias"
          render={({ field }) => (
            <SheInput
              label="Alias"
              value={field.value}
              fullWidth
              placeholder="Enter alias..."
            />
          )}
        />
        <SheFormField
          name="addressLine1"
          render={({ field }) => (
            <SheInput
              label="Address Line 1"
              value={field.value}
              fullWidth
              placeholder="Enter address line 1..."
            />
          )}
        />
        <SheFormField
          name="addressLine2"
          render={({ field }) => (
            <SheInput
              label="Address Line 2"
              value={field.value}
              fullWidth
              placeholder="Enter address line 2..."
            />
          )}
        />
        <SheFormField
          name="city"
          render={({ field }) => (
            <SheInput
              label="City"
              value={field.value}
              fullWidth
              placeholder="Enter city..."
            />
          )}
        />
        <SheFormField
          name="state"
          render={({ field }) => (
            <SheInput
              label="State"
              value={field.value}
              fullWidth
              placeholder="Enter state..."
            />
          )}
        />
        <SheFormField
          name="postalCode"
          render={({ field }) => (
            <SheInput
              label="Postal Code"
              value={field.value}
              fullWidth
              placeholder="Enter postal code..."
            />
          )}
        />
        <FormField
          control={form.control}
          name="countryId"
          render={({ field }) => (
            <SheFormItem label="Country">
              <SheSelect
                selected={field.value}
                items={convertCountriesToSelectItems()}
                hideFirstOption
                placeholder="Choose country..."
                fullWidth
                onSelect={(value) => {
                  field.onChange(value);
                  void form.trigger("countryId");
                }}
              />
            </SheFormItem>
          )}
        />

        <div
          className={cs.cardFooter}
          style={{ justifyContent: "space-between" }}
        >
          <SheButton
            variant="secondary"
            onClick={() => {
              onCancel();
            }}
            value="Cancel"
          />

          <SheButton
            variant="default"
            icon={isCreate ? Plus : Save}
            onClick={() => {
              form.handleSubmit(onSubmit);
            }}
            value={isCreate ? "Add Address" : "Save Changes"}
          />
        </div>
      </SheForm>
    </div>
  );
}
