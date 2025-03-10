import { IProductBasicDataPageSlice } from "@/const/interfaces/store-slices/IProductBasicDataPageSlice.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductGalleryPageSlice } from "@/const/interfaces/store-slices/IProductGalleryPageSlice.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";

const initialState: IProductGalleryPageSlice = {
  loading: false,
  products: [],
  product: {},
  activeCards: [],
  brandsList: [],
  categoriesList: [],
  brand: {},
  category: {},
  contextId: null,
  productCounter: null,
  photos: [],
};

function setLoading(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<boolean>,
) {
  state.loading = action?.payload;
}

function refreshProducts(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<ProductModel[]>,
) {
  state.products = action?.payload || state.products;
}

function refreshProduct(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<ProductModel>,
) {
  state.product = action?.payload || state.product;
}

function refreshProductCounter(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<ProductCounterModel>,
) {
  state.productCounter = action?.payload || state.productCounter;
}

function refreshProductPhotos(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<ImageModel[]>,
) {
  state.photos = action?.payload || state.photos;
}

const ProductGalleryPageSlice = createSlice({
  name: StoreSliceEnum.PRODUCT_GALLERY,
  initialState,
  reducers: {
    setLoading,
    refreshProducts,
    refreshProduct,
    refreshProductCounter,
    refreshProductPhotos,
  },
});

export const ProductGalleryPageSliceActions = ProductGalleryPageSlice.actions;
export default ProductGalleryPageSlice;
