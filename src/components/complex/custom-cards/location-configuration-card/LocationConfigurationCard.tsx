import { Trash2 } from "lucide-react";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./LocationConfigurationCard.module.scss";
import { ILocationConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/ILocationConfigurationCard.ts";
import LocationForm from "@/components/forms/location-form/LocationForm.tsx";

export default function LocationConfigurationCard({
  isLoading,
  countryCodes,
  location,
  onAction,
}: ILocationConfigurationCard) {
  return (
    <SheProductCard
      loading={isLoading}
      className={cs.locationConfigurationCard}
      title={location?.locationId ? "Manage Location" : "Create Location"}
      showNotificationCard={!!location?.locationId}
      notificationCardProps={{
        title: "Delete Location",
        text: "The location will be deleted and will no longer appear on new labels. The current labels will require an update to replace deleted location.",
        buttonText: "Delete",
        buttonTextTransKey: "CommonButtons.Delete",
        buttonColor: "#FF0000",
        buttonIcon: Trash2,
        onClick: () => onAction("deleteLocation", location),
      }}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeLocationConfigurationCard")}
    >
      <div className={cs.locationConfigurationCardContent}>
        <LocationForm
          isLoading={isLoading}
          data={location}
          countryCodes={countryCodes}
          onSubmit={(data) => onAction("createLocation", data)}
          onHandleUpData={(data) => onAction("updateLocation", data)}
        />
      </div>
    </SheProductCard>
  );
}
