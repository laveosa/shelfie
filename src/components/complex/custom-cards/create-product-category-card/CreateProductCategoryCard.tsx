import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductCategoryCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import useProductBasicDataPageService from "@/pages/products-section/product-basic-data-page/useProductBasicDataPageService.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { SheImageUploader } from "@/components/complex/she-images-uploader/SheImageUploader.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { useToast } from "@/hooks/useToast.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { ProductBasicDataPageSliceActions as actions } from "@/state/slices/ProductBasicDataPageSlice.ts";
import { IProductBasicDataPageSlice } from "@/const/interfaces/store-slices/IProductBasicDataPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";

export default function CreateProductCategoryCard({ isLoading, ...props }) {
  const service = useProductBasicDataPageService();
  const state = useAppSelector<IProductBasicDataPageSlice>(
    StoreSliceEnum.PRODUCT_BASIC_DATA,
  );
  const dispatch = useAppDispatch();
  const { addToast } = useToast();

  const handleInputChange = (event) => {
    const categoryName = event;
    dispatch(actions.refreshCategory({ ...state.category, categoryName }));
    service.checkCategoryNameHandler({ categoryName }).then((res) => {
      if (res.error) {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
    });
  };

  function onCreateCategoryHandler() {
    service.createNewCategoryHandler(state.category).then((res) => {
      if (res.data) {
        dispatch(actions.refreshContextId(res.data.categoryId));
        service.getAllCategoriesByOrganizationHandler().then((res) => {
          dispatch(actions.refreshCategoriesList(res));
        });
        addToast({
          text: "Category created successfully",
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
    service.uploadPhotoHandler(uploadModel).then((res) => {
      if (!uploadModel.contextId) {
        addToast({
          text: "Create category first",
          type: "error",
        });
      } else {
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
      }
    });
  }

  return (
    <div>
      <SheProductCard
        loading={isLoading}
        title="Create Product Category"
        showCloseButton
        primaryButtonTitle="Add Category"
        className={cs.createProductCategoryCard}
        {...props}
      >
        <div className={cs.cardContent}>
          <SheInput
            className={cs.productCategoryInput}
            label="Category Name"
            placeholder="enter category name..."
            fullWidth
            value={state.category.categoryName || ""}
            onDelay={handleInputChange}
          />
          <SheButton onClick={onCreateCategoryHandler}>Add Category</SheButton>
          <div>
            <SheImageUploader
              contextName={"category"}
              contextId={state.contextId}
              onUpload={handleFileUpload}
            />
          </div>
        </div>
      </SheProductCard>
    </div>
  );
}
