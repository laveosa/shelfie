import React, { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import cs from "./CustomersPage.module.scss";
import useCustomersPageService from "@/pages/customers-section/customers-page/useCustomersPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Plus } from "lucide-react";
import {
  DataWithId,
  DndGridDataTable,
  DndGridRef,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { CustomersPageSliceActions as actions } from "@/state/slices/CustomersPageSlice";

import { ICustomersPageSlice } from "@/const/interfaces/store-slices/ICustomersPageSlice";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice";
import { customerGridColumns } from "@/components/complex/grid/customer-grid/CustomerGridColumns";
import { PreferencesModel } from "@/const/models/PreferencesModel";
import { GridRequestModel } from "@/const/models/GridRequestModel";


export function CustomersPage() {
  const { t } = useTranslation();
  const {
    appState,
    state,
    getCustomersForGridHandler, 
    onManageCustomerHandler, 
    onCreateCustomerHandler, 
    updateUserPreferencesHandler,
    resetUserPreferencesHandler,
    setDefaultSortingOptionsHandler
    } = useCustomersPageService();


  const customerColumns = customerGridColumns(
    onAction,
  ) as ColumnDef<DataWithId>[];


  useEffect(() => {
      getCustomersForGridHandler();
      if(state.sortingOptions.length === 0) {
        setDefaultSortingOptionsHandler();
      }
  }, []);

  function onAction(
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    rowData?: any,
  ) {
    setLoadingRow(rowId, true);
    switch (actionType) {
      case "image":
        break;
      case "manageCustomer":
        onManageCustomerHandler(rowData);
        break;
    }

    setLoadingRow(rowId, false);
  }

  function handleCreateCustomer() {
    onCreateCustomerHandler();
  }

  function onApplyColumnsHandler(model: PreferencesModel) {
    updateUserPreferencesHandler(model);
  }

  function onResetColumnsHandler() {
    resetUserPreferencesHandler("Customers");
  }

  function handleGridRequestChange(updates: GridRequestModel) {
    getCustomersForGridHandler(updates);
  }


  
  return (
    <div id={cs.CustomersPage}>
      <div className={cs.customersPageHeader}>
        <div className="she-title">{t("PageTitles.Customers")}</div>
          <div className={cs.headerButtonBlock}>
            <SheButton
              icon={Plus}
              variant="outline"
              onClick={handleCreateCustomer}
              value={t("CustomerActions.CreateCustomer")}
            />
          </div>
      </div>
      <div className={cs.customersPageContent}>
            <DndGridDataTable
              isLoading={state.isCustomersLoading}
              columns={customerColumns}
              data={state.customers.map((customer) => ({
                ...customer,
                id: customer.customerId,
              }))}
              gridModel={state.customersGridModel}
              sortingItems={state.sortingOptions}
              columnsPreferences={appState.preferences}
              preferenceContext={"customerReferences"}
              skeletonQuantity={state.customersGridRequestModel.pageSize}
              onApplyColumns={onApplyColumnsHandler}
              onDefaultColumns={onResetColumnsHandler}
              onGridRequestChange={handleGridRequestChange}
            >
              {/* TODO: Add filters */}
            </DndGridDataTable>
      </div>
    </div>
  );
}