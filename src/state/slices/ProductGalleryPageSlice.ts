import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductGalleryPageSlice } from "@/const/interfaces/store-slices/IProductGalleryPageSlice.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";

const initialState: IProductGalleryPageSlice = {
  isLoading: false,
  isProductPhotosCardLoading: false,
  isImageUploaderLoading: false,
  isConnectImageCardLoading: false,
  isVariantsGridLoading: false,
  products: [],
  product: {},
  activeCards: [],
  contextId: null,
  productCounter: null,
  photos: [],
  productVariants: [],
  selectedPhoto: null,
};

//------------------------------------- LOADERS/

function setIsLoading(
  state: IProductGalleryPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLoading = action?.payload;
}

function setIsProductPhotosCardLoading(
  state: IProductGalleryPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductPhotosCardLoading = action?.payload;
}

function setIsImageUploaderLoading(
  state: IProductGalleryPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isImageUploaderLoading = action?.payload;
}

function setIsConnectImageCardLoading(
  state: IProductGalleryPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isConnectImageCardLoading = action?.payload;
}

function setIsVariantsGridLoading(
  state: IProductGalleryPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantsGridLoading = action?.payload;
}

//------------------------------------- API/

function refreshProducts(
  state: IProductGalleryPageSlice,
  action: PayloadAction<ProductModel[]>,
) {
  state.products = action?.payload || state.products;
}

function refreshProduct(
  state: IProductGalleryPageSlice,
  action: PayloadAction<ProductModel>,
) {
  state.product = action?.payload || state.product;
}

function refreshActiveCards(
  state: IProductGalleryPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshProductCounter(
  state: IProductGalleryPageSlice,
  action: PayloadAction<ProductCountersModel>,
) {
  state.productCounter = action?.payload || state.productCounter;
}

function refreshProductPhotos(
  state: IProductGalleryPageSlice,
  action: PayloadAction<ImageModel[]>,
) {
  state.photos = action?.payload || state.photos;
}

function refreshProductVariants(
  state: IProductGalleryPageSlice,
  action: PayloadAction<VariantModel[]>,
) {
  state.productVariants = action?.payload || state.productVariants;
}

function refreshSelectedPhoto(
  state: IProductGalleryPageSlice,
  action: PayloadAction<ImageModel>,
) {
  state.selectedPhoto = action?.payload || state.selectedPhoto;
}

const ProductGalleryPageSlice = createSlice({
  name: StoreSliceEnum.PRODUCT_GALLERY,
  initialState,
  reducers: {
    setIsLoading,
    setIsProductPhotosCardLoading,
    setIsImageUploaderLoading,
    setIsConnectImageCardLoading,
    setIsVariantsGridLoading,
    refreshProducts,
    refreshProduct,
    refreshActiveCards,
    refreshProductCounter,
    refreshProductPhotos,
    refreshProductVariants,
    refreshSelectedPhoto,
  },
});

export const ProductGalleryPageSliceActions = ProductGalleryPageSlice.actions;
export default ProductGalleryPageSlice;
