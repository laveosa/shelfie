import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
import useProductBasicDataPageService from "@/pages/products-section/product-basic-data-page/useProductBasicDataPageService.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import { useToast } from "@/hooks/useToast.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export function ProductBasicDataPage() {
  const dispatch = useAppDispatch();
  const productsService = useProductsPageService();
  const service = useProductBasicDataPageService();
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

  useEffect(() => {
    productsService
      .getTheProductsForGridHandler(productsState.gridRequestModel)
      .then((res: GridModel) => {
        dispatch(actions.refreshProducts(res.items));
      });

    service.getSimpleListOfAllBrandsHandler().then((res: BrandModel[]) => {
      dispatch(actions.refreshBrandsList(res ? res : []));
    });

    service
      .getAllCategoriesByOrganizationHandler()
      .then((res: CategoryModel[]) => {
        dispatch(actions.refreshCategoriesList(res ? res : []));
      });

    if (productId) {
      dispatch(actions.refreshActiveCards(["basicData"]));
      service.getProductDetailsHandler(productId).then((res: ProductModel) => {
        dispatch(actions.refreshProduct(res));
      });

      service
        .getCountersForProductsHandler(productId)
        .then((res: ProductCounterModel) => {
          dispatch(actions.refreshProductCounter(res));
        });
    } else {
      dispatch(actions.refreshProductCounter({}));
      dispatch(actions.refreshProduct({}));
    }
  }, [productId]);

  function scrollToCard(cardId: string) {
    setTimeout(() => {
      const cardElement = cardRefs.current[cardId];
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }

  function handleCardAction(identifier: string) {
    const updatedCards = state.activeCards.includes(identifier)
      ? state.activeCards.filter((card) => card !== identifier)
      : [...state.activeCards, identifier];
    scrollToCard(identifier);
    dispatch(actions.refreshActiveCards(updatedCards));
  }

  function itemCardClickHandler(item) {
    navigate(
      `${ApiUrlEnum.PRODUCTS}${ApiUrlEnum.PRODUCT_BASIC_DATA}/${item.productId}`,
    );
  }

  function onSubmitProductDataHandler(data: any) {
    if (productId) {
      service.updateProductHandler(productId, data).then((res) => {
        if (res.data) {
          productsService
            .getTheProductsForGridHandler(productsState.gridRequestModel)
            .then((res: GridModel) => {
              dispatch(actions.refreshProducts(res.items));
            });
          addToast({
            text: "Product updated successfully",
            type: "success",
          });
          service
            .getProductDetailsHandler(productId)
            .then((res: ProductModel) => {
              dispatch(actions.refreshProduct(res));
            });
        } else {
          addToast({
            text: `${res.error.data.detail}`,
            type: "error",
          });
        }
      });
    } else {
      service.createNewProductHandler(data).then((res) => {
        if (res.data) {
          dispatch(actions.refreshProduct(res.data));
          productsService
            .getTheProductsForGridHandler(productsState.gridRequestModel)
            .then((res: GridModel) => {
              dispatch(productsActions.refreshProductsGridModel(res));
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
  }

  return (
    <div className={cs.createProductPage}>
      {state.products?.length > 0 && (
        <ItemsCard
          title="Products"
          data={state.products}
          selectedItem={productId}
          onAction={itemCardClickHandler}
        />
      )}
      <ProductMenuCard
        title={productId ? "Manage Product" : "Create Product"}
        productCounter={state.productCounter}
        onAction={handleCardAction}
        productId={Number(productId)}
        activeCards={state.activeCards}
      />
      <ProductConfigurationCard
        product={state.product}
        brandsList={state.brandsList}
        categoriesList={state.categoriesList}
        onGenerateProductCode={service.generateProductCodeHandler}
        onProductCodeChange={service.checkProductCodeHandler}
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
            onSecondaryButtonClick={() =>
              handleCardAction("createCategoryCard")
            }
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
            onSecondaryButtonClick={() => handleCardAction("createBrandCard")}
          />
        </div>
      )}
    </div>
  );
}
