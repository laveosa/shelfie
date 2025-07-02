import { ImageIcon, Plus, RefreshCcwDotIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";

import cs from "./SupplierCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import { ISupplierCard } from "@/const/interfaces/complex-components/custom-cards/ISupplierCard.ts";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";

export default function SupplierCard({
  isLoading,
  selectedPurchase,
  selectedSupplier,
  onAction,
}: ISupplierCard) {
  const { purchaseId } = useParams();
  const [selectedDate, setSelectedDate] = useState<string>(
    purchaseId ? selectedPurchase?.date : null,
  );
  const [purchaseNotes, setPurchaseNotes] = useState<string>(null);
  const isDateSelected = Boolean(selectedDate || selectedPurchase?.date);
  const isButtonDisabled = !isDateSelected || !selectedSupplier;

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.supplierCard}
      title="Supplier"
      showPrimaryButton
      primaryButtonTitle={purchaseId ? "Update Purchase" : "Create Purchase"}
      primaryButtonDisabled={isButtonDisabled}
      showSecondaryButton
      onPrimaryButtonClick={() =>
        purchaseId
          ? onAction("updatePurchase", {
              purchaseId,
              selectedDate,
              selectedSupplier,
              purchaseNotes,
            })
          : onAction("createPurchase", {
              selectedDate,
              selectedSupplier,
              purchaseNotes,
            })
      }
      onSecondaryButtonClick={() => onAction("closeSupplierCard")}
    >
      <div className={cs.supplierCardContent}>
        {!selectedSupplier ? (
          <div className={cs.noSelectedSupplier}>
            <span className={`${cs.noSelectedSupplierText} she-text`}>
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
              {selectedSupplier.thumbnailUrl ? (
                <img
                  src={selectedSupplier?.thumbnailUrl}
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
            <SheButton
              icon={RefreshCcwDotIcon}
              value="Replace Supplier"
              variant="secondary"
              onClick={() => onAction("detachSupplier")}
            />
          </div>
        )}
        <Separator />
        <span className="she-title">Purchase date</span>
        <SheDatePicker
          fullWidth
          label="Set date when purchase took place"
          date={selectedPurchase?.date}
          onSelectDate={(date) => setSelectedDate(date)}
        />
        <SheTextArea
          fullWidth
          label="Purchase notes"
          placeholder="Type your notes here..."
          value={selectedPurchase?.documentNotes || null}
          onDelay={(value: string) => setPurchaseNotes(value)}
        />
      </div>
    </SheProductCard>
  );
}
