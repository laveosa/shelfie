import { useNavigate } from "react-router-dom";

import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import { ProductBasicDataPageSliceActions as actions } from "@/state/slices/ProductBasicDataPageSlice.ts";
import { useToast } from "@/hooks/useToast.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";
import { IProductBasicDataPageSlice } from "@/const/interfaces/store-slices/IProductBasicDataPageSlice.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";

export default function useProductBasicDataPageService(handleCardAction) {
  // ==================================================================== UTILITIES
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

  // ==================================================================== API INITIALIZATION
  const [generateProductCode] =
    ProductsApiHooks.useLazyGenerateProductCodeQuery();
  const [checkProductCode] = ProductsApiHooks.useCheckProductCodeMutation();
  const [getCountryCode] = DictionaryApiHooks.useLazyGetCountryCodeQuery();

  // ==================================================================== API
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

  function getCountryCodesHandler() {
    if (state.countryCodes.length === 0) {
      getCountryCode().then((res: any) => {
        dispatch(actions.refreshCountryCodes(res.data));
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
      dispatch(
        productsActions.refreshProductCounter({} as ProductCountersModel),
      );
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
    console.log("UPDATE");
    dispatch(actions.setIsProductConfigurationCardLoading(true));
    productsService.updateProductHandler(productId, data).then((res: any) => {
      dispatch(actions.setIsProductConfigurationCardLoading(false));
      if (res.data) {
        dispatch(productsActions.refreshProduct(res.data));
        if (productsState.product.productName !== data.productName) {
          productsService.getTheProductsForGridHandler(
            productsState.productsGridRequestModel,
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
    console.log("CREATE");
    dispatch(actions.setIsProductConfigurationCardLoading(true));
    productsService.createNewProductHandler(data).then((res: any) => {
      dispatch(actions.setIsProductConfigurationCardLoading(false));
      if (res.data) {
        dispatch(productsActions.refreshSelectedProduct(res.data));
        productsService.getTheProductsForGridHandler(
          productsState.productsGridRequestModel,
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

  function checkCategoryNameHandler(categoryName: string) {
    productsService
      .checkCategoryNameHandler({ categoryName: categoryName })
      .then((res: any) => {
        if (res.error) {
          dispatch(
            productsActions.refreshCategory({
              ...state.category,
              error: res.error.data.detail,
            }),
          );
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

  function createNewCategoryHandler(model) {
    productsService
      .createNewCategoryHandler({
        categoryName: model.categoryName,
      })
      .then((res: any) => {
        if (res.data) {
          dispatch(
            productsActions.refreshCategories([
              ...productsState.categories,
              res.data,
            ]),
          );
          dispatch(productsActions.setIsPhotoUploaderLoading(true));

          const uploadPromises = model.uploadModels.map((model) => {
            model.contextId = res.data.categoryId;
            return productsService.uploadPhotoHandler(model);
          });

          Promise.all(uploadPromises).then((results) => {
            results.forEach((res) => {
              dispatch(productsActions.setIsPhotoUploaderLoading(false));
              if (res && !res.error) {
                dispatch(productsActions.refreshCategory(null));
                handleCardAction("createCategoryCard");
                addToast({
                  text: "Category created successfully",
                  type: "success",
                });
              } else {
                addToast({
                  text: res?.error?.data.detail,
                  type: "error",
                });
              }
            });
          });
        } else {
          addToast({
            text: `${res.error.data.detail}`,
            type: "error",
          });
        }
      });
  }

  function checkBrandNameHandler(brandName: string) {
    productsService
      .checkBrandNameHandler({ brandName: brandName })
      .then((res: any) => {
        if (res.error) {
          dispatch(
            productsActions.refreshBrand({
              ...state.brand,
              error: res.error.data.detail,
            }),
          );
        } else {
          dispatch(
            productsActions.refreshBrand({
              ...state.brand,
              brandName: brandName,
              error: null,
            }),
          );
        }
      });
  }

  function createBrandHandler(model) {
    productsService
      .createBrandHandler({ brandName: model.brandName })
      .then((res: any) => {
        if (res.data) {
          dispatch(
            productsActions.refreshBrands([...productsState.brands, res.data]),
          );

          dispatch(productsActions.setIsPhotoUploaderLoading(true));

          const uploadPromises = model.uploadModels.map((model) => {
            model.contextId = res.data.brandId;
            return productsService.uploadPhotoHandler(model);
          });

          Promise.all(uploadPromises).then((results) => {
            results.forEach((res) => {
              dispatch(productsActions.setIsPhotoUploaderLoading(false));
              if (res && !res.error) {
                dispatch(productsActions.refreshBrand(null));
                handleCardAction("createBrandCard");
                addToast({
                  text: "Brand created successfully",
                  type: "success",
                });
              } else {
                addToast({
                  text: res?.error?.data.detail,
                  type: "error",
                });
              }
            });
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
    productsService.uploadPhotoHandler(model).then((res: any) => {
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

  function generateProductCodeHandler(product?: ProductModel) {
    return generateProductCode(null).then((res: any) => {
      if (product) {
        dispatch(
          productsActions.refreshProduct({
            ...productsState.product,
            productCode: res.data.code,
          }),
        );
      } else {
        dispatch(productsActions.refreshProductCode(res.data.code));
      }
      return res.data;
    });
  }

  function checkProductCodeHandler(code) {
    return checkProductCode(code).then((res: any) => {
      if (!res.error) {
        addToast({
          text: "Product code is available",
          type: "success",
        });
      } else {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
      return res.data;
    });
  }

  // ==================================================================== PROVIDED API
  return {
    state,
    productsState,
    productsService,
    getProductsHandler,
    getCategoriesHandler,
    getCountryCodesHandler,
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
