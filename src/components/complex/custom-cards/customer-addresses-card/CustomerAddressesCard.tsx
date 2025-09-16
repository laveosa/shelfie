import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";

import { Plus } from "lucide-react";

import cs from "./CustomerAddressesCard.module.scss";
import {
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { customerAddressGridColumns } from "@/components/complex/grid/custom-grids/customer-address-grid/CustomerAddressGridColumns";
import { GridSortingModel } from "@/const/models/GridSortingModel";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

interface ICustomerAddressesCard {
  isLoading?: boolean;
  addresses?: any[];
  gridRequestModel?: GridRequestModel;
  sortingOptions?: GridSortingModel[];
  onAction: (action: string, data?: any) => void;
}

export default function CustomerAddressesCard({
  isLoading,
  onAction,
  addresses,
  gridRequestModel,
  sortingOptions,
}: ICustomerAddressesCard) {
  const { t } = useTranslation();

  return (
    <SheProductCard
      className={cs.customerAddressesCard}
      minWidth="850px"
      showHeader={false}
    >
      <div className={cs.customerAddressesCardHeader}>
        <div className="she-title">{t("CardTitles.CustomerAddresses")}</div>
        <div className={cs.headerButtonBlock}>
          <SheButton
            icon={Plus}
            variant="default"
            onClick={() => onAction("createCustomerAddress")}
            value={t("CustomerActions.CreateAddress")}
          />
        </div>
      </div>
      <DndGridDataTable
        isLoading={isLoading}
        columns={
          customerAddressGridColumns(onAction) as ColumnDef<DataWithId>[]
        }
        data={addresses}
        gridRequestModel={gridRequestModel}
        sortingItems={sortingOptions}
        //columnsPreferences={appState.preferences}
        //preferenceContext={"customerAddresses"}
        skeletonQuantity={3}
        //onApplyColumns={onApplyColumnsHandler}
        //onDefaultColumns={onResetColumnsHandler}
        onGridRequestChange={(data) =>
          onAction("getCustomerAddressesForGrid", data)
        }
      >
        {/* TODO: Add filters */}
      </DndGridDataTable>
    </SheProductCard>
  );
}
