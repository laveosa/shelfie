import React from "react";

import { ChevronDown, Plus } from "lucide-react";

import cs from "./ChooseAttributesCard.module.scss";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";

export default function ChooseAttributesCard({
  onCreateAttributeHandle,
  ...props
}) {
  const { translate } = useAppTranslation();

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
              <h1>form...</h1>
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
