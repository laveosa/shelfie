import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ProductPhotosCard.module.scss";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { SheImageUploader } from "@/components/complex/she-images-file-uploader/SheImageUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { ProductPhotosGridColumns } from "@/components/complex/grid/product-photos-grid/ProductPhotosGridColumns.tsx";

export default function ProductPhotosCard({
  data,
  contextId,
  onFileUpload,
  onDeleteItem,
  onDndItem,
  ...props
}) {
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
          {data?.length > 0 && (
            <div className={cs.managePhotos}>
              <div className={`${cs.managePhotosTitle} she-title`}>
                Manage Photos
              </div>
              <div className={cs.managePhotosGrid}>
                <DndGridDataTable
                  enableDnd={true}
                  showHeader={false}
                  columns={columns}
                  data={data}
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
