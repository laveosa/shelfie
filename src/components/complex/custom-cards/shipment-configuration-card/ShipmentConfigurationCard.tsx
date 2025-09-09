import { Check, MapPin, Plus, Trash2, User } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useTranslation } from "react-i18next";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import {
  ShipmentStatusEnum,
  ShipmentStatusLabels,
} from "@/const/enums/ShipmentStatusEnum.ts";
import cs from "./ShipmentConfigurationCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { IShipmentConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IShipmentConfigurationCard.ts";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { formatDate, getInitials } from "@/utils/helpers/quick-helper.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { ordersInShipmentGridColumns } from "@/components/complex/grid/custom-grids/orders-in-shipment-grid/OrdersInShipmentGridColumns.tsx";
import { orderItemsInShipmentGridColumns } from "@/components/complex/grid/custom-grids/order-items-in-shipmen-grid/OrderItemsInShipmentGridColumns.tsx";
import { PackedOrderItemsGridColumns } from "@/components/complex/grid/custom-grids/packed-order-items-grid/PackedOrderItemsGridColumns.tsx";

export default function ShipmentConfigurationCard({
  isLoading,
  shipment,
  onAction,
}: IShipmentConfigurationCard) {
  const { t } = useTranslation();
  const [status, setStatus] = React.useState<ShipmentStatusEnum>();

  function convertStatusesToSelectItems(): ISheSelectItem<ShipmentStatusEnum>[] {
    return Object.values(ShipmentStatusEnum).map((status) => ({
      value: status,
      text: ShipmentStatusLabels[status],
    }));
  }

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.shipmentConfigurationCard}
      title={t("CardTitles.ShipmentConfiguration", {
        shipmentId: shipment?.shipmentId,
      })}
      width="650px"
      showCloseButton
      showNotificationCard
      notificationCardProps={{
        title: "Cancel Shipment",
        titleTransKey: "CardTitles.CancelShipment",
        text: "This variant will be deleted, it will no longer be available for sale but you will still see it in the orders where it sold",
        textTransKey: "ConfirmationMessages.CancelShipment",
        buttonText: "Delete",
        buttonTextTransKey: "CommonButtons.Delete",
        buttonColor: "#EF4343",
        buttonIcon: Trash2,
        onClick: () => onAction("deleteShipment", shipment?.shipmentId),
      }}
      onSecondaryButtonClick={() => onAction("closeShipmentConfigurationCard")}
    >
      <div className={cs.shipmentConfigurationCardContent}>
        <div className={cs.shipmentConfiguration}>
          <div className={cs.shipmentDetailsItem}>
            <span className="she-text">{t("OrderForm.Labels.CreatedAt")}</span>
            {shipment?.createdAt && (
              <span className="she-text">
                {formatDate(shipment?.createdAt, "date")}
              </span>
            )}
          </div>
          <div className={cs.shipmentDetailsItem}>
            <span className="she-text">
              {t("ShipmentForm.Labels.QueuePacking")}
            </span>
            <SheDatePicker
              maxWidth="250px"
              date={shipment?.queuePacking}
              onSelectDate={(value) =>
                onAction("changeShipmentDate", { queuePacking: value })
              }
            />
          </div>
          <div className={cs.shipmentDetailsItem}>
            <span className="she-text">
              {t("ShipmentForm.Labels.QueueShipment")}
            </span>
            <SheDatePicker
              maxWidth="250px"
              date={shipment?.queueShipment}
              onSelectDate={(value) =>
                onAction("changeShipmentDate", { queueShipment: value })
              }
            />
          </div>
          <div className={cs.shipmentDetailsItem}>
            <span className="she-text">
              {t("OrderForm.Labels.ShipmentStatus")}
            </span>
            <SheSelect
              maxWidth="250px"
              hideFirstOption
              selected={shipment?.shipmentStatus as ShipmentStatusEnum}
              items={convertStatusesToSelectItems()}
              onSelect={(value: ShipmentStatusEnum) => setStatus(value)}
            />
          </div>
          <Separator />
          <div className={cs.shipmentDetailsItem}>
            <span className={cs.subtitleText}>
              {t("SectionTitles.Customer")}
            </span>
            <SheButton
              icon={User}
              value={t("SpecialText.ChangeCustomer")}
              variant="secondary"
              onClick={() => onAction("changeCustomer")}
            />
          </div>
          {shipment?.customer && (
            <>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">
                  {t("CustomerForm.Labels.Name")}
                </span>
                <div>
                  <div className={cs.customerInfoAvatarBlock}>
                    {shipment?.customer?.thumbnailUrl ? (
                      <img
                        src={shipment?.customer?.thumbnailUrl}
                        alt={shipment?.customer?.customerName}
                        className={cs.avatarImage}
                      />
                    ) : (
                      <div className={cs.avatarInitials}>
                        {getInitials(shipment?.customer?.customerName)}
                      </div>
                    )}
                    <span className="she-text">
                      {shipment?.customer?.customerName}
                    </span>
                  </div>
                </div>
              </div>
              {shipment?.customer?.email && (
                <div className={cs.shipmentDetailsItem}>
                  <span className="she-text">
                    {t("CustomerForm.Labels.Email")}
                  </span>
                  <span className="she-text">{shipment?.customer?.email}</span>
                </div>
              )}
              {shipment?.customer?.phone && (
                <div className={cs.shipmentDetailsItem}>
                  <span className="she-text">
                    {t("CustomerForm.Labels.PhoneNumber")}
                  </span>
                  <span className="she-text">{shipment?.customer?.phone}</span>
                </div>
              )}
            </>
          )}

          <Separator />
          <div className={cs.shipmentDetailsItem}>
            <span className={cs.subtitleText}>
              {t("AddressForm.Labels.AddressLine1")}
            </span>
            <SheButton
              icon={MapPin}
              value={t("SpecialText.ChangeAddress")}
              variant="secondary"
            />
          </div>
          {shipment?.deliveryAddress && (
            <>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">
                  {t("AddressForm.Labels.AddressLine1")}
                </span>
                <span className="she-text">
                  {shipment?.deliveryAddress?.addressLine1}
                </span>
              </div>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">
                  {t("AddressForm.Labels.PostalCode")}
                </span>
                <span className="she-text">
                  {shipment?.deliveryAddress?.postalCode}
                </span>
              </div>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">{t("AddressForm.Labels.City")}</span>
                <span className="she-text">
                  {shipment?.deliveryAddress?.city}
                </span>
              </div>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">
                  {t("AddressForm.Labels.State")}
                </span>
                <span>{shipment?.deliveryAddress?.state}</span>
              </div>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">
                  {t("AddressForm.Labels.Country")}
                </span>
                <span>{shipment?.deliveryAddress?.countryName}</span>
              </div>
            </>
          )}
          <Separator />
          <div className={cs.selectCustomerBlock}>
            <span className={cs.subtitleText}>
              {t("ShipmentForm.Labels.OrdersInShipment")}
            </span>
            <SheButton
              icon={Plus}
              value={t("SpecialText.SelectOrder")}
              variant="secondary"
            />
          </div>
          <DndGridDataTable
            showHeader={false}
            columns={
              ordersInShipmentGridColumns(onAction) as ColumnDef<DataWithId>[]
            }
            data={shipment?.orders}
          />

          <Separator />
          <div className={cs.shipmentProductsBlock}>
            <span className={cs.subtitleText}>
              {t("ShipmentForm.Labels.ProductsWaitingForShipment")}
            </span>
            <SheButton
              icon={Plus}
              value={t("SpecialText.AddAll")}
              variant="secondary"
              bgColor="#007AFF"
              txtColor="#FAFAFA"
            />
          </div>
          <DndGridDataTable
            showHeader={false}
            columns={
              orderItemsInShipmentGridColumns({
                onAction,
              }) as ColumnDef<DataWithId>[]
            }
            data={shipment?.orderItems}
          />
          {shipment?.shipmentItems && (
            <>
              <Separator />
              <div className={cs.shipmentProductsBlock}>
                <span className={cs.subtitleText}>
                  {t("OrderActions.ConfirmPackedProducts")}
                </span>
              </div>
              <DndGridDataTable
                showHeader={false}
                columns={
                  PackedOrderItemsGridColumns({
                    onAction,
                  }) as ColumnDef<DataWithId>[]
                }
                data={shipment?.shipmentItems}
              />
              <div className={cs.shipmentProductsButton}>
                <SheButton
                  icon={Check}
                  value={t("OrderActions.ConfirmPackedProducts")}
                />
              </div>
            </>
          )}
          {shipment?.shipmentItems && (
            <div className={cs.shipmentContentBlock}>
              <Separator />
              <div className={cs.packageContentBlock}>
                <span className={cs.subtitleText}>
                  {t("ShipmentForm.Labels.PackageContent")}
                </span>
                <DndGridDataTable
                  showHeader={false}
                  columns={
                    PackedOrderItemsGridColumns({
                      onAction,
                    }) as ColumnDef<DataWithId>[]
                  }
                  data={shipment?.shipmentItems}
                />
              </div>
            </div>
          )}
          <div className={cs.deliveryServiceBlock}>
            <span className={cs.subtitleText}>
              {t("ShipmentForm.Labels.ConfirmDeliveryService")}
            </span>
            <SheSelect
              label={t("ShipmentForm.Labels.TrackingNumber")}
              placeholder={t("ShipmentForm.Placeholders.EnterTrackingNumber")}
              fullWidth
            />
            <SheSelect
              label={t("ShipmentForm.Labels.DeliveryService")}
              placeholder={t("ShipmentForm.Placeholders.EnterTrackingNumber")}
              fullWidth
            />
            <div className={cs.deliveryServiceButtons}>
              <SheButton
                value={t("OrderActions.ReturnShipmentToPacking")}
                variant="secondary"
              />
              <SheButton
                icon={Check}
                value={t("OrderActions.ConfirmShipmentSend")}
              />
            </div>
          </div>
        </div>
      </div>
    </SheProductCard>
  );
}
