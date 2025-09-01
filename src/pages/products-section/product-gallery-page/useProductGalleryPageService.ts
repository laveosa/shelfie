import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";

import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import {
  ProductGalleryPageSliceActions as actions,
  ProductGalleryPageSliceActions as action,
} from "@/state/slices/ProductGalleryPageSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { useToast } from "@/hooks/useToast.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { setSelectedGridItem } from "@/utils/helpers/quick-helper.ts";
import { IProductGalleryPageSlice } from "@/const/interfaces/store-slices/IProductGalleryPageSlice.ts";

export default function useProductGalleryPageService() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<IProductGalleryPageSlice>(
    StoreSliceEnum.PRODUCT_GALLERY,
  );
  const productsService = useProductsPageService();
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const { openConfirmationDialog } = useDialogService();
  const { handleCardAction } = useCardActions({
    selectActiveCards: (state) =>
      state[StoreSliceEnum.PRODUCT_GALLERY].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const { addToast } = useToast();

  const [getTheProductsForGrid] =
    ProductsApiHooks.useGetTheProductsForGridMutation();
  const [uploadPhoto] = AssetsApiHooks.useUploadPhotoMutation();
  const [putPhotoInNewPosition] =
    ProductsApiHooks.usePutPhotoInNewPositionMutation();
  const [deletePhoto] = AssetsApiHooks.useDeletePhotoMutation();
  const [getProductVariants] =
    ProductsApiHooks.useLazyGetProductVariantsQuery();
  const [attachProductPhotoToVariant] =
    ProductsApiHooks.useAttachProductPhotoToVariantMutation();
  const [detachVariantPhoto] = ProductsApiHooks.useDetachVariantPhotoMutation();
  const [setPhotoActivationState] =
    AssetsApiHooks.useSetPhotoActivationStateMutation();

  function getTheProductsForGridHandler(data?: GridRequestModel) {
    dispatch(action.setIsLoading(true));
    return getTheProductsForGrid(data).then((res: any) => {
      dispatch(action.setIsLoading(false));
      if (res.error) {
        return;
      } else {
        return res.data;
      }
    });
  }

  function uploadPhotoHandler(
    model: UploadPhotoModel,
    productId: string | number,
  ) {
    dispatch(actions.setIsImageUploaderLoading(true));
    return uploadPhoto(model).then((res: any) => {
      if (res.error) {
        addToast({
          text: res.error.data?.detail || "Upload failed",
          type: "error",
        });
        return res;
      }
      if (res.data.photoId) {
        dispatch(actions.setIsImageUploaderLoading(false));
        productsService
          .getProductPhotosHandler(Number(productId))
          .then((res) => {
            dispatch(productsActions.refreshProductPhotos(res));
          });
        productsService.getCountersForProductsHandler(productId);
        addToast({
          text: "Photos added successfully",
          type: "success",
        });
      }

      return res;
    });
  }

  function putPhotoInNewPositionHandler(productId, photoId, index, model) {
    return putPhotoInNewPosition({
      productId,
      photoId,
      index,
    }).then(() => {
      if (model.newIndex === 0 || model.oldIndex === 0) {
        productsService.getTheProductsForGridHandler(
          productsState.gridRequestModel,
          true,
        );
      }
    });
  }

  async function deletePhotoHandler(model, productId) {
    const confirmed = await openConfirmationDialog({
      headerTitle: "Deleting product photo",
      text: "You are about to delete product photo.",
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmed) return;

    dispatch(productsActions.setIsProductPhotosLoading(true));
    const res: any = await deletePhoto(model.photoId);

    if (!res.error) {
      const [productPhotos, counters, photos] = await Promise.all([
        productsService.getProductPhotosHandler(Number(productId)),
        productsService.getCountersForProductsHandler(productId),
        model.id === 1
          ? productsService.getTheProductsForGridHandler(
              productsState.gridRequestModel,
              true,
            )
          : Promise.resolve({ items: [] }),
      ]);

      queueMicrotask(() => {
        dispatch(productsActions.refreshProductPhotos(productPhotos));
        dispatch(productsActions.refreshProductCounter(counters));

        if (model.id === 1) {
          dispatch(productsActions.refreshProducts(photos.items));
        }
      });

      addToast({
        text: "Photo deleted successfully",
        type: "success",
      });
    } else {
      addToast({
        text: "Photo not deleted",
        description: res.error.message,
        type: "error",
      });
    }
  }

  function getProductVariantsHandler(id: any) {
    return getProductVariants(id).then((res: any) => {
      dispatch(actions.refreshProductVariants(res.data));
      return res.data;
    });
  }

  function setPhotoActivationStateHandler(
    contextName: string,
    contextId: number,
    model: any,
    imageModel: ImageModel,
  ) {
    return setPhotoActivationState({
      contextName,
      contextId,
      photoId: imageModel.photoId,
      model,
    }).then((res) => {
      if (!res.error) {
        dispatch(
          productsActions.refreshProductPhotos(
            productsState.productPhotos.map((photo) =>
              photo.photoId === imageModel.photoId
                ? { ...photo, isActive: !imageModel.isActive }
                : photo,
            ),
          ),
        );
      }
    });
  }

  function openConnectImageCard(model) {
    dispatch(
      productsActions.refreshProductPhotos(
        setSelectedGridItem(
          model.photoId,
          productsState.productPhotos,
          "photoId",
        ),
      ),
    );
    dispatch(actions.refreshSelectedPhoto(model));
    dispatch(
      actions.refreshProductVariants(
        state.productVariants.map((variant) => {
          const isInSelectedPhoto = model.variants?.some(
            (photoVariant) => photoVariant.variantId === variant.variantId,
          );

          return {
            ...variant,
            isActive: isInSelectedPhoto,
          };
        }),
      ),
    );
    handleCardAction("connectImageCard", true);
  }

  function attachImageToVariantHandler(model) {
    return attachProductPhotoToVariant({
      variantId: model.row.original.variantId,
      photoId: state.selectedPhoto.photoId,
    }).then((res) => {
      if (!res.error) {
        const updatedVariants = state.productVariants.map((variant) => {
          if (variant.variantId === model.row.original.variantId) {
            return {
              ...variant,
              isActive: true,
            };
          }
          return variant;
        });
        dispatch(actions.refreshProductVariants(updatedVariants));
      }
    });
  }

  function detachImageFromVariantHandler(model) {
    return detachVariantPhoto({
      id: model.row.original.variantId,
      photoId: state.selectedPhoto.photoId,
    }).then((res: any) => {
      if (!res.error) {
        const updatedVariants = state.productVariants.map((variant) => {
          if (variant.variantId === model.row.original.variantId) {
            return {
              ...variant,
              isActive: false,
            };
          }
          return variant;
        });
        dispatch(actions.refreshProductVariants(updatedVariants));
      }
    });
  }

  return {
    getTheProductsForGridHandler,
    uploadPhotoHandler,
    putPhotoInNewPositionHandler,
    deletePhotoHandler,
    openConnectImageCard,
    attachImageToVariantHandler,
    detachImageFromVariantHandler,
    getProductVariantsHandler,
    setPhotoActivationStateHandler,
  };
}
