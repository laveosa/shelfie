import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import UserFormScheme from "@/utils/validation/schemes/UserFormScheme.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserModel, UserModelDefault } from "@/const/models/UserModel.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ReactElement } from "react";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";

export function DashboardPage() {
  const service = useDashboardPageService();

  const form = useAppForm<UserModel>({
    mode: "onBlur",
    resolver: zodResolver(UserFormScheme),
    defaultValues: UserModelDefault,
  });

  function onSubmitHandler(model) {
    console.log(model);
  }

  function onErrorHandler(model) {
    console.log(model);
  }

  function onCancelHandler(model) {
    console.log(model);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <SheForm
        form={form}
        title="Auth Form Title"
        text={"some text for test"}
        description={
          <>
            <span>description </span>
            <a
              href="https://www.shutterstock.com/shutterstock/photos/2234473535/display_1500/stock-vector-all-gender-symbol-icon-vector-set-illustration-sexual-orientation-sex-symbol-icon-pride-flag-2234473535.jpg"
              target="_blank"
              className="text-blue-500"
            >
              "genders"
            </a>
            <span> area</span>
          </>
        }
        notDisabledSubmit
        onSubmit={onSubmitHandler}
        onError={onErrorHandler}
        onCancel={onCancelHandler}
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
                {/*<FormLabel>Gender</FormLabel>*/}

                <FormControl>
                  {/*<SheSelect
                    items={convertProductToSelectModels(products)}
                    onSelect={onSelectHandler}
                  />*/}
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
      </SheForm>
    </div>
  );
}
