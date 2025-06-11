import React, { useEffect, useRef, useState } from "react";
import { ICreateSupplierForm } from "@/const/interfaces/forms/ICreateSupplierForm.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SupplierModel,
  SupplierModelDefault,
} from "@/const/models/SupplierModel.ts";
import CreateSupplierFormScheme from "@/utils/validation/schemes/CreateSupplierFomresolver.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { UserModelDefault } from "@/const/models/UserModel.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import {
  SheImageUploader,
  SheImageUploaderRef,
} from "@/components/complex/she-images-uploader/SheImageUploader.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import cs from "./CreateSupplierForm.module.scss";

interface SupplierFormData extends SupplierModel {
  images?: File[];
  uploadModels?: any[];
}

export default function CreateSupplierForm<T>({
  isLoading,
  data,
  countryList,
  onSubmit,
  onCancel,
}: ICreateSupplierForm<T>) {
  const form = useAppForm<SupplierModel>({
    mode: "onSubmit",
    resolver: zodResolver(CreateSupplierFormScheme),
    defaultValues: data || SupplierModelDefault,
  });
  const imageUploaderRef = useRef<SheImageUploaderRef>(null);
  const [submissionData, setSubmissionData] = useState<SupplierFormData | null>(
    null,
  );

  function convertCountriesToSelectItems(data: any[]): ISheSelectItem[] {
    return data?.map(
      (item): ISheSelectItem => ({
        value: item.countryId,
        text: item.countryName,
      }),
    );
  }

  function handleFormSubmit(formData: SupplierModel) {
    const selectedFiles = imageUploaderRef.current?.getSelectedFiles() || [];
    const uploadModels = imageUploaderRef.current?.getUploadModels() || [];
    const completeData: SupplierFormData = {
      ...formData,
      images: selectedFiles,
      uploadModels: uploadModels,
    };

    setSubmissionData(completeData);
    onSubmit(completeData as T);
  }

  useEffect(() => {
    form.reset(data);
  }, [data]);

  const getCurrentImages = () => {
    if (isLoading && submissionData?.images) {
      return submissionData.images;
    }
    return imageUploaderRef.current?.getSelectedFiles() || [];
  };

  return (
    <div className={cs.createSupplierForm}>
      <SheForm<T>
        form={form}
        defaultValues={UserModelDefault}
        formPosition={DirectionEnum.CENTER}
        view={ComponentViewEnum.STANDARD}
        fullWidth
        hidePrimary
        hideSecondary
        onSubmit={() => handleFormSubmit}
        onCancel={onCancel}
      >
        <FormField
          control={form.control}
          name="supplierName"
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

        {isLoading ? (
          <div className={cs.uploadingBlockContainer}>
            {getCurrentImages().map((file: any, index) => {
              const imageUrl =
                file instanceof File
                  ? URL.createObjectURL(file)
                  : file.result || file.path;

              return (
                <div
                  className="overflow-hidden rounded-md bg-secondary p-0 shadow-sm"
                  key={file.name || index}
                >
                  <div
                    className={`${cs.uploadingItem} flex relative items-center justify-between p-2 pl-4`}
                  >
                    <div className={cs.uploadingImageContainer}>
                      <img
                        src={imageUrl}
                        alt={`uploading-${file.name || `image-${index}`}`}
                        className={cs.uploadingItemImage}
                        onLoad={() => {
                          if (file instanceof File) {
                            URL.revokeObjectURL(imageUrl);
                          }
                        }}
                      />
                    </div>
                    <div className={cs.uploadingItemTextBlock}>
                      <p className="truncate text-sm">
                        {file.name || `Image ${index + 1}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {((file.size || 0) / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <SheLoading className={cs.loadingBlock} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <SheImageUploader
            ref={imageUploaderRef}
            contextName="supplier"
            contextId={data?.id || undefined}
            fullWidth
            hideUploadButton={true}
          />
        )}

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
          value={data ? "Update Supplier" : "Create Supplier"}
          onClick={form.handleSubmit(handleFormSubmit)}
        />
      </div>
    </div>
  );
}
