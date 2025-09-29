import { useTranslation } from "react-i18next";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./PhotosCard.module.scss";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { SheFileUploader } from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { IPhotosCard } from "@/const/interfaces/complex-components/custom-cards/IPhotosCard.ts";

export default function PhotosCard({
  isLoading,
  isImageUploaderLoading,
  isGridLoading,
  data,
  contextId,
  contextName,
  columns,
  skeletonQuantity,
  showCloseButton,
  onAction,
}: IPhotosCard) {
  const { t } = useTranslation();

  function handleAction(actionType: string, payload?: any): any {
    switch (actionType) {
      case "delete":
        onAction("deletePhoto", payload);
        break;
      case "connect":
        onAction("openConnectImageCard", payload);
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
        title={`${contextName} Photos`}
        showCloseButton={showCloseButton}
        onSecondaryButtonClick={() => onAction("closePhotosCard")}
        className={cs.productPhotosCard}
      >
        <div className={cs.productPhotosCardContent}>
          <SheFileUploader
            isLoading={isImageUploaderLoading}
            contextName={contextName}
            contextId={contextId}
            onUpload={(uploadModel: UploadPhotoModel) =>
              onAction("uploadPhoto", uploadModel)
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
                columns={columns}
                data={data}
                skeletonQuantity={skeletonQuantity}
                customMessage={t("ProductMessages.NoPhotos")}
                onNewItemPosition={(newIndex, activeItem, oldIndex) =>
                  onAction("changePhotoPosition", {
                    newIndex,
                    activeItem,
                    oldIndex,
                  })
                }
                onAction={onAction}
              />
            </div>
          </div>
        </div>
      </SheProductCard>
    </div>
  );
}
