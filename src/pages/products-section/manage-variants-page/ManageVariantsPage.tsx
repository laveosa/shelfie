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
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";
import AddVariantCard from "@/components/complex/custom-cards/add-variant-card/AddVariantCard.tsx";
import VariantConfigurationCard from "@/components/complex/custom-cards/variant-configuration-card/VariantConfigurationCard.tsx";

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

    service.getProductVariantsHandler(productId).then((res) => {
      dispatch(actions.refreshProductVariants(res));
    });

    service.getListOfTypesOfTraitsHandler().then((res) => {
      dispatch(actions.refreshTypesOfTraits(res));
    });

    service
      .getCountersForProductsHandler(productId)
      .then((res: ProductCounterModel) => {
        dispatch(actions.refreshProductCounter(res));
      });
    service
      .getListOfTraitsWithOptionsForProductHandler(productId)
      .then((traits) => {
        dispatch(actions.refreshListOfTraitsWithOptionsForProduct(traits));
        let sizes: TraitOptionModel[] = [];
        let colors: TraitOptionModel[] = [];

        traits.forEach((trait) => {
          if (trait.traitTypeId === 1) {
            sizes = [...sizes, ...trait.traitOptions];
            dispatch(actions.refreshSizes(sizes));
          } else if (trait.traitTypeId === 2) {
            colors = [...colors, ...trait.traitOptions];
            dispatch(actions.refreshColors(colors));
          }
        });
      });
  }, [productId]);

  useEffect(() => {
    service.getListOfAllTraitsHandler().then((res) => {
      dispatch(actions.refreshTraits(res));
    });
  }, [state.selectedTrait]);

  function handleCardAction(identifier: string, forceOpen: boolean = false) {
    let updatedCards: string[];

    if (forceOpen) {
      updatedCards = state.activeCards.includes(identifier)
        ? state.activeCards
        : [...state.activeCards, identifier];
    } else {
      updatedCards = state.activeCards.filter((card) => card !== identifier);
    }

    dispatch(actions.refreshActiveCards(updatedCards));
  }

  function itemCardClickHandler(item) {
    navigate(
      `${ApiUrlEnum.PRODUCTS}${ApiUrlEnum.PRODUCT_BASIC_DATA}/${item.productId}`,
    );
  }

  function onAction(actionType: string, payload: any) {
    switch (actionType) {
      case "openAddVariantCard":
        console.log(payload);
        handleCardAction("addVariantCard", true);
        break;
      case "openChooseVariantTraitsCard":
        console.log(payload);
        handleCardAction("chooseVariantTraitsCard", true);
        break;
      case "addVariant":
        console.log(payload);
        service.createVariantHandler(productId, payload).then((res) => {
          console.log("RES", res);
        });
        // handleCardAction("productTraitConfigurationCard", true);
        // dispatch(actions.refreshSelectedTrait({}));
        break;
      case "addTrait":
        handleCardAction("productTraitConfigurationCard", true);
        dispatch(actions.refreshSelectedTrait({}));
        break;
      case "manageTrait":
        Promise.all([
          service.getTraitHandler(payload),
          service.getOptionsForTraitHandler(payload),
        ]).then(([trait, options]) => {
          dispatch(actions.refreshSelectedTrait(trait));
          dispatch(
            actions.refreshColorOptionsGridModel({
              ...state.colorOptionsGridModel,
              items: options.filter((option) => !option.isDeleted),
            }),
          );
          handleCardAction("productTraitConfigurationCard", true);
        });
        break;
      case "deleteTrait":
        console.log("deleteTrait", payload);
        break;
      case "createTrait":
        service.createNewTraitHandler(payload).then((res) => {
          if (res) {
            dispatch(actions.refreshSelectedTrait(res));
            const index = 0;
            const optionData = {
              optionName: `Default option ${index + 1}`,
              ...(res.traitTypeId !== 1 && { optionColor: "#fff" }),
            };
            service
              .createNewOptionForTraitHandler(res.traitId, optionData)
              .then((optionRes) => {
                if (optionRes) {
                  dispatch(
                    actions.refreshColorOptionsGridModel({
                      ...state.colorOptionsGridModel,
                      items: [
                        ...(state.colorOptionsGridModel.items || []),
                        optionRes,
                      ],
                    }),
                  );
                }
              });
          }
        });
        break;
      case "setProductTraits":
        dispatch(actions.refreshSelectedTraitsIds(payload));
        service.setProductTraitsHandler(productId, payload).then(() => {
          handleCardAction("productTraitConfigurationCard", false);
          service
            .getListOfTraitsWithOptionsForProductHandler(productId)
            .then((traits) => {
              dispatch(
                actions.refreshListOfTraitsWithOptionsForProduct(traits),
              );
              let sizes: TraitOptionModel[] = [];
              let colors: TraitOptionModel[] = [];

              traits.forEach((trait) => {
                if (trait.traitTypeId === 1) {
                  sizes = [...sizes, ...trait.traitOptions];
                  dispatch(actions.refreshSizes(sizes));
                } else if (trait.traitTypeId === 2) {
                  colors = [...colors, ...trait.traitOptions];
                  dispatch(actions.refreshColors(colors));
                }
              });
            });
        });
        break;
      case "dnd":
        console.log("DnD action:", payload);
        break;
      case "delete":
        service.deleteOptionsForTraitHandler(payload.optionId).then((res) => {
          if (res) {
            service
              .getOptionsForTraitHandler(state.selectedTrait.traitId)
              .then((res) => {
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
        service
          .updateOptionsForTraitHandler(payload.optionId, payload.updatedModel)
          .then((res) => {
            if (res) {
              service
                .getOptionsForTraitHandler(state.selectedTrait.traitId)
                .then((res) => {
                  console.log("RES", res);
                  dispatch(
                    actions.refreshColorOptionsGridModel({
                      ...state.colorOptionsGridModel,
                      items: res,
                    }),
                  );
                });
            }
          });
        break;
      case "addOption":
        service
          .createNewOptionForTraitHandler(state.selectedTrait.traitId, {
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
      case "deleteOption":
        service.deleteOptionsForTraitHandler(payload.optionId).then(() => {
          service
            .getOptionsForTraitHandler(state.selectedTrait.traitId)
            .then((options) => {
              const updatedItems = (options || []).filter(
                (option) => !option.isDeleted,
              );
              dispatch(
                actions.refreshColorOptionsGridModel({
                  ...state.colorOptionsGridModel,
                  items: updatedItems,
                }),
              );
            });
        });
        break;
      case "closeProductTraitConfigurationCard":
        handleCardAction("productTraitConfigurationCard");
        break;
      case "closeAddVariantCard":
        handleCardAction("addVariantCard");
        break;
    }
  }

  return (
    <div className={cs.createProductPage}>
      {state.variants?.length > 0 && (
        <ItemsCard
          title="Variants"
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
        variants={state.productVariants}
        traits={state.listOfTraitsWithOptionsForProduct}
        onAction={onAction}
      />
      <VariantConfigurationCard variant={state.selectedVariant} />
      {state.activeCards.includes("addVariantCard") && (
        <AddVariantCard
          onAction={onAction}
          colors={state.colors}
          sizes={state.sizes}
        />
      )}
      {state.activeCards.includes("chooseVariantTraitsCard") && (
        <ChooseVariantTraitsCard
          items={state.traits}
          selectedItems={state.listOfTraitsWithOptionsForProduct}
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
