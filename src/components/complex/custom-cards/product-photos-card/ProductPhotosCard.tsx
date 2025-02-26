import { CirclePlus } from "lucide-react";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ProductPhotosCard.module.scss";
import { GridDataTable } from "@/components/complex/grid/grid-data-table/GridDataTable.tsx";
import { ProductPhotosGridColumns } from "@/components/complex/grid/product-photos-grid/ProductPhotosGridColumns.tsx";

export default function ProductPhotosCard({ data, ...props }) {
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
        {data?.items?.length > 0 && (
          <div className={cs.managePhotos}>
            <div className={`${cs.managePhotosTitle} she-title`}>
              Manage Photos
            </div>
            <div className={cs.managePhotosGrid}>
              <GridDataTable
                showHeader={false}
                columns={ProductPhotosGridColumns}
                data={data.items}
                gridModel={data}
              />
            </div>
          </div>
        )}
      </SheProductCard>
    </div>
  );
}
