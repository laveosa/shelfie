import React, { JSX } from "react";

import { CheckCheck } from "lucide-react";

import cs from "./ContactInformationForm.module.scss";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import contactInformationFormScheme from "@/utils/validation/schemes/ContactInformationFormScheme.ts";
import { IContactInformationForm } from "@/const/interfaces/forms/IContactInformationForm.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import {
  ContactInformationModel,
  ContactInformationModelDefaultModel,
} from "@/const/models/ContactInformationModel.ts";

export default function ContactInformationForm({
  data,
  countryCodes,
  onSubmit,
}: IContactInformationForm): JSX.Element {
  const { form } = useAppForm<ContactInformationModel>({
    values: data,
    defaultValues: ContactInformationModelDefaultModel,
    scheme: contactInformationFormScheme,
    mode: ReactHookFormMode.CHANGE,
  });

  // -------------------------------- SET FIRST SELECTED COUNTRY BY DEFAULT IF THERE IS NO SELECTED COUNTRY
  /*useEffect(() => {
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
  }, [data, countryCodes, form]);*/

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

  // ==================================================================== LAYOUT
  return (
    <SheForm<ContactInformationModel>
      form={form}
      className={cs.contactInformationForm}
      footerClassName={cs.formFooter}
      footerPosition={DirectionEnum.RIGHT}
      primaryBtnProps={{
        value: "Save Changes",
        valueTransKey: "CommonButtons.SaveChanges",
        icon: CheckCheck,
      }}
      hideSecondaryBtn
      onSubmit={onSubmit}
    >
      <SheFormField
        name="firstName"
        render={({ field }) => (
          <SheInput
            value={field.value}
            label="First Name"
            placeholder="enter your first name..."
            fullWidth
          />
        )}
      />
      <SheFormField
        name="lastName"
        render={({ field }) => (
          <SheInput
            value={field.value}
            label="Last Name"
            placeholder="enter your last name..."
            fullWidth
          />
        )}
      />
      <SheFormField
        name="email"
        render={({ field }) => (
          <SheInput
            value={field.value}
            label="Email"
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
                items={convertCountryCodeToSelectItems(countryCodes)}
                selected={field.value}
                label="Phone"
                hideFirstOption
              />
            )}
          />
        </div>
        <SheFormField
          name="phoneNumber"
          render={({ field }) => (
            <SheInput
              value={field.value}
              className={cs.phoneNumber}
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
