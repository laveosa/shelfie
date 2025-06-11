import { ImageIcon, MoreHorizontal, Plus } from "lucide-react";

import cs from "./SupplierCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import { ISupplierCard } from "@/const/interfaces/complex-components/custom-cards/ISupplierCard.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { useState } from "react";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";

export default function SupplierCard({
  isLoading,
  selectedPurchase,
  selectedSupplier,
  onAction,
}: ISupplierCard) {
  const [selectedDate, setSelectedDate] = useState<Date>(null);

  const isDateSelected = Boolean(selectedDate || selectedPurchase?.date);
  const isButtonDisabled = !isDateSelected || !selectedSupplier;

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.supplierCard}
      title="Supplier"
      showPrimaryButton
      primaryButtonTitle="Create Purchase"
      primaryButtonDisabled={isButtonDisabled}
      showSecondaryButton
      onPrimaryButtonClick={() =>
        onAction("createPurchase", { selectedDate, selectedSupplier })
      }
      onSecondaryButtonClick={() => onAction("closeSupplierCard")}
    >
      <div className={cs.supplierCardContent}>
        {!selectedSupplier ? (
          <div className={cs.noSelectedSupplier}>
            <span className="she-text">
              Select which supplier provided the products
            </span>
            <SheButton
              icon={Plus}
              value="Select Supplier"
              variant="outline"
              maxWidth="150px"
              minWidth="150px"
              onClick={() => onAction("openSelectSupplierCard")}
            />
          </div>
        ) : (
          <div className={cs.selectedSupplier}>
            <div className={cs.supplierPhoto}>
              {selectedSupplier.photo ? (
                <img
                  src={selectedSupplier?.photo?.thumbnailUrl}
                  alt={selectedSupplier?.supplierName}
                />
              ) : (
                <SheIcon icon={ImageIcon} />
              )}
            </div>
            <div className={cs.supplierDesc}>
              <SheTooltip
                delayDuration={200}
                text={selectedSupplier?.supplierName}
                className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span className="she-text">
                  {selectedSupplier?.supplierName}
                </span>
              </SheTooltip>
              {selectedSupplier?.addressLine1 && (
                <SheTooltip
                  delayDuration={200}
                  text={selectedSupplier?.addressLine1}
                  className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span className="she-subtext">
                    {selectedSupplier?.addressLine1}
                  </span>
                </SheTooltip>
              )}
              {selectedSupplier?.addressLine2 && (
                <SheTooltip
                  delayDuration={200}
                  text={selectedSupplier?.addressLine2}
                  className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span className="she-subtext">
                    {selectedSupplier?.addressLine2}
                  </span>
                </SheTooltip>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SheButton
                  variant="secondary"
                  minWidth="40px"
                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                  <MoreHorizontal />
                  <span className="sr-only">Open menu</span>
                </SheButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[160px]">
                <DropdownMenuItem onClick={() => onAction("detachSupplier")}>
                  Detach Supplier
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <span className="she-title">Purchase date</span>
        <SheDatePicker
          fullWidth
          label="Set date when purchase took place"
          date={selectedPurchase?.date}
          onSelectDate={(date) => setSelectedDate(date)}
        />
      </div>
    </SheProductCard>
  );
}
