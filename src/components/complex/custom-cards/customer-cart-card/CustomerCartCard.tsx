import React, { useEffect, useState } from "react";
import {
  Box,
  CalendarClock,
  CalendarOff,
  CircleSlash,
  Clock10,
  Link2,
  MessageCircle,
  Plus,
  Tags,
  UserPlus,
} from "lucide-react";
import cs from "./CustomerCartCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { CartContentGridColumns } from "@/components/complex/grid/custom-grids/cart-content-grid/CartContentGridColumns.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { formatDate } from "@/utils/helpers/quick-helper.ts";
import { ICustomerCartCard } from "@/const/interfaces/complex-components/custom-cards/ICustomerCartCard.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import SheBadgeList from "@/components/primitive/she-badge-list/SheBadgeList.tsx";
import CustomerInfoLayout from "@/components/layouts/customer-info-layout/CustomerInfoLayout.tsx";
import { CountdownLayout } from "@/components/layouts/countdown-layout/CountdownLayout.tsx";
import {
  CartPrepackedStatusEnum,
  CartPrepackedStatusLabels,
} from "@/const/enums/CartPrepackedStatusEnum.ts";

export default function CustomerCartCard({
  isLoading,
  isGridLoading,
  cartContent,
  onAction,
}: ICustomerCartCard) {
  // ==================================================================== STATE MANAGEMENT
  const [stockActionsData, setStockActionsData] = useState(undefined);

  const statusClass = (status: string) => {
    if (status === "New") {
      return cs.cartStatusNew;
    } else if (status === "Expired") {
      return cs.cartStatusExpired;
    } else if (status === "Draft") {
      return cs.cartStatusDraft;
    } else if (status === "Cancelled") {
      return cs.cartStatusCancelled;
    } else if (status === "Purchased") {
      return cs.cartStatusPurchased;
    }
  };

  // ==================================================================== SIDE EFFECTS

  useEffect(() => {
    if (!cartContent?.stockActions) return;

    setStockActionsData(
      cartContent?.stockActions.map((stockAction) => ({
        ...stockAction,
        id: stockAction.variantId,
        expandableRows:
          stockAction.variantStockActions?.length > 0
            ? stockAction.variantStockActions
            : [
                {
                  brutto: null,
                  unitsAmount: null,
                },
              ],
      })),
    );
  }, [cartContent?.stockActions]);

  // ==================================================================== PRIVATE

  function convertStatusesToSelectItems(): ISheSelectItem<string>[] {
    return Object.values(CartPrepackedStatusEnum).map((status) => ({
      value: status,
      text: CartPrepackedStatusLabels[status],
    }));
  }

  // function renderExpandedContent(row) {
  //   return (
  //     <ProductsInCartForm
  //       data={row.original}
  //       onSubmit={(formData) =>
  //         onAction("updateStockAction", { formData, row })
  //       }
  //       onDelete={() => onAction("deleteStockAction", row.original)}
  //     />
  //   );
  // }

  // ==================================================================== LAYOUT
  return (
    <div>
      <SheCard
        isLoading={isLoading}
        className={cs.customerCartCard}
        title={cartContent ? `Manage Cart: ${cartContent.id}` : "Create Cart"}
        minWidth="600px"
        showCloseButton
        onSecondaryButtonClick={() => onAction("closeCustomerCartCard")}
      >
        <div className={cs.customerCartCardContent}>
          <div className={cs.customerCartCardHeaderBlock}>
            {cartContent ? (
              <CustomerInfoLayout customer={cartContent.customer} />
            ) : (
              <span className="she-text">Select customer to compose cart</span>
            )}
            <div className={cs.cardHeaderButtonBlock}>
              {cartContent && (
                <SheButton
                  icon={MessageCircle}
                  variant="secondary"
                  value="Message"
                  onClick={() => {
                    onAction("openSendMessageCard");
                  }}
                />
              )}
              <SheButton
                icon={cartContent ? Link2 : UserPlus}
                variant="secondary"
                value={cartContent ? "Manage" : "Select Customer"}
                onClick={() => {
                  cartContent
                    ? onAction("manageCustomer", cartContent.customer)
                    : onAction("openSelectEntityCard");
                }}
              />
            </div>
          </div>
          {cartContent && (
            <div className={cs.customerCartCardTagsBlock}>
              <SheBadgeList
                icon={Tags}
                fullWidth
                placeholder="Tag User"
                className={cs.customerCartCardTags}
              />
            </div>
          )}
          <Separator />
          <div className={cs.customerCartCardCartBlock}>
            <div className={cs.cartContentBlock}>
              <div className={cs.cartContentTitle}>
                <span className="she-title">Cart content</span>
                <SheSelect
                  items={convertStatusesToSelectItems()}
                  icon={Box}
                  selected={cartContent?.prepackedCartStatus}
                  hideFirstOption
                  minWidth="160px"
                  maxWidth="160px"
                  onSelect={(value) =>
                    onAction("updateCartPrepackedStatus", value)
                  }
                />
              </div>
              {cartContent && (
                <SheButton
                  icon={Plus}
                  variant="default"
                  value="Add Product"
                  onClick={() => onAction("openFindProductsCard")}
                />
              )}
            </div>
            <SheGrid
              className={cs.stockActionsGrid}
              key={stockActionsData?.length}
              isLoading={isGridLoading}
              showHeader={false}
              data={stockActionsData}
              columns={CartContentGridColumns(onAction)}
              customMessage="Customer does not have any items in cart"
              // enableExpansion={true}
              // renderExpandedContent={renderExpandedContent}
              // getExpandedRowClassName={(_row) =>
              //   `${cs.extendedRowStyles} ${statusClass(cartContent?.status)}`
              // }
            />
            <div className={cs.cardFooterBlock}>
              {cartContent && (
                <div className={cs.summaryBlock}>
                  <span className="she-title">Cart Summary</span>
                  <div className={`${cs.summaryBlockItem} she-text`}>
                    <span className="she-text">Products Total</span>
                    <span className="she-text">{`${cartContent.sumAmount} ${cartContent?.currency.briefName}`}</span>
                  </div>
                  <div className={`${cs.summaryBlockItem} she-text`}>
                    <span className="she-text">Profit</span>
                    <span className="she-text">{`${cartContent?.profit} ${cartContent?.currency.briefName}`}</span>
                  </div>
                </div>
              )}
              {cartContent?.stockActions.length > 0 && (
                <>
                  <div
                    className={`${cs.expirationTimeManagementBlock} ${statusClass(cartContent?.status)}`}
                  >
                    <div className={cs.expirationTimeBlock}>
                      <div
                        className={`${cs.cartStatus} ${statusClass(cartContent?.status)}`}
                      >
                        <span>{cartContent?.status}</span>
                      </div>
                      <div className={cs.expirationTime}>
                        <div className={cs.expirationTimeText}>
                          <span className="she-text">
                            {formatDate(cartContent?.date, "datetime")}
                          </span>
                          {cartContent?.countdown && (
                            <CountdownLayout
                              className="she-text"
                              date={cartContent?.date}
                              mode="timer"
                            />
                          )}
                        </div>
                        <div className={cs.expirationTimeSubtext}>
                          <SheIcon
                            icon={Clock10}
                            color="#64748b"
                            maxWidth="12px"
                            maxHeight="12px"
                          />
                          <span className="she-subtext">
                            Cart will expire automatically
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={cs.expirationTimeButtonBlock}>
                      <SheButton
                        className={`${cs.addTimeButton} ${cs.expirationTimeButton} `}
                        variant="secondary"
                        value="+1"
                        onClick={() => {}}
                      />
                      <SheButton
                        className={cs.expirationTimeButton}
                        variant="secondary"
                        icon={CalendarClock}
                        onClick={() => {}}
                      />
                      <SheButton
                        className={cs.expirationTimeButton}
                        variant="secondary"
                        icon={CalendarOff}
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                  <div className={cs.footerButtonsBlock}>
                    <SheButton
                      icon={CircleSlash}
                      variant="secondary"
                      value="Cancel Cart"
                      onClick={() => onAction("cancelCart")}
                    />
                    <SheButton
                      icon={Plus}
                      variant="info"
                      value="Create Order"
                      onClick={() => onAction("createOrder")}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </SheCard>
    </div>
  );
}
