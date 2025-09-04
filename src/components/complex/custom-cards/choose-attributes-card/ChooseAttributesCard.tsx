import { ChevronDown, Plus, WandSparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import React from "react";
import { useTranslation } from "react-i18next";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ChooseAttributesCard.module.scss";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";

export default function ChooseAttributesCard({
  onCreateAttributeHandle,
  ...props
}) {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {},
  });

  function onSubmit() {}

  return (
    <div>
      <SheProductCard
        title={t("CardTitles.ChooseAttributesForProduct")}
        view="card"
        showPrimaryButton={true}
        primaryButtonTitle={t("CommonButtons.Save")}
        showSecondaryButton={true}
        secondaryButtonTitle={t("CommonButtons.Cancel")}
        className={cs.chooseAttributesCard}
        {...props}
      >
        <div className={cs.chooseAttributesCardContent}>
          <div className="she-subtext">
            {t("ProductForm.Labels.PickAttributesDescription")}
          </div>
          <SheButton
            icon={Plus}
            variant="outline"
            onClick={onCreateAttributeHandle}
          >
            {t("ProductActions.CreateAttribute")}
          </SheButton>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className={cs.accordionTrigger}>
                <ChevronDown />
                {t("ProductForm.Labels.MaterialAndCare")}
              </AccordionTrigger>
              <AccordionContent>
                <SheForm form={form} onSubmit={onSubmit}>
                  <div className={cs.formRow}>
                    <div className={cs.formInput}>
                      <SheForm.Field name="name">
                        <SheInput
                          label={t("ProductForm.Labels.CanBeBleached")}
                          placeholder={t("SelectOptions.DoesNotApply")}
                        />
                      </SheForm.Field>
                    </div>
                    <SheButton
                      className={cs.formRowButton}
                      icon={WandSparkles}
                      variant="outline"
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div className={cs.formInput}>
                      <SheForm.Field name="name">
                        <SheInput
                          label={t("ProductForm.Labels.CanBeTumbleDried")}
                          placeholder={t("SelectOptions.DoesNotApply")}
                        />
                      </SheForm.Field>
                    </div>
                    <SheButton
                      className={cs.formRowButton}
                      icon={WandSparkles}
                      variant="outline"
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div className={cs.formInput}>
                      <SheForm.Field name="Can be machine washed">
                        <SheInput
                          label={t("ProductForm.Labels.CanBeMachineWashed")}
                          placeholder={t("SelectOptions.DoesNotApply")}
                        />
                      </SheForm.Field>
                    </div>
                    <SheButton
                      className={cs.formRowButton}
                      icon={WandSparkles}
                      variant="outline"
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div className={cs.formInput}>
                      <SheForm.Field name="Type of insulation">
                        <SheInput
                          label={t("ProductForm.Labels.TypeOfInsulation")}
                          placeholder={t("SelectOptions.DoesNotApply")}
                        />
                      </SheForm.Field>
                    </div>
                    <SheButton
                      className={cs.formRowButton}
                      icon={WandSparkles}
                      variant="outline"
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div className={cs.formInput}>
                      <SheForm.Field name="name">
                        <SheInput
                          label={t("ProductForm.Labels.Filling")}
                          placeholder={t("SelectOptions.DoesNotApply")}
                        />
                      </SheForm.Field>
                    </div>
                    <SheButton
                      className={cs.formRowButton}
                      icon={WandSparkles}
                      variant="outline"
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div className={cs.formInput}>
                      <SheForm.Field name="name">
                        <SheInput 
                          label={t("ProductForm.Labels.Lining")} 
                          placeholder={t("SelectOptions.DoesNotApply")} 
                        />
                      </SheForm.Field>
                    </div>
                    <SheButton
                      className={cs.formRowButton}
                      icon={WandSparkles}
                      variant="outline"
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div className={cs.formInput}>
                      <SheForm.Field name="name">
                        <SheInput
                          label={t("ProductForm.Labels.MaterialComposition")}
                          placeholder={t("SelectOptions.DoesNotApply")}
                        />
                      </SheForm.Field>
                    </div>
                    <SheButton
                      className={cs.formRowButton}
                      icon={WandSparkles}
                      variant="outline"
                    />
                  </div>
                </SheForm>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className={cs.accordionTrigger}>
                <ChevronDown />
                {t("ProductForm.Labels.ProductDetails")}
              </AccordionTrigger>
              <AccordionContent>
                {t("ProductForm.Labels.ProductDetailsDescription")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className={cs.accordionTrigger}>
                <ChevronDown />
                {t("ProductForm.Labels.Cutting")}
              </AccordionTrigger>
              <AccordionContent>
                {t("ProductForm.Labels.CuttingDescription")}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheProductCard>
    </div>
  );
}
