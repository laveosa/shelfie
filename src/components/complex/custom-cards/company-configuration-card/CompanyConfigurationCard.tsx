import React from "react";
import _ from "lodash";

import { ImagePlus, Plus } from "lucide-react";

import cs from "./CompanyConfigurationCard.module.scss";
import CreateCompanyForm from "@/components/forms/create-company-form/CreateCompanyForm.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { LocationsListGridColumns } from "@/components/complex/grid/custom-grids/locations-list-grid/LocationsGridColumns.tsx";
import { ICompanyConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/ICompanyConfigurationCard.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";

export default function CompanyConfigurationCard({
  isLoading,
  isGridLoading,
  countryCodes,
  company,
  onAction,
}: ICompanyConfigurationCard) {
  // ==================================================================== UTILITIES
  const slots = Array.from(
    { length: 6 },
    (_, i) => company?.photos?.[i] || null,
  );

  // ==================================================================== EVENT HANDLERS
  function onUpdateCompanyHandler(data: CompanyModel) {
    const normalizedData = normalizeCompanyData(data);
    const normalizedCompany = normalizeCompanyData(company);

    if (!_.isEqual(normalizedData, normalizedCompany)) {
      onAction("updateCompany", data);
    }
  }

  // ==================================================================== PRIVATE
  function normalizeCompanyData(model: CompanyModel) {
    return {
      companyName: model.companyName || "",
      countryId: model.countryId ?? null,
      customerCareEmail: model.customerCareEmail || null,
      nip: model.nip || null,
    };
  }

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.companyConfigurationCard}
      title="Manage Company"
      showNotificationCard
      notificationCardProps={{
        title: "Delete Company",
        text: "The company will be deleted and it will no longer be available. The past purchases and labels will remain available.",
        onClick: () => onAction("deleteCompany", company),
      }}
      showCloseButton
      isLoading={isLoading}
      onSecondaryButtonClick={() => onAction("closeCompanyConfigurationCard")}
    >
      <div className={cs.companyConfigurationCardContent}>
        <CreateCompanyForm
          isLoading={isLoading}
          data={company}
          countryCodes={countryCodes}
          onHandleUpData={(data) => onUpdateCompanyHandler(data)}
        />
        <div className={cs.imagesBlock}>
          <div className={cs.imagesBlockTitle}>
            <span className="she-title">Company Photos</span>
            <SheButton
              icon={ImagePlus}
              variant="secondary"
              value="Manage Photos"
              onClick={() => onAction("manageCompanyPhotos")}
            />
          </div>
          <div className={cs.imagesBlock}>
            <div className={cs.imagesBlockGrid}>
              {slots.map((img, index) => (
                <div key={index} className={cs.imagesBlockGridItem}>
                  {img ? (
                    <img
                      src={img?.thumbnailUrl}
                      alt={`image-${index}`}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={cs.locationsBlock}>
            <div className={cs.locationsBlockTitle}>
              <span className="she-title">Locations</span>
              <SheButton
                icon={Plus}
                variant="secondary"
                value="Add Location"
                onClick={() => onAction("openLocationConfigurationCard")}
              />
            </div>
            <div>
              <SheGrid
                isLoading={isGridLoading}
                showHeader={false}
                columns={LocationsListGridColumns({
                  onAction,
                })}
                data={company?.locations}
                customMessage={"No locations to display"}
              />
            </div>
          </div>
        </div>
      </div>
    </SheCard>
  );
}
