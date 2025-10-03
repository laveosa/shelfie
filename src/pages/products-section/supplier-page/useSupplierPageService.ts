import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast.ts";
import { useTranslation } from "react-i18next";
import PurchasesApiHooks from "@/utils/services/api/PurchasesApiService.ts";
import { SupplierPageSliceActions as actions } from "@/state/slices/SupplierPageSlice.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPageSlice } from "@/const/interfaces/store-slices/ISupplierPageSlice.ts";
import SuppliersApiHooks from "@/utils/services/api/SuppliersApiService.ts";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import CompaniesApiHooks from "@/utils/services/api/CompaniesApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";
import AssetsApiHooks from "@/utils/services/api/AssetsApiService.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { LocationModel } from "@/const/models/LocationModel.ts";

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
  const [updateLocationDetails] =
    CompaniesApiHooks.useUpdateLocationDetailsMutation();
  const [getListOfCompaniesForGrid] =
    CompaniesApiHooks.useGetListOfCompaniesForGridMutation();
  const [getCountryCode] = DictionaryApiHooks.useLazyGetCountryCodeQuery();
  const [createCompany] = CompaniesApiHooks.useCreateCompanyMutation();
  const [uploadPhoto] = AssetsApiHooks.useUploadPhotoMutation();
  const [addNewLocationToCompany] =
    CompaniesApiHooks.useAddNewLocationToCompanyMutation();
  const [getCompanyDetails] = CompaniesApiHooks.useLazyGetCompanyDetailsQuery();
  const [deleteCompany] = CompaniesApiHooks.useDeleteCompanyMutation();
  const [deletePhoto] = AssetsApiHooks.useDeletePhotoMutation();
  const [addLocationToCompany] =
    CompaniesApiHooks.useAddLocationToCompanyMutation();
  const [restoreCompany] = CompaniesApiHooks.useRestoreCompanyMutation();

  function createPurchaseForSupplierHandler(model) {
    dispatch(actions.setIsSupplierCardLoading(true));
    return createPurchaseForSupplier({
      date: model.selectedDate,
      supplierId: model.selectedCompany.companyId,
      documentNotes: model.purchaseNotes,
    }).then((res: any) => {
      dispatch(actions.refreshPurchase(res.data));
      dispatch(productsActions.refreshCreatedPurchase(res.data));
      dispatch(actions.setIsSupplierCardLoading(false));
      if (res) {
        productsService.getPurchaseCountersHandler(res.data.purchaseId);
        navigate(
          `${NavUrlEnum.PRODUCTS}${NavUrlEnum.PURCHASE_PRODUCTS}/${res.data.purchaseId}`,
        );
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

  function getListOfCompaniesHandler(model: GridRequestModel) {
    dispatch(actions.setIsCompaniesGridLoading(true));
    return getListOfCompaniesForGrid(model).then((res: any) => {
      dispatch(actions.setIsCompaniesGridLoading(false));
      const modifiedList = res.data.items?.map((item) => ({
        ...item,
        isSelected: item.companyId === state.selectedCompany.companyId,
      }));
      dispatch(
        actions.refreshCompaniesGridRequestModel({
          ...res.data,
          items: modifiedList,
        }),
      );
      return res.data;
    });
  }

  function getCountryCodesHandler() {
    if (state.countryCodes.length === 0) {
      return getCountryCode().then((res: any) => {
        dispatch(actions.refreshCountryCodes(res.data));
      });
    }
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
          model.contextId = res.data.supplierId;
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
        getListOfCompaniesHandler(state.companiesGridRequestModel);
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
    if (!state.companiesGridRequestModel.items) {
      getListOfCompaniesHandler(state.companiesGridRequestModel);
    }
  }

  function openSelectEntityCardHandler() {
    dispatch(actions.resetSelectedCompany());
    handleCardAction("selectEntityCard", true);
    getListOfCompaniesHandler(state.companiesGridRequestModel).then(() => {});
  }

  function searchEntityHandler(searchText: string) {
    getListOfCompaniesHandler({ searchQuery: searchText }).then(() => {});
  }

  function openCreateEntityCardHandler() {
    handleCardAction("createCompanyCard", true);
  }

  function selectCompanyHandler(model: CompanyModel) {
    handleCardAction("selectEntityCard");
    dispatch(actions.refreshSelectedCompany(model));
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
        dispatch(actions.setIsCompaniesGridLoading(true));
        getListOfCompaniesForGrid(state.companiesGridRequestModel).then(
          (res) => {
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
          },
        );
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
        dispatch(actions.setIsCompaniesGridLoading(true));
        getListOfCompaniesForGrid(state.companiesGridRequestModel).then(
          (res) => {
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
        dispatch(actions.setIsCompaniesGridLoading(true));
        getListOfCompaniesForGrid(state.companiesGridRequestModel).then(
          (res) => {
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
          },
        );
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

  // function manageSupplierHandler(model: SupplierModel) {
  //   handleCardAction("supplierConfigurationCard", true);
  //   dispatch(actions.setIsSupplierConfigurationCardLoading(true));
  //   getSupplierDetailsHandler(model.supplierId, model.locationId).then(
  //     (res) => {
  //       dispatch(actions.setIsSupplierConfigurationCardLoading(false));
  //       dispatch(actions.refreshManagedSupplier(res));
  //     },
  //   );
  //   if (state.activeCards.includes("selectEntityCard")) {
  //     dispatch(
  //       actions.refreshSuppliersWithLocations(
  //         setSelectedGridItem(
  //           model.supplierId,
  //           state.suppliersWithLocations,
  //           "supplierId",
  //         ),
  //       ),
  //     );
  //   }
  // }

  // function updateSupplierHandler(model: any, purchaseId) {
  //   dispatch(actions.setIsSupplierConfigurationCardLoading(true));
  //   updateLocationDetails({
  //     locationId: state.managedSupplier.locationId,
  //     model: {
  //       ...model,
  //       locationName: model.supplierName,
  //     },
  //   }).then((res: any) => {
  //     dispatch(actions.setIsSupplierConfigurationCardLoading(false));
  //     if (!res.error) {
  //       if (model.uploadModels) {
  //         dispatch(actions.setIsPhotoUploaderLoading(true));
  //
  //         const uploadPromises = model.uploadModels.map((model) => {
  //           model.contextId = state.managedSupplier.supplierId;
  //           return productsService.uploadPhotoHandler(model);
  //         });
  //
  //         Promise.all(uploadPromises).then((results) => {
  //           results.forEach((res) => {
  //             dispatch(actions.setIsPhotoUploaderLoading(false));
  //             if (res && !res.error) {
  //               getSupplierDetailsHandler(
  //                 state.managedSupplier.supplierId,
  //                 state.managedSupplier.locationId,
  //               ).then((res) => {
  //                 dispatch(actions.refreshManagedSupplier(res));
  //               });
  //               dispatch(actions.setIsPhotoUploaderLoading(false));
  //               if (state.activeCards.includes("selectEntityCard")) {
  //                 getListOfCompaniesHandler(state.companiesGridRequestModel);
  //               }
  //               if (
  //                 productsState.selectedSupplier.supplierId ===
  //                 state.managedSupplier.supplierId
  //               ) {
  //                 getPurchaseDetails(purchaseId).then((res: any) => {
  //                   dispatch(productsActions.refreshSelectedPurchase(res.data));
  //                   dispatch(
  //                     actions.refreshSelectedSupplier({
  //                       ...res.data.supplier,
  //                       locationId: res.data.location.locationId,
  //                     }),
  //                   );
  //                 });
  //               }
  //               addToast({
  //                 text: "Image successfully added",
  //                 type: "success",
  //               });
  //             } else {
  //               addToast({
  //                 text: res?.error?.data.detail,
  //                 type: "error",
  //               });
  //             }
  //           });
  //         });
  //       }
  //       addToast({
  //         text: "Supplier updated successfully",
  //         type: "success",
  //       });
  //     } else {
  //       addToast({
  //         text: res.error.message,
  //         type: "error",
  //       });
  //     }
  //   });
  // }

  // async function deleteSupplierHandler(model, purchaseId) {
  //   const confirmedSupplierDeleting = await openConfirmationDialog({
  //     headerTitle: "Deleting supplier",
  //     text: `You are about to delete supplier ${model.traitName}.`,
  //     primaryButtonValue: "Delete",
  //     secondaryButtonValue: "Cancel",
  //   });
  //
  //   if (!confirmedSupplierDeleting) return;
  //
  //   dispatch(actions.setIsSupplierCardLoading(true));
  //   return deleteSupplier(model.supplierId).then((res: any) => {
  //     dispatch(actions.setIsSupplierCardLoading(false));
  //     if (!res.error) {
  //       handleCardAction("supplierConfigurationCard");
  //       if (state.activeCards.includes("selectEntityCard")) {
  //         dispatch(
  //           actions.refreshSuppliersWithLocations(
  //             state.suppliersWithLocations.filter(
  //               (supplier) => supplier.supplierId !== model.supplierId,
  //             ),
  //           ),
  //         );
  //       }
  //       if (productsState.selectedSupplier.supplierId === model.supplierId) {
  //         return getPurchaseDetails(purchaseId).then((res: any) => {
  //           dispatch(productsActions.refreshSelectedPurchase(res.data));
  //           dispatch(
  //             actions.refreshSelectedSupplier({
  //               ...res.data.supplier,
  //               locationId: res.data.location.locationId,
  //             }),
  //           );
  //         });
  //       }
  //       addToast({
  //         text: "Supplier deleted successfully",
  //         type: "success",
  //       });
  //     } else {
  //       addToast({
  //         text: res.error.message,
  //         type: "error",
  //       });
  //     }
  //   });
  // }

  function restoreCompanyHandler(model, purchaseId) {
    dispatch(actions.setIsSupplierCardLoading(true));
    restoreCompany(model.companyId).then((res: any) => {
      dispatch(actions.setIsSupplierCardLoading(false));
      if (!res.error) {
        getSupplierDetailsHandler(model.supplierId, model.locationId)
          .then
          // (res) => {
          //   // dispatch(actions.refreshManagedSupplier(res));
          // },
          ();
        if (productsState.selectedSupplier.supplierId === model.supplierId) {
          return getPurchaseDetails(purchaseId).then((res: any) => {
            dispatch(productsActions.refreshSelectedPurchase(res.data));
            dispatch(
              actions.refreshSelectedCompany({
                ...res.data.company,
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

  function getSupplierPageDataHandler(purchaseId) {
    if (purchaseId) {
      dispatch(actions.setIsSupplierCardLoading(true));
      dispatch(actions.setIsProductMenuCardLoading(true));
      getPurchaseDetails(purchaseId).then((res: any) => {
        dispatch(productsActions.refreshSelectedPurchase(res.data));
        dispatch(actions.setIsSupplierCardLoading(false));
        dispatch(
          actions.refreshSelectedCompany({
            ...res.data.supplier,
            locationId: res.data.location?.locationId,
          }),
        );
      });
      productsService
        .getPurchaseCountersHandler(Number(purchaseId))
        .then(() => dispatch(actions.setIsProductMenuCardLoading(false)));
      getCountryCodesHandler();
    }
    dispatch(productsActions.resetPurchaseCounters());
    dispatch(actions.resetActiveCards());
    dispatch(productsActions.refreshActiveTab("purchases"));
  }

  //----------------------------------------------------------------LOGIC

  return {
    state,
    productsState,
    productsService,
    createPurchaseForSupplierHandler,
    updatePurchaseForSupplierHandler,
    // createSupplierHandler,
    // updateSupplierHandler,
    deletePurchaseHandler,
    detachSupplierHandler,
    openCreateEntityCardHandler,
    openSelectEntityCardHandler,
    searchEntityHandler,
    selectCompanyHandler,
    createCompanyHandler,
    closeCreateCompanyCardHandler,
    manageCompanyHandler,
    // manageSupplierHandler,
    // deleteSupplierHandler,
    restoreCompanyHandler,
    // deleteSupplierPhotoHandler,
    // dndSupplierPhotoHandler,
    closeSupplierCardHandler,
    closeSelectEntityCardHandler,
    // closeSupplierConfigurationCardHandler,
    deleteCompanyHandler,
    closeCompanyConfigurationCardHandler,
    manageCompanyPhotosHandler,
    getSupplierPageDataHandler,
    deleteCompanyPhotoHandler,
    uploadPhotoHandler,
    closePhotosCardHandler,
    openLocationConfigurationCardHandler,
    createLocationHandler,
    closeLocationConfigurationCardHandler,
  };
}
