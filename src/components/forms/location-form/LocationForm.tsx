import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { ImagePlus, Plus } from "lucide-react";
import { isEqual } from "lodash";
import { useWatch } from "react-hook-form";

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
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";

export default function LocationForm({
  isLoading,
  data,
  onSubmit,
  onCancel,
  countryCodes,
  onHandleUpData,
  onAction,
}: ILocationForm): React.ReactNode {
  const { t } = useTranslation();
  const form = useAppForm<LocationModel>({
    mode: ReactHookFormMode.SUBMIT,
    resolver: zodResolver(locationFormScheme),
    defaultValues: data || LocationModelDefault,
  });
  const slots = Array.from({ length: 6 }, (_, i) => data?.photos?.[i] || null);

  useEffect(() => {
    form.reset(data);
  }, [data]);

  const watchedValues = useWatch({ control: form.control });

  useEffect(() => {
    if (!form.formState.isValid) return;
    const handler = setTimeout(() => {
      if (!isEqual(data, form.getValues())) {
        onHandleUpData?.(form.getValues());
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [watchedValues, form.formState.isValid]);

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
            value={field.value || data.name}
            fullWidth
            placeholder={"enter location name..."}
          />
        )}
      />
      <div className={cs.locationFormImageBlock}>
        <div className={cs.imageBlockTitle}>
          <span className="she-title">Location Photos</span>
          <SheButton
            image={ImagePlus}
            value="Manage Photos"
            onClick={() => onAction("manageLocationPhotos")}
          />
        </div>
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
      </div>
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
