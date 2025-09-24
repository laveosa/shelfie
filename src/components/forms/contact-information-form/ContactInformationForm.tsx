import React, { JSX, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import useAppForm from "@/utils/hooks/useAppForm.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import contactInformationFormScheme from "@/utils/validation/schemes/ContactInformationFormScheme.ts";
import {
  ContactInformationModel,
  ContactInformationModelDefaultModel,
} from "@/const/models/ContactInformationModel.ts";
import { IContactInformationForm } from "@/const/interfaces/forms/IContactInformationForm.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import cs from "./ContactInformationForm.module.scss";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { CheckCheck } from "lucide-react";

export default function ContactInformationForm({
  data,
  countryCodes,
  onSubmit,
  onCancel,
}: IContactInformationForm): JSX.Element {
  const form = useAppForm<ContactInformationModel>({
    mode: ReactHookFormMode.CHANGE,
    resolver: zodResolver(contactInformationFormScheme),
    defaultValues: ContactInformationModelDefaultModel,
  });

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        countryId: data.countryId ?? countryCodes?.[0]?.countryId,
      });
    } else {
      form.reset({
        ...ContactInformationModelDefaultModel,
        countryId: countryCodes?.[0]?.countryId,
      });
    }
  }, [data, countryCodes, form]);

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
    form.reset(data);
  }, [data]);

  function onErrorHandler(model) {
    console.log(model);
  }

  return (
    <SheForm<ContactInformationModel>
      id="USER_FORM"
      className={cs.contactInformationForm}
      form={form}
      defaultValues={ContactInformationModelDefaultModel}
      view={ComponentViewEnum.STANDARD}
      footerPosition={DirectionEnum.RIGHT}
      primaryBtnTitle="Save Changes"
      primaryBtnProps={{
        icon: CheckCheck,
      }}
      hideSecondaryBtn
      footerClassName={cs.formFooter}
      onSubmit={onSubmit}
      onError={onErrorHandler}
      onCancel={onCancel}
    >
      <SheFormField
        name="firstName"
        render={({ field }) => (
          <SheInput
            label="First Name"
            value={field.value}
            placeholder="enter your first name..."
            fullWidth
          />
        )}
      />
      <SheFormField
        name="lastName"
        render={({ field }) => (
          <SheInput
            label="Last Name"
            value={field.value}
            placeholder="enter your last name..."
            fullWidth
          />
        )}
      />
      <SheFormField
        name="email"
        render={({ field }) => (
          <SheInput
            label="Email"
            value={field.value}
            placeholder="enter your email..."
            fullWidth
          />
        )}
      />
      <div className={cs.phoneNumberBlock}>
        <div className={cs.countryCode}>
          <SheFormField
            name="countryId"
            render={({ field }) => (
              <SheSelect
                label="Phone"
                items={convertCountryCodeToSelectItems(countryCodes)}
                selected={field.value}
                hideFirstOption
              />
            )}
          />
        </div>
        <SheFormField
          name="phoneNumber"
          render={({ field }) => (
            <SheInput
              className={cs.phoneNumber}
              value={field.value}
              placeholder="enter your phone number..."
              type="number"
              fullWidth
            />
          )}
        />
      </div>
    </SheForm>
  );
}
