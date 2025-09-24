import React, { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";

import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";
import cs from "./CustomersPage.module.scss";
import useCustomersPageService from "@/pages/customers-section/customers-page/useCustomersPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { customerGridColumns } from "@/components/complex/grid/custom-grids/customer-grid/CustomerGridColumns";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

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
  } = useCustomersPageService();

  const customerColumns = customerGridColumns(
    onAction,
  ) as ColumnDef<DataWithId>[];
  const sortingItems = Object.values(GridSortingEnum).map((value) => ({
    value,
    description: GridSortingEnumLabels[value],
  }));

  useEffect(() => {
    getCustomersForGridHandler(state.customersGridRequestModel);
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
  }

  return (
    <div id={cs.CustomersPage}>
      <div className={cs.customersPageHeader}>
        <div className="she-title">{t("PageTitles.Customers")}</div>
        <div className={cs.headerButtonBlock}>
          <SheButton
            icon={Plus}
            variant="outline"
            onClick={() => onCreateCustomerHandler()}
            value={t("CustomerActions.CreateCustomer")}
          />
        </div>
      </div>
      <div className={cs.customersPageContent}>
        <SheGrid
          isLoading={state.isCustomersLoading}
          columns={customerColumns}
          data={state.customers.map((customer) => ({
            ...customer,
            id: customer.customerId,
          }))}
          gridRequestModel={state.customersGridRequestModel}
          sortingItems={sortingItems}
          columnsPreferences={appState.preferences}
          preferenceContext={"customerReferences"}
          skeletonQuantity={state.customersGridRequestModel.pageSize}
          onApplyColumns={(model) => updateUserPreferencesHandler(model)}
          onDefaultColumns={() => resetUserPreferencesHandler("Customers")}
          onGridRequestChange={(updates) => getCustomersForGridHandler(updates)}
        >
          {/* TODO: Add filters */}
        </SheGrid>
      </div>
    </div>
  );
}
