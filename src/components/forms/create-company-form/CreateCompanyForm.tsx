import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef } from "react";
import { useWatch } from "react-hook-form";
import { isEqual } from "lodash";

import {
  CompanyModel,
  CompanyModelDefault,
} from "@/const/models/CompanyModel.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import cs from "./CreateCompanyForm.module.scss";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import CreateCompanyFormScheme from "@/utils/validation/schemes/CreateCompanyFormScheme.ts";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ICreateCompanyForm } from "@/const/interfaces/forms/ICreateCompanyForm.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export default function CreateCompanyForm<T>({
  isLoading,
  data,
  countryCodes,
  onCancel,
  onHandleUpData,
}: ICreateCompanyForm<T>) {
  const form = useAppForm<CompanyModel>({
    mode: ReactHookFormMode.SUBMIT,
    resolver: zodResolver(CreateCompanyFormScheme),
    defaultValues: data || CompanyModelDefault,
  });
  const isFirstRender = useRef(true);

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

  useEffect(() => {
    form.reset(data || CompanyModelDefault);
  }, [data]);

  const watchedValues = useWatch({
    control: form.control,
    name: ["companyName", "nip", "countryId", "customerCareEmail"],
  });

  useEffect(() => {
    if (!form.formState.isValid) return;

    const updatedData = {
      companyName: watchedValues[0],
      nip: watchedValues[1],
      countryId: watchedValues[2],
      customerCareEmail: watchedValues[3],
    };

    const normalizedData = {
      companyName: data?.companyName ?? "",
      nip: data?.nip ?? "",
      countryId: data?.countryId ?? null,
      customerCareEmail: data?.customerCareEmail ?? "",
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const handler = setTimeout(() => {
      if (!isEqual(updatedData, normalizedData)) {
        onHandleUpData?.(updatedData);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [watchedValues, form.formState.isValid, data]);

  return (
    <SheForm
      className={cs.createSupplierForm}
      isLoading={isLoading}
      form={form}
      defaultValues={CompanyModelDefault}
      formPosition={DirectionEnum.CENTER}
      view={ComponentViewEnum.STANDARD}
      fullWidth
      hidePrimaryBtn
      hideSecondaryBtn
      onCancel={onCancel}
    >
      <SheFormField
        className={cs.createSupplierFormItem}
        name="companyName"
        render={({ field }) => (
          <SheInput
            className={cs.formItem}
            label="Company Name"
            value={field.value}
            placeholder="enter company name..."
            fullWidth
          />
        )}
      />
      <SheFormField
        className={cs.createSupplierFormItem}
        name="nip"
        render={({ field }) => (
          <SheInput
            className={cs.formItem}
            label="NIP"
            value={field.value}
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
            className={cs.formItem}
            label="Customer Care Email"
            value={field.value}
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
            label="Products country of origin"
            items={convertCountryCodeToSelectItems(countryCodes)}
            placeholder="Select country..."
            selected={field.value}
            hideFirstOption
            fullWidth
          />
        )}
      />
    </SheForm>
  );
}
