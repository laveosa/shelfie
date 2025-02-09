import { ReactElement } from "react";
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

const genders = ["male", "female", "unicorn", "banana"];

const items = ["111", "222", "333", "4444"];

export default function SheForm() {
  const { t } = useTranslation();
  const form = useForm<z.output<typeof UserFormScheme>>({
    mode: "onBlur",
    resolver: zodResolver(UserFormScheme),
    defaultValues: UserModelDefault,
  });

  // ==================================================================== LOGIC

  const onSubmitHandler: SubmitHandler<UserModel> = (data: UserModel) => {
    console.log("Submit: ", data);
  };

  const onErrorHandler: SubmitErrorHandler<UserModel> = (
    data: FieldErrors<UserModel>,
  ) => {
    console.log("Error: ", data);
  };

  function onCancelHandler() {
    form.reset(
      { ...UserModelDefault },
      { keepErrors: false, keepDirty: false },
    );
    setTimeout(() => form.clearErrors(), 0);
  }

  return (
    <Form {...form}>
      <FormLabel className="flex flex-col items-center gap-2 mb-[20px]">
        <span className="text-2xl">Auth Form</span>
        <span className="text-stone-400">
          This form use "shadcn" web-kit components
        </span>
      </FormLabel>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmitHandler, onErrorHandler)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) =>
            (
              <FormItem className="flex flex-col items-start">
                {/*<FormLabel>Name</FormLabel>*/}
                <FormControl>
                  <SheInput
                    {...field}
                    label="Name"
                    type="text"
                    isSearch
                    placeholder="enter name..."
                  />
                </FormControl>
                <FormDescription>
                  min: 4 value: {field?.value?.length || 0} max: 20
                </FormDescription>
                <FormMessage />
              </FormItem>
            ) as ReactElement
          }
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) =>
            (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <input {...field} type="email" placeholder="enter email..." />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            ) as any
          }
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) =>
            (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      void form.trigger("gender");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={"select your gender..."} />
                    </SelectTrigger>
                    <SelectContent>
                      {items?.map((item, idx) => (
                        <SelectItem key={idx} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  You can find all available gender here{" "}
                  <a
                    href="https://www.shutterstock.com/shutterstock/photos/2234473535/display_1500/stock-vector-all-gender-symbol-icon-vector-set-illustration-sexual-orientation-sex-symbol-icon-pride-flag-2234473535.jpg"
                    target="_blank"
                    className="text-blue-500"
                  >
                    "genders"
                  </a>
                </FormDescription>
                <FormMessage />
              </FormItem>
            ) as any
          }
        />
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
            disabled={!form.formState.isValid}
          >
            Submit
          </SheButton>
        </div>
      </form>
    </Form>
  );
}
