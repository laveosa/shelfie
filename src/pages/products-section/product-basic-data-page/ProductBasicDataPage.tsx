import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./ProductBasicDataPage.module.scss";
import ProductConfigurationCard from "@/components/complex/custom-cards/product-configuration-card/ProductConfigurationCard.tsx";
import CreateProductCategoryCard from "@/components/complex/custom-cards/create-product-category-card/CreateProductCategoryCard.tsx";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import CreateProductBrandCard from "@/components/complex/custom-cards/create-product-brand-card/CreateProductBrandCard.tsx";
import { GridModel } from "@/const/models/GridModel.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductBasicDataPageSlice } from "@/const/interfaces/store-slices/IProductBasicDataPageSlice.ts";
import { ProductBasicDataPageSliceActions as actions } from "@/state/slices/ProductBasicDataPageSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import { useToast } from "@/hooks/useToast.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { scrollToRefElement } from "@/utils/helpers/quick-helper.ts";

export function ProductBasicDataPage() {
  const dispatch = useAppDispatch();
  const productsService = useProductsPageService();
  const state = useAppSelector<IProductBasicDataPageSlice>(
    StoreSliceEnum.PRODUCT_BASIC_DATA,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { productId } = useParams();
  const cardRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});
  const productsForItemsCard = productsService.itemsCardItemsConvertor(
    productsState.products,
    {
      idKey: "productId",
      nameKey: "productName",
      imageKeyPath: "image.thumbnailUrl",
      type: "product",
    },
  );

  const variantsForItemsCard = productsService.itemsCardItemsConvertor(
    productsState.variants,
    {
      idKey: "variantId",
      nameKey: "variantName",
      imageKeyPath: "photo.thumbnailUrl",
      type: "variant",
    },
  );

  useEffect(() => {
    if (!productsState.products) {
      dispatch(productsActions.setIsItemsCardLoading(true));
      productsService
        .getTheProductsForGridHandler(productsState.gridRequestModel)
        .then((res) => {
          dispatch(productsActions.setIsItemsCardLoading(false));
          dispatch(productsActions.refreshProducts(res.items));
        });
    }
    if (productsState.brands.length === 0) {
      productsService.getSimpleListOfAllBrandsHandler().then((res) => {
        dispatch(productsActions.refreshBrands(res));
      });
    }
    if (productsState.categories.length === 0) {
      productsService.getAllCategoriesByOrganizationHandler().then((res) => {
        dispatch(productsActions.refreshCategories(res));
      });
    }
    if (productId) {
      if (
        !productsState.productCounter ||
        productsState.product?.productId !== productId
      ) {
        dispatch(productsActions.setIsProductMenuCardLoading(true));
        productsService.getCountersForProductsHandler(productId).then((res) => {
          dispatch(productsActions.setIsProductMenuCardLoading(false));
          dispatch(productsActions.refreshProductCounter(res));
        });
      }
      if (
        !productsState.product ||
        productsState.product?.productId !== productId
      ) {
        dispatch(actions.setIsProductConfigurationCardLoading(true));
        productsService
          .getProductDetailsHandler(productId)
          .then((res: ProductModel) => {
            dispatch(actions.setIsProductConfigurationCardLoading(false));
            dispatch(actions.refreshActiveCards(["basicData"]));
            dispatch(productsActions.refreshProduct(res));
          });
      }
    } else {
      dispatch(productsActions.refreshProduct({}));
      dispatch(productsActions.refreshProductCounter({}));
    }
  }, [productId]);

  function handleCardAction(identifier: string) {
    const updatedCards = state.activeCards.includes(identifier)
      ? state.activeCards.filter((card) => card !== identifier)
      : [...state.activeCards, identifier];
    scrollToRefElement(cardRefs.current, identifier);
    dispatch(actions.refreshActiveCards(updatedCards));
  }

  function itemCardClickHandler(item) {
    productsService.itemCardHandler(item);
  }

  function updateProductsList() {
    productsService
      .getTheProductsForGridHandler(productsState.gridRequestModel, true)
      .then((res: GridModel) => {
        dispatch(productsActions.refreshProducts(res.items));
      });
  }

  function updateProductDetails(data) {
    dispatch(actions.setIsProductConfigurationCardLoading(true));
    productsService.updateProductHandler(productId, data).then((res) => {
      dispatch(actions.setIsProductConfigurationCardLoading(false));
      if (res.data) {
        dispatch(productsActions.refreshProduct(res.data));
        if (productsState.product.productName !== data.productName) {
          updateProductsList();
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
        productsService
          .getTheProductsForGridHandler(productsState.gridRequestModel)
          .then((res: GridModel) => {
            dispatch(productsActions.refreshProducts(res.items));
          });
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

  function onSubmitProductDataHandler(data: any) {
    if (productId) {
      updateProductDetails(data);
    } else {
      createNewProduct(data);
    }
  }

  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "checkCategoryName":
        productsService
          .checkCategoryNameHandler({ categoryName: payload })
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
                  categoryName: payload,
                }),
              );
            }
          });
        break;
      case "createProductCategory":
        productsService.createNewCategoryHandler(state.category).then((res) => {
          if (res.data) {
            dispatch(productsActions.refreshCategory(res.data));
            productsService
              .getAllCategoriesByOrganizationHandler()
              .then((res) => {
                dispatch(productsActions.refreshCategories(res));
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
        break;
      case "checkBrandName":
        productsService
          .checkBrandNameHandler({ brandName: payload })
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
                  brandName: payload,
                }),
              );
            }
          });
        break;
      case "createProductBrand":
        productsService.createBrandHandler(state.brand).then((res) => {
          if (res.data) {
            dispatch(productsActions.refreshBrand(res.data));
            productsService.getSimpleListOfAllBrandsHandler().then((res) => {
              dispatch(productsActions.refreshBrands(res));
            });
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
        break;
      case "uploadCategoryOrBrandPhoto":
        productsService.uploadPhotoHandler(payload).then((res) => {
          if (!payload.contextId) {
            addToast({
              text:
                payload.contextName === "brand"
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
        break;
      case "closeCreateProductCategoryCard":
        handleCardAction("createCategoryCard");
        break;
      case "closeCreateProductBrandCard":
        handleCardAction("createBrandCard");
        break;
    }
  }

  return (
    <div className={cs.createProductPage}>
      <ItemsCard
        isLoading={productsState.isItemsCardLoading}
        isItemsLoading={
          productsState.activeTab === "products"
            ? productsState.isProductsLoading
            : productsState.isVariantsLoading
        }
        title={productsState.activeTab === "products" ? "Products" : "Variants"}
        data={
          productsState.activeTab === "products"
            ? productsForItemsCard
            : variantsForItemsCard
        }
        selectedItem={
          productsState.activeTab === "products"
            ? productId
            : productsState.selectedVariant?.variantId
        }
        skeletonQuantity={
          productsState.activeTab === "products"
            ? productsState.products?.length
            : productsState.variants?.length
        }
        onAction={itemCardClickHandler}
      />
      <ProductMenuCard
        isLoading={productsState.isProductMenuCardLoading}
        title={productId ? "Manage Product" : "Create Product"}
        itemsCollection="products"
        counter={productsState.productCounter}
        productId={Number(productId)}
        activeCards={state.activeCards}
      />
      <ProductConfigurationCard
        isLoading={state.isProductConfigurationCardLoading}
        product={productsState.product}
        brandsList={productsState.brands}
        categoriesList={productsState.categories}
        onGenerateProductCode={productsService.generateProductCodeHandler}
        onProductCodeCheck={productsService.checkProductCodeHandler}
        onOpenCreateProductCategoryCard={() =>
          handleCardAction("createCategoryCard")
        }
        onOpenCreateProductBrandCard={() => handleCardAction("createBrandCard")}
        onSecondaryButtonClick={() => navigate(NavUrlEnum.PRODUCTS)}
        onPrimaryButtonClick={(data) => onSubmitProductDataHandler(data)}
      />
      {state.activeCards.includes("createCategoryCard") && (
        <div
          ref={(el) => {
            cardRefs.current["createCategoryCard"] = el;
          }}
        >
          <CreateProductCategoryCard
            isLoading={state.isCreateCategoryCardLoading}
            category={productsState.category}
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards.includes("createBrandCard") && (
        <div
          ref={(el) => {
            cardRefs.current["createBrandCard"] = el;
          }}
        >
          <CreateProductBrandCard
            isLoading={state.isCreateBrandCardLoading}
            brand={productsState.brand}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
}
