import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductCategoryCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import useCreateProductPageService from "@/pages/products-section/create-product-page/useCreateProductPageService.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { SheImageUploader } from "@/components/complex/she-images-file-uploader/SheImageUploader.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { useToast } from "@/hooks/useToast.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { CreateProductPageSliceActions as actions } from "@/state/slices/CreateProductPageSlice.ts";
import { ICreateProductPageSlice } from "@/const/interfaces/store-slices/ICreateProductPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";

export default function CreateProductCategoryCard({ ...props }) {
  const service = useCreateProductPageService();
  const state = useAppSelector<ICreateProductPageSlice>(
    StoreSliceEnum.CREATE_PRODUCT,
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
        title="Create Product Category"
        view="card"
        primaryButtonTitle="Add Category"
        showSecondaryButton={true}
        secondaryButtonTitle="Close"
        className={cs.createProductCategoryCard}
        {...props}
      >
        <div className={cs.cardContent}>
          <SheInput
            className={cs.productCategoryInput}
            label="Category Name"
            placeholder="enter category name..."
            value={state.category.categoryName || ""}
            onDelay={handleInputChange}
          />
          <SheButton onClick={onCreateCategoryHandler}>
            Create Category
          </SheButton>
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
