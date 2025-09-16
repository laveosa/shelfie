import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CalendarRange,
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

export default function SupplierCard({
  isLoading,
  selectedPurchase,
  selectedSupplier,
  onAction,
}: ISupplierCard) {
  const { t } = useTranslation();
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
      title={t("SectionTitles.CreatePurchase")}
      showNotificationCard={!!purchaseId}
      notificationCardProps={{
        title: "Delete Purchase",
        titleTransKey: "CardTitles.DeletePurchase",
        text: "The purchase will be deleted, but the changes in stock will remain intact.",
        textTransKey: "ConfirmationMessages.DeletePurchase",
        buttonText: "Delete",
        buttonTextTransKey: "CommonButtons.Delete",
        buttonColor: "#FF0000",
        buttonIcon: Trash2,
        onClick: () => onAction("deletePurchase", selectedPurchase),
      }}
      onSecondaryButtonClick={() => onAction("closeSupplierCard")}
    >
      <div className={cs.supplierCardContent}>
        <div className={cs.purchaseBlock}>
          <div className={cs.noSelectedSupplier}>
            <span className={`${cs.noSelectedSupplierText} she-text`}>
              {t("PurchaseForm.Labels.SupplierSelection")}
            </span>
            <SheButton
              icon={selectedSupplier ? RefreshCcwDotIcon : Plus}
              value={
                selectedSupplier
                  ? t("SupplierActions.ReplaceSupplier")
                  : t("SupplierActions.SelectSupplier")
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
                      alt={
                        selectedSupplier?.supplierName ||
                        selectedSupplier?.companyName
                      }
                    />
                  ) : (
                    <SheIcon icon={ImageIcon} />
                  )}
                </div>
                <div className={cs.supplierDesc}>
                  <SheTooltip
                    delayDuration={200}
                    text={
                      selectedSupplier?.supplierName ||
                      selectedSupplier?.companyName
                    }
                    className={cs.supplierNameTooltip}
                  >
                    <span
                      className={`${selectedSupplier.isDeleted === true ? cs.deletedSupplier : ""} ${cs.supplierName} she-text`}
                    >
                      {selectedSupplier?.supplierName ||
                        selectedSupplier?.companyName}
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
                        ${selectedSupplier.isDeleted === true ? cs.deletedSupplier : ""}
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
                  icon={selectedSupplier.isDeleted === true ? Plus : CogIcon}
                  value={
                    selectedSupplier.isDeleted === true
                      ? t("CommonButtons.Restore")
                      : t("CommonButtons.Manage")
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
                  <span className={`${cs.deletedSupplierText} she-text`}>
                    {t("MarginMessages.SupplierIsDeleted")}
                  </span>
                </div>
              )}
            </div>
          )}
          <Separator />
          <span className="she-title">
            {t("PurchaseForm.Labels.PurchaseDateTitle")}
          </span>
          <SheDatePicker
            icon={CalendarRange}
            fullWidth
            label={t("PurchaseForm.Labels.PurchaseDate")}
            date={selectedPurchase?.date}
            onSelectDate={(date) => setSelectedDate(date)}
          />
          <SheTextArea
            fullWidth
            label={t("PurchaseForm.Labels.PurchaseNotes")}
            placeholder={t("PurchaseForm.Placeholders.PurchaseNotes")}
            value={selectedPurchase?.documentNotes || null}
            onDelay={(value: string) => setPurchaseNotes(value)}
          />
          <div className={cs.purchaseButtonBlock}>
            <SheButton
              variant={"secondary"}
              value={t("CommonButtons.Cancel")}
              onClick={() => onAction("closeSupplierCard")}
            />
            <SheButton
              value={
                !selectedPurchase?.purchaseId
                  ? "Create Purchase"
                  : t("CommonButtons.Save")
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
    </SheProductCard>
  );
}
