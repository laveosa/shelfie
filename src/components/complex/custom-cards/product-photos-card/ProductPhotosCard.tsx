import { CirclePlus } from "lucide-react";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ProductPhotosCard.module.scss";
import { ProductPhotosGridColumns } from "@/components/complex/grid/product-photos-grid/ProductPhotosGridColumns.tsx";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductConfigurationPageSlice } from "@/const/interfaces/store-slices/IProductConfigurationPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";

export default function ProductPhotosCard({ data, ...props }) {
  const state = useAppSelector<IProductConfigurationPageSlice>(
    StoreSliceEnum.PRODUCT_CONFIGURATION,
  );

  function handleFileUpload(event) {
    const files = event.target.files;
    console.log(files);
  }

  return (
    <div>
      <SheProductCard
        title="Product Photos"
        view="card"
        showPrimaryButton={true}
        primaryButtonTitle="Upload Photos"
        showSecondaryButton={true}
        secondaryButtonTitle="Cancel"
        className={cs.productPhotosCard}
        {...props}
      >
        <div
          className={cs.productPhotosFileUploader}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <CirclePlus />
          <div className={`${cs.text} she-text`}>
            Drag & drop or click to choose images
          </div>
          <input type="file" id="fileInput" onChange={handleFileUpload} />
        </div>
        {data?.length > 0 && (
          <div className={cs.managePhotos}>
            <div className={`${cs.managePhotosTitle} she-title`}>
              Manage Photos
            </div>
            <div className={cs.managePhotosGrid}>
              <DndGridDataTable
                enableDnd={true}
                showHeader={false}
                columns={ProductPhotosGridColumns}
                data={state.photos}
                gridModel={data}
              />
            </div>
          </div>
        )}
      </SheProductCard>
    </div>
  );
}
