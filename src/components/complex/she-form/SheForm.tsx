import { ReactElement, useEffect, useState } from "react";
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
import { Search } from "lucide-react";

const genders = ["male", "female", "unicorn", "banana"];

const products: ProductModel[] = [
  {
    title: "Product ONE",
    description: "Some description for the test",
    price: "23.11",
  },
  {
    title: "Product TWO",
    description: "Some description for the test",
    price: "12.99",
  },
  {
    title: "Product THREE",
    description: "Some description for the test",
    price: "31.22",
  },
];

export default function SheForm() {
  const [_products, setProducts] = useState<ProductModel[]>(null);
  /*const [_productsSelectItems, setProductsSelectItems] = useState(
    convertProductToSelectModels(_products),
  );*/
  const [_selectedProduct, setSelectedProduct] = useState(null);

  const { t } = useTranslation();
  const form = useForm<z.output<typeof UserFormScheme>>({
    mode: "onBlur",
    resolver: zodResolver(UserFormScheme),
    defaultValues: UserModelDefault,
  });

  useEffect(() => {
    setTimeout(() => {
      setProducts(products);
      setTimeout(() => {
        setSelectedProduct(products[0]);
      }, 2000);
    }, 1000);
  }, []);

  // ==================================================================== LOGIC

  function onSelectHandler(data) {
    console.log(data);
  }

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

  // ==================================================================== PRIVATE

  function convertProductToSelectModels(
    products: ProductModel[],
  ): ISheSelectItem[] {
    return products?.map(
      (item: ProductModel): ISheSelectItem => ({
        value: item,
        text: item.title,
      }),
    );
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
                {/*<FormLabel>Gender</FormLabel>*/}

                <FormControl>
                  <SheSelect
                    items={convertProductToSelectModels(products)}
                    onSelect={onSelectHandler}
                  />
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
