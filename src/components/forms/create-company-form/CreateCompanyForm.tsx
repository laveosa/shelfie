import { zodResolver } from "@hookform/resolvers/zod";
import React, { JSX, useEffect } from "react";

import cs from "./CreateCompanyForm.module.scss";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import CreateCompanyFormScheme from "@/utils/validation/schemes/CreateCompanyFormScheme.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { ICreateCompanyForm } from "@/const/interfaces/forms/ICreateCompanyForm.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import {
  CompanyModel,
  CompanyModelDefault,
} from "@/const/models/CompanyModel.ts";
import { UseFormReturn } from "react-hook-form";
import { AppFormType } from "@/const/types/AppFormType.ts";

export default function CreateCompanyForm({
  data,
  countryCodes,
  onChange,
  onSubmit,
  onCancel,
}: ICreateCompanyForm): JSX.Element {
  // ==================================================================== UTILITIES
  const form = useAppForm<CompanyModel>({
    mode: ReactHookFormMode.BLUR,
    resolver: zodResolver(CreateCompanyFormScheme),
    defaultValues: CompanyModelDefault,
  });

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    form.reset(data);
  }, [data]);

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

  // ==================================================================== PRIVATE
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
    <SheForm<CompanyModel>
      className={cs.createSupplierForm}
      form={form}
      formPosition={DirectionEnum.CENTER}
      fullWidth
      hideFooter
      onChange={onFormChangeHandler}
      onSubmit={onSubmit}
      onCancel={onCancel}
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
            items={convertCountryCodeToSelectItems(countryCodes)}
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
