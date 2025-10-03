import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { Plus } from "lucide-react";

import {
  LocationModel,
  LocationModelDefault,
} from "@/const/models/LocationModel.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import cs from "./LocationForm.module.scss";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { ILocationForm } from "@/const/interfaces/forms/ILocationForm.ts";
import locationFormScheme from "@/utils/validation/schemes/LocationFormScheme.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export default function LocationForm({
  isLoading,
  data,
  onSubmit,
  onCancel,
  countryCodes,
  onHandleUpData,
}: ILocationForm): React.ReactNode {
  const { t } = useTranslation();
  const form = useAppForm<LocationModel>({
    mode: "onBlur",
    resolver: zodResolver(locationFormScheme),
    defaultValues: LocationModelDefault,
  });
  const slots = Array.from(
    { length: 6 },
    (_, i) => data?.pictures?.[i] || null,
  );

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
    <SheForm<LocationModel>
      isLoading={isLoading}
      className={cs.locationForm}
      form={form}
      onSubmit={onSubmit}
      onError={onErrorHandler}
      onCancel={onCancel}
      view={ComponentViewEnum.STANDARD}
      hidePrimaryBtn={!!data?.locationId}
      hideSecondaryBtn={!!data?.locationId}
      footerClassName={cs.cardFooter}
      primaryBtnTitle="Create Location"
      primaryBtnProps={{
        icon: Plus,
        variant: "info",
      }}
    >
      <SheFormField
        name="locationName"
        render={({ field }) => (
          <SheInput
            label={"Location Name"}
            value={field.value}
            fullWidth
            placeholder={"enter location name..."}
          />
        )}
      />
      {data?.pictures && (
        <div className={cs.imagesBlockGrid}>
          {slots.map((img, index) => (
            <div key={index} className={cs.imagesBlockGridItem}>
              {img ? (
                <img
                  src={img.thumbnailUrl}
                  alt={`image-${index}`}
                  className={cs.image}
                />
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      )}
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
        name="postCode"
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
              items={convertCountryCodeToSelectItems(countryCodes)}
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
    </SheForm>
  );
}
