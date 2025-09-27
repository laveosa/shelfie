import React, { useEffect } from "react";

import { Plus } from "lucide-react";

import cs from "./CustomersPage.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { CustomerGridColumns } from "@/components/complex/grid/custom-grids/customer-grid/CustomerGridColumns";
import useCustomersPageService from "@/pages/customers-section/customers-page/useCustomersPageService.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";

export function CustomersPage() {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();
  const { state, appState, ...service } = useCustomersPageService();
  const sortingItems = Object.values(GridSortingEnum).map((value) => ({
    value,
    description: GridSortingEnumLabels[value],
  }));

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    service.getCustomersForGridHandler(state.customersGridRequestModel);
  }, []);

  // ==================================================================== EVENT HANDLERS
  function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "manageCustomer":
        service.onManageCustomerHandler(payload);
        break;
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.CustomersPage}>
      <div className={cs.pageHeader}>
        <span className="she-title">{translate("PageTitles.Customers")}</span>
        <div>
          <SheButton
            value={translate("CustomerActions.CreateCustomer")}
            icon={Plus}
            variant="info"
            onClick={service.onCreateCustomerHandler}
          />
        </div>
      </div>
      <div className={cs.customersPageContent}>
        <SheGrid
          gridRequestModel={state.customersGridRequestModel}
          columns={CustomerGridColumns(onAction)}
          sortingItems={sortingItems}
          columnsPreferences={appState.preferences}
          preferenceContext={"customerReferences"}
          isLoading={state.isCustomersLoading}
          skeletonQuantity={10}
          onApplyColumns={service.updateUserPreferencesHandler}
          onDefaultColumns={() =>
            service.resetUserPreferencesHandler("Customers")
          }
          onGridRequestChange={service.getCustomersForGridHandler}
        >
          {/* TODO: Add filters */}
        </SheGrid>
      </div>
    </div>
  );
}
