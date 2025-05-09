import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ProductPhotosCard.module.scss";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { SheImageUploader } from "@/components/complex/she-images-file-uploader/SheImageUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { ProductPhotosGridColumns } from "@/components/complex/grid/variant-photos-grid/ProductPhotosGridColumns.tsx";

export default function ProductPhotosCard({
  isLoading,
  data,
  contextId,
  onAction,
  ...props
}) {
  const columns = ProductPhotosGridColumns(onGridAction);

  function handleAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "upload":
        onAction("upload", payload);
        break;
      case "delete":
        onAction("delete", payload);
        break;
      case "connect":
        onAction("openConnectImageCard", payload);
        break;
      case "dnd":
        const { newIndex, activeItem } = payload;
        onAction("changePhotoPosition", { newIndex, activeItem });
        break;
    }
  }

  function onGridAction(
    actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
  ) {
    switch (actionType) {
      case "delete":
        handleAction("delete", row.original);
        break;
      case "connect":
        handleAction("connect", row.original);
        break;
    }
  }

  return (
    <div className={cs.productPhotosCard}>
      <SheProductCard
        title="Product Photos"
        view="card"
        className={cs.productPhotosCard}
        {...props}
      >
        <div className={cs.productPhotosCardContent}>
          <SheImageUploader
            contextName={"product"}
            contextId={contextId}
            onUpload={(uploadModel: UploadPhotoModel) =>
              handleAction("upload", uploadModel)
            }
          />
          <div className={cs.managePhotos}>
            <div className={`${cs.managePhotosTitle} she-title`}>
              Manage Photos
            </div>
            <div className={cs.managePhotosGrid}>
              <DndGridDataTable
                isLoading={isLoading}
                className={cs.photosGrid}
                enableDnd={true}
                showHeader={false}
                columns={columns}
                data={data}
                gridModel={data}
                customMessage="PRODUCT HAS NO PHOTO"
                onNewItemPosition={(newIndex, activeItem) =>
                  handleAction("dnd", { newIndex, activeItem })
                }
              />
            </div>
          </div>
          {/*)}*/}
        </div>
      </SheProductCard>
    </div>
  );
}
