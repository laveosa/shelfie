import React from "react";

import { Check, MapPin, Plus, User } from "lucide-react";

import cs from "./ShipmentConfigurationCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { ordersInShipmentGridColumns } from "@/components/complex/grid/custom-grids/orders-in-shipment-grid/OrdersInShipmentGridColumns.tsx";
import { orderItemsInShipmentGridColumns } from "@/components/complex/grid/custom-grids/order-items-in-shipmen-grid/OrderItemsInShipmentGridColumns.tsx";
import { PackedOrderItemsGridColumns } from "@/components/complex/grid/custom-grids/packed-order-items-grid/PackedOrderItemsGridColumns.tsx";
import { formatDate, getInitials } from "@/utils/helpers/quick-helper.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import {
  ShipmentStatusEnum,
  ShipmentStatusLabels,
} from "@/const/enums/ShipmentStatusEnum.ts";
import { IShipmentConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IShipmentConfigurationCard.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export default function ShipmentConfigurationCard({
  isLoading,
  shipment,
  onAction,
}: IShipmentConfigurationCard) {
  // ==================================================================== STATE MANAGEMENT
  const [status, setStatus] = React.useState<ShipmentStatusEnum>();

  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== PRIVATE
  function convertStatusesToSelectItems(): ISheSelectItem<string>[] {
    return Object.values(ShipmentStatusEnum).map((status) => ({
      value: status,
      text: ShipmentStatusLabels[status],
    }));
  }

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.shipmentConfigurationCard}
      title={translate("CardTitles.ShipmentConfiguration", {
        shipmentId: shipment?.shipmentId,
      })}
      showCloseButton
      isLoading={isLoading}
      showNotificationCard
      notificationCardProps={{
        title: "Cancel Shipment",
        titleTransKey: "CardTitles.CancelShipment",
        text: "This variant will be deleted, it will no longer be available for sale but you will still see it in the orders where it sold",
        textTransKey: "ConfirmationMessages.CancelShipment",
        onClick: () => onAction("deleteShipment", shipment?.shipmentId),
      }}
      onSecondaryButtonClick={() => onAction("closeShipmentConfigurationCard")}
    >
      <div className={cs.shipmentConfigurationCardContent}>
        <div className={cs.shipmentConfiguration}>
          <div className={cs.shipmentDetailsItem}>
            <span className="she-text">
              {translate("OrderForm.Labels.CreatedAt")}
            </span>
            {shipment?.createdAt && (
              <span className="she-text">
                {formatDate(shipment?.createdAt, "date")}
              </span>
            )}
          </div>
          <div className={cs.shipmentDetailsItem}>
            <span className="she-text">
              {translate("ShipmentForm.Labels.QueuePacking")}
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
              {translate("ShipmentForm.Labels.QueueShipment")}
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
              {translate("OrderForm.Labels.ShipmentStatus")}
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
              {translate("SectionTitles.Customer")}
            </span>
            <SheButton
              value="Change Customer"
              valueTransKey="SpecialText.ChangeCustomer"
              icon={User}
              variant="secondary"
              onClick={() => onAction("changeCustomer")}
            />
          </div>
          {shipment?.customer && (
            <>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">
                  {translate("CustomerForm.Labels.Name")}
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
                    {translate("CustomerForm.Labels.Email")}
                  </span>
                  <span className="she-text">{shipment?.customer?.email}</span>
                </div>
              )}
              {shipment?.customer?.phone && (
                <div className={cs.shipmentDetailsItem}>
                  <span className="she-text">
                    {translate("CustomerForm.Labels.PhoneNumber")}
                  </span>
                  <span className="she-text">{shipment?.customer?.phone}</span>
                </div>
              )}
            </>
          )}
          <Separator />
          <div className={cs.shipmentDetailsItem}>
            <span className={cs.subtitleText}>
              {translate("AddressForm.Labels.AddressLine1")}
            </span>
            <SheButton
              value="Change Address"
              valueTransKey="SpecialText.ChangeAddress"
              icon={MapPin}
              variant="secondary"
            />
          </div>
          {shipment?.deliveryAddress && (
            <>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">
                  {translate("AddressForm.Labels.AddressLine1")}
                </span>
                <span className="she-text">
                  {shipment?.deliveryAddress?.addressLine1}
                </span>
              </div>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">
                  {translate("AddressForm.Labels.PostalCode")}
                </span>
                <span className="she-text">
                  {shipment?.deliveryAddress?.postalCode}
                </span>
              </div>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">
                  {translate("AddressForm.Labels.City")}
                </span>
                <span className="she-text">
                  {shipment?.deliveryAddress?.city}
                </span>
              </div>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">
                  {translate("AddressForm.Labels.State")}
                </span>
                <span>{shipment?.deliveryAddress?.state}</span>
              </div>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">
                  {translate("AddressForm.Labels.Country")}
                </span>
                <span>{shipment?.deliveryAddress?.countryName}</span>
              </div>
            </>
          )}
          <Separator />
          <div className={cs.selectCustomerBlock}>
            <span className={cs.subtitleText}>
              {translate("ShipmentForm.Labels.OrdersInShipment")}
            </span>
            <SheButton
              value="Select Order"
              valueTransKey="SpecialText.SelectOrder"
              icon={Plus}
              variant="secondary"
            />
          </div>
          <SheGrid
            isLoading={false}
            showHeader={false}
            columns={ordersInShipmentGridColumns(onAction)}
            data={shipment?.orders}
          />
          {shipment?.orderItems?.length > 0 && (
            <>
              <Separator />
              <div className={cs.shipmentProductsBlock}>
                <span className={cs.subtitleText}>
                  {translate("ShipmentForm.Labels.ProductsWaitingForShipment")}
                </span>
                <SheButton
                  value="Add All"
                  valueTransKey="SpecialText.AddAll"
                  icon={Plus}
                  variant="info"
                />
              </div>
              <SheGrid
                isLoading={false}
                showHeader={false}
                columns={orderItemsInShipmentGridColumns({
                  onAction,
                })}
                data={shipment?.orderItems}
              />
            </>
          )}
          {shipment?.shipmentItems && (
            <>
              <Separator />
              <div className={cs.shipmentProductsBlock}>
                <span className={cs.subtitleText}>
                  {translate("OrderActions.ConfirmPackedProducts")}
                </span>
              </div>
              <SheGrid
                isLoading={false}
                showHeader={false}
                columns={PackedOrderItemsGridColumns({
                  onAction,
                })}
                data={shipment?.shipmentItems}
              />
              <div className={cs.shipmentProductsButton}>
                <SheButton
                  value="Confirm packed products"
                  valueTransKey="OrderActions.ConfirmPackedProducts"
                  icon={Check}
                />
              </div>
            </>
          )}
          {shipment?.shipmentItems && (
            <div className={cs.shipmentContentBlock}>
              <Separator />
              <div className={cs.packageContentBlock}>
                <span className={cs.subtitleText}>
                  {translate("ShipmentForm.Labels.PackageContent")}
                </span>
                <SheGrid
                  isLoading={false}
                  showHeader={false}
                  columns={PackedOrderItemsGridColumns({
                    onAction,
                  })}
                  data={shipment?.shipmentItems}
                />
              </div>
            </div>
          )}
          <div className={cs.deliveryServiceBlock}>
            <span className={cs.subtitleText}>
              {translate("ShipmentForm.Labels.ConfirmDeliveryService")}
            </span>
            <SheSelect
              label="Tracking number"
              labelTransKey="ShipmentForm.Labels.TrackingNumber"
              placeholder="enter tracking number..."
              placeholderTransKey="ShipmentForm.Placeholders.EnterTrackingNumber"
              fullWidth
            />
            <SheSelect
              label="Delivery service"
              labelTransKey="ShipmentForm.Labels.DeliveryService"
              placeholder="enter tracking number..."
              placeholderTransKey="ShipmentForm.Placeholders.EnterTrackingNumber"
              fullWidth
            />
            <div className={cs.deliveryServiceButtons}>
              <SheButton
                value="Return shipment to packing"
                valueTransKey="OrderActions.ReturnShipmentToPacking"
                variant="secondary"
              />
              <SheButton
                value="Confirm shipment send"
                valueTransKey="OrderActions.ConfirmShipmentSend"
                icon={Check}
              />
            </div>
          </div>
        </div>
      </div>
    </SheCard>
  );
}
