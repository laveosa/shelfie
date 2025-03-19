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
import ProductTraitConfigurationCard from "@/components/complex/custom-cards/product-trait-configuration-card/ProductTraitConfigurationCard.tsx";

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
      dispatch(actions.refreshTypesOfTraits(res));
    });

    service.getListOfAllTraitsHandler().then((res) => {
      dispatch(actions.refreshTraits(res));
    });

    service
      .getCountersForProductsHandler(productId)
      .then((res: ProductCounterModel) => {
        dispatch(actions.refreshProductCounter(res));
      });
  }, [productId]);

  function handleCardAction(identifier: string, forceOpen: boolean = false) {
    const updatedCards = forceOpen
      ? [...new Set([...state.activeCards, identifier])] // Ensure card is open
      : state.activeCards.includes(identifier)
        ? state.activeCards.filter((card) => card !== identifier)
        : [...state.activeCards, identifier];
    dispatch(actions.refreshActiveCards(updatedCards));
  }

  function itemCardClickHandler(item) {
    navigate(
      `${ApiUrlEnum.PRODUCTS}${ApiUrlEnum.PRODUCT_BASIC_DATA}/${item.productId}`,
    );
  }

  function onAction(actionType: string, payload: any) {
    switch (actionType) {
      case "addTrait":
        handleCardAction("productTraitConfigurationCard", true);
        dispatch(actions.refreshSelectedTrait({}));
        break;
      case "manageTrait":
        console.log("manageTrait", payload);
        Promise.all([
          service.getTraitHandler(payload),
          service.getOptionsForTraitHandler(payload),
        ]).then(([traitRes, optionsRes]) => {
          dispatch(actions.refreshSelectedTrait(traitRes));
          dispatch(
            actions.refreshColorOptionsGridModel({
              ...state.colorOptionsGridModel,
              items: optionsRes,
            }),
          );
          handleCardAction("productTraitConfigurationCard", true);
        });
        break;
      case "deleteTrait":
        console.log("deleteTrait", payload);
        // Promise.all([
        //   service.getTraitHandler(payload),
        //   service.getOptionsForTraitHandler(payload),
        // ]).then(([traitRes, optionsRes]) => {
        //   dispatch(actions.refreshSelectedTrait(traitRes));
        //   dispatch(
        //     actions.refreshColorOptionsGridModel({
        //       ...state.colorOptionsGridModel,
        //       items: optionsRes,
        //     }),
        //   );
        //   handleCardAction("productTraitConfigurationCard", true);
        // });
        break;
      case "submit":
        service.createNewTraitHandler(payload).then((res) => {
          if (res) {
            const index = 0;
            dispatch(actions.refreshSelectedTrait(res));
            service
              .createNewOptionForTraitHandler(res.traitId, {
                optionColor: "#fff",
                optionName: `Default option ${index + 1}`,
              })
              .then((res) => {
                if (res) {
                  console.log("RES", res);
                  dispatch(
                    actions.refreshColorOptionsGridModel({
                      ...state.colorOptionsGridModel,
                      items: [
                        ...(state.colorOptionsGridModel?.items || []),
                        res,
                      ],
                    }),
                  );
                }
              });
          }
        });
        break;
      case "dnd":
        console.log("DnD action:", payload);
        break;
      case "delete":
        service.deleteOptionsForTraitHandler(payload.optionId).then((res) => {
          if (res) {
            service.getOptionsForTraitHandler(state.traitId).then((res) => {
              dispatch(
                actions.refreshColorOptionsGridModel({
                  ...state.colorOptionsGridModel,
                  items: [res],
                }),
              );
            });
          }
        });
        break;
      case "updateOption":
        console.log("Update option:", payload);
        service
          .updateOptionsForTraitHandler(payload.optionId, payload.updatedModel)
          .then((res) => {
            if (res) {
              service.getOptionsForTraitHandler(state.traitId).then((res) => {
                dispatch(
                  actions.refreshColorOptionsGridModel({
                    ...state.colorOptionsGridModel,
                    items: [res],
                  }),
                );
              });
            }
          });
        break;
      case "addOption":
        service
          .createNewOptionForTraitHandler(state.traitId, {
            optionColor: "#fff",
            optionName: "Default option",
          })
          .then((res) => {
            if (res) {
              dispatch(
                actions.refreshColorOptionsGridModel({
                  ...state.colorOptionsGridModel,
                  items: [...state.colorOptionsGridModel.items, res],
                }),
              );
            }
          });
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
          items={state.traits}
          onAction={onAction}
          onSecondaryButtonClick={() =>
            handleCardAction("chooseVariantTraitsCard")
          }
        />
      )}
      {state.activeCards.includes("productTraitConfigurationCard") && (
        <ProductTraitConfigurationCard
          data={state.colorOptionsGridModel}
          selectedTrait={state.selectedTrait}
          typesOfTraits={state.typesOfTraits}
          onSecondaryButtonClick={() =>
            handleCardAction("productTraitConfigurationCard")
          }
          onAction={onAction}
        />
      )}
    </div>
  );
}
