import { Trash2 } from "lucide-react";
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
  // function onUpdateLocationHandler(data: LocationModel) {
  //   console.log("DATA", data);
  //   const normalizedData = normalizeCompanyData(data);
  //   const normalizedCompany = normalizeCompanyData(company);
  //
  //   if (!_.isEqual(normalizedData, normalizedCompany)) {
  //     onAction("updateLocation", data);
  //   }
  // }

  // ==================================================================== PRIVATE
  // function normalizeCompanyData(model: CompanyModel) {
  //   return {
  //     companyName: model.companyName || "",
  //     countryId: model.countryId ?? null,
  //     customerCareEmail: model.customerCareEmail || null,
  //     nip: model.nip || null,
  //   };
  // }

  // ==================================================================== LAYOUT

  return (
    <SheCard
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
      showHeader
      showCloseButton
      isLoading={isLoading}
      onSecondaryButtonClick={() => onAction("closeLocationConfigurationCard")}
    >
      <div>
        <LocationForm
          isLoading={isLoading}
          data={location}
          countryCodes={countryCodes}
          onSubmit={(data) => onAction("createLocation", data)}
          // onHandleUpData={(data) => onUpdateLocationHandler(data)}
          onHandleUpData={(data) => onAction("updateLocation", data)}
          onAction={onAction}
        />
      </div>
    </SheCard>
  );
}
