import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast.ts";
import { useTranslation } from "react-i18next";

import {
  clearSelectedGridItems,
  setSelectedGridItem,
} from "@/utils/helpers/quick-helper.ts";
import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";
import { SupplierPageSliceActions as actions } from "@/state/slices/SupplierPageSlice.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPageSlice } from "@/const/interfaces/store-slices/ISupplierPageSlice.ts";
import SuppliersApiHooks from "@/utils/services/api/SuppliersApiService.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";

export default function useSupplierPageService(handleCardAction) {
  const productsService = useProductsPageService();
  const state = useAppSelector<ISupplierPageSlice>(StoreSliceEnum.SUPPLIER);
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t } = useTranslation();
  const { openConfirmationDialog } = useDialogService();

  const [createPurchaseForSupplier] =
    PurchasesApiHooks.useCreatePurchaseForSupplierMutation();
  const [updatePurchaseForSupplier] =
    PurchasesApiHooks.useUpdatePurchaseForSupplierMutation();
  const [getListOfSuppliers] =
    SuppliersApiHooks.useLazyGetListOfSuppliersQuery();
  const [getListOfSuppliersForGrid] =
    SuppliersApiHooks.useGetListOfSuppliersForGridMutation();
  const [getSupplierDetails] =
    SuppliersApiHooks.useLazyGetSupplierDetailsQuery();
  const [createSupplier] = SuppliersApiHooks.useCreateSupplierMutation();
  const [updateSupplier] = SuppliersApiHooks.useUpdateSupplierMutation();
  const [changePositionOfSupplierPhoto] =
    SuppliersApiHooks.useChangePositionOfSupplierPhotoMutation();
  const [deletePurchase] = PurchasesApiHooks.useDeletePurchaseMutation();
  const [deleteSupplier] = SuppliersApiHooks.useDeleteSupplierMutation();
  const [restoreSupplier] = SuppliersApiHooks.useRestoreSupplierMutation();
  const [getPurchaseDetails] =
    PurchasesApiHooks.useLazyGetPurchaseDetailsQuery();

  function createPurchaseForSupplierHandler(model) {
    dispatch(actions.setIsSupplierCardLoading(true));
    return createPurchaseForSupplier({
      date: model.selectedDate,
      supplierId: model.selectedSupplier.supplierId,
      documentNotes: model.purchaseNotes,
    }).then((res: any) => {
      dispatch(actions.refreshPurchase(res.data));
      dispatch(actions.setIsSupplierCardLoading(false));
      productsService.getPurchaseCountersHandler(res.purchaseId);
      navigate(
        `${NavUrlEnum.PRODUCTS}${NavUrlEnum.PURCHASE_PRODUCTS}/${res.purchaseId}`,
      );
      if (res) {
        addToast({
          text: t("SuccessMessages.PurchaseCreated"),
          type: "success",
        });
      } else {
        addToast({
          text: res.error.message,
          type: "error",
        });
      }
    });
  }

  function updatePurchaseForSupplierHandler(purchaseId, model) {
    dispatch(actions.setIsSupplierCardLoading(true));
    return updatePurchaseForSupplier({ purchaseId, model }).then((res: any) => {
      dispatch(actions.refreshPurchase(res.data));
      dispatch(actions.setIsSupplierCardLoading(false));
      if (res) {
        addToast({
          text: t("SuccessMessages.PurchaseUpdated"),
          type: "success",
        });
      } else {
        addToast({
          text: res.error.detail.message,
          type: "error",
        });
      }
    });
  }

  function getListOfSuppliersHandler() {
    return getListOfSuppliers().then((res: any) => {
      dispatch(actions.refreshSuppliers(res.data));
      return res.data;
    });
  }

  function getListOfSuppliersForGridHandler(model) {
    return getListOfSuppliersForGrid(model).then((res: any) => {
      dispatch(actions.refreshSuppliersWithLocations(res.data.items));
      return res.data;
    });
  }

  function getSupplierDetailsHandler(supplierId, locationId) {
    return getSupplierDetails({ supplierId, locationId }).then((res: any) => {
      return res.data;
    });
  }

  function createSupplierHandler(model) {
    dispatch(actions.setIsSupplierConfigurationCardLoading(true));
    return createSupplier(model).then((res: any) => {
      dispatch(actions.setIsSupplierConfigurationCardLoading(false));
      if (res) {
        handleCardAction("supplierConfigurationCard");
        model.uploadModels.map((model) => {
          model.contextId = res.supplierId;
          dispatch(actions.setIsPhotoUploaderLoading(true));
          productsService.uploadPhotoHandler(model).then((res) => {
            dispatch(actions.setIsPhotoUploaderLoading(false));
            if (res) {
              addToast({
                text: t("SuccessMessages.ImageAdded"),
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
        getListOfSuppliersHandler().then((res: any) => {
          dispatch(actions.refreshSuppliers(res));
        });
        addToast({
          text: "Supplier created successfully",
          type: "success",
        });
      } else {
        addToast({
          text: res.error.data.detail,
          type: "error",
        });
      }
    });
  }

  function detachSupplierHandler() {
    handleCardAction("selectEntityCard", true);
    if (state.suppliersWithLocations === null) {
      dispatch(actions.setIsSelectSupplierCardLoading(true));
      dispatch(actions.setIsSuppliersGridLoading(true));
      getListOfSuppliersForGridHandler({}).then((res) => {
        dispatch(actions.setIsSelectSupplierCardLoading(false));
        dispatch(actions.setIsSuppliersGridLoading(false));
        markSelectedSupplier(res.items);
      });
    } else {
      markSelectedSupplier(state.suppliersWithLocations);
    }
  }

  function openSelectEntityCardHandler() {
    dispatch(productsActions.resetSelectedSupplier());
    handleCardAction("selectEntityCard", true);
    if (!productsState.countryCodeList) {
      productsService.getCountryCodeHandler().then(() => {});
    }
    dispatch(actions.setIsSelectSupplierCardLoading(true));
    dispatch(actions.setIsSuppliersGridLoading(true));
    getListOfSuppliersForGridHandler({}).then(() => {
      dispatch(actions.setIsSelectSupplierCardLoading(false));
      dispatch(actions.setIsSuppliersGridLoading(false));
    });
  }

  function searchEntityHandler(searchText: string) {
    dispatch(actions.setIsSelectSupplierCardLoading(true));
    getListOfSuppliersForGridHandler({ searchQuery: searchText }).then(() => {
      dispatch(actions.setIsSelectSupplierCardLoading(false));
    });
  }

  function openCreateEntityCardHandler() {
    dispatch(actions.resetManagedSupplier(null));
    handleCardAction("supplierConfigurationCard", true);
  }

  function selectSupplierHandler(model: SupplierModel) {
    handleCardAction("selectEntityCard");
    dispatch(productsActions.refreshSelectedSupplier(model));
  }

  function manageSupplierHandler(model: SupplierModel) {
    handleCardAction("supplierConfigurationCard", true);
    dispatch(actions.setIsSupplierConfigurationCardLoading(true));
    getSupplierDetailsHandler(model.supplierId, model.locationId).then(
      (res) => {
        dispatch(actions.setIsSupplierConfigurationCardLoading(false));
        dispatch(actions.refreshManagedSupplier(res));
      },
    );
    if (state.activeCards.includes("selectEntityCard")) {
      dispatch(
        actions.refreshSuppliersWithLocations(
          setSelectedGridItem(
            model.supplierId,
            state.suppliersWithLocations,
            "supplierId",
          ),
        ),
      );
    }
  }

  function updateSupplierHandler(model: any, purchaseId) {
    dispatch(actions.setIsSupplierConfigurationCardLoading(true));
    return updateSupplier({
      model,
      supplierId: state.managedSupplier.supplierId,
      locationId: state.managedSupplier.locationId,
    }).then((res: any) => {
      dispatch(actions.setIsSupplierConfigurationCardLoading(false));
      if (!res.error) {
        if (model.uploadModels) {
          dispatch(actions.setIsPhotoUploaderLoading(true));

          const uploadPromises = model.uploadModels.map((model) => {
            model.contextId = res.data.supplierId;
            return productsService.uploadPhotoHandler(model);
          });

          Promise.all(uploadPromises).then((results) => {
            results.forEach((res) => {
              dispatch(actions.setIsPhotoUploaderLoading(false));
              if (res && !res.error) {
                getSupplierDetailsHandler(
                  state.managedSupplier.supplierId,
                  state.managedSupplier.locationId,
                ).then((res) => {
                  dispatch(actions.refreshManagedSupplier(res));
                });
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
        }
        if (state.activeCards.includes("selectEntityCard")) {
          getListOfSuppliersForGridHandler({});
        }
        if (
          productsState.selectedSupplier.supplierId ===
          state.managedSupplier.supplierId
        ) {
          getPurchaseDetails(purchaseId).then((res: any) => {
            dispatch(productsActions.refreshSelectedPurchase(res.data));
            dispatch(
              productsActions.refreshSelectedSupplier({
                ...res.data.supplier,
                locationId: res.data.location.locationId,
              }),
            );
          });
        }
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
  }

  async function deleteSupplierHandler(model, purchaseId) {
    const confirmedSupplierDeleting = await openConfirmationDialog({
      headerTitle: "Deleting supplier",
      text: `You are about to delete supplier ${model.traitName}.`,
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedSupplierDeleting) return;

    dispatch(actions.setIsSupplierCardLoading(true));
    return deleteSupplier(model.supplierId).then((res: any) => {
      dispatch(actions.setIsSupplierCardLoading(false));
      if (!res.error) {
        handleCardAction("supplierConfigurationCard");
        if (state.activeCards.includes("selectEntityCard")) {
          dispatch(
            actions.refreshSuppliersWithLocations(
              state.suppliersWithLocations.filter(
                (supplier) => supplier.supplierId !== model.supplierId,
              ),
            ),
          );
        }
        if (productsState.selectedSupplier.supplierId === model.supplierId) {
          return getPurchaseDetails(purchaseId).then((res: any) => {
            dispatch(productsActions.refreshSelectedPurchase(res.data));
            dispatch(
              productsActions.refreshSelectedSupplier({
                ...res.data.supplier,
                locationId: res.data.location.locationId,
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
  }

  function restoreSupplierHandler(model, purchaseId) {
    dispatch(actions.setIsSupplierCardLoading(true));
    restoreSupplier(model.supplierId).then((res: any) => {
      dispatch(actions.setIsSupplierCardLoading(false));
      if (!res.error) {
        getSupplierDetailsHandler(model.supplierId, model.locationId).then(
          (res) => {
            dispatch(actions.refreshManagedSupplier(res));
          },
        );
        if (productsState.selectedSupplier.supplierId === model.supplierId) {
          return getPurchaseDetails(purchaseId).then((res: any) => {
            dispatch(productsActions.refreshSelectedPurchase(res.data));
            dispatch(
              productsActions.refreshSelectedSupplier({
                ...res.data.supplier,
                locationId: res.data.location.locationId,
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
  }

  async function deleteSupplierPhotoHandler(model, purchaseId) {
    const confirmed = await openConfirmationDialog({
      headerTitle: "Deleting supplier photo",
      text: "You are about to delete supplier photo.",
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmed) {
    } else {
      model.table.options.meta?.hideRow(model.row.original.id);
      await productsService
        .deletePhotoHandler(model.row.original.photoId)
        .then(() => {
          dispatch(actions.setIsSupplierPhotosGridLoading(false));
          if (
            productsState.selectedSupplier.supplierId ===
            state.managedSupplier.supplierId
          ) {
            return getPurchaseDetails(purchaseId).then((res: any) => {
              dispatch(productsActions.refreshSelectedPurchase(res.data));
              dispatch(
                productsActions.refreshSelectedSupplier({
                  ...res.data.supplier,
                  locationId: res.data.location.locationId,
                }),
              );
            });
          }
          getListOfSuppliersForGridHandler({});
          addToast({
            text: "Photo deleted successfully",
            type: "success",
          });
        });
    }
  }

  function dndSupplierPhotoHandler(model) {
    return changePositionOfSupplierPhoto({
      supplierId: state.managedSupplier.supplierId,
      photoId: model.activeItem.photoId,
      index: model.newIndex,
    });
  }

  async function deletePurchaseHandler(model) {
    const confirmedDeletePurchase = await openConfirmationDialog({
      headerTitle: "Delete Purchase",
      text: `You are about to delete purchase "${model.purchaseId}".`,
      primaryButtonValue: "Delete",
      secondaryButtonValue: "Cancel",
    });

    if (!confirmedDeletePurchase) {
    } else {
      await deletePurchase(model.purchaseId).then((res: any) => {
        if (!res.error) {
          navigate(NavUrlEnum.PRODUCTS);
          addToast({
            text: "Purchase deleted successfully",
            type: "success",
          });
        } else {
          addToast({
            text: res.error.data.detail,
            type: "error",
          });
        }
      });
    }
  }

  function closeSupplierCardHandler() {
    navigate(NavUrlEnum.PRODUCTS);
    dispatch(actions.refreshActiveCards([]));
  }

  function closeSelectEntityCardHandler() {
    handleCardAction("selectEntityCard");
  }

  function closeSupplierConfigurationCardHandler() {
    handleCardAction("supplierConfigurationCard");
    dispatch(actions.resetManagedSupplier());
    if (state.activeCards.includes("selectEntityCard")) {
      dispatch(
        actions.refreshSuppliersWithLocations(
          clearSelectedGridItems(state.suppliersWithLocations),
        ),
      );
    }
  }

  function getSupplierPageDataHandler(purchaseId) {
    if (purchaseId) {
      dispatch(actions.setIsSupplierCardLoading(true));
      dispatch(actions.setIsProductMenuCardLoading(true));
      getPurchaseDetails(purchaseId).then((res: any) => {
        dispatch(productsActions.refreshSelectedPurchase(res.data));
        dispatch(actions.setIsSupplierCardLoading(false));
        dispatch(
          productsActions.refreshSelectedSupplier({
            ...res.data.supplier,
            locationId: res.data.location?.locationId,
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
    dispatch(actions.resetActiveCards());
    dispatch(productsActions.refreshActiveTab("purchases"));
  }

  //----------------------------------------------------------------LOGIC

  function markSelectedSupplier(suppliers: SupplierModel[]) {
    const updatedSuppliers = suppliers.map((supplier) =>
      supplier.supplierId === productsState.selectedSupplier.supplierId
        ? { ...supplier, isSelected: true }
        : { ...supplier, isSelected: false },
    );
    dispatch(actions.refreshSuppliersWithLocations(updatedSuppliers));
  }

  return {
    createPurchaseForSupplierHandler,
    updatePurchaseForSupplierHandler,
    getListOfSuppliersHandler,
    createSupplierHandler,
    updateSupplierHandler,
    deletePurchaseHandler,
    detachSupplierHandler,
    openCreateEntityCardHandler,
    openSelectEntityCardHandler,
    searchEntityHandler,
    selectSupplierHandler,
    manageSupplierHandler,
    deleteSupplierHandler,
    restoreSupplierHandler,
    deleteSupplierPhotoHandler,
    dndSupplierPhotoHandler,
    closeSupplierCardHandler,
    closeSelectEntityCardHandler,
    closeSupplierConfigurationCardHandler,
    getSupplierPageDataHandler,
  };
}
