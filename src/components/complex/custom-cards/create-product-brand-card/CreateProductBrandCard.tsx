import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductBrandCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import useProductConfigurationPageService from "@/pages/products-section/product-configuration-page/useProductConfigurationPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheImageUploader } from "@/components/complex/she-images-file-uploader/SheImageUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { useToast } from "@/hooks/useToast.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { ProductConfigurationPageSliceActions as actions } from "@/state/slices/ProductConfigurationPageSlice.ts";
import { IProductConfigurationPageSlice } from "@/const/interfaces/store-slices/IProductConfigurationPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";

export default function CreateProductBrandCard({ ...props }) {
  const service = useProductConfigurationPageService();
  const state = useAppSelector<IProductConfigurationPageSlice>(
    StoreSliceEnum.CREATE_PRODUCT,
  );
  const dispatch = useAppDispatch();
  const { addToast } = useToast();

  const handleInputChange = (event) => {
    const brandName = event;
    dispatch(actions.refreshBrand({ ...state.brand, brandName }));
    service.checkBrandNameHandler({ brandName }).then((res) => {
      if (res.error) {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
    });
  };

  function onCreateBrandHandler() {
    service.createBrandHandler(state.brand).then((res) => {
      if (res.data) {
        dispatch(actions.refreshContextId(res.data.brandId));
        service.getSimpleListOfAllBrandsHandler().then((res) => {
          dispatch(actions.refreshBrandsList(res));
        });
        addToast({
          text: "Brand created successfully",
          type: "success",
        });
      } else {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
    });
  }

  function handleFileUpload(uploadModel: UploadPhotoModel) {
    if (!uploadModel.contextId) {
      addToast({
        text: "Create brand first",
        type: "error",
      });
    } else {
      service.uploadPhotoHandler(uploadModel).then((res) => {
        console.log(res.status);
        if (res.data.photoId) {
          addToast({
            text: "Photos added successfully",
            type: "success",
          });
        } else {
          addToast({
            text: `${res.error.data.detail}`,
            type: "error",
          });
        }
      });
    }
  }

  return (
    <div>
      <SheProductCard
        title="Create Product Brand"
        view="card"
        showSecondaryButton={true}
        secondaryButtonTitle="Close"
        className={cs.createProductBrandCard}
        {...props}
      >
        <div className={cs.cardContent}>
          <SheInput
            className={cs.productCategoryInput}
            label="Brand Name"
            placeholder="enter brand name..."
            value={state.brand.brandName || ""}
            onDelay={handleInputChange}
          />
          <SheButton onClick={onCreateBrandHandler}>Add Brand</SheButton>
          <div>
            <SheImageUploader
              contextName={"brand"}
              contextId={state.contextId}
              onUpload={handleFileUpload}
            />
          </div>
        </div>
      </SheProductCard>
    </div>
  );
}
