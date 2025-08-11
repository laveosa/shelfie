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
import { AddressRequestModel, AddressRequestModelDefault } from "@/const/models/AddressRequestModel";
import cs from "./AddressForm.module.scss";
import { CountryCodeModel } from "@/const/models/CountryCodeModel";
import { Plus, Save } from "lucide-react";

interface IAddressForm<T> {
  data: AddressRequestModel;
  isCreate: boolean;
  onSubmit: (data: AddressRequestModel) => void;
  onCancel: () => void;
  countryList: CountryCodeModel[];
}

export default function AddressForm<T>({
  data,
  isCreate,
  onSubmit,
  onCancel,
  countryList,
}: IAddressForm<T>): React.ReactNode {

  const form = useAppForm<AddressRequestModel>({
    mode: "onBlur",
    resolver: zodResolver(AddressFormScheme),
    defaultValues: AddressRequestModelDefault,
  });


  useEffect(() => {
    form.reset(data);
  }, [data]);


  // ================================================================ RENDER

  function convertCountriesToSelectItems(): ISheSelectItem[] {
    return countryList?.map(
      (item): ISheSelectItem => ({
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
            hidePrimary
            hideSecondary
          >
            <FormField
              control={form.control}
              name="alias"
              render={({ field }): React.ReactElement => (
                <SheFormItem label="Alias">
                  <SheInput fullWidth {...field} placeholder="Enter alias..." />
                </SheFormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }): React.ReactElement => (
                <SheFormItem label="Address Line 1">
                  <SheInput fullWidth {...field} placeholder="Enter address line 1..." />
                </SheFormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine2"
              render={({ field }): React.ReactElement => (
                <SheFormItem label="Address Line 2">
                  <SheInput fullWidth {...field} placeholder="Enter address line 2..." />
                </SheFormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }): React.ReactElement => (
                <SheFormItem label="City">
                  <SheInput fullWidth {...field} placeholder="Enter city..." />
                </SheFormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }): React.ReactElement => (
                <SheFormItem label="State">
                  <SheInput fullWidth {...field} placeholder="Enter state..." />
                </SheFormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }): React.ReactElement => (
                <SheFormItem label="Postal Code">
                  <SheInput fullWidth {...field} placeholder="Enter postal code..." />
                </SheFormItem>
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
              style={{ justifyContent: true ? "space-between" : "flex-end", }}
            >
                <SheButton
                  variant="secondary"
                  onClick={() => {onCancel()}}
                  value="Cancel"
                />
                
                <SheButton
                  variant="default"
                  icon={isCreate ? Plus : Save}
                  onClick={() => {form.handleSubmit(onSubmit)}}
                  value={isCreate ? "Add Address" : "Save Changes"}
                />
            </div>
          </SheForm>
    </div>
  );
}
