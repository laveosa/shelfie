import { useNavigate, useParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect } from "react";

import {
  clearSelectedGridItems,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";
import cs from "./SupplierPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPageSlice } from "@/const/interfaces/store-slices/ISupplierPageSlice.ts";
import useSupplierPageService from "@/pages/products-section/supplier-page/useSupplierPageService.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { SupplierPageSliceActions as actions } from "@/state/slices/SupplierPageSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import SupplierCard from "@/components/complex/custom-cards/supplier-card/SupplierCard.tsx";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import SupplierConfigurationCard from "@/components/complex/custom-cards/supplier-configuration-card/SupplierConfigurationCard.tsx";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { useToast } from "@/hooks/useToast.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { SuppliersListGridColumns } from "@/components/complex/grid/suppliers-list-grid/SuppliersListGridColumns.tsx";
import { DataWithId } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";

export function SupplierPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<ISupplierPageSlice>(StoreSliceEnum.SUPPLIER);
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const service = useSupplierPageService();
  const productsService = useProductsPageService();
  const navigate = useNavigate();
  const { purchaseId } = useParams();
  const { addToast } = useToast();
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) => state[StoreSliceEnum.SUPPLIER].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const { openConfirmationDialog } = useDialogService();

  useEffect(() => {
    if (purchaseId) {
      dispatch(actions.setIsSupplierCardLoading(true));
      dispatch(actions.setIsProductMenuCardLoading(true));
      productsService
        .getPurchaseDetailsHandler(purchaseId)
        .then((res: PurchaseModel) => {
          dispatch(actions.setIsSupplierCardLoading(false));
          dispatch(
            productsActions.refreshSelectedSupplier({
              ...res.supplier,
              locationId: res.location?.locationId,
            }),
          );
        });
      productsService
        .getPurchaseCountersHandler(Number(purchaseId))
        .then(() => dispatch(actions.setIsProductMenuCardLoading(false)));
      if (!productsState.countryCodeList) {
        productsService.getCountryCodeHandler();
      }
    }
    dispatch(productsActions.resetPurchaseCounters());
    dispatch(actions.refreshActiveCards([]));
    dispatch(productsActions.refreshActiveTab("purchases"));
  }, [purchaseId]);

  async function onAction(actionType: string, payload) {
    switch (actionType) {
      case "createPurchase":
        dispatch(actions.setIsSupplierCardLoading(true));
        service
          .createPurchaseForSupplierHandler({
            date: payload.selectedDate,
            supplierId: payload.selectedSupplier.supplierId,
            documentNotes: payload.purchaseNotes,
          })
          .then((res) => {
            dispatch(actions.setIsSupplierCardLoading(false));
            productsService.getPurchaseCountersHandler(res.purchaseId);
            navigate(
              `${NavUrlEnum.PRODUCTS}${NavUrlEnum.PURCHASE_PRODUCTS}/${res.purchaseId}`,
            );
            if (res) {
              addToast({
                text: "Purchase created successfully",
                type: "success",
              });
            } else {
              addToast({
                text: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "updatePurchase":
        dispatch(actions.setIsSupplierCardLoading(true));
        service
          .updatePurchaseForSupplierHandler(payload.purchaseId, {
            date: payload.selectedDate,
            supplierId: payload.selectedSupplier.supplierId,
            documentNotes: payload.purchaseNotes,
          })
          .then((res) => {
            dispatch(actions.setIsSupplierCardLoading(false));
            if (res) {
              addToast({
                text: "Purchase updated successfully",
                type: "success",
              });
            } else {
              addToast({
                text: res.error.detail.message,
                type: "error",
              });
            }
          });
        break;
      case "detachSupplier":
        handleCardAction("selectEntityCard", true);

        function markSelectedSupplier(suppliers: SupplierModel[]) {
          const updatedSuppliers = suppliers.map((supplier) =>
            supplier.supplierId === productsState.selectedSupplier.supplierId
              ? { ...supplier, isSelected: true }
              : { ...supplier, isSelected: false },
          );
          dispatch(actions.refreshSuppliersWithLocations(updatedSuppliers));
        }

        if (state.suppliersWithLocations === null) {
          dispatch(actions.setIsSelectSupplierCardLoading(true));
          dispatch(actions.setIsSuppliersGridLoading(true));
          service.getListOfSuppliersForGridHandler({}).then((res) => {
            dispatch(actions.setIsSelectSupplierCardLoading(false));
            dispatch(actions.setIsSuppliersGridLoading(false));
            markSelectedSupplier(res.items);
          });
        } else {
          markSelectedSupplier(state.suppliersWithLocations);
        }
        break;
      case "openSelectEntityCard":
        dispatch(productsActions.resetSelectedSupplier());
        handleCardAction("selectEntityCard", true);
        if (!productsState.countryCodeList) {
          productsService.getCountryCodeHandler().then(() => {});
        }
        dispatch(actions.setIsSelectSupplierCardLoading(true));
        dispatch(actions.setIsSuppliersGridLoading(true));
        service.getListOfSuppliersForGridHandler({}).then(() => {
          dispatch(actions.setIsSelectSupplierCardLoading(false));
          dispatch(actions.setIsSuppliersGridLoading(false));
        });
        break;
      case "openCreateEntityCard":
        dispatch(actions.resetManagedSupplier(null));
        handleCardAction("supplierConfigurationCard", true);
        break;
      case "createSupplier":
        dispatch(actions.setIsSupplierConfigurationCardLoading(true));
        service.createSupplierHandler(payload).then((res) => {
          dispatch(actions.setIsSupplierConfigurationCardLoading(false));
          if (res) {
            handleCardAction("supplierConfigurationCard");
            payload.uploadModels.map((model) => {
              model.contextId = res.supplierId;
              dispatch(actions.setIsPhotoUploaderLoading(true));
              productsService.uploadPhotoHandler(model).then((res) => {
                dispatch(actions.setIsPhotoUploaderLoading(false));
                if (res) {
                  addToast({
                    text: "Image successfully added",
                    type: "success",
                  });
                } else {
                  addToast({
                    text: res.error.message,
                    type: "error",
                  });
                }
              });
            });
            service.getListOfSuppliersHandler().then((res) => {
              dispatch(actions.refreshSuppliers(res));
            });
            addToast({
              text: "Supplier created successfully",
              type: "success",
            });
          } else {
            addToast({
              text: res?.error?.data.detail,
              type: "error",
            });
          }
        });
        break;
      case "searchEntity":
        dispatch(actions.setIsSelectSupplierCardLoading(true));
        service
          .getListOfSuppliersForGridHandler({ searchQuery: payload })
          .then(() => {
            dispatch(actions.setIsSelectSupplierCardLoading(false));
          });
        break;
      case "selectSupplier":
        handleCardAction("selectEntityCard");
        dispatch(productsActions.refreshSelectedSupplier(payload));
        break;
      case "manageSupplier":
        handleCardAction("supplierConfigurationCard", true);
        dispatch(actions.setIsSupplierConfigurationCardLoading(true));
        service
          .getSupplierDetailsHandler(payload.supplierId, payload.locationId)
          .then((res) => {
            dispatch(actions.setIsSupplierConfigurationCardLoading(false));
            dispatch(actions.refreshManagedSupplier(res));
          });
        dispatch(
          actions.refreshSuppliersWithLocations(
            setSelectedGridItem(
              payload.supplierId,
              state.suppliersWithLocations,
              "supplierId",
            ),
          ),
        );
        break;
      case "updateSupplier":
        dispatch(actions.setIsSupplierConfigurationCardLoading(true));
        service
          .updateSupplierHandler(
            payload,
            state.managedSupplier.supplierId,
            state.managedSupplier.locationId,
          )
          .then((res) => {
            dispatch(actions.setIsSupplierConfigurationCardLoading(false));
            if (!res.error) {
              dispatch(actions.setIsPhotoUploaderLoading(true));

              const uploadPromises = payload.uploadModels.map((model) => {
                model.contextId = res.supplierId;
                return productsService.uploadPhotoHandler(model);
              });

              Promise.all(uploadPromises).then((results) => {
                results.forEach((res) => {
                  dispatch(actions.setIsPhotoUploaderLoading(false));
                  if (res && !res.error) {
                    service
                      .getSupplierDetailsHandler(
                        state.managedSupplier.supplierId,
                        state.managedSupplier.locationId,
                      )
                      .then((res) => {
                        dispatch(actions.refreshManagedSupplier(res));
                      });
                    service.getListOfSuppliersForGridHandler({});
                    if (
                      productsState.selectedSupplier.supplierId ===
                      state.managedSupplier.supplierId
                    ) {
                      productsService
                        .getPurchaseDetailsHandler(purchaseId)
                        .then((res: PurchaseModel) => {
                          dispatch(
                            productsActions.refreshSelectedSupplier({
                              ...res.supplier,
                              locationId: res.location.locationId,
                            }),
                          );
                        });
                    }
                    dispatch(actions.setIsPhotoUploaderLoading(false));
                    addToast({
                      text: "Image successfully added",
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
              addToast({
                text: "Supplier updated successfully",
                type: "success",
              });
            } else {
              addToast({
                text: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "deleteSupplier":
        const confirmedSupplierDeleting = await openConfirmationDialog({
          headerTitle: "Deleting supplier",
          text: `You are about to delete supplier ${payload.traitName}.`,
          primaryButtonValue: "Delete",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmedSupplierDeleting) return;

        dispatch(actions.setIsSupplierCardLoading(true));
        productsService
          .deleteSupplierHandler(payload.supplierId)
          .then((res) => {
            dispatch(actions.setIsSupplierCardLoading(false));
            if (!res.error) {
              dispatch(
                actions.refreshSuppliersWithLocations(
                  state.suppliersWithLocations.filter(
                    (s) => s.supplierId !== payload.supplierId,
                  ),
                ),
              );
              handleCardAction("supplierConfigurationCard");
              service
                .getSupplierDetailsHandler(
                  payload.supplierId,
                  payload.locationId,
                )
                .then((res) => {
                  dispatch(actions.refreshManagedSupplier(res));
                });
              if (
                productsState.selectedSupplier.supplierId === payload.supplierId
              ) {
                productsService
                  .getPurchaseDetailsHandler(purchaseId)
                  .then((res: PurchaseModel) => {
                    dispatch(
                      productsActions.refreshSelectedSupplier({
                        ...res.supplier,
                        locationId: res.location.locationId,
                      }),
                    );
                  });
              }
              addToast({
                text: "Supplier deleted successfully",
                type: "success",
              });
            } else {
              addToast({
                text: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "restoreSupplier":
        dispatch(actions.setIsSupplierCardLoading(true));
        productsService
          .restoreSupplierHandler(payload.supplierId)
          .then((res) => {
            dispatch(actions.setIsSupplierCardLoading(false));
            if (!res.error) {
              service
                .getSupplierDetailsHandler(
                  payload.supplierId,
                  payload.locationId,
                )
                .then((res) => {
                  dispatch(actions.refreshManagedSupplier(res));
                });
              if (
                productsState.selectedSupplier.supplierId === payload.supplierId
              ) {
                productsService
                  .getPurchaseDetailsHandler(purchaseId)
                  .then((res: PurchaseModel) => {
                    dispatch(
                      productsActions.refreshSelectedSupplier({
                        ...res.supplier,
                        locationId: res.location.locationId,
                      }),
                    );
                  });
              }
              addToast({
                text: "Supplier restored successfully",
                type: "success",
              });
            } else {
              addToast({
                text: res.error.message,
                type: "error",
              });
            }
          });
        break;
      case "deleteSupplierPhoto":
        const confirmed = await openConfirmationDialog({
          headerTitle: "Deleting supplier photo",
          text: "You are about to delete supplier photo.",
          primaryButtonValue: "Delete",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmed) {
        } else {
          payload.table.options.meta?.hideRow(payload.row.original.id);
          await productsService
            .deletePhotoHandler(payload.row.original.photoId)
            .then(() => {
              dispatch(actions.setIsSupplierPhotosGridLoading(false));
              if (
                productsState.selectedSupplier.supplierId ===
                state.managedSupplier.supplierId
              ) {
                productsService
                  .getPurchaseDetailsHandler(purchaseId)
                  .then((res: PurchaseModel) => {
                    dispatch(
                      productsActions.refreshSelectedSupplier({
                        ...res.supplier,
                        locationId: res.location.locationId,
                      }),
                    );
                  });
              }
              service.getListOfSuppliersForGridHandler({});
              addToast({
                text: "Photo deleted successfully",
                type: "success",
              });
            });
        }
        break;
      case "dndSupplierPhoto":
        service
          .changePositionOfSupplierPhotoHandler(
            state.managedSupplier.supplierId,
            payload.activeItem.photoId,
            payload.newIndex,
          )
          .then((res) => {
            if (!res.error) {
              productsService.getPurchaseDetailsHandler(purchaseId);
            }
          });
        break;
      case "closeSupplierCard":
        navigate(NavUrlEnum.PRODUCTS);
        dispatch(actions.refreshActiveCards([]));
        break;
      case "closeSelectEntityCard":
        handleCardAction("selectEntityCard");
        break;
      case "closeSupplierConfigurationCard":
        handleCardAction("supplierConfigurationCard");
        dispatch(actions.resetManagedSupplier());
        dispatch(
          actions.refreshSuppliersWithLocations(
            clearSelectedGridItems(state.suppliersWithLocations),
          ),
        );
        break;
      case "openManageSupplierCard":
        break;
    }
  }

  return (
    <div className={cs.supplierPage}>
      <ProductMenuCard
        isLoading={state.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        itemId={Number(purchaseId)}
        counter={productsState.purchaseCounters}
      />
      <SupplierCard
        isLoading={state.isSupplierCardLoading}
        selectedPurchase={productsState.selectedPurchase}
        selectedSupplier={productsState.selectedSupplier}
        onAction={onAction}
      />
      {state.activeCards?.includes("selectEntityCard") && (
        <div ref={createRefCallback("selectEntityCard")}>
          <SelectEntityCard
            isLoading={state.isSelectSupplierCardLoading}
            isGridLoading={state.isSuppliersGridLoading}
            entityName="Supplier"
            entityCollection={state.suppliersWithLocations}
            columns={
              SuppliersListGridColumns({
                onAction,
              }) as ColumnDef<DataWithId>[]
            }
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards?.includes("supplierConfigurationCard") && (
        <div ref={createRefCallback("supplierConfigurationCard")}>
          <SupplierConfigurationCard
            isLoading={state.isSupplierConfigurationCardLoading}
            isSupplierPhotosGridLoading={state.isSupplierPhotosGridLoading}
            isPhotoUploaderLoading={state.isPhotoUploaderLoading}
            countryList={productsState.countryCodeList}
            managedSupplier={state.managedSupplier}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
}
