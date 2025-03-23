import React, { ReactElement, useEffect, useState } from "react";
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import UserFormScheme from "@/utils/validation/schemes/UserFormScheme.ts";
import { UserModel, UserModelDefault } from "@/const/models/UserModel.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useTranslation } from "react-i18next";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelect.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { ISheFormProps } from "@/const/interfaces/forms/ISheForm.ts";
import SheFormHeader from "@/components/complex/she-form/components/she-form-header/SheFormHeader.tsx";
import cs from "./SheForm.module.scss";

export default function SheForm<T>({
  className,
  children,
  form,
  notDisabledSubmit,
  view,
  disabled,
  loading,
  onSubmit,
  onError,
  onCancel,
  ...props
}: ISheFormProps<T>): React.ReactNode {
  // ==================================================================== LOGIC

  const onSubmitHandler: SubmitHandler<UserModel> = (data: UserModel) => {
    if (onSubmit) onSubmit(data);
  };

  const onErrorHandler: SubmitErrorHandler<UserModel> = (
    data: FieldErrors<UserModel>,
  ) => {
    if (onError) onError(data);
    console.error("Form error: ", data);
  };

  function onCancelHandler() {
    form.reset(
      { ...form.control._defaultValues },
      { keepErrors: false, keepDirty: false },
    );
    setTimeout(() => form.clearErrors(), 0);
    if (onCancel) onCancel(form.control._defaultValues);
  }

  // ==================================================================== PRIVATE

  return (
    <div
      className={`${className || ""} ${cs.sheForm} ${cs[view]} ${disabled || loading ? "disabled" : ""}`}
    >
      <Form {...form}>
        <SheFormHeader {...props} />
        <form onSubmit={form.handleSubmit(onSubmitHandler, onErrorHandler)}>
          {children}
          <div className="flex gap-4 justify-end">
            <SheButton
              className="flex items-start w-[100px]"
              variant="secondary"
              type="button"
              onClick={onCancelHandler}
            >
              Cancel
            </SheButton>
            <SheButton
              className="flex items-start w-[100px] bg-blue-700"
              type="submit"
              loading={loading}
              disabled={!notDisabledSubmit && !form.formState.isValid}
            >
              Submit
            </SheButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
