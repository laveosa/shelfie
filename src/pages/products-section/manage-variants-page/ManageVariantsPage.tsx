import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { useToast } from "@/hooks/useToast.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import cs from "@/pages/products-section/product-basic-data-page/ProductBasicDataPage.module.scss";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import useManageVariantsPageService from "@/pages/products-section/manage-variants-page/useManageVariantsPageService.ts";
import { IManageVariantsPageSlice } from "@/const/interfaces/store-slices/IManageVariantsPageSlice.ts";
import { ManageVariantsPageSliceActions as actions } from "@/state/slices/ManageVariantsPageSlice.ts";
import ManageVariantsCard from "@/components/complex/custom-cards/manage-variants-card/ManageVariantsCard.tsx";
import ChooseVariantTraitsCard from "@/components/complex/custom-cards/choose-variant-traits-card/ChooseVariantTraitsCard.tsx";
import CreateProductTraitCard from "@/components/complex/custom-cards/create-product-trait-card/CreateProductTraitCard.tsx";

export function ManageVariantsPage() {
  const dispatch = useAppDispatch();
  const service = useManageVariantsPageService();
  const state = useAppSelector<IManageVariantsPageSlice>(
    StoreSliceEnum.MANAGE_VARIANTS,
  );
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { productId } = useParams();

  useEffect(() => {
    service
      .getVariantsForGridHandler(state.gridRequestModel)
      .then((res: GridModel) => {
        dispatch(actions.refreshVariants(res ? res.items : []));
      });

    service.getListOfTypesOfTraitsHandler().then((res) => {
      console.log("TYPES", res);
      dispatch(actions.refreshTypesOfTraits(res));
    });

    service
      .getCountersForProductsHandler(productId)
      .then((res: ProductCounterModel) => {
        dispatch(actions.refreshProductCounter(res));
      });
  }, [productId]);

  function handleCardAction(identifier: string) {
    const updatedCards = state.activeCards.includes(identifier)
      ? state.activeCards.filter((card) => card !== identifier)
      : [...state.activeCards, identifier];
    dispatch(actions.refreshActiveCards(updatedCards));
  }

  function itemCardClickHandler(item) {
    navigate(
      `${ApiUrlEnum.PRODUCTS}${ApiUrlEnum.PRODUCT_BASIC_DATA}/${item.productId}`,
    );
  }

  // function onSubmitProductDataHandler(data: any) {
  //   service.createNewProductHandler(data).then((res) => {
  //     if (res.data) {
  //       dispatch(actions.refreshProduct(res.data));
  //       productsService
  //         .getTheProductsForGridHandler(productsState.gridRequestModel)
  //         .then((res: GridModel) => {
  //           dispatch(productsActions.refreshProductsGridModel(res));
  //         });
  //       navigate(
  //         `${ApiUrlEnum.PRODUCTS}${ApiUrlEnum.PRODUCT_BASIC_DATA}/${res.data.productId}`,
  //       );
  //       addToast({
  //         text: "Product created successfully",
  //         type: "success",
  //       });
  //     } else {
  //       addToast({
  //         text: `${res.error.data.detail}`,
  //         type: "error",
  //       });
  //     }
  //   });
  // }

  // function onAction(data) {
  //   console.log(data);
  // }

  function onDndItem(_newIndex, _activeItem) {
    // service
    //   .putPhotoInNewPositionHandler(productId, activeItem.photoId, newIndex)
    //   .then(() => {
    //     productsService
    //       .getTheProductsForGridHandler(productsState.gridRequestModel)
    //       .then((res: GridModel) => {
    //         dispatch(actions.refreshProducts(res.items));
    //       });
    //   });
  }

  function onDeleteItem(_data) {
    // service.deletePhotoHandler(data.photoId).then(() => {
    //   service.getProductPhotosHandler(Number(productId)).then((res) => {
    //     dispatch(actions.refreshProductPhotos(res));
    //   });
    //   service
    //     .getCountersForProductsHandler(productId)
    //     .then((res: ProductCounterModel) => {
    //       dispatch(actions.refreshProductCounter(res));
    //     });
    //   productsService
    //     .getTheProductsForGridHandler(productsState.gridRequestModel)
    //     .then((res: GridModel) => {
    //       dispatch(actions.refreshProducts(res.items));
    //     });
    // });
  }

  function onAction(actionType: string, payload: any) {
    switch (actionType) {
      case "submit":
        console.log(payload);
        break;
      case "dnd":
        console.log(payload);
        break;
      case "delete":
        console.log(payload);
        break;
    }
  }

  return (
    <div className={cs.createProductPage}>
      {state.variants?.length > 0 && (
        <ItemsCard
          data={state.variants}
          selectedItem={productId}
          onAction={itemCardClickHandler}
        />
      )}
      <ProductMenuCard
        title={productId ? "Manage Variant" : "Create Variant"}
        productCounter={state.productCounter}
        onAction={handleCardAction}
        productId={Number(productId)}
        activeCards={state.activeCards}
      />
      <ManageVariantsCard
        traits={state.traits}
        onChooseVariantTraits={() =>
          handleCardAction("chooseVariantTraitsCard")
        }
      />
      {state.activeCards.includes("chooseVariantTraitsCard") && (
        <ChooseVariantTraitsCard
          onAddTrait={() => handleCardAction("createProductTraitCard")}
          onSecondaryButtonClick={() => handleCardAction("createCategoryCard")}
        />
      )}
      {state.activeCards.includes("createProductTraitCard") && (
        <CreateProductTraitCard
          data={state.variants}
          typesOfTraits={state.typesOfTraits}
          onSecondaryButtonClick={() =>
            handleCardAction("createProductTraitCard")
          }
          onAction={onAction}
        />
      )}
    </div>
  );
}
