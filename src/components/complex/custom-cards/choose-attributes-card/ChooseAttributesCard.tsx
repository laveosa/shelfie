import { ChevronDown, Plus, WandSparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import React from "react";

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
  const form = useForm({
    defaultValues: {},
  });

  function onSubmit() {}

  return (
    <div>
      <SheProductCard
        title="Choose attributes for product"
        view="card"
        showPrimaryButton={true}
        primaryButtonTitle="Save"
        showSecondaryButton={true}
        secondaryButtonTitle="Cancel"
        className={cs.chooseAttributesCard}
        {...props}
      >
        <div className={cs.chooseAttributesCardContent}>
          <div className="she-subtext">
            Pick the attributes that describe the product best Missing an
            Attribute? Add it!
          </div>
          <SheButton
            icon={Plus}
            variant="outline"
            onClick={onCreateAttributeHandle}
          >
            Add Attribute
          </SheButton>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className={cs.accordionTrigger}>
                <ChevronDown />
                Material and care
              </AccordionTrigger>
              <AccordionContent>
                <SheForm form={form} onSubmit={onSubmit}>
                  <div className={cs.formRow}>
                    <div className={cs.formInput}>
                      <SheForm.Field name="name">
                        <SheInput
                          label="Can be bleached"
                          placeholder="does not apply"
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
                          placeholder="does not apply"
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
                          placeholder="does not apply"
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
                          placeholder="does not apply"
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
                          placeholder="does not apply"
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
                        <SheInput label="Lining" placeholder="does not apply" />
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
                          placeholder="does not apply"
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
                Product details
              </AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className={cs.accordionTrigger}>
                <ChevronDown />
                Cutting
              </AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheProductCard>
    </div>
  );
}
