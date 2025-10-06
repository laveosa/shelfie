import { useForm } from "react-hook-form";
import React from "react";

import { WandSparkles } from "lucide-react";

import cs from "./CreateAttributeCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";

export default function CreateAttributeCard({ data, ...props }) {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();
  const form = useForm({
    defaultValues: { productCategory: "" },
  });

  // ==================================================================== EVENT HANDLERS
  function onSubmit() {}

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.createAttributeCard}
      title="Connect image to product variants"
      titleTransKey="CardTitles.CreateProductAttribute"
      showFooter
      primaryButtonTitle="Create"
      primaryButtonTitleTransKey="CommonButtons.Create"
      secondaryButtonTitle="Cancel"
      secondaryButtonTitleTransKey="CommonButtons.Cancel"
      {...props}
    >
      <div className={cs.createAttributeCardContent}>
        <SheForm form={form as any} onSubmit={onSubmit}>
          <div className={cs.formInput}>
            <SheForm.Field name="name">
              <SheInput
                label="Attribute name"
                labelTransKey="ProductForm.Labels.AttributeName"
                placeholder="enter attribute name..."
                placeholderTransKey="ProductForm.Placeholders.AttributeName"
              />
            </SheForm.Field>
          </div>
          <div className={cs.formRow}>
            <div className={cs.formSelect}>
              <FormField
                control={form.control}
                name="productCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {translate("ProductForm.Labels.CategoryName")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.items?.map((option) => (
                          <SelectItem
                            key={option.id}
                            value={option.productName}
                          >
                            <div>{option.productName}</div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              ></FormField>
            </div>
            <SheButton
              className={cs.formRowButton}
              icon={WandSparkles}
              variant="outline"
            />
          </div>
        </SheForm>
      </div>
    </SheCard>
  );
}
