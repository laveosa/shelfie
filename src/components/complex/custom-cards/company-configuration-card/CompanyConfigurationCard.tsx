import { ColumnDef } from "@tanstack/react-table";
import { ImagePlus, Plus, Trash2 } from "lucide-react";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CompanyConfigurationCard.module.scss";
import CreateCompanyForm from "@/components/forms/create-company-form/CreateCompanyForm.tsx";
import { ICompanyConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/ICompanyConfigurationCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import { LocationsListGridColumns } from "@/components/complex/grid/custom-grids/locations-list-grid/LocationsGridColumns.tsx";

export default function CompanyConfigurationCard({
  isLoading,
  isGridLoading,
  countryCodes,
  company,
  onAction,
}: ICompanyConfigurationCard) {
  const slots = Array.from(
    { length: 6 },
    (_, i) => company?.photos?.[i] || null,
  );

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.companyConfigurationCard}
      title="Manage Company"
      showNotificationCard
      notificationCardProps={{
        title: "Delete Company",
        text: "The company will be deleted and it will no longer be available. The past purchases and labels will remain available.",
        buttonText: "Delete",
        buttonTextTransKey: "CommonButtons.Delete",
        buttonColor: "#FF0000",
        buttonIcon: Trash2,
        onClick: () => onAction("deleteCompany", company),
      }}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeCompanyConfigurationCard")}
    >
      <div className={cs.companyConfigurationCardContent}>
        <CreateCompanyForm
          isLoading={isLoading}
          data={company}
          countryCodes={countryCodes}
          onHandleUpData={(data) => onAction("updateCompany", data)}
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
            <div className={cs.locatinsGrid}>
              <SheGrid
                isLoading={isGridLoading}
                showHeader={false}
                columns={
                  LocationsListGridColumns({
                    onAction,
                  }) as ColumnDef<DataWithId>[]
                }
                data={company?.locations}
                customMessage={"No locations to display"}
              />
            </div>
          </div>
        </div>
      </div>
    </SheProductCard>
  );
}
