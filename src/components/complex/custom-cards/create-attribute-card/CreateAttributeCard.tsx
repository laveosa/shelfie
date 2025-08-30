import { useForm } from "react-hook-form";
import { WandSparkles } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
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

export default function CreateAttributeCard({ data, ...props }) {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: { productCategory: "" },
  });

  function onSubmit() {}

  return (
    <SheProductCard
      title={t("CardTitles.CreateProductAttribute")}
      view="card"
      showPrimaryButton={true}
      primaryButtonTitle={t("CommonButtons.Create")}
      showSecondaryButton={true}
      secondaryButtonTitle={t("CommonButtons.Cancel")}
      className={cs.createAttributeCard}
      {...props}
    >
      <div className={cs.createAttributeCardContent}>
        <SheForm form={form} onSubmit={onSubmit}>
          <div className={cs.formInput}>
            <SheForm.Field name="name">
              <SheInput
                label={t("ProductForm.Labels.AttributeName")}
                placeholder={t("ProductForm.Placeholders.AttributeName")}
              />
            </SheForm.Field>
          </div>
          <div className={cs.formRow}>
            <div className={cs.formSelect}>
              <FormField
                control={form.control}
                name="productCategory"
                render={({ field }) => (
                  <FormItem className={cs.select}>
                    <FormLabel>{t("ProductForm.Labels.CategoryName")}</FormLabel>
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
    </SheProductCard>
  );
}
