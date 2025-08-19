import { Check, MapPin, Plus, Trash2, User } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import {
  ShipmentStatus,
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
import { ordersInShipmentGridColumns } from "@/components/complex/grid/orders-in-shipment-grid/OrdersInShipmentGridColumns.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { orderItemsInShipmentGridColumns } from "@/components/complex/grid/order-items-in-shipmen-grid/OrderItemsInShipmentGridColumns.tsx";
import { PackedOrderItemsGridColumns } from "@/components/complex/grid/packed-order-items-grid/PackedOrderItemsGridColumns.tsx";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";

export default function ShipmentConfigurationCard({
  isLoading,
  shipment,
  onAction,
}: IShipmentConfigurationCard) {
  const [status, setStatus] = React.useState<ShipmentStatus>();

  function convertStatusesToSelectItems(): ISheSelectItem<ShipmentStatus>[] {
    return Object.values(ShipmentStatus).map((status) => ({
      value: status,
      text: ShipmentStatusLabels[status],
    }));
  }

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.shipmentConfigurationCard}
      title={`Shipment ${shipment?.shipmentId}`}
      width="650px"
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeShipmentConfigurationCard")}
    >
      <div className={cs.shipmentConfigurationCardContent}>
        <div className={cs.shipmentConfiguration}>
          <div className={cs.shipmentDetailsItem}>
            <span className="she-text">Created at</span>
            {shipment?.createdAt && (
              <span className="she-text">
                {formatDate(shipment?.createdAt, "date")}
              </span>
            )}
          </div>
          <div className={cs.shipmentDetailsItem}>
            <span className="she-text">Queue packing</span>
            <SheDatePicker
              maxWidth="250px"
              date={shipment?.queuePacking}
              onSelectDate={(value) =>
                onAction("changeShipmentDate", { queuePacking: value })
              }
            />
          </div>
          <div className={cs.shipmentDetailsItem}>
            <span className="she-text">Queue shipment</span>
            <SheDatePicker
              maxWidth="250px"
              date={shipment?.queueShipment}
              onSelectDate={(value) =>
                onAction("changeShipmentDate", { queueShipment: value })
              }
            />
          </div>
          <div className={cs.shipmentDetailsItem}>
            <span className="she-text">Shipment status</span>
            <SheSelect
              maxWidth="250px"
              hideFirstOption
              selected={shipment?.shipmentStatus as ShipmentStatus}
              items={convertStatusesToSelectItems()}
              onSelect={(value: ShipmentStatus) => setStatus(value)}
            />
          </div>
          <Separator />
          <div className={cs.shipmentDetailsItem}>
            <span className={cs.subtitleText}>Customer</span>
            <SheButton
              icon={User}
              value="Change Cuctomer"
              variant="secondary"
              onClick={() => onAction("changeCustomer")}
            />
          </div>
          {shipment?.customer && (
            <>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">Name</span>
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
                  <span className="she-text">Email</span>
                  <span className="she-text">{shipment?.customer?.email}</span>
                </div>
              )}
              {shipment?.customer?.phone && (
                <div className={cs.shipmentDetailsItem}>
                  <span className="she-text">Phone</span>
                  <span className="she-text">{shipment?.customer?.phone}</span>
                </div>
              )}
            </>
          )}

          <Separator />
          <div className={cs.shipmentDetailsItem}>
            <span className={cs.subtitleText}>Address</span>
            <SheButton
              icon={MapPin}
              value="Change Address"
              variant="secondary"
            />
          </div>
          {shipment?.deliveryAddress && (
            <>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">Address</span>
                <span className="she-text">
                  {shipment?.deliveryAddress?.addressLine1}
                </span>
              </div>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">Postal Code</span>
                <span className="she-text">
                  {shipment?.deliveryAddress?.postalCode}
                </span>
              </div>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">City</span>
                <span className="she-text">
                  {shipment?.deliveryAddress?.city}
                </span>
              </div>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">State</span>
                <span>{shipment?.deliveryAddress?.state}</span>
              </div>
              <div className={cs.shipmentDetailsItem}>
                <span className="she-text">Country</span>
                <span>{shipment?.deliveryAddress?.countryName}</span>
              </div>
            </>
          )}
          <Separator />
          <div className={cs.selectCustomerBlock}>
            <span className={cs.subtitleText}>Orders in shipment</span>
            <SheButton icon={Plus} value="Select Order" variant="secondary" />
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
              Products from connected orders waiting for shipment
            </span>
            <SheButton
              icon={Plus}
              value="Add All"
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
                <span className={cs.subtitleText}>Confirm packed products</span>
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
                <SheButton icon={Check} value="Confirm packed products" />
              </div>
            </>
          )}
          {shipment?.shipmentItems && (
            <div className={cs.shipmentContentBlock}>
              <Separator />
              <div className={cs.packageContentBlock}>
                <span className={cs.subtitleText}>Package content</span>
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
            <span className={cs.subtitleText}>Confirm delivery service</span>
            <SheSelect
              label="Tracking number"
              placeholder="Enter tracking number"
              fullWidth
            />
            <SheSelect
              label="Delivery service"
              placeholder="Enter tracking number"
              fullWidth
            />
            <div className={cs.deliveryServiceButtons}>
              <SheButton
                value="Return shipment to packing"
                variant="secondary"
              />
              <SheButton icon={Check} value="Confirm shipment send" />
            </div>
          </div>
        </div>
        <SheCardNotification
          title="Cancel shipment"
          text="The products from shipment will return to the order and new shipment will be required"
          buttonColor="#EF4343"
          buttonVariant="outline"
          buttonText="Delete"
          buttonIcon={Trash2}
          onClick={() => {
            onAction("deleteShipment", shipment?.shipmentId);
          }}
        />
      </div>
    </SheProductCard>
  );
}
