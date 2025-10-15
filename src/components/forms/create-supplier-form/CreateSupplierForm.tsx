import React, { useRef, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import cs from "./CreateSupplierForm.module.scss";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { SupplierPhotosGridColumns } from "@/components/complex/grid/custom-grids/supplier-photos-grid/SupplierPhotosGridColumns.tsx";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import CreateSupplierFormScheme from "@/utils/validation/schemes/CreateSupplierFormScheme.ts";
import {
  SheFileUploader,
  SheFileUploaderRef,
} from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import { ICreateSupplierForm } from "@/const/interfaces/forms/ICreateSupplierForm.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import {
  SupplierModel,
  SupplierModelDefault,
} from "@/const/models/SupplierModel.ts";

interface SupplierFormData extends SupplierModel {
  images?: File[];
  uploadModels?: any[];
}

export default function CreateSupplierForm({
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
}: ICreateSupplierForm) {
  // ==================================================================== STATE MANAGEMENT
  const [submissionData, setSubmissionData] = useState<SupplierFormData>(null);

  // ==================================================================== UTILITIES
  const { form } = useAppForm<SupplierModel>({
    values: data,
    defaultValues: SupplierModelDefault,
    scheme: CreateSupplierFormScheme,
    mode: ReactHookFormMode.SUBMIT,
  });

  // ==================================================================== REF
  const imageUploaderRef = useRef<SheFileUploaderRef>(null);

  // ==================================================================== EVENT HANDLER
  function onSubmitHandler(formData: SupplierModel) {
    const selectedFiles = imageUploaderRef.current?.getSelectedFiles() || [];
    const uploadModels = imageUploaderRef.current?.getUploadModels() || [];
    const completeData: SupplierFormData = {
      ...formData,
      images: selectedFiles,
      uploadModels: uploadModels,
    };

    setSubmissionData(completeData);
    onSubmit(completeData as SupplierModel);
  }

  // ==================================================================== PRIVATE
  function convertCountriesToSelectItems(
    data: any[],
  ): ISheSelectItem<SupplierModel>[] {
    return data?.map(
      (item): ISheSelectItem<SupplierModel> => ({
        value: item.countryId,
        text: item.countryName,
      }),
    );
  }

  const getCurrentImages = () => {
    if (isLoading && submissionData?.images) {
      return submissionData.images;
    }
    return imageUploaderRef.current?.getSelectedFiles() || [];
  };

  // ==================================================================== LAYOUT
  return (
    <div className={`${cs.createSupplierForm} ${className}`}>
      <SheForm<SupplierModel>
        form={form}
        fullWidth
        primaryBtnProps={{
          value: data ? "Save Changes" : "Create Supplier",
          valueTransKey: data
            ? "CommonButtons.SaveChanges"
            : "CommonButtons.CreateSupplier",
        }}
        onCancel={onCancel}
        onSubmit={onSubmitHandler}
      >
        <SheFormField
          name="supplierName"
          render={({ field }) => (
            <SheInput
              value={field.value}
              label="Name"
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
        <SheGrid
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
              value={field.value}
              label="Address line 1"
              placeholder="enter address line 1..."
              fullWidth
            />
          )}
        />
        <SheFormField
          name="addressLine2"
          render={({ field }) => (
            <SheInput
              value={field.value}
              label="Address line 2"
              placeholder="enter address line 2..."
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
              placeholder="enter city..."
              fullWidth
            />
          )}
        />
        <SheFormField
          name="state"
          render={({ field }) => (
            <SheInput
              value={field.value}
              label="State/Province/Region"
              placeholder="enter province..."
              fullWidth
            />
          )}
        />
        <SheFormField
          name="postCode"
          render={({ field }) => (
            <SheInput
              value={field.value}
              label="Zip/Postal Code"
              placeholder="enter postal code..."
              fullWidth
            />
          )}
        />
        <SheFormField
          name="countryId"
          render={({ field }) => (
            <SheSelect
              items={convertCountriesToSelectItems(countryList)}
              selected={field.value}
              label="Country"
              placeholder="choose country..."
              hideFirstOption
              fullWidth
            />
          )}
        />
      </SheForm>
    </div>
  );
}
