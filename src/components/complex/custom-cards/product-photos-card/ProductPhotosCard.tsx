import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ProductPhotosCard.module.scss";
import { ProductPhotosGridColumns } from "@/components/complex/grid/product-photos-grid/ProductPhotosGridColumns.tsx";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductBasicDataPageSlice } from "@/const/interfaces/store-slices/IProductBasicDataPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { SheImageUploader } from "@/components/complex/she-images-file-uploader/SheImageUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";

export default function ProductPhotosCard({
  data,
  contextId,
  onFileUpload,
  ...props
}) {
  const state = useAppSelector<IProductBasicDataPageSlice>(
    StoreSliceEnum.PRODUCT_BASIC_DATA,
  );

  function onUpload(uploadModel: UploadPhotoModel) {
    onFileUpload(uploadModel);
  }

  return (
    <div className={cs.productPhotosCard}>
      <SheProductCard
        title="Product Photos"
        view="card"
        minWidth="450px"
        showPrimaryButton={true}
        primaryButtonTitle="Upload Photos"
        showSecondaryButton={true}
        secondaryButtonTitle="Cancel"
        className={cs.productPhotosCard}
        {...props}
      >
        <div className={cs.productPhotosCardContent}>
          <SheImageUploader
            contextName={"product"}
            contextId={contextId}
            onUpload={onUpload}
          />
          {state.photos?.length > 0 && (
            <div className={cs.managePhotos}>
              <div className={`${cs.managePhotosTitle} she-title`}>
                Manage Photos
              </div>
              <div className={cs.managePhotosGrid}>
                <DndGridDataTable
                  enableDnd={true}
                  showHeader={false}
                  columns={ProductPhotosGridColumns}
                  data={state.photos}
                  gridModel={data}
                />
              </div>
            </div>
          )}
        </div>
      </SheProductCard>
    </div>
  );
}
