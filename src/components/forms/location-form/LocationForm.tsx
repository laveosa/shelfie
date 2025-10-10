import { zodResolver } from "@hookform/resolvers/zod";
import React, { JSX, useEffect } from "react";
import { Plus, ImagePlus } from "lucide-react";

import cs from "./LocationForm.module.scss";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import locationFormScheme from "@/utils/validation/schemes/LocationFormScheme.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { ILocationForm } from "@/const/interfaces/forms/ILocationForm.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import {
  LocationModel,
  LocationModelDefault,
} from "@/const/models/LocationModel.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export default function LocationForm({
  isLoading,
  data,
  countryCodes,
  onChange,
  onSubmit,
  onCancel,
  onAction,
}: ILocationForm): JSX.Element {
  // ==================================================================== UTILITIES
  const form = useAppForm<LocationModel>({
    mode: ReactHookFormMode.BLUR,
    resolver: zodResolver(locationFormScheme),
    defaultValues: LocationModelDefault,
  });
  const slots = Array.from({ length: 6 }, (_, i) => data?.photos?.[i] || null);

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
    <SheForm<LocationModel>
      isLoading={isLoading}
      className={cs.locationForm}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
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
      <div className={cs.locationFormImageBlock}>
        <div className={cs.imageBlockTitle}>
          <span className="she-title">Location Photos</span>
          <SheButton
            icon={ImagePlus}
            variant="secondary"
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
            value={field.value}
            label="Address Line 1"
            labelTransKey="AddressForm.Labels.AddressLine1"
            placeholder="Enter address line 1..."
            placeholderTransKey="AddressForm.Placeholders.AddressLine1"
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
            label="City"
            labelTransKey="AddressForm.Labels.City"
            placeholder="Enter city..."
            placeholderTransKey="AddressForm.Placeholders.City"
            fullWidth
          />
        )}
      />
      <SheFormField
        name="state"
        render={({ field }) => (
          <SheInput
            value={field.value}
            label="State"
            labelTransKey="AddressForm.Labels.State"
            placeholder="Enter state..."
            placeholderTransKey="AddressForm.Placeholders.State"
            fullWidth
          />
        )}
      />
      <SheFormField
        name="postCode"
        render={({ field }) => (
          <SheInput
            value={field.value}
            label="Postal Code"
            labelTransKey="AddressForm.Labels.PostalCode"
            placeholder="Enter postal code..."
            placeholderTransKey="AddressForm.Placeholders.PostalCode"
            fullWidth
          />
        )}
      />
      <SheFormField
        name="countryId"
        render={({ field }) => (
          <SheSelect
            selected={field.value}
            items={convertCountryCodeToSelectItems(countryCodes)}
            label="Country"
            labelTransKey="AddressForm.Labels.Country"
            placeholder="Choose country..."
            placeholderTransKey="AddressForm.Placeholders.Country"
            hideFirstOption
            fullWidth
          />
        )}
      />
    </SheForm>
  );
}
