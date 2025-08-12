import { MapPin, Plus, Trash2, User } from "lucide-react";
import React from "react";

import cs from "./ShipmentConfigurationCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { IShipmentConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IShipmentConfigurationCard.ts";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";
import _ from "lodash";
import { getInitials } from "@/utils/helpers/quick-helper.ts";

export default function ShipmentConfigurationCard({
  isLoading,
  shipment,
  onAction,
}: IShipmentConfigurationCard) {
  function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const date = new Date(_.now());
  const formattedDate = formatDate(date);

  return (
    <SheProductCard
      loading={isLoading}
      title={`Shipment ${shipment?.shipmentId}`}
      width="600px"
      className={cs.shipmentConfigurationCard}
    >
      <div className={cs.shipmentConfigurationCardContent}>
        <div className={cs.shipmentDetailsItem}>
          <span className="she-text">Created at</span>
          <span className="she-text">{formattedDate}</span>
        </div>
        <div className={cs.shipmentDetailsItem}>
          <span className="she-text">Queue packing</span>
          <SheDatePicker maxWidth="250px" date={shipment?.queueDate || null} />
        </div>
        <div className={cs.shipmentDetailsItem}>
          <span className="she-text">Queue shipment</span>
          <SheDatePicker
            maxWidth="250px"
            date={shipment?.queueShipment || null}
          />
        </div>
        <div className={cs.shipmentDetailsItem}>
          <span className="she-text">Shipment status</span>
          <SheSelect maxWidth="250px" />
        </div>
        <Separator />
        <div className={cs.shipmentDetailsItem}>
          <span className={cs.subtitleText}>Customer</span>
          <SheButton icon={User} value="Cahnge Cuctomer" variant="secondary" />
        </div>
        <div className={cs.shipmentDetailsItem}>
          <span className="she-text">Name</span>
          <div>
            <div className={cs.customerInfoAvatarBlock}>
              {shipment?.customer.thumbnailUrl ? (
                <img
                  src={shipment?.customer.thumbnailUrl}
                  alt={shipment?.customer.name}
                  className={cs.avatarImage}
                />
              ) : (
                <div className={cs.avatarInitials}>
                  {getInitials(shipment?.customer.name)}
                </div>
              )}
              <span className="she-text">{shipment?.customer.name}</span>
            </div>
          </div>
        </div>
        {shipment?.customer.email && (
          <div className={cs.shipmentDetailsItem}>
            <span className="she-text">Email</span>
            <span className="she-text">{shipment?.customer.email}</span>
          </div>
        )}
        {shipment?.customer.phone && (
          <div className={cs.shipmentDetailsItem}>
            <span className="she-text">Phone</span>
            <span className="she-text">{shipment?.customer.phone}</span>
          </div>
        )}
        <Separator />
        <div className={cs.shipmentDetailsItem}>
          <span className={cs.subtitleText}>Address</span>
          <SheButton icon={MapPin} value="Cahnge Address" variant="secondary" />
        </div>
        <div className={cs.shipmentDetailsItem}>
          <span className="she-text">Address</span>
          <span className="she-text">
            {shipment?.deliveryAddress.addressLine1}
          </span>
        </div>
        <div className={cs.shipmentDetailsItem}>
          <span className="she-text">Postal Code</span>
          <span className="she-text">
            {shipment?.deliveryAddress.postalCode}
          </span>
        </div>
        <div className={cs.shipmentDetailsItem}>
          <span className="she-text">City</span>
          <span className="she-text">{shipment?.deliveryAddress.city}</span>
        </div>
        <div className={cs.shipmentDetailsItem}>
          <span className="she-text">State</span>
          <span>{shipment?.deliveryAddress.state}</span>
        </div>
        <div className={cs.shipmentDetailsItem}>
          <span className="she-text">Country</span>
          <span>{shipment?.deliveryAddress.countryName}</span>
        </div>
        <Separator />
        <div className={cs.shipmentDetailsItem}>
          <span className={cs.subtitleText}>Orders in shipment</span>
          <SheButton icon={Plus} value="Select Order" variant="secondary" />
        </div>
        {/*<DndGridDataTable columns= data=/>*/}

        <Separator />
        <div className={cs.shipmentProductsBlock}>
          <span className={cs.subtitleText}>
            Products from connected orders waiting for shipment
          </span>
          <SheButton icon={Plus} value="Add All" variant="secondary" />
        </div>
        {/*<DndGridDataTable columns= data=/>*/}
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
    </SheProductCard>
  );
}
