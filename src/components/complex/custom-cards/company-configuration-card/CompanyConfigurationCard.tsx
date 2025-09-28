import { ImagePlus } from "lucide-react";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CompanyConfigurationCard.module.scss";
import CreateCompanyForm from "@/components/forms/create-company-form/CreateCompanyForm.tsx";
import { ICompanyConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/ICompanyConfigurationCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export default function CompanyConfigurationCard({
  isLoading,
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
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeCompanyConfigurationCard")}
    >
      <div className={cs.companyConfigurationCardContent}>
        <CreateCompanyForm
          isLoading={isLoading}
          countryCodes={countryCodes}
          onSubmit={(data) => onAction("createCompany", data)}
          onCancel={() => onAction("closeCreateCompanyCard")}
        />
        <div className={cs.imagesBlock}>
          <div className={cs.imagesBlockTitle}>
            <span className="she-title">Company Photos</span>
            <SheButton
              icon={ImagePlus}
              variant="secondary"
              value="Manage Photos"
            />
          </div>
          <div className={cs.imagesBlock}>
            <div className={cs.imagesBlockGrid}>
              {slots.map((img, index) => (
                <div key={index} className={cs.imagesBlockGridItem}>
                  {img ? (
                    <img
                      src={img.thumbnailUrl}
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
        </div>
      </div>
    </SheProductCard>
  );
}
