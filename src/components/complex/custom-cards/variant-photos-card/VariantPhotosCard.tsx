import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./VariantPhotosCard.module.scss";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { SheImageUploader } from "@/components/complex/she-images-file-uploader/SheImageUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { VariantPhotosGridColumns } from "@/components/complex/grid/product-photos-grid/VariantPhotosGridColumns.tsx";
import { OtherProductPhotosGridColumns } from "@/components/complex/grid/other-product-photos-grid/OtherProductPhotosGridColumns.tsx";

export default function VariantPhotosCard({
  variantPhotos,
  productPhotos,
  contextId,
  onAction,
  ...props
}) {
  const variantPhotosColumns = VariantPhotosGridColumns(onGridAction);
  const otherPhotosColumns = OtherProductPhotosGridColumns(onGridAction);

  function handleAction(actionType: any, payload?: any) {
    switch (actionType) {
      case "image":
        onAction("image", payload);
        break;
      case "upload":
        onAction("uploadPhotoToVariant", payload);
        break;
      case "delete":
        onAction("delete", payload);
        break;
      case "disconnect":
        onAction("disconnectImage", payload);
        break;
      case "addToVariant":
        onAction("addPhotoToVariant", payload);
        break;
      case "dnd":
        const { newIndex, activeItem } = payload;
        onAction("dnd", { newIndex, activeItem });
        break;
    }
  }

  function onGridAction(
    _actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
  ) {
    handleAction("addToVariant", row.original);
  }

  return (
    <div className={cs.variantPhotosCard}>
      <SheProductCard
        title="Manage Photos"
        view="card"
        minWidth="450px"
        onSecondaryButtonClick={() => onAction("closeVariantPhotosCard")}
        showCloseButton={true}
        {...props}
      >
        <div className={cs.variantPhotosCardContent}>
          <SheImageUploader
            contextName={"variant"}
            contextId={contextId}
            onUpload={(uploadModel: UploadPhotoModel) =>
              handleAction("upload", uploadModel)
            }
          />
          <div className={cs.managePhotos}>
            <div className={`${cs.managePhotosTitle} she-title`}>
              <span className="she-title">Variant Photos</span>
            </div>
            <div className={cs.managePhotosGrid}>
              {variantPhotos.length > 0 ? (
                <DndGridDataTable
                  className={
                    variantPhotos.length > 0
                      ? cs.productPhotosGridShort
                      : cs.productPhotosGridLong
                  }
                  enableDnd={true}
                  showHeader={false}
                  columns={variantPhotosColumns}
                  data={variantPhotos}
                  gridModel={variantPhotos}
                  onNewItemPosition={(newIndex, activeItem) =>
                    handleAction("dnd", { newIndex, activeItem })
                  }
                />
              ) : (
                <div className={cs.variantPhotosText}>
                  <span className={"she-text"}>
                    Variant doesn`t have photos
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={cs.managePhotos}>
            <div className={`${cs.managePhotosTitle} she-title`}>
              <span className="she-title">Other Product Photos</span>
            </div>
            <div className={cs.managePhotosGrid}>
              {productPhotos.length > 0 ? (
                <DndGridDataTable
                  className={
                    variantPhotos.length > 0
                      ? cs.productPhotosGridShort
                      : cs.productPhotosGridLong
                  }
                  showHeader={false}
                  showColumnsHeader={false}
                  columns={otherPhotosColumns}
                  data={productPhotos}
                  gridModel={productPhotos}
                />
              ) : (
                <div className={cs.variantPhotosText}>
                  <span className={"she-text"}>
                    Product doesn`t have photos
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheProductCard>
    </div>
  );
}
