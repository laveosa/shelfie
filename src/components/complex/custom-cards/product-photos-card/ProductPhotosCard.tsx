import React from "react";

import cs from "./ProductPhotosCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { SheFileUploader } from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import { ProductPhotosGridColumns } from "@/components/complex/grid/custom-grids/variant-photos-grid/ProductPhotosGridColumns.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { IProductPhotosCard } from "@/const/interfaces/complex-components/custom-cards/IProductPhotosCard.ts";

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
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== EVENT HANDLER
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

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.productPhotosCard}
      title="Product Photos"
      titleTransKey="CardTitles.ProductPhotos"
      minWidth="500px"
      showCloseButton={showCloseButton}
      isLoading={isLoading}
      onSecondaryButtonClick={() => onAction("closeProductPhotsCard")}
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
          <span className={`${cs.managePhotosTitle} she-title`}>
            {translate("CardTitles.ManagePhotos")}
          </span>
          <div className={cs.managePhotosGrid}>
            <SheGrid
              className={cs.photosGrid}
              isLoading={isGridLoading}
              enableDnd={true}
              showHeader={false}
              columns={ProductPhotosGridColumns(onGridAction)}
              data={data}
              skeletonQuantity={productCounter?.gallery}
              cellPadding="5px 10px"
              customMessage="PRODUCT HAS NO PHOTO"
              customMessageTransKey="ProductMessages.NoPhotos"
              onNewItemPosition={(newIndex, activeItem, oldIndex) =>
                handleAction("dnd", { newIndex, activeItem, oldIndex })
              }
            />
          </div>
        </div>
      </div>
    </SheCard>
  );
}
