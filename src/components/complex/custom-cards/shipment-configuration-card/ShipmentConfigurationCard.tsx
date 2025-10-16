import React from "react";
import { Check, MapPin, Plus, User } from "lucide-react";

import {
  ShipmentStatusEnum,
  ShipmentStatusLabels,
} from "@/const/enums/ShipmentStatusEnum.ts";
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
import { IShipmentConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IShipmentConfigurationCard.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { OrderItemModel } from "@/const/models/OrderItemModel.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { DeliveryServiceModel } from "@/const/models/DeliveryServiceModel.ts";
import { PackageContentGridColumns } from "@/components/complex/grid/custom-grids/package-content-grid/PackageContentGridColumns.tsx";

export default function ShipmentConfigurationCard({
  isLoading,
  shipment,
  deliveryServices,
  onAction,
}: IShipmentConfigurationCard) {
  // ==================================================================== STATE MANAGEMENT
  const [status, setStatus] = React.useState<ShipmentStatusEnum>();
  const [trackNumber, setTrackNumber] = React.useState<number>(
    shipment?.trackNumber || null,
  );
  const [deliveryServiceId, setDeliveryServiceId] = React.useState<number>(
    shipment?.deliveryServiceId || null,
  );
  const [orderItems, setOrderItems] = React.useState<OrderItemModel[]>(null);
  const [packedOrderItems, setPackedOrderItems] =
    React.useState<OrderItemModel[]>(null);
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();
  const orderItemsRef = React.useRef(null);
  const packedOrderItemsRef = React.useRef(null);

  //===================================================================== CONVERTERS
  function svgStringToComponent(svgString: string): React.FC<any> {
    return (props) => (
      <span dangerouslySetInnerHTML={{ __html: svgString }} {...props} />
    );
  }

  function convertDeliveryServiceToSelectItems(
    data: DeliveryServiceModel[],
  ): ISheSelectItem<number>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.deliveryServiceId,
        text: item.deliveryServiceName,
        icon: svgStringToComponent(item.deliveryServiceLogo),
      }),
    );
  }

  // ==================================================================== PRIVATE
  React.useEffect(() => {
    setOrderItems(() => {
      const orderItemsList = shipment?.orderItems?.map((item) => ({
        ...item,
        amount: 1,
      }));
      orderItemsRef.current = orderItemsList;
      return orderItemsList;
    });

    setPackedOrderItems(() => {
      const packedOrderItemsList = shipment?.shipmentItems?.map((item) => ({
        ...item,
        amount: 1,
      }));
      packedOrderItemsRef.current = packedOrderItemsList;
      return packedOrderItemsList;
    });
  }, [shipment?.orderItems]);

  function convertStatusesToSelectItems(): ISheSelectItem<string>[] {
    return Object.values(ShipmentStatusEnum).map((status) => ({
      value: status,
      text: ShipmentStatusLabels[status],
    }));
  }

  function onHandelUpGridData(data: OrderItemModel[]) {
    orderItemsRef.current = data;
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
        buttonText: "Cancel",
        buttonTextTransKey: "Cancel",
        onClick: () => onAction("cancelShipment", shipment?.shipmentId),
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
                onAction("changeShipmentDate", {
                  queuePacking: value,
                  queueShipment: shipment?.queueShipment,
                })
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
                onAction("changeShipmentDate", {
                  queuePacking: shipment?.queuePacking,
                  queueShipment: value,
                })
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
              disabled={!shipment?.customer}
              onClick={() =>
                onAction("openSelectAddressCard", shipment?.customerId)
              }
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
              onClick={() => onAction("openSelectOrderForShipmentCard")}
            />
          </div>
          <SheGrid
            isLoading={false}
            showHeader={false}
            columns={ordersInShipmentGridColumns(onAction)}
            data={shipment?.orders}
          />
          {shipment?.orderItems?.length > 0 &&
            shipment?.shipmentStatus !== "DeliveryPending" && (
              <>
                <Separator />
                <div className={cs.shipmentProductsBlock}>
                  <span className={cs.subtitleText}>
                    {translate(
                      "ShipmentForm.Labels.ProductsWaitingForShipment",
                    )}
                  </span>
                  <SheButton
                    value="Add All"
                    valueTransKey="SpecialText.AddAll"
                    icon={Plus}
                    variant="info"
                    onClick={() => onAction("addAllItemsToShipment")}
                  />
                </div>
                <SheGrid
                  isLoading={false}
                  showHeader={false}
                  columns={orderItemsInShipmentGridColumns({
                    onAction,
                    onHandelUpGridData,
                  })}
                  data={orderItems}
                />
              </>
            )}
          {shipment?.shipmentItems?.length > 0 &&
            shipment?.shipmentStatus !== "DeliveryPending" && (
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
                  data={packedOrderItems}
                />
                <div className={cs.shipmentProductsButton}>
                  <SheButton
                    value="Confirm packed products"
                    valueTransKey="OrderActions.ConfirmPackedProducts"
                    icon={Check}
                    onClick={() =>
                      onAction("confirmPackedProducts", packedOrderItems)
                    }
                  />
                </div>
              </>
            )}
          {["DeliveryPending", "Completed"].includes(
            shipment?.shipmentStatus,
          ) && (
            <>
              <div className={cs.shipmentContentBlock}>
                <Separator />
                <div className={cs.packageContentBlock}>
                  <span className={cs.subtitleText}>
                    {translate("ShipmentForm.Labels.PackageContent")}
                  </span>
                  <SheGrid
                    isLoading={false}
                    showHeader={false}
                    columns={PackageContentGridColumns({
                      onAction,
                    })}
                    data={shipment?.shipmentItems}
                  />
                </div>
              </div>

              <div className={cs.deliveryServiceBlock}>
                <span className={cs.subtitleText}>
                  {translate("ShipmentForm.Labels.ConfirmDeliveryService")}
                </span>
                <SheInput
                  label="Tracking number"
                  labelTransKey="ShipmentForm.Labels.TrackingNumber"
                  placeholder="enter tracking number..."
                  placeholderTransKey="ShipmentForm.Placeholders.EnterTrackingNumber"
                  fullWidth
                  value={trackNumber}
                  onDelay={(value: number) => setTrackNumber(value)}
                />
                <SheSelect
                  label="Delivery service"
                  labelTransKey="ShipmentForm.Labels.DeliveryService"
                  placeholder="enter tracking number..."
                  placeholderTransKey="ShipmentForm.Placeholders.EnterTrackingNumber"
                  fullWidth
                  items={convertDeliveryServiceToSelectItems(deliveryServices)}
                  selected={deliveryServiceId}
                  onSelect={(value) => setDeliveryServiceId(value)}
                />
                <div className={cs.deliveryServiceButtons}>
                  <SheButton
                    value="Return shipment to packing"
                    valueTransKey="OrderActions.ReturnShipmentToPacking"
                    variant="secondary"
                    onClick={() => onAction("returnShipmentStatusToPrevious")}
                  />
                  <SheButton
                    value={
                      shipment?.shipmentStatus === "DeliveryPending"
                        ? "Confirm shipment send"
                        : "Save changes"
                    }
                    valueTransKey={
                      shipment?.shipmentStatus === "DeliveryPending"
                        ? "OrderActions.ConfirmShipmentSend"
                        : ""
                    }
                    icon={Check}
                    disabled={
                      !trackNumber ||
                      !deliveryServiceId ||
                      !shipment.deliveryAddressId
                    }
                    onClick={() => {
                      onAction("confirmDeliveryData", {
                        trackNumber,
                        deliveryServiceId,
                        deliveryAddressId: shipment.deliveryAddressId,
                      });
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </SheCard>
  );
}
