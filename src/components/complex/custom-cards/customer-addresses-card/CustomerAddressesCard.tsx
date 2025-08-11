import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CustomerAddressesCard.module.scss";
import { Plus } from "lucide-react";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { DataWithId, DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { customerAddressGridColumns } from "../../grid/customer-address-grid/CustomerAddressGridColumns";
import { GridSortingModel } from "@/const/models/GridSortingModel";

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
            <div className="she-title">Customer Addresses</div>
            <div className={cs.headerButtonBlock}>
                <SheButton
                icon={Plus}
                variant="default"
                onClick={()=>onAction("createCustomerAddress")}
                value="Create Address"
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
            onGridRequestChange={(data)=>onAction("getCustomerAddressesForGrid", data)} 
            >
              {/* TODO: Add filters */}
        </DndGridDataTable>
    </SheProductCard>
  );
} 