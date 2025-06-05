import { ICreateSupplierForm } from "@/const/interfaces/forms/ICreateSupplierForm.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SupplierModel,
  SupplierModelDefault,
} from "@/const/models/SupplierModel.ts";
import CreateSupplierFormScheme from "@/utils/validation/schemes/CreateSupplierFomresolver.ts";
import React, { useEffect } from "react";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { UserModelDefault } from "@/const/models/UserModel.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { SheImageUploader } from "@/components/complex/she-images-uploader/SheImageUploader.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export default function CreateSupplierForm<T>({
  data,
  countryList,
  onSubmit,
  onImageUpload,
  onCancel,
}: ICreateSupplierForm<T>) {
  const form = useAppForm<SupplierModel>({
    mode: "onSubmit",
    resolver: zodResolver(CreateSupplierFormScheme),
    defaultValues: SupplierModelDefault,
  });

  function convertCountriesToSelectItems(data: any[]): ISheSelectItem[] {
    return data?.map(
      (item): ISheSelectItem => ({
        value: item.countryId,
        text: item.countryName,
      }),
    );
  }

  useEffect(() => {
    form.reset(data);
  }, [data]);

  return (
    <div className="flex flex-col justify-center">
      <SheForm<T>
        form={form}
        defaultValues={UserModelDefault}
        formPosition={DirectionEnum.CENTER}
        view={ComponentViewEnum.STANDARD}
        fullWidth
        hidePrimary
        hideSecondary
        onSubmit={onSubmit}
        // onError={onErrorHandler}
        onCancel={onCancel}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }): React.ReactElement => (
            <SheFormItem label="Name">
              <SheInput
                {...field}
                placeholder="enter supplier name..."
                fullWidth
              />
            </SheFormItem>
          )}
        />
        <SheImageUploader
          contextName={"supplier"}
          contextId={data?.id}
          fullWidth
          onUpload={onImageUpload}
        />
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }): React.ReactElement => (
            <SheFormItem label="Address line 1">
              <SheInput
                {...field}
                placeholder="enter address line 1..."
                fullWidth
              />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }): React.ReactElement => (
            <SheFormItem label="Address line 2">
              <SheInput
                {...field}
                placeholder="enter address line 2..."
                fullWidth
              />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }): React.ReactElement => (
            <SheFormItem label="City">
              <SheInput {...field} placeholder="enter city..." fullWidth />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }): React.ReactElement => (
            <SheFormItem label="State/Province/Region">
              <SheInput {...field} placeholder="enter province..." fullWidth />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postCode"
          render={({ field }): React.ReactElement => (
            <SheFormItem label="Zip/Postal Code">
              <SheInput
                {...field}
                placeholder="enter postal code..."
                fullWidth
              />
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
                items={convertCountriesToSelectItems(countryList)}
                hideFirstOption
                placeholder="choose country..."
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SheButton
          value="Cancel"
          variant="secondary"
          onClick={() => onCancel()}
        />
        <SheButton
          value="Create Supplier"
          onClick={form.handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
}
