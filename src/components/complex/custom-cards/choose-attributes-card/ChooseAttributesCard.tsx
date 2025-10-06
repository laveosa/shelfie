import { ChevronDown, Plus, WandSparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import React from "react";

import cs from "./ChooseAttributesCard.module.scss";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";

export default function ChooseAttributesCard({
  onCreateAttributeHandle,
  ...props
}) {
  const { translate } = useAppTranslation();
  const form = useForm({
    defaultValues: {},
  });

  function onSubmit() {}

  return (
    <SheCard
      className={cs.chooseAttributesCard}
      title="Choose attributes for product"
      titleTransKey="CardTitles.ChooseAttributesForProduct"
      showFooter
      primaryButtonTitle="Save"
      primaryButtonTitleTransKey="CommonButtons.Save"
      secondaryButtonTitle="Cancel"
      secondaryButtonTitleTransKey="CommonButtons.Cancel"
      {...props}
    >
      <div className={cs.chooseAttributesCardContent}>
        <div className="she-subtext">
          {translate("ProductForm.Labels.PickAttributesDescription")}
        </div>
        <SheButton
          icon={Plus}
          variant="outline"
          value="Create Attribute"
          valueTransKey="ProductActions.CreateAttribute"
          onClick={onCreateAttributeHandle}
        />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className={cs.accordionTrigger}>
              <ChevronDown />
              {translate("ProductForm.Labels.MaterialAndCare")}
            </AccordionTrigger>
            <AccordionContent>
              <SheForm form={form} onSubmit={onSubmit}>
                <div className={cs.formRow}>
                  <div className={cs.formInput}>
                    <SheForm.Field name="name">
                      <SheInput
                        label="Can be bleached"
                        labelTransKey="ProductForm.Labels.CanBeBleached"
                        placeholder="does not apply"
                        placeholderTransKey="SelectOptions.DoesNotApply"
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
                        label="Can be tumble dried"
                        labelTransKey="ProductForm.Labels.CanBeTumbleDried"
                        placeholder="does not apply"
                        placeholderTransKey="SelectOptions.DoesNotApply"
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
                        label="Can be machine washed"
                        labelTransKey="ProductForm.Labels.CanBeMachineWashed"
                        placeholder="does not apply"
                        placeholderTransKey="SelectOptions.DoesNotApply"
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
                        label="Type of insulation"
                        labelTransKey="ProductForm.Labels.TypeOfInsulation"
                        placeholder="does not apply"
                        placeholderTransKey="SelectOptions.DoesNotApply"
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
                        label="Filling"
                        labelTransKey="ProductForm.Labels.Filling"
                        placeholder="does not apply"
                        placeholderTransKey="SelectOptions.DoesNotApply"
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
                        label="Lining"
                        labelTransKey="ProductForm.Labels.Lining"
                        placeholder="does not apply"
                        placeholderTransKey="SelectOptions.DoesNotApply"
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
                        label="Material composition"
                        labelTransKey="ProductForm.Labels.MaterialComposition"
                        placeholder="does not apply"
                        placeholderTransKey="SelectOptions.DoesNotApply"
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
              {translate("ProductForm.Labels.ProductDetails")}
            </AccordionTrigger>
            <AccordionContent>
              {translate("ProductForm.Labels.ProductDetailsDescription")}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className={cs.accordionTrigger}>
              <ChevronDown />
              {translate("ProductForm.Labels.Cutting")}
            </AccordionTrigger>
            <AccordionContent>
              {translate("ProductForm.Labels.CuttingDescription")}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </SheCard>
  );
}
