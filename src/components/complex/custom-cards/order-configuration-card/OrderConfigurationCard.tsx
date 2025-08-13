import { Plus, Trash2, UserMinus, UserPlus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./OrderConfigurationCard.module.scss";
import { IOrderConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IOrderConfigurationCard.ts";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";
import { formatDate, getInitials } from "@/utils/helpers/quick-helper.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { StatusModel } from "@/const/models/StatusModel.ts";
import { Separator } from "@/components/ui/separator.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { OrderDiscountsGridColumns } from "@/components/complex/grid/order-discounts-grid/OrderDiscountsGridColumns.tsx";

export default function OrderConfigurationCard({
  isLoading,
  isDiscountsGridLoading,
  order,
  statuses,
  onAction,
}: IOrderConfigurationCard) {
  function convertStatusesToSelectItems(data: StatusModel[]): ISheSelectItem[] {
    return data?.map(
      (item): ISheSelectItem => ({
        value: item.id,
        text: item.statusName,
      }),
    );
  }

  return (
    <SheProductCard
      loading={isLoading}
      title={`Order nr ${order?.id}`}
      className={cs.orderConfigurationCard}
    >
      <div className={cs.orderConfigurationCardContentWrapper}>
        <div className={cs.orderConfigurationCardContent}>
          <div className={cs.orderConfigurationCardItem}>
            <span className="she-text">Created at</span>
            <span className="she-text">{formatDate(order?.date, "date")}</span>
          </div>
          <div className={cs.orderConfigurationCardItem}>
            <span className="she-text">Order status</span>
            <SheSelect
              selected={order?.orderStatus}
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
            <span className="she-text">Payment status</span>
            <span className="she-text">{order?.paymentStatus}</span>
          </div>
          <div className={cs.orderConfigurationCardItem}>
            <span className="she-text">Shipment status</span>
            <span className="she-text">{order?.shipmentStatus}</span>
          </div>
          <Separator />
          <div className={cs.orderConfigurationCardItem}>
            <span className="she-title">Customer</span>
            <SheButton
              variant="secondary"
              value={order?.customer ? "Change Customer" : "Select Customer"}
              icon={order?.customer ? UserMinus : UserPlus}
              onClick={() => onAction("openSelectEntityCard")}
            />
          </div>
          {order?.customer && (
            <div className={cs.customerInfo}>
              <div className={cs.orderConfigurationCardItem}>
                <span className="she-text">Name</span>
                <div className={cs.customerInfoAvatarBlock}>
                  {order?.customer.thumbnailUrl ? (
                    <img
                      src={order?.customer.thumbnailUrl}
                      alt={order?.customer.name}
                      className={cs.avatarImage}
                    />
                  ) : (
                    <div className={cs.avatarInitials}>
                      {getInitials(order?.customer.name)}
                    </div>
                  )}
                  <span className="she-subtext">{order?.customer.name}</span>
                </div>
              </div>
              {order?.customer.email && (
                <div className={cs.orderConfigurationCardItem}>
                  <span className="she-text">Email</span>
                  <span className="she-subtext">{order?.customer.email}</span>
                </div>
              )}
              {order?.customer.phone && (
                <div className={cs.orderConfigurationCardItem}>
                  <span className="she-text">Phone</span>
                  <span className="she-subtext">{order?.customer.phone}</span>
                </div>
              )}
            </div>
          )}
          <Separator />
          <div className={cs.orderConfigurationCardItem}>
            <span className="she-title">Discount</span>
            <SheButton
              variant="secondary"
              value="Apply Discount"
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
              customMessage="There are no discounts applied"
            />
            <div className={cs.gridFooter}>
              <div className={cs.gridFooterItems}>
                <span className={cs.gridFooterItem}>Discount total</span>
                <span className={cs.gridFooterItem}>99,59 PLN</span>
              </div>
            </div>
          </div>
          <Separator />
          <div className={cs.orderConfigurationCardItem}>
            <span className="she-title">Shipment</span>
            <SheButton
              variant="secondary"
              value="Set Shipment Rate"
              icon={Plus}
            />
          </div>
          {/*<DndGridDataTable columns={} data={} />*/}
          <span className="she-title">Summary</span>
          <div className={cs.orderSummaryItems}>
            <div className={cs.orderSummaryItem}>
              <span className="she-text">Products Subtotal</span>
              <span className="she-text">0</span>
            </div>
            <div className={cs.orderSummaryItem}>
              <span className="she-text">Total with discount and shipment</span>
              <span className="she-text">0</span>
            </div>
            <div className={cs.orderSummaryItem}>
              <span className="she-text">Profit</span>
              <span className="she-text">0</span>
            </div>
          </div>
          <Separator />
        </div>
        <SheCardNotification
          title="Cancel Order"
          text="The order will be cancelled and the stock allocated will be made available for purchase"
          buttonColor="#EF4343"
          buttonVariant="outline"
          buttonText="Delete"
          buttonIcon={Trash2}
          onClick={() => onAction("deleteOrder", order.id)}
        />
      </div>
    </SheProductCard>
  );
}
