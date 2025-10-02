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
  noDataText,
  skeletonQuantity,
  showCloseButton,
  onAction,
}: IPhotosCard) {
  const { t } = useTranslation();

  return (
    <SheProductCard
      loading={isLoading}
      title={`${contextName} Photos`}
      showCloseButton={showCloseButton}
      onSecondaryButtonClick={() => onAction("closePhotosCard")}
      className={cs.photosCard}
    >
      <div className={cs.photosCardContent}>
        <SheFileUploader
          isLoading={isImageUploaderLoading}
          contextName={contextName}
          contextId={contextId}
          onUpload={(uploadModel: UploadPhotoModel) =>
            onAction("uploadPhoto", uploadModel)
          }
        />
        <div className={cs.managePhotosBlock}>
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
              customMessage={noDataText}
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
  );
}
