import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ProductPhotosCard.module.scss";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { SheFileUploader } from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { IProductPhotosCard } from "@/const/interfaces/complex-components/custom-cards/IProductPhotosCard.ts";
import { ProductPhotosGridColumns } from "@/components/complex/grid/custom-grids/variant-photos-grid/ProductPhotosGridColumns.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

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
  const { t } = useTranslation();

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
      case "activate":
        onAction("activatePhoto", payload);
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
      case "activate":
        handleAction("activate", row.original);
        break;
    }
  }

  return (
    <div className={cs.productPhotosCard}>
      <SheProductCard
        loading={isLoading}
        title={t("CardTitles.ProductPhotos")}
        minWidth="500px"
        showCloseButton={showCloseButton}
        onSecondaryButtonClick={() => onAction("closeProductPhotsCard")}
        className={cs.productPhotosCard}
      >
        <div className={cs.productPhotosCardContent}>
          <SheFileUploader
            isLoading={isImageUploaderLoading}
            contextName="product"
            contextId={contextId}
            onUpload={(uploadModel: UploadPhotoModel) =>
              handleAction("upload", uploadModel)
            }
          />
          <div className={cs.managePhotos}>
            <div className={`${cs.managePhotosTitle} she-title`}>
              {t("CardTitles.ManagePhotos")}
            </div>
            <div className={cs.managePhotosGrid}>
              <SheGrid
                isLoading={isGridLoading}
                className={cs.photosGrid}
                enableDnd={true}
                showHeader={false}
                columns={
                  ProductPhotosGridColumns(
                    onGridAction,
                  ) as ColumnDef<DataWithId>[]
                }
                data={data}
                skeletonQuantity={productCounter?.gallery}
                cellPadding="5px 10px"
                customMessage={t("ProductMessages.NoPhotos")}
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
