import { Cog, ImageIcon, Plus } from "lucide-react";
import React from "react";

import cs from "./SelectCustomerAddress.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ISelectCustomerAddress } from "@/const/interfaces/complex-components/custom-cards/ISelectCustomerAddress.ts";
import { getInitials } from "@/utils/helpers/quick-helper.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { AddressesListGridColumns } from "@/components/complex/grid/custom-grids/addresses-list-grid/AddressesListGridColumns.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

export default function SelectCustomerAddress({
  isLoading,
  isGridLoading,
  customer,
  addressesList,
  onAction,
}: ISelectCustomerAddress) {
  const { translate } = useAppTranslation();

  return (
    <SheCard
      className={cs.selectCustomerAddressCard}
      title="Select Customer Address"
      isLoading={isLoading}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeSelectAddressCard")}
    >
      <div className={cs.selectCustomerAddressCardContent}>
        <div className={cs.customerInformationBlock}>
          <div className={cs.customerBlock}>
            <div>
              {customer?.thumbnailUrl ? (
                <img
                  src={customer?.thumbnailUrl}
                  alt={customer?.customerName}
                  className="object-cover rounded-md w-full h-full"
                  style={{ width: "48px", height: "48px" }}
                />
              ) : customer?.customerName ? (
                <div className={cs.avatarInitials}>
                  {getInitials(customer?.customerName)}
                </div>
              ) : (
                <div className={cs.noImageIcon}>
                  <SheIcon icon={ImageIcon} maxWidth="30px" />
                </div>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <SheTooltip
                delayDuration={200}
                text={customer?.customerName}
                className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span className="she-text">{customer?.customerName}</span>
              </SheTooltip>
              {customer?.email && (
                <SheTooltip
                  delayDuration={200}
                  text={customer?.email}
                  className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span className="she-subtext">{customer?.email}</span>
                </SheTooltip>
              )}
            </div>
          </div>
          <SheButton
            value="Manage"
            icon={Cog}
            variant="secondary"
            onClick={() => onAction("openCustomerCard", customer)}
          />
        </div>
        <div className={cs.createAddressBlock}>
          <div className={cs.createAddressText}>
            <span className="she-text">Missing address?</span>
            <span className="she-text">Create one!</span>
          </div>
          <SheButton
            value="Create Address"
            icon={Plus}
            variant="secondary"
            onClick={() => onAction("openAddressConfigurationCard")}
          />
        </div>
        <div className={cs.addressesListBlock}>
          <SheInput
            placeholder="search address..."
            isSearch
            fullWidth
            showClearBtn
            onDelay={(data: string) => onAction("searchAddress", data)}
            onClear={() => onAction("searchAddress", null)}
          />
          <SheGrid
            data={addressesList}
            isLoading={isGridLoading}
            showHeader={false}
            columns={
              AddressesListGridColumns({
                onAction,
              }) as ColumnDef<DataWithId>[]
            }
            skeletonQuantity={10}
            customMessage="There are no addresses created yet"
          />
        </div>
      </div>
    </SheCard>
  );
}
