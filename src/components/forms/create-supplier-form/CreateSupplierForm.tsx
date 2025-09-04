import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";

import {
  SupplierModel,
  SupplierModelDefault,
} from "@/const/models/SupplierModel.ts";
import {
  SheFileUploader,
  SheFileUploaderRef,
} from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { ICreateSupplierForm } from "@/const/interfaces/forms/ICreateSupplierForm.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import CreateSupplierFormScheme from "@/utils/validation/schemes/CreateSupplierFormScheme.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { UserModelDefault } from "@/const/models/UserModel.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./CreateSupplierForm.module.scss";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { SupplierPhotosGridColumns } from "@/components/complex/grid/custom-grids/supplier-photos-grid/SupplierPhotosGridColumns.tsx";

interface SupplierFormData extends SupplierModel {
  images?: File[];
  uploadModels?: any[];
}

export default function CreateSupplierForm<T>({
  isLoading,
  isPhotoUploaderLoading,
  className,
  data,
  countryList,
  onSubmit,
  onCancel,
  photos,
  isGridLoading,
  onDeletePhoto,
  onDndPhoto,
}: ICreateSupplierForm<T>) {
  const form = useAppForm<SupplierModel>({
    mode: "onSubmit",
    resolver: zodResolver(CreateSupplierFormScheme),
    defaultValues: data || SupplierModelDefault,
  });
  const imageUploaderRef = useRef<SheFileUploaderRef>(null);
  const [submissionData, setSubmissionData] = useState<SupplierFormData | null>(
    null,
  );

  function convertCountriesToSelectItems(data: any[]): ISheSelectItem<T>[] {
    return data?.map(
      (item): ISheSelectItem<T> => ({
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
    form.reset(data || SupplierModelDefault);
  }, [data]);

  const getCurrentImages = () => {
    if (isLoading && submissionData?.images) {
      return submissionData.images;
    }
    return imageUploaderRef.current?.getSelectedFiles() || [];
  };

  return (
    <div className={`${cs.createSupplierForm} ${className}`}>
      <SheForm
        form={form}
        defaultValues={UserModelDefault}
        formPosition={DirectionEnum.CENTER}
        view={ComponentViewEnum.STANDARD}
        fullWidth
        hideFooter
        onSubmit={() => handleFormSubmit}
        onCancel={onCancel}
      >
        <SheFormField
          name="supplierName"
          render={({ field }) => (
            <SheInput
              label="Name"
              value={field.value}
              placeholder="enter supplier name..."
              fullWidth
            />
          )}
        />

        {isPhotoUploaderLoading ? (
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
          <SheFileUploader
            isLoading={isPhotoUploaderLoading}
            ref={imageUploaderRef}
            contextName="company"
            contextId={data?.id || undefined}
            fullWidth
            hideUploadButton={true}
          />
        )}
        <DndGridDataTable
          isLoading={isGridLoading}
          className={cs.formGrid}
          enableDnd={true}
          showHeader={false}
          cellPadding="10px"
          columns={
            SupplierPhotosGridColumns(onDeletePhoto) as ColumnDef<DataWithId>[]
          }
          data={photos}
          skeletonQuantity={photos?.length}
          onNewItemPosition={(newIndex, activeItem) => {
            onDndPhoto({ newIndex, activeItem });
          }}
        />
        <SheFormField
          name="addressLine1"
          render={({ field }) => (
            <SheInput
              label="Address line 1"
              value={field.value}
              placeholder="enter address line 1..."
              fullWidth
            />
          )}
        />
        <SheFormField
          name="addressLine2"
          render={({ field }) => (
            <SheInput
              label="Address line 2"
              value={field.value}
              placeholder="enter address line 2..."
              fullWidth
            />
          )}
        />
        <SheFormField
          name="city"
          render={({ field }) => (
            <SheInput
              label="City"
              value={field.value}
              placeholder="enter city..."
              fullWidth
            />
          )}
        />
        <SheFormField
          name="state"
          render={({ field }) => (
            <SheInput
              label="State/Province/Region"
              value={field.value}
              placeholder="enter province..."
              fullWidth
            />
          )}
        />
        <SheFormField
          name="postCode"
          render={({ field }) => (
            <SheInput
              label="Zip/Postal Code"
              value={field.value}
              placeholder="enter postal code..."
              fullWidth
            />
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
          value={data ? "Save Changes" : "Create Supplier"}
          onClick={form.handleSubmit(handleFormSubmit)}
        />
      </div>
    </div>
  );
}
