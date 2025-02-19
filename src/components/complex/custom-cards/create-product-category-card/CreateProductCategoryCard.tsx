import React, { useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductCategoryCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import useCreateProductPageService from "@/pages/products-section/create-product-page/useCreateProductPageService.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { SheImagesFileUploader } from "@/components/complex/she-images-file-uploader/SheImagesFileUploader.tsx";

export default function CreateProductCategoryCard({ ...props }) {
  const service = useCreateProductPageService();
  const [category, setCategory] = useState<CategoryModel>({});
  const [contextId, setContextId] = useState<number | null>(null);

  function handleFileUpload(event) {
    const files = event.target.files;
    const uploadModel: UploadPhotoModel = {
      contextName: "category",
      contextId,
      file: event.target.files,
    };
    service.uploadPhotoHandler(uploadModel);
  }

  function onAction() {}

  const handleUpload = (formData) => {
    fetch(
      `https://photoservice.redground-5e8b9eee.germanywestcentral.azurecontainerapps.io/api/v1/asset/category/${contextId}/upload-photo`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIyMSIsImVtYWlsIjoibHVjYXNAdWtyLm5ldCIsIkF1dGhlbnRpY2F0aW9uTGV2ZWwiOiJCYXNlTGV2ZWwsIFBob25lTnVtYmVyVmVyaWZpeWVkLCBPcmdhbml6YXRpb25EZWZpbmVkIiwiT3JnYW5pemF0aW9uSWQiOiIxMSIsIk9yZ2FuaXphdGlvbk5hbWUiOiJEZXYgVGVhbSBPcmciLCJPcmdhbml6YXRpb25LZXkiOiI5MTgxNzg0Yy0xMWY4LTQzOGQtYTQ5MC0xZjYwMTRjOThkZmUiLCJleHAiOjE3NDIzODQzNjcsImlzcyI6IlRvTklFRmFicnlrYSIsImF1ZCI6IlRvTklFRmFicnlrYSJ9.4fqzVD3Ub6niGnLDo68jSPSUqxxItqSkKPiEoZYGMEQ ",
        },
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          console.log("Upload successful!");
        } else {
          console.error("Upload failed.");
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleInputChange = (event) => {
    const categoryName = event; // Get the category name from the event
    setCategory({ ...category, categoryName }); // Update the category state
    service.checkCategoryNameHandler({ categoryName }).then(() => {
      service
        .createNewCategoryHandler({ categoryName: categoryName })
        .then((res) => {
          setContextId(res.categoryId);
          console.log("Category created:", res);
        });
    });
  };

  return (
    <div>
      <SheProductCard
        title="Create Product Category"
        view="card"
        showPrimaryButton={true}
        primaryButtonTitle="Add Category"
        showSecondaryButton={true}
        secondaryButtonTitle="Cancel"
        className={cs.createProductCategoryCard}
        onPrimaryButtonClick={onAction}
        {...props}
      >
        <div className={cs.productCategoryInput}>
          <SheInput
            label="Category Name"
            placeholder="enter category name..."
            value={category.categoryName || ""}
            onDelay={handleInputChange}
          />
        </div>
        <SheImagesFileUploader contextName={"category"} contextId={contextId} />

        <ImageUpload onUpload={handleUpload} />
      </SheProductCard>
    </div>
  );
}

export const ImageUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const supportedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (supportedMimeTypes.includes(file.type)) {
        setSelectedFile(file);
        setError("");
      } else {
        setError("Unsupported file type. Please upload a JPEG, PNG, or GIF.");
        setSelectedFile(null);
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Call the onUpload prop function to handle the upload
      onUpload(formData);
    } else {
      setError("Please select a file to upload.");
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
    </div>
  );
};
