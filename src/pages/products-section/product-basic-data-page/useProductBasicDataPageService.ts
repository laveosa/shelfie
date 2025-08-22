import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { ProductBasicDataPageSliceActions as actions } from "@/state/slices/ProductBasicDataPageSlice.ts";
import { useToast } from "@/hooks/useToast.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { useNavigate } from "react-router-dom";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { IProductBasicDataPageSlice } from "@/const/interfaces/store-slices/IProductBasicDataPageSlice.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";

export default function useProductBasicDataPageService() {
  const state = useAppSelector<IProductBasicDataPageSlice>(
    StoreSliceEnum.PRODUCT_BASIC_DATA,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const dispatch = useAppDispatch();
  const productsService = useProductsPageService();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [generateProductCode] =
    ProductsApiHooks.useLazyGenerateProductCodeQuery();
  const [checkProductCode] = ProductsApiHooks.useCheckProductCodeMutation();

  function getProductsHandler(gridRequestModel: GridRequestModel) {
    if (!productsState.products) {
      dispatch(productsActions.setIsItemsCardLoading(true));
      productsService
        .getTheProductsForGridHandler(gridRequestModel)
        .then(() => {
          dispatch(productsActions.setIsItemsCardLoading(false));
        });
    }
  }

  function getCategoriesHandler() {
    if (productsState.brands.length === 0) {
      productsService.getSimpleListOfAllBrandsHandler();
    }
  }

  function getBrandsHandler() {
    if (productsState.categories.length === 0) {
      productsService.getAllCategoriesByOrganizationHandler();
    }
  }

  function getCountersForProductsHandler(productId: number) {
    if (productId) {
      if (
        !productsState.productCounter ||
        productsState.product?.productId !== productId
      ) {
        dispatch(productsActions.setIsProductMenuCardLoading(true));
        productsService.getCountersForProductsHandler(productId).then(() => {
          dispatch(productsActions.setIsProductMenuCardLoading(false));
        });
      }
    } else {
      dispatch(productsActions.refreshProductCounter({}));
    }
  }

  function getProductDetailsHandler(productId: number) {
    if (productId) {
      if (
        !productsState.product ||
        productsState.product?.productId !== productId
      ) {
        dispatch(actions.setIsProductConfigurationCardLoading(true));
        productsService.getProductDetailsHandler(productId).then(() => {
          dispatch(actions.setIsProductConfigurationCardLoading(false));
        });
      }
    } else {
      dispatch(productsActions.refreshProduct({}));
    }
  }

  function itemCardClickHandler(item) {
    productsService.itemCardHandler(item);
  }

  function updateProductDetails(productId, data) {
    dispatch(actions.setIsProductConfigurationCardLoading(true));
    productsService.updateProductHandler(productId, data).then((res) => {
      dispatch(actions.setIsProductConfigurationCardLoading(false));
      if (res.data) {
        dispatch(productsActions.refreshProduct(res.data));
        if (productsState.product.productName !== data.productName) {
          productsService.getTheProductsForGridHandler(
            productsState.gridRequestModel,
            true,
          );
        }
        addToast({
          text: "Product updated successfully",
          type: "success",
        });
      } else {
        addToast({
          text: "Product not updated",
          description: res.error.message,
          type: "error",
        });
      }
    });
  }

  function createNewProduct(data) {
    dispatch(actions.setIsProductConfigurationCardLoading(true));
    productsService.createNewProductHandler(data).then((res) => {
      dispatch(actions.setIsProductConfigurationCardLoading(false));
      if (res.data) {
        dispatch(productsActions.refreshSelectedProduct(res.data));
        productsService.getTheProductsForGridHandler(
          productsState.gridRequestModel,
        );
        navigate(
          `${ApiUrlEnum.PRODUCTS}${ApiUrlEnum.PRODUCT_BASIC_DATA}/${res.data.productId}`,
        );
        addToast({
          text: "Product created successfully",
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

  function onSubmitProductDataHandler(productId, data: any) {
    if (productId) {
      updateProductDetails(productId, data);
    } else {
      createNewProduct(data);
    }
  }

  function gotoProductsPageHandler() {
    navigate(NavUrlEnum.PRODUCTS);
  }

  function checkCategoryNameHandler(categoryName) {
    productsService
      .checkCategoryNameHandler({ categoryName: categoryName })
      .then((res) => {
        if (res.error) {
          addToast({
            text: `${res.error.data.detail}`,
            type: "error",
          });
        } else {
          dispatch(
            productsActions.refreshCategory({
              ...state.category,
              categoryName: categoryName,
            }),
          );
        }
      });
  }

  function createNewCategoryHandler() {
    productsService
      .createNewCategoryHandler({
        categoryName: productsState.category.categoryName,
      })
      .then((res) => {
        if (res.data) {
          dispatch(productsActions.refreshCategory(res.data));
          productsService.getAllCategoriesByOrganizationHandler();
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

  function checkBrandNameHandler(brandName) {
    productsService
      .checkBrandNameHandler({ brandName: brandName })
      .then((res) => {
        if (res.error) {
          addToast({
            text: `${res.error.data.detail}`,
            type: "error",
          });
        } else {
          dispatch(
            productsActions.refreshBrand({
              ...state.brand,
              brandName: brandName,
            }),
          );
        }
      });
  }

  function createBrandHandler() {
    productsService
      .createBrandHandler({ brandName: productsState.brand.brandName })
      .then((res) => {
        if (res.data) {
          dispatch(productsActions.refreshBrand(res.data));
          productsService.getSimpleListOfAllBrandsHandler();
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

  function uploadCategoryOrBrandPhotoHandler(model) {
    productsService.uploadPhotoHandler(model).then((res) => {
      if (!model.contextId) {
        addToast({
          text:
            model.contextName === "brand"
              ? "Create brand first"
              : "Create category first",
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

  function generateProductCodeHandler() {
    return generateProductCode(null).then((res: any) => {
      dispatch(
        productsActions.refreshProduct({
          ...productsState.product,
          productCode: res.data.code,
        }),
      );
      return res.data;
    });
  }

  function checkProductCodeHandler(code) {
    return checkProductCode(code).then((res: any) => {
      return res.data;
    });
  }

  return {
    getProductsHandler,
    getCategoriesHandler,
    getBrandsHandler,
    getCountersForProductsHandler,
    getProductDetailsHandler,
    itemCardClickHandler,
    gotoProductsPageHandler,
    onSubmitProductDataHandler,
    checkCategoryNameHandler,
    createNewCategoryHandler,
    checkBrandNameHandler,
    createBrandHandler,
    uploadCategoryOrBrandPhotoHandler,
    generateProductCodeHandler,
    checkProductCodeHandler,
  };
}
