import React, { useState } from "react";

import { ImageIcon, Link2, Plus, RefreshCcw } from "lucide-react";

import cs from "./AddStockCard.module.scss";
import { Separator } from "@/components/ui/separator.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import AddStockForm from "@/components/forms/add-stock-form/AddStockForm.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { formatDate } from "@/utils/helpers/quick-helper.ts";
import { IAddStockCard } from "@/const/interfaces/complex-components/custom-cards/IAddStockCard.ts";

export default function AddStockCard({
  isLoading,
  variant,
  onAction,
  taxTypes,
  purchase,
  currencyTypes,
  ...props
}: IAddStockCard) {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();
  const [addStockFormData, setAddStockFormData] = useState<any>(undefined);

  // ==================================================================== EVENT HANDLERS
  function onSubmitHandler() {
    const formattedData = {
      priceModel: {
        variantId: variant.variantId,
        unitsAmount: addStockFormData.unitsAmount,
        nettoPrice: addStockFormData.nettoPrice,
        taxTypeId: addStockFormData.taxTypeId,
        currencyId: addStockFormData.currencyId,
      },
      purchaseId: Number(purchase.purchaseId),
    };
    onAction("increaseStockAmount", formattedData);
  }

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.addStockCard}
      title={`${translate("StockActions.AddToStock")} ${variant?.variantName} ${translate("SectionTitles.Product")}`}
      width="411px"
      isLoading={isLoading}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeAddStockCard")}
      {...props}
    >
      <div className={cs.addStockCardContent}>
        <AddStockForm
          currencyTypes={currencyTypes}
          taxTypes={taxTypes}
          onHandleUpData={(data) => setAddStockFormData(data)}
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
        <div className={cs.footerButtons}>
          <SheButton
            variant="secondary"
            value="Cancel"
            onClick={() => onAction("closeAddStockCard")}
          />
          <SheButton
            icon={Plus}
            value="Add to Stock"
            disabled={!purchase || !addStockFormData}
            onClick={onSubmitHandler}
          />
        </div>
      </div>
    </SheCard>
  );
}
