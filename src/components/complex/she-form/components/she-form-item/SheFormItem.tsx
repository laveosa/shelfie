import React, { JSX } from "react";
import { Trans } from "react-i18next";

import cs from "./SheFormItem.module.scss";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { ISheFormItem } from "@/const/interfaces/forms/ISheFormItem.ts";

export default function SheFormItem({
  className = "",
  style,
  children,
  label,
  labelTransKey,
  description,
  descriptionTransKey,
  required,
}: ISheFormItem): JSX.Element {
  return (
    <FormItem
      className={`${cs.sheFormItem} ${className} ${description ? cs.withDescription : ""} ${required ? cs.required : ""}`}
      style={{ ...style }}
    >
      {label && (
        <FormLabel>
          <Trans i18nKey={labelTransKey}>{label}</Trans>
        </FormLabel>
      )}
      <FormControl>{children}</FormControl>
      {description && (
        <FormDescription>
          <Trans i18nKey={descriptionTransKey}>{description}</Trans>
        </FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
}
