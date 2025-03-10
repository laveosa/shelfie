import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ProductPhotosCard.module.scss";
import { ProductPhotosGridColumns } from "@/components/complex/grid/product-photos-grid/ProductPhotosGridColumns.tsx";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductConfigurationPageSlice } from "@/const/interfaces/store-slices/IProductConfigurationPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { SheImageUploader } from "@/components/complex/she-images-file-uploader/SheImageUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";

export default function ProductPhotosCard({
  data,
  contextId,
  onFileUpload,
  onDeleteItem,
  onDndItem,
  ...props
}) {
  const state = useAppSelector<IProductConfigurationPageSlice>(
    StoreSliceEnum.PRODUCT_CONFIGURATION,
  );
  const columns = ProductPhotosGridColumns(onAction);

  function onUpload(uploadModel: UploadPhotoModel) {
    onFileUpload(uploadModel);
  }

  function onChangeItemPosition(newIndex, activeItem) {
    onDndItem(newIndex, activeItem);
  }

  function onAction(
    _actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
  ) {
    onDeleteItem(row.original);
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
                  columns={columns}
                  data={state.photos}
                  gridModel={data}
                  onNewItemPosition={onChangeItemPosition}
                />
              </div>
            </div>
          )}
        </div>
      </SheProductCard>
    </div>
  );
}
