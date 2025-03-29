import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductGalleryPageSlice } from "@/const/interfaces/store-slices/IProductGalleryPageSlice.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { IManageVariantsPageSlice } from "@/const/interfaces/store-slices/IManageVariantsPageSlice.ts";
import { IProductBasicDataPageSlice } from "@/const/interfaces/store-slices/IProductBasicDataPageSlice.ts";

const initialState: IProductGalleryPageSlice = {
  loading: false,
  products: [],
  product: {},
  activeCards: [],
  contextId: null,
  productCounter: null,
  photos: [],
  productVariants: [],
};

function setLoading(
  state: IProductGalleryPageSlice,
  action: PayloadAction<boolean>,
) {
  state.loading = action?.payload;
}

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
  state: IProductBasicDataPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshProductCounter(
  state: IProductGalleryPageSlice,
  action: PayloadAction<ProductCounterModel>,
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
  state: IManageVariantsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.productVariants = action?.payload || state.productVariants;
}

const ProductGalleryPageSlice = createSlice({
  name: StoreSliceEnum.PRODUCT_GALLERY,
  initialState,
  reducers: {
    setLoading,
    refreshProducts,
    refreshProduct,
    refreshActiveCards,
    refreshProductCounter,
    refreshProductPhotos,
    refreshProductVariants,
  },
});

export const ProductGalleryPageSliceActions = ProductGalleryPageSlice.actions;
export default ProductGalleryPageSlice;
