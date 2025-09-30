import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import useProductsPageService
  from "@/pages/products-section/products-page/useProductsPageService.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";
import {
  ProductsPageSliceActions as productsActions
} from "@/state/slices/ProductsPageSlice.ts";
import {
  ProductBasicDataPageSliceActions as actions
} from "@/state/slices/ProductBasicDataPageSlice.ts";
import { useToast } from "@/hooks/useToast.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";
import {
  IProductBasicDataPageSlice
} from "@/const/interfaces/store-slices/IProductBasicDataPageSlice.ts";
import {
  IProductsPageSlice
} from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import CompaniesApiHooks from "@/utils/services/api/CompaniesApiService.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { LocationModel } from "@/const/models/LocationModel.ts";

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
  const { t } = useTranslation();
  const { openConfirmationDialog } = useDialogService();

  // ==================================================================== API INITIALIZATION
  const [generateProductCode] =
    ProductsApiHooks.useLazyGenerateProductCodeQuery();
  const [checkProductCode] = ProductsApiHooks.useCheckProductCodeMutation();
  const [getCountryCode] = DictionaryApiHooks.useLazyGetCountryCodeQuery();
  const [getListOfCompaniesForGrid] =
    CompaniesApiHooks.useGetListOfCompaniesForGridMutation();
  const [updateBrandOwner] = ProductsApiHooks.useUpdateBrandOwnerMutation();
  const [createCompany] = CompaniesApiHooks.useCreateCompanyMutation();
  const [uploadPhoto] = AssetsApiHooks.useUploadPhotoMutation();
  const [addNewLocationToCompany] =
    CompaniesApiHooks.useAddNewLocationToCompanyMutation();
  const [getCompanyDetails] = CompaniesApiHooks.useLazyGetCompanyDetailsQuery();
  const [deleteCompany] = CompaniesApiHooks.useDeleteCompanyMutation();
  const [deletePhoto] = AssetsApiHooks.useDeletePhotoMutation();
  const [addLocationToCompany] =
    CompaniesApiHooks.useAddLocationToCompanyMutation();

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
      getCountryCode(undefined).then((res: any) => {
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

          updateBrandOwner({
            brandId: res.data.brandId,
            model: {
              companyId: state.selectedCompany.companyId,
            },
          });

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
          dispatch(actions.resetSelectedCompany());
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

  function openSelectEntityCardHandler() {
    handleCardAction("selectEntityCard", true);
    dispatch(actions.setIsCompaniesGridLoading(true));
    getListOfCompaniesForGrid(state.companiesGridRequestModel).then((res) => {
      dispatch(actions.setIsCompaniesGridLoading(false));
      const modifiedList = res.data.items.map((item) => ({
        ...item,
        isSelected: item.companyId === state.selectedCompany?.companyId,
      }));
      dispatch(
        actions.refreshCompaniesGridRequestModel({
          ...res.data,
          items: modifiedList,
        }),
      );
    });
  }

  function searchEntityHandler(searchText: string) {
    dispatch(actions.setIsCompaniesGridLoading(true));
    getListOfCompaniesForGrid({ searchQuery: searchText }).then((res) => {
      dispatch(actions.setIsCompaniesGridLoading(false));
      dispatch(actions.refreshCompaniesGridRequestModel(res.data));
    });
  }

  function selectCompanyHandler(model: CompanyModel) {
    handleCardAction("selectEntityCard");
    dispatch(actions.refreshSelectedCompany(model));
  }

  function openCreateEntityCardHandler() {
    handleCardAction("createCompanyCard", true);
  }

  function closeSelectEntityCardHandler() {
    handleCardAction("selectEntityCard");
  }

  function createCompanyHandler(model) {
    dispatch(actions.setIsCreateCompanyCardLoading(true));
    createCompany(model.company).then((res: any) => {
      if (!res.error) {
        model.image.uploadModels.map((model) => {
          model.contextId = res.data.companyId;
          dispatch(actions.setIsPhotoUploaderLoading(true));
          uploadPhoto(model).then((res: any) => {
            dispatch(actions.setIsPhotoUploaderLoading(false));
            if (res) {
              addToast({
                text: t("SuccessMessages.ImageAdded"),
                type: "success",
              });
            } else {
              addToast({
                text: res.error.details.message,
                type: "error",
              });
            }
          });
        });
        addNewLocationToCompany({
          companyId: res.data.companyId,
          model: model.address,
        });
        dispatch(actions.setIsCreateCompanyCardLoading(false));
        handleCardAction("createCompanyCard");
        addToast({
          text: "Company created successfully",
          type: "success",
        });
      } else {
        addToast({
          text: res.error.details.message,
          type: "error",
        });
      }
    });
  }

  function closeCreateCompanyCardHandler() {
    handleCardAction("createCompanyCard");
  }

  function manageCompanyHandler(model: CompanyModel) {
    handleCardAction("companyConfigurationCard", true);
    dispatch(actions.setIsCompanyConfigurationCardLoading(true));
    dispatch(actions.setIsLocationsGridLoading(true));
    getCompanyDetails(model.companyId).then((res: any) => {
      dispatch(actions.setIsCompanyConfigurationCardLoading(false));
      dispatch(actions.setIsLocationsGridLoading(false));
      dispatch(actions.refreshManagedCompany(res.data));
    });
  }

  async function deleteCompanyHandler(model: CompanyModel) {
    const confirmedCompanyDeleting = await openConfirmationDialog({
      headerTitle: "Deleting company",
      text: `You are about to delete company ${model.companyName}.`,
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedCompanyDeleting) return;

    dispatch(actions.setIsCompanyConfigurationCardLoading(true));
    deleteCompany(model.companyId).then((res) => {
      if (res.error) {
        addToast({
          text: "Failed to delete company",
          type: "error",
        });
        return;
      } else {
        addToast({
          text: "Company deleted successfully",
          type: "info",
        });
        handleCardAction("companyConfigurationCard");
        dispatch(actions.setIsCompanyConfigurationCardLoading(false));
        dispatch(actions.setIsLocationsGridLoading(false));
        dispatch(actions.resetManagedCompany());
        getListOfCompaniesForGrid(state.companiesGridRequestModel).then(
          (res) => {
            dispatch(actions.refreshCompaniesGridRequestModel(res.data));
          },
        );
        if (
          state.selectedCompany.companyId === state.managedCompany.companyId
        ) {
          dispatch(actions.resetSelectedCompany());
        }
      }
    });
  }

  function closeCompanyConfigurationCardHandler() {
    handleCardAction("companyConfigurationCard");
    dispatch(actions.resetManagedCompany());
  }

  function manageCompanyPhotosHandler() {
    handleCardAction("photosCard", true);
  }

  async function deleteCompanyPhotoHandler(model: ImageModel) {
    const confirmedDeleteCompanyPhoto = await openConfirmationDialog({
      headerTitle: "Deleting company photo",
      text: "You are about to delete company photo.",
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedDeleteCompanyPhoto) return;

    deletePhoto(model.photoId).then((res: any) => {
      const updatedPhotos = state.managedCompany.photos.filter(
        (photo) => photo.photoId !== model.photoId,
      );

      dispatch(
        actions.refreshManagedCompany({
          ...state.managedCompany,
          photos: updatedPhotos,
        }),
      );
      if (!res.error) {
        addToast({
          text: "Photo deleted successfully",
          type: "success",
        });
      } else {
        addToast({
          text: "Photo not deleted",
          description: res.error.details.message,
          type: "error",
        });
      }
    });
  }

  function uploadPhotoHandler(model: UploadPhotoModel) {
    dispatch(actions.setIsPhotoUploaderLoading(true));
    return uploadPhoto(model).then((res: any) => {
      if (res.error) {
        addToast({
          text: res.error.data?.detail || "Upload failed",
          type: "error",
        });
        return res;
      }
      if (res.data.photoId) {
        dispatch(actions.setIsPhotoUploaderLoading(false));
        dispatch(
          actions.refreshManagedCompany({
            ...state.managedCompany,
            photos: [...(state.managedCompany.photos || []), res.data],
          }),
        );
        addToast({
          text: "Photos added successfully",
          type: "success",
        });
      }

      return res;
    });
  }

  function closePhotosCardHandler() {
    handleCardAction("photosCard");
  }

  function openLocationConfigurationCardHandler(model: LocationModel) {
    handleCardAction("locationConfigurationCard", true);
    if (!model) {
      dispatch(actions.resetManagedLocation());
    } else {
      dispatch(actions.refreshManagedLocation(model));
    }
  }

  function createLocationHandler(model: LocationModel) {
    dispatch(actions.setIsLocationConfigurationCardLoading(true));
    addLocationToCompany({
      companyId: state.managedCompany.companyId,
      model,
    }).then((res: any) => {
      if (!res.error) {
        handleCardAction("locationConfigurationCard");
        dispatch(actions.setIsCompanyConfigurationCardLoading(true));
        dispatch(actions.setIsLocationsGridLoading(true));
        getCompanyDetails(state.managedCompany.companyId).then((res: any) => {
          dispatch(actions.setIsCompanyConfigurationCardLoading(false));
          dispatch(actions.setIsLocationsGridLoading(false));
          dispatch(actions.refreshManagedCompany(res.data));
        });
        addToast({
          text: "Location added successfully",
          type: "success",
        });
      } else {
        addToast({
          text: res.error.data?.detail,
          type: "error",
        });
      }
    });
  }

  function closeLocationConfigurationCardHandler() {
    handleCardAction("locationConfigurationCard");
    dispatch(actions.resetManagedLocation());
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
    openSelectEntityCardHandler,
    searchEntityHandler,
    selectCompanyHandler,
    openCreateEntityCardHandler,
    closeSelectEntityCardHandler,
    createCompanyHandler,
    closeCreateCompanyCardHandler,
    manageCompanyHandler,
    deleteCompanyHandler,
    closeCompanyConfigurationCardHandler,
    manageCompanyPhotosHandler,
    deleteCompanyPhotoHandler,
    uploadPhotoHandler,
    closePhotosCardHandler,
    openLocationConfigurationCardHandler,
    createLocationHandler,
    closeLocationConfigurationCardHandler,
  };
}
