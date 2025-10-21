import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import { Plus, UserMinus, UserPlus } from "lucide-react";

import cs from "./OrderConfigurationCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { OrderDiscountsGridColumns } from "@/components/complex/grid/custom-grids/order-discounts-grid/OrderDiscountsGridColumns.tsx";
import { OrderShipmentsRateGridColumns } from "@/components/complex/grid/custom-grids/order-shipments-rate-grid/OrderShipmentsRateGridColumns.tsx";
import { formatDate, getInitials } from "@/utils/helpers/quick-helper.ts";
import { convertToSelectItems } from "@/utils/converters/primitive-components/she-select-convertors.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import { IOrderConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IOrderConfigurationCard.ts";

export default function OrderConfigurationCard({
  isLoading,
  isDiscountsGridLoading,
  isShipmentsGridLoading,
  order,
  shipmentsRate,
  statuses,
  onAction,
}: IOrderConfigurationCard) {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== LAYOUT
  return (
    <SheProductCard
      loading={isLoading}
      className={cs.orderConfigurationCard}
      title={translate("CardTitles.OrderConfiguration", { orderId: order?.id })}
      showNotificationCard
      notificationCardProps={{
        title: "Cancel Order",
        titleTransKey: "CardTitles.CancelOrder",
        text: "The order will be cancelled and the stock allocated will be made available for purchase",
        textTransKey: "ConfirmationMessages.CancelOrder",
        onClick: () => onAction("deleteOrder", order.id),
      }}
    >
      <div className={cs.orderConfigurationCardContent}>
        <div className={cs.orderConfigurationCardItem}>
          <span className="she-text">
            {translate("OrderForm.Labels.CreatedAt")}
          </span>
          <span className="she-text">{formatDate(order?.date, "date")}</span>
        </div>
        <div className={cs.orderConfigurationCardItem}>
          <span className="she-text">
            {translate("OrderForm.Labels.OrderStatus")}
          </span>
          <SheSelect<string>
            selected={order?.orderStatus || null}
            items={convertToSelectItems(statuses, {
              text: "statusName",
              value: "id",
            })}
            hideFirstOption
            minWidth="170px"
            maxWidth="170px"
            onSelect={(value) => {
              onAction("updateOrder", { orderStatus: value });
            }}
          />
        </div>
        <div className={cs.orderConfigurationCardItem}>
          <span className="she-text">
            {translate("OrderForm.Labels.PaymentStatus")}
          </span>
          <span className="she-text">{order?.paymentStatus}</span>
        </div>
        <div className={cs.orderConfigurationCardItem}>
          <span className="she-text">
            {translate("OrderForm.Labels.ShipmentStatus")}
          </span>
          <span className="she-text">{order?.shipmentStatus}</span>
        </div>
        <Separator />
        <div className={cs.orderConfigurationCardItem}>
          <span className="she-title">
            {translate("SectionTitles.Customer")}
          </span>
          <SheButton
            value={order?.customer ? "Change Customer" : "Select Customer"}
            valueTransKey={
              order?.customer
                ? "SpecialText.ChangeCustomer"
                : "OrderActions.SelectCustomer"
            }
            icon={order?.customer ? UserMinus : UserPlus}
            variant="secondary"
            onClick={() => onAction("openSelectEntityCard")}
          />
        </div>
        {order?.customer && (
          <div className={cs.customerInfo}>
            <div className={cs.orderConfigurationCardItem}>
              <span className="she-text">
                {translate("CustomerForm.Labels.Name")}
              </span>
              <div className={cs.customerInfoAvatarBlock}>
                {order?.customer.thumbnailUrl ? (
                  <img
                    src={order?.customer.thumbnailUrl}
                    alt={order?.customer.customerName}
                    className={cs.avatarImage}
                  />
                ) : (
                  <div className={cs.avatarInitials}>
                    {getInitials(order?.customer.customerName)}
                  </div>
                )}
                <span className="she-subtext">
                  {order?.customer.customerName}
                </span>
              </div>
            </div>
            {order?.customer.email && (
              <div className={cs.orderConfigurationCardItem}>
                <span className="she-text">
                  {translate("CustomerForm.Labels.Email")}
                </span>
                <span className="she-subtext">{order?.customer.email}</span>
              </div>
            )}
            {order?.customer.phone && (
              <div className={cs.orderConfigurationCardItem}>
                <span className="she-text">
                  {translate("CustomerForm.Labels.PhoneNumber")}
                </span>
                <span className="she-subtext">{order?.customer.phone}</span>
              </div>
            )}
          </div>
        )}
        <Separator />
        <div className={cs.orderConfigurationCardItem}>
          <span className="she-title">
            {translate("SectionTitles.Discount")}
          </span>
          <SheButton
            value="Apply Discount"
            valueTransKey="OrderActions.ApplyDiscount"
            icon={Plus}
            variant="secondary"
            onClick={() => onAction("openSelectDiscountCard")}
          />
        </div>
        <div className={cs.orderDiscountsGridWrapper}>
          <SheGrid
            className={cs.orderDiscountsGrid}
            isLoading={isDiscountsGridLoading}
            showHeader={false}
            columns={OrderDiscountsGridColumns({
              onAction,
            })}
            data={order?.discounts}
            customMessage="There are no discounts applied"
            customMessageTransKey="OrderMessages.NoDiscountsApplied"
          />
          <div className={cs.gridFooter}>
            <div className={cs.gridFooterItems}>
              <span className={cs.gridFooterItem}>
                {translate("OrderForm.Labels.DiscountTotal")}
              </span>
              <span className={cs.gridFooterItem}>{order?.discountAmount}</span>
            </div>
          </div>
        </div>
        <Separator />
        <div className={cs.orderConfigurationCardItem}>
          <span className="she-title">
            {translate("SectionTitles.Shipment")}
          </span>
          <SheButton
            value="Set Shipment Rate"
            valueTransKey="OrderActions.SetShipmentRate"
            icon={Plus}
            variant="secondary"
          />
        </div>
        <SheGrid
          isLoading={isShipmentsGridLoading}
          columns={
            OrderShipmentsRateGridColumns({
              onAction,
            }) as ColumnDef<DataWithId>[]
          }
          showHeader={false}
          data={shipmentsRate}
          customMessage="Shipment rate is not set yet"
          customMessageTransKey="OrderMessages.ShipmentRateNotSet"
        />
        <span className="she-title">{translate("SectionTitles.Summary")}</span>
        <div className={cs.orderSummaryItems}>
          <div className={cs.orderSummaryItem}>
            <span className="she-text">
              {translate("OrderForm.Labels.ProductsSubtotal")}
            </span>
            <span className="she-text">{order?.orderSubTotal?.subtotal}</span>
          </div>
          <div className={cs.orderSummaryItem}>
            <span className="she-text">
              {translate("OrderForm.Labels.TotalWithDiscountAndShipment")}
            </span>
            <span className="she-text">
              {order?.orderSubTotal?.totalWithDiscountAndShipment}
            </span>
          </div>
          <div className={cs.orderSummaryItem}>
            <span className="she-text">
              {translate("OrderForm.Labels.Profit")}
            </span>
            <span className="she-text">{order?.orderSubTotal?.profit}</span>
          </div>
        </div>
        <Separator />
      </div>
    </SheProductCard>
  );
}
