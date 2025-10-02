import React from "react";

import cs from "./PhotosCard.module.scss";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { SheFileUploader } from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
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
  const { translate } = useAppTranslation();

  return (
    <SheCard
      className={cs.productPhotosCard}
      title={`${contextName} Photos`}
      isLoading={isLoading}
      showHeader
      showCloseButton={showCloseButton}
      onSecondaryButtonClick={() => onAction("closePhotosCard")}
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
        <br />
        <div className={cs.managePhotos}>
          <div className={`${cs.managePhotosTitle} she-title`}>
            {translate("CardTitles.ManagePhotos")}
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
    </SheCard>
  );
}
