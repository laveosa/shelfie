import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import {
  useForm,
  UseFormProps,
  UseFormReturn,
  useWatch,
} from "react-hook-form";

import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import { AppFormType } from "@/const/types/AppFormType.ts";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";

export interface IUseAppFormProps<T> extends UseFormProps<AppFormType<T>> {
  values?: T;
  scheme?: z.ZodObject<IZodSchema<T>>;
}

export interface IUseAppForm<T> {
  form: UseFormReturn<AppFormType<T>>;
  isValid?: boolean;
  isDisabled?: boolean;
  resetForm?(value: T): void;
  setValue?(identifier: string, value: any): void;
}

export default function useAppForm<T>({
  values,
  scheme,
  ...props
}: IUseAppFormProps<T>): IUseAppForm<T> {
  // ==================================================================== STATE MANAGEMENT
  const [isDisabled, setIsDisabled] = useState<boolean>(null);

  // ==================================================================== UTILITIES
  const form = useForm<AppFormType<T>>({
    ...(props as UseFormProps<AppFormType<T>>),
    mode: props.mode ? props.mode : ReactHookFormMode.BLUR,
    resolver: scheme ? zodResolver(scheme) : props.resolver,
  });
  const formValue = useWatch({ control: form.control });

  // ==================================================================== REF
  const previousValue = useRef<T>(null);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (values && !_.isEqual(values, previousValue.current)) {
      form.reset(values);
      previousValue.current = _.cloneDeep(values);
      setIsDisabled(true);
    }
  }, [values]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentValues = form.getValues();
      const cleanCurrent = JSON.parse(JSON.stringify(currentValues));
      const cleanPrevious = JSON.parse(
        JSON.stringify(previousValue.current || {}),
      );
      const isEqual = _.isEqual(cleanCurrent, cleanPrevious);
      setIsDisabled(!form.formState.isValid || isEqual);
    });

    return () => clearTimeout(timer);
  }, [formValue]);

  // ==================================================================== LOGIC
  function resetForm(value: T) {
    if (value) form.reset(value);
  }

  function setValue(identifier: string, value: any) {
    if (identifier && identifier.length > 0 && !_.isNil(value))
      form.setValue(identifier as any, value);
  }

  // ==================================================================== OUTPUT
  return {
    form,
    isValid: form.formState?.isValid,
    isDisabled,
    resetForm,
    setValue,
  };
}
