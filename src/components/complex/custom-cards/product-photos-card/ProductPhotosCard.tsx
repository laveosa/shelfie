import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ProductPhotosCard.module.scss";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { SheImageUploader } from "@/components/complex/she-images-file-uploader/SheImageUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { ProductPhotosGridColumns } from "@/components/complex/grid/variant-photos-grid/ProductPhotosGridColumns.tsx";

type ActionType = "upload" | "delete" | "dnd" | "connect";

export default function ProductPhotosCard({
  data,
  contextId,
  onAction,
  ...props
}) {
  const columns = ProductPhotosGridColumns(onGridAction);

  function handleAction(actionType: ActionType, payload?: any) {
    switch (actionType) {
      case "upload":
        onAction("upload", payload);
        break;
      case "delete":
        onAction("delete", payload);
        break;
      case "connect":
        onAction("connect", payload);
        break;
      case "dnd":
        const { newIndex, activeItem } = payload;
        onAction("dnd", { newIndex, activeItem });
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
        minWidth="450px"
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
          {data?.length > 0 && (
            <div className={cs.managePhotos}>
              <div className={`${cs.managePhotosTitle} she-title`}>
                Manage Photos
              </div>
              <div className={cs.managePhotosGrid}>
                <DndGridDataTable
                  className={cs.photosGrid}
                  enableDnd={true}
                  showHeader={false}
                  columns={columns}
                  data={data}
                  gridModel={data}
                  onNewItemPosition={(newIndex, activeItem) =>
                    handleAction("dnd", { newIndex, activeItem })
                  }
                />
              </div>
            </div>
          )}
        </div>
      </SheProductCard>
    </div>
  );
}
