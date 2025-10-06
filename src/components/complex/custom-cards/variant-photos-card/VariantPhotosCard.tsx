import React from "react";

import cs from "./VariantPhotosCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { SheFileUploader } from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import { VariantPhotosGridColumns } from "@/components/complex/grid/custom-grids/product-photos-grid/VariantPhotosGridColumns.tsx";
import { OtherProductPhotosGridColumns } from "@/components/complex/grid/custom-grids/other-product-photos-grid/OtherProductPhotosGridColumns.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";

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
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== EVENT HANDLERS
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

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.variantPhotosCard}
      title="Manage Photos"
      titleTransKey="CardTitles.ManagePhotos"
      isLoading={isLoading}
      showCloseButton
      showFooter
      onSecondaryButtonClick={() => onAction("closeVariantPhotosCard")}
      {...props}
    >
      <div className={cs.variantPhotosCardContent}>
        <SheFileUploader
          contextName="variant"
          contextId={contextId}
          onUpload={(uploadModel: UploadPhotoModel) =>
            handleAction("upload", uploadModel)
          }
        />
        <div className={cs.managePhotos}>
          <div className={`${cs.managePhotosTitle} she-title`}>
            <span className="she-title">
              {translate("ProductForm.Labels.VariantPhotos")}
            </span>
          </div>
          <div className={cs.managePhotosGrid}>
            <SheGrid
              isLoading={isVariantPhotoGridLoading}
              enableDnd={true}
              showHeader={false}
              columns={VariantPhotosGridColumns(onGridAction)}
              data={variantPhotos}
              gridRequestModel={variantPhotos}
              customMessage="VARIANT HAS NO PHOTO"
              customMessageTransKey="ProductMessages.NoVariantPhotos"
              onNewItemPosition={(newIndex, activeItem) =>
                handleAction("dnd", { newIndex, activeItem })
              }
            />
          </div>
        </div>
        <div className={cs.managePhotos}>
          <div className={`${cs.managePhotosTitle} she-title`}>
            <span className="she-title">
              {translate("ProductForm.Labels.OtherProductPhotos")}
            </span>
          </div>
          <div className={cs.managePhotosGrid}>
            <SheGrid
              isLoading={isProductPhotoGridLoading}
              enableDnd={false}
              showHeader={false}
              showColumnsHeader={false}
              columns={OtherProductPhotosGridColumns(onGridAction)}
              data={productPhotos}
              customMessage={
                !variantPhotos && !productPhotos
                  ? "PRODUCT HAS NO PHOTO"
                  : "All product photos are already attached to the variant."
              }
              customMessageTransKey={
                !variantPhotos && !productPhotos
                  ? "ProductMessages.NoPhotos"
                  : "ProductMessages.AllPhotosAttachedToVariant"
              }
              gridRequestModel={productPhotos}
            />
          </div>
        </div>
      </div>
    </SheCard>
  );
}
