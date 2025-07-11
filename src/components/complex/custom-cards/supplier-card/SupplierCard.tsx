import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CogIcon,
  ImageIcon,
  Plus,
  RefreshCcwDotIcon,
  Trash2,
} from "lucide-react";

import cs from "./SupplierCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import { ISupplierCard } from "@/const/interfaces/complex-components/custom-cards/ISupplierCard.ts";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";

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

  useEffect(() => {
    if (selectedPurchase?.date) {
      setSelectedDate(selectedPurchase.date);
    }
  }, [selectedPurchase?.date]);

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.supplierCard}
      title="Supplier"
      onSecondaryButtonClick={() => onAction("closeSupplierCard")}
    >
      <div className={cs.supplierCardContent}>
        <div className={cs.purchaseBlock}>
          <div className={cs.noSelectedSupplier}>
            <span className={`${cs.noSelectedSupplierText} she-text`}>
              Select which supplier provided the products
            </span>
            <SheButton
              icon={selectedSupplier ? RefreshCcwDotIcon : Plus}
              value={selectedSupplier ? "Replace Supplier" : "Select Supplier"}
              variant="outline"
              maxWidth="160px"
              minWidth="160px"
              onClick={() => {
                selectedSupplier
                  ? onAction("detachSupplier")
                  : onAction("openSelectSupplierCard");
              }}
            />
          </div>
          {selectedSupplier && (
            <div className={cs.selectedSupplier}>
              <div className={cs.selectedSupplierDetails}>
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
                    <span
                      className={`${selectedSupplier.isDeleted === true ? cs.deletedSupplier : ""} ${cs.supplierName} she-text`}
                    >
                      {selectedSupplier?.supplierName}
                    </span>
                  </SheTooltip>
                  {(selectedSupplier?.address ||
                    selectedPurchase?.location?.address) && (
                    <SheTooltip
                      delayDuration={200}
                      text={selectedSupplier?.address}
                      className="max-w-[150px]"
                    >
                      <span
                        className={`
                        ${selectedSupplier.isDeleted === true ? cs.deletedSupplier : ""}
                        ${cs.twoLineEllipsis} she-text`}
                      >
                        {selectedSupplier?.address}
                      </span>
                    </SheTooltip>
                  )}
                  {/*{selectedSupplier?.addressLine1 && (*/}
                  {/*  <SheTooltip*/}
                  {/*    delayDuration={200}*/}
                  {/*    text={selectedSupplier?.addressLine1}*/}
                  {/*    className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"*/}
                  {/*  >*/}
                  {/*    <span*/}
                  {/*      className={`${selectedSupplier.isDeleted === true ? cs.deletedSupplier : ""} she-text`}*/}
                  {/*    >*/}
                  {/*      {selectedSupplier?.addressLine1}*/}
                  {/*    </span>*/}
                  {/*  </SheTooltip>*/}
                  {/*)}*/}
                  {/*{selectedSupplier?.addressLine2 && (*/}
                  {/*  <SheTooltip*/}
                  {/*    delayDuration={200}*/}
                  {/*    text={selectedSupplier?.addressLine2}*/}
                  {/*    className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"*/}
                  {/*  >*/}
                  {/*    <span*/}
                  {/*      className={`${selectedSupplier.isDeleted === true ? cs.deletedSupplier : ""} she-text`}*/}
                  {/*    >*/}
                  {/*      {selectedSupplier?.addressLine2}*/}
                  {/*    </span>*/}
                  {/*  </SheTooltip>*/}
                  {/*)}*/}
                </div>
                <SheButton
                  icon={selectedSupplier.isDeleted === true ? Plus : CogIcon}
                  value={
                    selectedSupplier.isDeleted === true ? "Restore" : "Manage"
                  }
                  variant="secondary"
                  onClick={() => {
                    selectedSupplier.isDeleted === true
                      ? onAction("restoreSupplier", selectedSupplier)
                      : onAction("manageSupplier", selectedSupplier);
                  }}
                />
              </div>
              {selectedSupplier.isDeleted && (
                <div className={cs.deletedSupplierBlock}>
                  <span
                    className={`${cs.deletedSupplierText} she-text`}
                  >{`>_  Supplier is deleted`}</span>
                </div>
              )}
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
          <div className={cs.purchaseButtonBlock}>
            <SheButton
              variant={"secondary"}
              value={"Cancel"}
              onClick={() => onAction("closeSupplierCard")}
            ></SheButton>
            <SheButton
              value={"Save"}
              disabled={isButtonDisabled}
              onClick={() =>
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
            ></SheButton>
          </div>
        </div>
        {purchaseId && (
          <SheCardNotification
            title="Delete Purchase"
            text=" The purchase will be deleted, but the changes in stock will remain
              intact."
            buttonIcon={Trash2}
            buttonText="Delete"
            buttonVariant="outline"
            buttonColor="#EF4343"
          />
        )}
      </div>
    </SheProductCard>
  );
}
