import React from "react";
import { FieldPath } from "react-hook-form";

import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { useSheFormContext } from "@/state/context/she-form-context.ts";
import { SheFormItemContextProvider } from "@/state/providers/she-form-item-context-provider.tsx";
import { ISheFormField } from "@/const/interfaces/forms/ISheFormField.ts";
import { SheFormItemDefaultModel } from "@/const/interfaces/forms/ISheFormItem.ts";

export default function SheFormField<T = any, TName extends FieldPath<T>>(
  props: ISheFormField<T, TName>,
) {
  // ==================================================================== PROPS
  const { form } = useSheFormContext<T>();
  const { name, render, ignoreFormAction } = props;
  const sheFormItemProps = getCustomProps<ISheFormField<T, TName>>(
    props,
    SheFormItemDefaultModel,
  );

  // ==================================================================== LAYOUT
  return (
    <FormField<T, TName>
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) =>
        (
          <SheFormItem {...sheFormItemProps}>
            <SheFormItemContextProvider<T, TName>
              value={!ignoreFormAction ? { field, form } : null}
            >
              {render({ field, fieldState, formState })}
            </SheFormItemContextProvider>
          </SheFormItem>
        ) as any
      }
    />
  );
}
