import { IProductBasicDataPageSlice } from "@/const/interfaces/store-slices/IProductBasicDataPageSlice.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductGalleryPageSlice } from "@/const/interfaces/store-slices/IProductGalleryPageSlice.ts";

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

const ProductGalleryPageSlice = createSlice({
  name: StoreSliceEnum.PRODUCT_GALLERY,
  initialState,
  reducers: {
    setLoading,
    refreshProducts,
  },
});

export const ProductGalleryPageSliceActions = ProductGalleryPageSlice.actions;
export default ProductGalleryPageSlice;
