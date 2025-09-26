import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";

import {
  CompanyModel,
  CompanyModelDefault,
} from "@/const/models/CompanyModel.ts";
import {
  SheFileUploader,
  SheFileUploaderRef,
} from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import cs from "./CreateCompanyForm.module.scss";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { SupplierPhotosGridColumns } from "@/components/complex/grid/custom-grids/supplier-photos-grid/SupplierPhotosGridColumns.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import CreateCompanyFormScheme from "@/utils/validation/schemes/CreateCompanyFormScheme.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ICreateCompanyForm } from "@/const/interfaces/forms/ICreateCompanyForm.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

interface CompanyFormData extends CompanyModel {
  images?: File[];
  uploadModels?: any[];
}

export default function CreateCompanyForm<T>({
  isLoading,
  isGridLoading,
  isPhotoUploaderLoading,
  className,
  data,
  countryCodes,
  onSubmit,
  onCancel,
  photos,
  onDeletePhoto,
  onDndPhoto,
}: ICreateCompanyForm<T>) {
  const form = useAppForm<SupplierModel>({
    mode: ReactHookFormMode.CHANGE,
    resolver: zodResolver(CreateCompanyFormScheme),
    defaultValues: data || CompanyModelDefault,
  });
  const imageUploaderRef = useRef<SheFileUploaderRef>(null);
  const [submissionData, setSubmissionData] = useState<CompanyFormData | null>(
    null,
  );

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

  function handleFormSubmit(formData: CompanyModel) {
    const selectedFiles = imageUploaderRef.current?.getSelectedFiles() || [];
    const uploadModels = imageUploaderRef.current?.getUploadModels() || [];
    const completeData: CompanyFormData = {
      ...formData,
      images: selectedFiles,
      uploadModels: uploadModels,
    };

    setSubmissionData(completeData);
    onSubmit(completeData as T);
  }

  useEffect(() => {
    form.reset(data || CompanyModelDefault);
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
        defaultValues={CompanyModelDefault}
        formPosition={DirectionEnum.CENTER}
        view={ComponentViewEnum.STANDARD}
        fullWidth
        hidePrimaryBtn
        hideSecondaryBtn
        onSubmit={() => handleFormSubmit}
        onCancel={onCancel}
      >
        <SheFormField
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
      </SheForm>
    </div>
  );
}
