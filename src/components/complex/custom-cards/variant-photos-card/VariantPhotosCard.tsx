import React from "react";
import { useTranslation } from "react-i18next";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./VariantPhotosCard.module.scss";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { SheFileUploader } from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { VariantPhotosGridColumns } from "@/components/complex/grid/product-photos-grid/VariantPhotosGridColumns.tsx";
import { OtherProductPhotosGridColumns } from "@/components/complex/grid/other-product-photos-grid/OtherProductPhotosGridColumns.tsx";
import { ColumnDef } from "@tanstack/react-table";

export default function VariantPhotosCard({
  isLoading,
  isVariantPhotoGridLoading,
  isProductPhotoGridLoading,
  variantPhotos,
  productPhotos,
  contextId,
  onAction,
  ...props
}) {
  const { t } = useTranslation();
  const variantPhotosColumns = VariantPhotosGridColumns(
    onGridAction,
  ) as ColumnDef<DataWithId>[];
  const otherPhotosColumns = OtherProductPhotosGridColumns(
    onGridAction,
  ) as ColumnDef<DataWithId>[];

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
      case "detachFromVariant":
        onAction("detachPhotoFromVariant", payload);
        break;
      case "addToVariant":
        onAction("addPhotoToVariant", payload);
        break;
      case "dnd":
        const { newIndex, activeItem } = payload;
        onAction("dndVariantPhoto", { newIndex, activeItem });
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
      case "detachFromVariant":
        handleAction("detachFromVariant", row.original);
        break;
      case "addToVariant":
        handleAction("addToVariant", row.original);
        break;
    }
  }

  return (
    <div className={cs.variantPhotosCard}>
      <SheProductCard
        loading={isLoading}
        title={t("CardTitles.ManagePhotos")}
        onSecondaryButtonClick={() => onAction("closeVariantPhotosCard")}
        showCloseButton={true}
        {...props}
      >
        <div className={cs.variantPhotosCardContent}>
          <SheFileUploader
            contextName={"variant"}
            contextId={contextId}
            onUpload={(uploadModel: UploadPhotoModel) =>
              handleAction("upload", uploadModel)
            }
          />
          <div className={cs.managePhotos}>
            <div className={`${cs.managePhotosTitle} she-title`}>
              <span className="she-title">{t("ProductForm.Labels.VariantPhotos")}</span>
            </div>
            <div className={cs.managePhotosGrid}>
              <DndGridDataTable
                isLoading={isVariantPhotoGridLoading}
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
                customMessage={t("ProductMessages.NoVariantPhotos")}
                onNewItemPosition={(newIndex, activeItem) =>
                  handleAction("dnd", { newIndex, activeItem })
                }
              />
            </div>
          </div>
          <div className={cs.managePhotos}>
            <div className={`${cs.managePhotosTitle} she-title`}>
              <span className="she-title">{t("ProductForm.Labels.OtherProductPhotos")}</span>
            </div>
            <div className={cs.managePhotosGrid}>
              <DndGridDataTable
                isLoading={isProductPhotoGridLoading}
                enableDnd={false}
                className={
                  variantPhotos.length > 0
                    ? cs.productPhotosGridShort
                    : cs.productPhotosGridLong
                }
                showHeader={false}
                showColumnsHeader={false}
                columns={otherPhotosColumns}
                data={productPhotos}
                customMessage={
                  !variantPhotos && !productPhotos
                    ? t("ProductMessages.NoPhotos")
                    : t("ProductMessages.AllPhotosAttachedToVariant")
                }
                gridModel={productPhotos}
              />
            </div>
          </div>
        </div>
      </SheProductCard>
    </div>
  );
}
