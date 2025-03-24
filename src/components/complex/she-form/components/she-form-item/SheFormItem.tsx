import React from "react";
import { Trans } from "react-i18next";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import cs from "./SheFormItem.module.scss";
import { ISheFormItem } from "@/const/interfaces/forms/ISheFormItem.ts";

export default function SheFormItem({
  className,
  children,
  label,
  labelTransKey,
  description,
  descriptionTransKey,
}: ISheFormItem): React.ReactNode {
  return (
    <FormItem
      className={`${className || ""} ${cs.sheFormItem} ${description ? cs.withDescription : ""}`}
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
