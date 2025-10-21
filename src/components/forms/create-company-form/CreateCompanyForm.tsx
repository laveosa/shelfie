import { UseFormReturn } from "react-hook-form";
import React, { JSX } from "react";

import cs from "./CreateCompanyForm.module.scss";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import CreateCompanyFormScheme from "@/utils/validation/schemes/CreateCompanyFormScheme.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { AppFormType } from "@/const/types/AppFormType.ts";
import { ICreateCompanyForm } from "@/const/interfaces/forms/ICreateCompanyForm.ts";
import {
  CompanyModel,
  CompanyModelDefault,
} from "@/const/models/CompanyModel.ts";

export default function CreateCompanyForm({
  data,
  countryCodes,
  onChange,
}: ICreateCompanyForm): JSX.Element {
  // ==================================================================== UTILITIES
  const { form } = useAppForm<CompanyModel>({
    values: data,
    defaultValues: CompanyModelDefault,
    scheme: CreateCompanyFormScheme,
  });

  // ==================================================================== EVENT HANDLERS
  function onFormChangeHandler(
    value: CompanyModel,
    form?: UseFormReturn<AppFormType<CompanyModel>>,
  ) {
    onChange?.(
      {
        companyName: value.companyName || "",
        nip: value.nip || "",
        customerCareEmail: value.customerCareEmail || "",
        countryId: value.countryId || null,
      },
      form,
    );
  }

  // ==================================================================== LAYOUT
  return (
    <SheForm<CompanyModel>
      className={cs.createSupplierForm}
      form={form}
      formPosition={DirectionEnum.CENTER}
      fullWidth
      hideFooter
      onChange={onFormChangeHandler}
    >
      <SheFormField
        className={cs.createSupplierFormItem}
        name="companyName"
        render={({ field }) => (
          <SheInput
            value={field.value}
            minLength={2}
            maxLength={16}
            className={cs.formItem}
            label="Company Name"
            placeholder="enter company name..."
            required
            fullWidth
          />
        )}
      />
      <SheFormField
        className={cs.createSupplierFormItem}
        name="nip"
        render={({ field }) => (
          <SheInput
            value={field.value}
            className={cs.formItem}
            label="NIP"
            placeholder="enter NIP..."
            fullWidth
          />
        )}
      />
      <SheFormField
        className={cs.createSupplierFormItem}
        name="customerCareEmail"
        render={({ field }) => (
          <SheInput
            value={field.value}
            className={cs.formItem}
            label="Customer Care Email"
            placeholder="enter customer car email..."
            fullWidth
          />
        )}
      />
      <SheFormField
        className={cs.createSupplierFormItem}
        name="countryId"
        render={({ field }) => (
          <SheSelect
            items={countryCodes}
            selected={field.value}
            label="Products country of origin"
            placeholder="Select country..."
            hideFirstOption
            fullWidth
          />
        )}
      />
    </SheForm>
  );
}
