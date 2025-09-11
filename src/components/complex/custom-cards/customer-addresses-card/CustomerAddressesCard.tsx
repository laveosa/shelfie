import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CustomerAddressesCard.module.scss";
import { Plus } from "lucide-react";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/DndGrid.tsx";
import { customerAddressGridColumns } from "@/components/complex/grid/custom-grids/customer-address-grid/CustomerAddressGridColumns";
import { GridSortingModel } from "@/const/models/GridSortingModel";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

interface ICustomerAddressesCard {
  isLoading?: boolean;
  addresses?: any[];
  gridModel?: any;
  sortingOptions?: GridSortingModel[];
  onAction: (action: string, data?: any) => void;
}

export default function CustomerAddressesCard({
  isLoading,
  onAction,
  addresses,
  gridModel,
  sortingOptions,
}: ICustomerAddressesCard) {
  const { t } = useTranslation();

  const customerAddressColumns = customerAddressGridColumns(
    onAction,
  ) as ColumnDef<DataWithId>[];

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
        columns={customerAddressColumns}
        data={addresses}
        gridModel={gridModel}
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
