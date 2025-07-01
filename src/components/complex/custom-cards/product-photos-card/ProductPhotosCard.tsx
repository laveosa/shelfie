import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ProductPhotosCard.module.scss";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { SheImageUploader } from "@/components/complex/she-images-uploader/SheImageUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { ProductPhotosGridColumns } from "@/components/complex/grid/variant-photos-grid/ProductPhotosGridColumns.tsx";
import { IProductPhotosCard } from "@/const/interfaces/complex-components/custom-cards/IProductPhotosCard.ts";
import { ColumnDef } from "@tanstack/react-table";

export default function ProductPhotosCard({
  isLoading,
  isImageUploaderLoading,
  isGridLoading,
  data,
  contextId,
  productCounter,
  showCloseButton,
  onAction,
}: IProductPhotosCard) {
  const columns = ProductPhotosGridColumns(
    onGridAction,
  ) as ColumnDef<DataWithId>[];

  function handleAction(actionType: string, payload?: any): any {
    switch (actionType) {
      case "upload":
        onAction("uploadPhoto", payload);
        break;
      case "delete":
        onAction("deletePhoto", payload);
        break;
      case "connect":
        onAction("openConnectImageCard", payload);
        break;
      case "dnd":
        const { newIndex, activeItem, oldIndex } = payload;
        onAction("changePhotoPosition", { newIndex, activeItem, oldIndex });
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
        loading={isLoading}
        title="Product Photos"
        minWidth="405px"
        showCloseButton={showCloseButton}
        onSecondaryButtonClick={() => onAction("closeProductPhotsCard")}
        className={cs.productPhotosCard}
      >
        <div className={cs.productPhotosCardContent}>
          <SheImageUploader
            isLoading={isImageUploaderLoading}
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
                isLoading={isGridLoading}
                className={cs.photosGrid}
                enableDnd={true}
                showHeader={false}
                columns={columns}
                data={data}
                gridModel={data}
                skeletonQuantity={productCounter?.gallery}
                customMessage="PRODUCT HAS NO PHOTO"
                onNewItemPosition={(newIndex, activeItem, oldIndex) =>
                  handleAction("dnd", { newIndex, activeItem, oldIndex })
                }
              />
            </div>
          </div>
        </div>
      </SheProductCard>
    </div>
  );
}
