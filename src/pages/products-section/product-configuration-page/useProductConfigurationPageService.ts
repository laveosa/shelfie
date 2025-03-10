import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ProductsPageSliceActions as productsAction } from "@/state/slices/ProductsPageSlice.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";

export default function useProductConfigurationPageService() {
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const dispatch = useAppDispatch();
  const [getAllProducts] = ProductsApiHooks.useLazyGetAllProductsQuery();
  const [generateProductCode] =
    ProductsApiHooks.useLazyGenerateProductCodeQuery();
  const [getSimpleListOfAllBrands] =
    ProductsApiHooks.useLazyGetSimpleListOfAllBrandsQuery();
  const [getAllCategoriesByOrganization] =
    ProductsApiHooks.useLazyGetAllCategoriesByOrganizationQuery();
  const [checkProductCode] = ProductsApiHooks.useCheckProductCodeMutation();
  const [checkBrandName] = ProductsApiHooks.useCheckBrandNameMutation();
  const [checkCategoryName] = ProductsApiHooks.useCheckCategoryNameMutation();
  const [createNewProduct] = ProductsApiHooks.useCreateNewProductMutation();
  const [createNewCategory] = ProductsApiHooks.useCreateNewCategoryMutation();
  const [createBrand] = ProductsApiHooks.useCreateBrandMutation();
  const [uploadPhoto] = AssetsApiHooks.useUploadPhotoMutation();
  const [getProductDetails] = ProductsApiHooks.useLazyGetProductDetailQuery();
  const [getCountersForProducts] =
    ProductsApiHooks.useLazyGetCountersForProductsQuery();
  const [getProductPhotos] = ProductsApiHooks.useLazyGetProductPhotosQuery();
  const [putPhotoInNewPosition] =
    ProductsApiHooks.usePutPhotoInNewPositionMutation();
  const [deletePhoto] = AssetsApiHooks.useDeletePhotoMutation();

  function getAllProductsHandler() {
    dispatch(productsAction.setLoading(true));
    return getAllProducts(null).then((res: any) => {
      dispatch(productsAction.setLoading(false));
      dispatch(productsAction.refreshProducts(res.data));
      return res.data;
    });
  }

  function getProductDetailsHandler(id) {
    return getProductDetails(id).then((res: any) => {
      return res.data;
    });
  }

  function generateProductCodeHandler() {
    return generateProductCode(null).then((res: any) => {
      return res.data;
    });
  }

  function getSimpleListOfAllBrandsHandler() {
    return getSimpleListOfAllBrands(null).then((res: any) => {
      return res.data;
    });
  }

  function getAllCategoriesByOrganizationHandler() {
    return getAllCategoriesByOrganization(null).then((res: any) => {
      return res.data;
    });
  }

  function checkProductCodeHandler(code) {
    return checkProductCode(code).then((res: any) => {
      return res.data;
    });
  }

  function checkBrandNameHandler(brandName) {
    return checkBrandName(brandName).then((res: any) => {
      return res;
    });
  }

  function checkCategoryNameHandler(categoryName) {
    return checkCategoryName(categoryName).then((res: any) => {
      return res;
    });
  }

  function createNewProductHandler(model) {
    return createNewProduct(model).then((res: any) => {
      return res;
    });
  }

  function createNewCategoryHandler(model) {
    return createNewCategory(model).then((res: any) => {
      return res;
    });
  }

  function createBrandHandler(model) {
    return createBrand(model).then((res: any) => {
      return res;
    });
  }

  function uploadPhotoHandler(model: UploadPhotoModel) {
    return uploadPhoto(model).then((res: any) => {
      return res;
    });
  }

  function getCountersForProductsHandler(id: number) {
    return getCountersForProducts(id).then((res: any) => {
      return res.data;
    });
  }

  function getProductPhotosHandler(id: number) {
    return getProductPhotos(id).then((res: any) => {
      return res.data;
    });
  }

  function putPhotoInNewPositionHandler(productId, photoId, index) {
    return putPhotoInNewPosition({
      productId,
      photoId,
      index,
    }).then((res: any) => {
      return res.data;
    });
  }

  function deletePhotoHandler(photoId) {
    return deletePhoto(photoId).then((res: any) => {
      return res.data;
    });
  }

  return {
    ...productsState,
    getAllProductsHandler,
    getProductDetailsHandler,
    generateProductCodeHandler,
    getSimpleListOfAllBrandsHandler,
    getAllCategoriesByOrganizationHandler,
    checkProductCodeHandler,
    checkBrandNameHandler,
    checkCategoryNameHandler,
    createNewProductHandler,
    createNewCategoryHandler,
    createBrandHandler,
    uploadPhotoHandler,
    getCountersForProductsHandler,
    getProductPhotosHandler,
    putPhotoInNewPositionHandler,
    deletePhotoHandler,
  };
}
