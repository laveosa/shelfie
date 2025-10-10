import React from "react";

import cs from "./LocationConfigurationCard.module.scss";
import LocationForm from "@/components/forms/location-form/LocationForm.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { ILocationConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/ILocationConfigurationCard.ts";

export default function LocationConfigurationCard({
  isLoading,
  countryCodes,
  location,
  onAction,
}: ILocationConfigurationCard) {
  // ==================================================================== EVENT HANDLERS

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT

  return (
    <SheCard
      className={cs.locationConfigurationCard}
      title={location?.locationId ? "Manage Location" : "Create Location"}
      isLoading={isLoading}
      showNotificationCard={!!location?.locationId}
      notificationCardProps={{
        title: "Delete Location",
        text: "The location will be deleted and will no longer appear on new labels. The current labels will require an update to replace deleted location.",
        onClick: () => onAction("deleteLocation", location),
      }}
      showCloseButton
      onHeaderCloseClick={() => onAction("closeLocationConfigurationCard")}
    >
      <LocationForm
        isLoading={isLoading}
        data={location}
        countryCodes={countryCodes}
        onChange={(data) => onAction("updateLocation", data)}
        onSubmit={(data) => onAction("createLocation", data)}
        onAction={onAction}
      />
    </SheCard>
  );
}
