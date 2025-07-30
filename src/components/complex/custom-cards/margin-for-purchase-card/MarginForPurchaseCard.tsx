import { Cog, ReceiptEuro, Undo2 } from "lucide-react";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./MarginForPurchaseCard.module.scss";
import { IMarginForPurchaseCard } from "@/const/interfaces/complex-components/custom-cards/IMarginForPurchaseCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import MarginConfigurationForm from "@/components/forms/margin-configuration-form/MarginConfigurationForm.tsx";

export default function MarginForPurchaseCard({
  isLoading,
  margin,
  onAction,
}: IMarginForPurchaseCard) {
  return (
    <SheProductCard
      loading={isLoading}
      title="Margin For Purchase"
      className={cs.marginForPurchaseCard}
    >
      <div className={cs.marginForPurchaseCardContent}>
        <div className={cs.electedMarginBlock}>
          <span className="she-text">Select the margin for the purchase</span>
          <SheButton
            icon={ReceiptEuro}
            variant="secondary"
            value="Select Margin"
            onClick={() => onAction("openSelectMarginCard")}
          />
        </div>
        {margin && (
          <div className={cs.marginDetails}>
            <div className={cs.marginActions}>
              <div className={cs.marginActionsTitleBlock}>
                <span
                  className={`${margin.isDeleted ? cs.marginIsDeletedTitle : ""} she-title`}
                >
                  {margin.marginName}
                </span>
              </div>
              <div className={cs.marginActionsButtonBlock}>
                {margin?.marginRule?.modified && (
                  <SheButton
                    icon={Undo2}
                    txtColor={"#fff"}
                    bgColor={"#007AFF"}
                    onClick={() =>
                      onAction("restoreMarginRules", margin.marginId)
                    }
                  />
                )}
                <SheButton
                  icon={Cog}
                  value={"Manage"}
                  variant="secondary"
                  onClick={() => onAction("manageSelectedMargin", margin)}
                />
              </div>
            </div>
            {margin.isDeleted && (
              <div className={cs.marginIsDeletedBlock}>
                <span className="she-text">{`>_ The margin is deleted`}</span>
              </div>
            )}
            <Separator />
            <MarginConfigurationForm
              className={cs.marginConfigurationCardForm}
              data={margin}
              isConfigurationCard={false}
              onSubmit={(formData) =>
                onAction("updateSelectedMargin", formData)
              }
            />
          </div>
        )}
      </div>
    </SheProductCard>
  );
}
