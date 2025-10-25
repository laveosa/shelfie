import { UseFormReturn } from "react-hook-form";
import React, { useState } from "react";

import { ImageIcon, Link2, Plus, RefreshCcw } from "lucide-react";

import cs from "./AddStockCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import AddStockForm from "@/components/forms/add-stock-form/AddStockForm.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { formatDate } from "@/utils/helpers/quick-helper.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { IAddStockCard } from "@/const/interfaces/complex-components/custom-cards/IAddStockCard.ts";
import { convertToSelectItems } from "@/utils/converters/primitive-components/she-select-convertors.ts";
import { AppFormType } from "@/const/types/AppFormType.ts";

export default function AddStockCard({
  isLoading,
  variant,
  onAction,
  taxTypes,
  purchase,
  currencyTypes,
  ...props
}: IAddStockCard) {
  // ==================================================================== STATE MANAGEMENT
  const [_isFormValid, setIsFormValid] = useState<boolean>(null);
  const [formData, setFormData] = useState<any>(undefined);

  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== EVENT HANDLERS
  function onAddStockChangeHandler(
    value: any,
    form: UseFormReturn<AppFormType<any>>,
  ) {
    setIsFormValid(form.formState?.isValid);
    setFormData(value);
  }

  function onSubmitHandler() {
    const formattedData = {
      priceModel: {
        variantId: variant.variantId,
        unitsAmount: formData.unitsAmount,
        nettoPrice: formData.nettoPrice,
        taxTypeId: formData.taxTypeId,
        currencyId: formData.currencyId,
      },
      purchaseId: Number(purchase.purchaseId),
    };
    onAction("increaseStockAmount", formattedData);
  }

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.addStockCard}
      title="Add product to stock"
      titleTransKey="StockActions.AddProductToStock"
      description={`${translate("SectionTitles.Product")}: "${variant?.variantName}"`}
      isLoading={isLoading}
      showCloseButton
      showFooter={false}
      onSecondaryButtonClick={() => onAction("closeAddStockCard")}
      {...props}
    >
      <div className={cs.addStockCardContent}>
        <AddStockForm
          currencyTypes={convertToSelectItems(currencyTypes, {
            text: "name",
            value: "id",
          })}
          taxTypes={convertToSelectItems(taxTypes, {
            text: "name",
            value: "id",
          })}
          onChange={onAddStockChangeHandler}
        />
        <Separator />
        {purchase ? (
          <div className={cs.connectedPurchase}>
            <div className={cs.connectedPurchaseInfo}>
              <div className={cs.connectedPurchaseHeader}>
                <div className={cs.connectedPurchaseHeaderTitle}>
                  <span className="she-title">Connected Purchase</span>
                  <span className="she-subtext">
                    If this is not the right purchase :{" "}
                  </span>
                </div>
                <SheButton
                  icon={RefreshCcw}
                  variant="secondary"
                  value={"Replace Purchase"}
                  onClick={() => onAction("openSelectPurchaseCard")}
                />
              </div>
              <div className={cs.connectedPurchaseSupplier}>
                <div className={cs.supplierInfo}>
                  {purchase.supplier?.thumbnailUrl ? (
                    <div className={cs.supplierInfoImageWrapper}>
                      <img
                        src={purchase.supplier?.thumbnailUrl}
                        alt={purchase.supplier?.supplierName || "Supplier"}
                        className={cs.supplierInfoImage}
                      />
                    </div>
                  ) : (
                    <div className={cs.supplierInfoIcon}>
                      <SheIcon icon={ImageIcon} maxWidth="30px" />
                    </div>
                  )}
                  <div className={cs.supplierInfoDetails}>
                    <span className={cs.supplierInfoDetailsName}>
                      {purchase.supplier?.supplierName}
                    </span>
                    <span className="she-text">
                      {formatDate(purchase.date, "date")}
                    </span>
                  </div>
                </div>
                <SheButton
                  icon={Link2}
                  variant="ghost"
                  value="Purchase Details"
                  txtColor="#007AFF"
                />
              </div>
            </div>
            <div className={cs.connectedPurchaseProductsSummary}>
              <span className={cs.connectedPurchaseProductsSummaryTitle}>
                Products in purchase summary
              </span>
              <Separator />
              <div className={cs.connectedPurchaseProductsSummaryHeaders}>
                <span>Units</span>
                <span>Expense</span>
                <span>Projected value</span>
              </div>
              <Separator />
              <div className={cs.connectedPurchaseProductsSummaryInfo}>
                <div className={cs.unitsColumn}>
                  <span>{purchase.unitsAmount}</span>
                </div>
                <div className={cs.expenseColumn}>
                  <span>{`${purchase.expense} ${purchase.currencyBrief}`}</span>
                </div>
                <div className={cs.valueColumn}>
                  <span>{`${purchase.orderValueAmount} ${purchase.currencyBrief}`}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={cs.purchaseDetails}>
            <span className="she-title">Purchase Details</span>
            <span className="she-text">
              If you want to be able to track this stock change in the purchase
              section, please select the purchase this change is connected to.
            </span>
            <div className={cs.purchaseDetailsButtonBlock}>
              <SheButton
                icon={Plus}
                variant="secondary"
                value="Select Purchase"
                onClick={() => onAction("openSelectPurchaseCard")}
              />
              <span className="she-text">or</span>
              <SheButton
                icon={Plus}
                variant="secondary"
                value="Report Purchase"
                onClick={() => onAction("openSupplierCard")}
              />
            </div>
          </div>
        )}
        <Separator />
        <div className={cs.cardButtonBlock}>
          <SheButton
            icon={Plus}
            variant="secondary"
            value="Cancel"
            onClick={() => onAction("closeAddStockCard")}
          />
          <SheButton
            icon={Plus}
            variant="info"
            value="Add to Stock"
            disabled={!purchase || !_isFormValid}
            onClick={onSubmitHandler}
          />
        </div>
      </div>
    </SheCard>
  );
}
