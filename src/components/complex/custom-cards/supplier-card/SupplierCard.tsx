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

export default function SupplierCard({
  selectedSupplier,
  onAction,
}: ISupplierCard) {
  const [selectedDate, setSelectedDate] = useState<Date>(null);

  return (
    <SheProductCard
      className={cs.supplierCard}
      title="Supplier"
      showPrimaryButton
      primaryButtonTitle="Create Purchase"
      primaryButtonDisabled={!selectedDate || !selectedSupplier}
      showSecondaryButton
      onPrimaryButtonClick={() =>
        onAction("createPurchase", { selectedDate, selectedSupplier })
      }
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
                  src={selectedSupplier?.photo}
                  alt={selectedSupplier?.name}
                />
              ) : (
                <SheIcon icon={ImageIcon} />
              )}
            </div>
            <div className={cs.supplierDesc}>
              <span className="she-subtext" style={{ minWidth: "100%" }}>
                {selectedSupplier?.supplierName}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SheButton
                  variant="ghost"
                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                  <MoreHorizontal />
                  <span className="sr-only">Open menu</span>
                </SheButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[160px]">
                <DropdownMenuItem
                // onClick={() =>
                //   onAction("deleteVariant", row.id, meta?.setLoadingRow, row)
                // }
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <span className="she-title">Purchase date</span>
        <SheDatePicker
          fullWidth
          label="Set date when purchase took place"
          onSelectDate={(date) => setSelectedDate(date)}
        />
      </div>
    </SheProductCard>
  );
}
