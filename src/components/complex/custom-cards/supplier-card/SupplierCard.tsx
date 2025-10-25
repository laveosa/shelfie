import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  CalendarRange,
  CogIcon,
  ImageIcon,
  Plus,
  RefreshCcwDotIcon,
} from "lucide-react";

import cs from "./SupplierCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ISupplierCard } from "@/const/interfaces/complex-components/custom-cards/ISupplierCard.ts";

export default function SupplierCard({
  isLoading,
  selectedPurchase,
  selectedSupplier,
  showCloseButton,
  onAction,
}: ISupplierCard) {
  const { purchaseId } = useParams();
  // ==================================================================== STATE MANAGEMENT
  const [selectedDate, setSelectedDate] = useState<string>(
    purchaseId ? selectedPurchase?.date : null,
  );
  const [purchaseNotes, setPurchaseNotes] = useState<string>(null);

  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();
  const isDateSelected = Boolean(selectedDate || selectedPurchase?.date);
  const isButtonDisabled = !isDateSelected || !selectedSupplier;

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (selectedPurchase?.date) {
      setSelectedDate(selectedPurchase.date);
    }
  }, [selectedPurchase]);

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.supplierCard}
      title="Create Purchase"
      titleTransKey="SectionTitles.CreatePurchase"
      showCloseButton={showCloseButton}
      isLoading={isLoading}
      showNotificationCard={!!purchaseId}
      notificationCardProps={{
        title: "Delete Purchase",
        titleTransKey: "CardTitles.DeletePurchase",
        text: "The purchase will be deleted, but the changes in stock will remain intact.",
        textTransKey: "ConfirmationMessages.DeletePurchase",
        onClick: () => onAction("deletePurchase", selectedPurchase),
      }}
      onSecondaryButtonClick={() => onAction("closeSupplierCard")}
    >
      <div className={cs.supplierCardContent}>
        <div className={cs.purchaseBlock}>
          <div className={cs.noSelectedSupplier}>
            <span className={`${cs.noSelectedSupplierText} she-text`}>
              {translate("PurchaseForm.Labels.SupplierSelection")}
            </span>
            <SheButton
              icon={selectedSupplier ? RefreshCcwDotIcon : Plus}
              value={selectedSupplier ? "Replace Supplier" : "Select Supplier"}
              valueTransKey={
                selectedSupplier
                  ? "SupplierActions.ReplaceSupplier"
                  : "SupplierActions.SelectSupplier"
              }
              variant="secondary"
              maxWidth="160px"
              minWidth="160px"
              onClick={() => {
                selectedSupplier
                  ? onAction("detachSupplier")
                  : onAction("openSelectEntityCard");
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
                      alt={selectedSupplier?.companyName}
                    />
                  ) : (
                    <SheIcon icon={ImageIcon} />
                  )}
                </div>
                <div className={cs.supplierDesc}>
                  <SheTooltip
                    delayDuration={200}
                    text={selectedSupplier?.companyName}
                    className={cs.supplierNameTooltip}
                  >
                    <span
                      className={`${selectedSupplier.isDeleted ? cs.deletedSupplier : ""} ${cs.supplierName} she-text`}
                    >
                      {selectedSupplier?.companyName}
                    </span>
                  </SheTooltip>
                  {(selectedSupplier?.address ||
                    selectedPurchase?.location?.address) && (
                    <SheTooltip
                      delayDuration={200}
                      text={
                        selectedSupplier?.address ||
                        selectedPurchase?.location?.address
                      }
                      className="max-w-[150px]"
                    >
                      <span
                        className={`
                        ${selectedSupplier.isDeleted ? cs.deletedSupplier : ""}
                        ${cs.twoLineEllipsis} she-text`}
                      >
                        {selectedSupplier?.address ||
                          selectedPurchase?.location?.address}
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
                  icon={selectedSupplier.isDeleted ? Plus : CogIcon}
                  value={selectedSupplier.isDeleted ? "Restore" : "Manage"}
                  valueTransKey={
                    selectedSupplier.isDeleted
                      ? "CommonButtons.Restore"
                      : "CommonButtons.Manage"
                  }
                  variant="secondary"
                  onClick={() => {
                    selectedSupplier.isDeleted
                      ? onAction("restoreCompany", selectedSupplier)
                      : onAction("manageCompany", selectedSupplier);
                  }}
                />
              </div>
              {selectedSupplier.isDeleted && (
                <div className={cs.deletedSupplierBlock}>
                  <span className={`${cs.deletedSupplierText} she-text`}>
                    {translate("MarginMessages.SupplierIsDeleted")}
                  </span>
                </div>
              )}
            </div>
          )}
          <Separator />
          <span className="she-title">
            {translate("PurchaseForm.Labels.PurchaseDateTitle")}
          </span>
          <SheDatePicker
            date={selectedPurchase?.date}
            label="Purchase Date"
            labelTransKey="PurchaseForm.Labels.PurchaseDate"
            icon={CalendarRange}
            fullWidth
            onSelectDate={(date) => setSelectedDate(date)}
          />
          <SheTextArea
            value={selectedPurchase?.documentNotes || null}
            label="Purchase notes"
            labelTransKey="PurchaseForm.Labels.PurchaseNotes"
            placeholder="Type your notes here..."
            placeholderTransKey="PurchaseForm.Placeholders.PurchaseNotes"
            fullWidth
            onDelay={(value: string) => setPurchaseNotes(value)}
          />
          <div className={cs.purchaseButtonBlock}>
            <SheButton
              value="Cancel"
              valueTransKey="CommonButtons.Cancel"
              variant={"secondary"}
              onClick={() => onAction("closeSupplierCard")}
            />
            <SheButton
              value={!selectedPurchase?.purchaseId ? "Create Purchase" : "Save"}
              valueTransKey={
                !selectedPurchase?.purchaseId
                  ? "CommonButtons.CreatePurchase"
                  : "CommonButtons.Save"
              }
              icon={!selectedPurchase?.purchaseId && Plus}
              txtColor={!selectedPurchase?.purchaseId && "#fff"}
              bgColor={!selectedPurchase?.purchaseId && "#007AFF"}
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
            />
          </div>
        </div>
      </div>
    </SheCard>
  );
}
