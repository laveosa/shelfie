import { CirclePlus } from "lucide-react";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductBrandCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";

export default function CreateProductBrandCard({ ...props }) {
  function handleFileUpload(event) {
    const files = event.target.files;
    console.log(files);
  }

  return (
    <div>
      <SheProductCard
        title="Create Product Brand"
        view="card"
        showPrimaryButton={true}
        primaryButtonTitle="Add Brand"
        showSecondaryButton={true}
        secondaryButtonTitle="Cancel"
        className={cs.createProductBrandCard}
        {...props}
      >
        <div className={cs.productBrandInput}>
          <SheInput label="Brand Name" placeholder="enter brand name..." />
        </div>
        <div
          className={cs.productBrandFileUploader}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <CirclePlus />
          <div className={`${cs.text} she-text`}>
            Drag & drop or click to choose brand logo
          </div>
          <input type="file" id="fileInput" onChange={handleFileUpload} />
        </div>
      </SheProductCard>
    </div>
  );
}
