import { ColumnDef } from "@tanstack/react-table";

import { Plus } from "lucide-react";

import cs from "./CustomerAddressesCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { customerAddressGridColumns } from "@/components/complex/grid/custom-grids/customer-address-grid/CustomerAddressGridColumns";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";

interface ICustomerAddressesCard {
  isLoading?: boolean;
  addresses?: any[];
  gridRequestModel?: GridRequestModel;
  sortingOptions?: GridSortingModel[];
  preferences?: PreferencesModel;
  onAction: (action: string, data?: any) => void;
}

export default function CustomerAddressesCard({
  isLoading,
  onAction,
  addresses,
  gridRequestModel,
  sortingOptions,
  preferences,
}: ICustomerAddressesCard) {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.customerAddressesCard}
      minWidth="850px"
      showHeader={false}
    >
      <div className={cs.customerAddressesCardHeader}>
        <div className="she-title">
          {translate("CardTitles.CustomerAddresses")}
        </div>
        <div className={cs.headerButtonBlock}>
          <SheButton
            value="Create Address"
            valueTransKey="CustomerActions.CreateAddress"
            icon={Plus}
            variant="default"
            onClick={() => onAction("createCustomerAddress")}
          />
        </div>
      </div>
      <SheGrid
        isLoading={isLoading}
        columns={
          customerAddressGridColumns(onAction) as ColumnDef<DataWithId>[]
        }
        data={addresses}
        gridRequestModel={gridRequestModel}
        sortingItems={sortingOptions}
        columnsPreferences={preferences}
        preferenceContext={"productReferences"}
        skeletonQuantity={3}
        onApplyColumns={(model) => onAction("applyColumns", model)}
        onDefaultColumns={() => onAction("resetColumns")}
        onGridRequestChange={(data) =>
          onAction("getCustomerAddressesForGrid", data)
        }
      >
        {/* TODO: Add filters */}
      </SheGrid>
    </SheCard>
  );
}
