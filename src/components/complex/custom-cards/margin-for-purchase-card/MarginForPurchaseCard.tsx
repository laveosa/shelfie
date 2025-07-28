import { MoreHorizontal, ReceiptEuro, Undo2 } from "lucide-react";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./MarginForPurchaseCard.module.scss";
import { IMarginForPurchaseCard } from "@/const/interfaces/complex-components/custom-cards/IMarginForPurchaseCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";

export default function MarginForPurchaseCard({
  isLoading,
  margin,
  onAction,
}: IMarginForPurchaseCard) {
  return (
    <div>
      <SheProductCard
        loading={isLoading}
        title="Margin For Purchase"
        className={cs.marginForPurchaseCard}
      >
        <div className={cs.marginForPurchaseCardContent}>
          {!margin && (
            <div className={cs.noSelectedMargin}>
              <span className="she-text">
                Select the margin for the purchase
              </span>
              <SheButton
                icon={ReceiptEuro}
                variant="secondary"
                value="Select Margin"
                onClick={() => onAction("openSelectMarginCard")}
              />
            </div>
          )}
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
                  {margin.marginRule.modified ||
                    (!margin.isDeleted && (
                      <SheButton
                        icon={Undo2}
                        txtColor={"#fff"}
                        bgColor={"#007AFF"}
                        onClick={() =>
                          onAction("restoreMarginRules", margin.marginId)
                        }
                      />
                    ))}
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
                      <DropdownMenuItem
                        onClick={() => onAction("manageSelectedMargin", margin)}
                      >
                        Manage margin
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onAction("replaceMargin")}
                      >
                        Replace margin
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onAction("detachMargin")}
                      >
                        Detach margin
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {margin.isDeleted && (
                <div className={cs.marginIsDeletedBlock}>
                  <span className="she-text">{`>_ The margin is deleted`}</span>
                </div>
              )}
              <Separator />
              <div className={cs.marginDetailsConfiguration}>
                <span className="she-title">Configure Margin Details</span>
                <div className={cs.marginDetailsItems}>
                  <div className={cs.marginDetailsItem}>
                    <SheInput
                      value={margin.marginRule.desiredProfit}
                      label="Desired profit (in %)"
                      disabled={true}
                    />
                    <span className="she-subtext">
                      The profit is calculated based on the purchase price,
                      other percentages do not intersect with it, but they
                      result in single total
                    </span>
                  </div>
                  <div className={cs.marginDetailsItem}>
                    <SheInput
                      value={margin.marginRule.plannedDiscount}
                      label="Planned discount (in %)"
                      disabled={true}
                    />
                    <span className="she-subtext">
                      Planned discount is the part of the price you are planning
                      to eventually reduce. For example, you can add 20 pln to
                      the price of an item, so later, you could reduce the price
                      automatically up to this amount. If you don’t want to
                      budget for discount, just leave the field empty.
                    </span>
                  </div>
                  <div className={cs.marginDetailsItem}>
                    <SheInput
                      value={margin.marginRule.fixedCosts}
                      label="Fixed costs (in PLN)"
                      disabled={true}
                    />
                    <span className="she-subtext">
                      If you have fixed costs associated with every single
                      purchase, this is a place to add them in. The fixed costs
                      are for example cost of package, or fraction of the
                      shipping fee. If you don’t want to count that in, leave
                      the field empty.
                    </span>
                  </div>
                  <div>
                    <SheToggle
                      type={SheToggleTypeEnum.SWITCH}
                      checked={margin.marginRule.roundTo}
                      disabled={true}
                      text="Round Brutto price to full number"
                      description="(This configuration rounds up all cents to full number)"
                    />
                  </div>
                  <div>
                    <SheToggle
                      type={SheToggleTypeEnum.SWITCH}
                      checked={margin.marginRule.nearest9}
                      disabled={true}
                      text="Jump the price to nearest 9"
                      description="(This configuration changes the last digit of the price to nearest 9. For example 61 will become 59, but 39 will become 39)"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheProductCard>
    </div>
  );
}
