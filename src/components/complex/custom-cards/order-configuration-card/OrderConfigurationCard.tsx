import { Plus, Trash2, UserMinus, UserPlus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useTranslation } from "react-i18next";

import { DndGridDataTable } from "@/components/complex/grid/SheGrid.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./OrderConfigurationCard.module.scss";
import { IOrderConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IOrderConfigurationCard.ts";
import { formatDate, getInitials } from "@/utils/helpers/quick-helper.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { StatusModel } from "@/const/models/StatusModel.ts";
import { Separator } from "@/components/ui/separator.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { OrderDiscountsGridColumns } from "@/components/complex/grid/custom-grids/order-discounts-grid/OrderDiscountsGridColumns.tsx";
import { OrderShipmentsRateGridColumns } from "@/components/complex/grid/custom-grids/order-shipments-rate-grid/OrderShipmentsRateGridColumns.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

export default function OrderConfigurationCard({
  isLoading,
  isDiscountsGridLoading,
  order,
  shipmentsRate,
  statuses,
  onAction,
}: IOrderConfigurationCard) {
  const { t } = useTranslation();

  function convertStatusesToSelectItems(
    data: StatusModel[],
  ): ISheSelectItem<any>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.id,
        text: item.statusName,
      }),
    );
  }

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.orderConfigurationCard}
      title={t("CardTitles.OrderConfiguration", { orderId: order?.id })}
      showNotificationCard
      notificationCardProps={{
        title: "Cancel Order",
        titleTransKey: "CardTitles.CancelOrder",
        text: "The order will be cancelled and the stock allocated will be made available for purchase",
        textTransKey: "ConfirmationMessages.CancelOrder",
        buttonText: "Delete",
        buttonTextTransKey: "CommonButtons.Delete",
        buttonColor: "#EF4343",
        buttonIcon: Trash2,
        onClick: () => onAction("deleteOrder", order.id),
      }}
    >
      <div className={cs.orderConfigurationCardContent}>
        <div className={cs.orderConfigurationCardItem}>
          <span className="she-text">{t("OrderForm.Labels.CreatedAt")}</span>
          <span className="she-text">{formatDate(order?.date, "date")}</span>
        </div>
        <div className={cs.orderConfigurationCardItem}>
          <span className="she-text">{t("OrderForm.Labels.OrderStatus")}</span>
          <SheSelect<string>
            selected={order?.orderStatus || null}
            items={convertStatusesToSelectItems(statuses)}
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
            {t("OrderForm.Labels.PaymentStatus")}
          </span>
          <span className="she-text">{order?.paymentStatus}</span>
        </div>
        <div className={cs.orderConfigurationCardItem}>
          <span className="she-text">
            {t("OrderForm.Labels.ShipmentStatus")}
          </span>
          <span className="she-text">{order?.shipmentStatus}</span>
        </div>
        <Separator />
        <div className={cs.orderConfigurationCardItem}>
          <span className="she-title">{t("SectionTitles.Customer")}</span>
          <SheButton
            variant="secondary"
            value={
              order?.customer
                ? t("SpecialText.ChangeCustomer")
                : t("OrderActions.SelectCustomer")
            }
            icon={order?.customer ? UserMinus : UserPlus}
            onClick={() => onAction("openSelectEntityCard")}
          />
        </div>
        {order?.customer && (
          <div className={cs.customerInfo}>
            <div className={cs.orderConfigurationCardItem}>
              <span className="she-text">{t("CustomerForm.Labels.Name")}</span>
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
                  {t("CustomerForm.Labels.Email")}
                </span>
                <span className="she-subtext">{order?.customer.email}</span>
              </div>
            )}
            {order?.customer.phone && (
              <div className={cs.orderConfigurationCardItem}>
                <span className="she-text">
                  {t("CustomerForm.Labels.PhoneNumber")}
                </span>
                <span className="she-subtext">{order?.customer.phone}</span>
              </div>
            )}
          </div>
        )}
        <Separator />
        <div className={cs.orderConfigurationCardItem}>
          <span className="she-title">{t("SectionTitles.Discount")}</span>
          <SheButton
            variant="secondary"
            value={t("OrderActions.ApplyDiscount")}
            icon={Plus}
            onClick={() => onAction("openSelectDiscountCard")}
          />
        </div>
        <div className={cs.orderDiscountsGridWrapper}>
          <DndGridDataTable
            className={cs.orderDiscountsGrid}
            isLoading={isDiscountsGridLoading}
            showHeader={false}
            columns={
              OrderDiscountsGridColumns({
                onAction,
              }) as ColumnDef<DataWithId>[]
            }
            data={order?.discounts}
            customMessage={t("OrderMessages.NoDiscountsApplied")}
          />
          <div className={cs.gridFooter}>
            <div className={cs.gridFooterItems}>
              <span className={cs.gridFooterItem}>
                {t("OrderForm.Labels.DiscountTotal")}
              </span>
              <span className={cs.gridFooterItem}>{order?.discountAmount}</span>
            </div>
          </div>
        </div>
        <Separator />
        <div className={cs.orderConfigurationCardItem}>
          <span className="she-title">{t("SectionTitles.Shipment")}</span>
          <SheButton
            variant="secondary"
            value={t("OrderActions.SetShipmentRate")}
            icon={Plus}
          />
        </div>
        <DndGridDataTable
          columns={
            OrderShipmentsRateGridColumns({
              onAction,
            }) as ColumnDef<DataWithId>[]
          }
          showHeader={false}
          data={shipmentsRate}
          customMessage={t("OrderMessages.ShipmentRateNotSet")}
        />
        <span className="she-title">{t("SectionTitles.Summary")}</span>
        <div className={cs.orderSummaryItems}>
          <div className={cs.orderSummaryItem}>
            <span className="she-text">
              {t("OrderForm.Labels.ProductsSubtotal")}
            </span>
            <span className="she-text">{order?.orderSubTotal?.subtotal}</span>
          </div>
          <div className={cs.orderSummaryItem}>
            <span className="she-text">
              {t("OrderForm.Labels.TotalWithDiscountAndShipment")}
            </span>
            <span className="she-text">
              {order?.orderSubTotal?.totalWithDiscountAndShipment}
            </span>
          </div>
          <div className={cs.orderSummaryItem}>
            <span className="she-text">{t("OrderForm.Labels.Profit")}</span>
            <span className="she-text">{order?.orderSubTotal?.total}</span>
          </div>
        </div>
        <Separator />
      </div>
    </SheProductCard>
  );
}
