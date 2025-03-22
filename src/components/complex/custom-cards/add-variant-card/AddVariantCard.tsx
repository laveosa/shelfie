import { useForm } from "react-hook-form";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ChooseAttributesCard.module.scss";

export default function AddVariantCard({ onCreateAttributeHandle, ...props }) {
  const form = useForm({
    defaultValues: {},
  });

  function onSubmit() {}

  return (
    <div>
      <SheProductCard
        title="Add Variant"
        view="card"
        showPrimaryButton={true}
        primaryButtonTitle="Add Variant"
        showSecondaryButton={true}
        secondaryButtonTitle="Cancel"
        className={cs.chooseAttributesCard}
        {...props}
      >
        <div className={cs.chooseAttributesCardContent}>
          <span className="she-text">
            Select the trait option that you want to add
          </span>
          {/*<SheForm form={form} onSubmit={onSubmit}>*/}
          {/*  <FormItem className={cs.select}>*/}
          {/*    <FormLabel>Trait type</FormLabel>*/}
          {/*    <Select*/}
          {/*      onValueChange={(value) => field.onChange(Number(value))}*/}
          {/*      value={field.value ? field.value.toString() : ""}*/}
          {/*    >*/}
          {/*      <FormControl>*/}
          {/*        <SelectTrigger>*/}
          {/*          <SelectValue placeholder="Select category" />*/}
          {/*        </SelectTrigger>*/}
          {/*      </FormControl>*/}
          {/*      <SelectContent>*/}
          {/*        {typesOfTraits.map((option) => (*/}
          {/*          <SelectItem*/}
          {/*            key={option.traitTypeId}*/}
          {/*            value={option.traitTypeId.toString()}*/}
          {/*          >*/}
          {/*            <div>{option.traitTypeName}</div>*/}
          {/*          </SelectItem>*/}
          {/*        ))}*/}
          {/*      </SelectContent>*/}
          {/*    </Select>*/}
          {/*  </FormItem>*/}
          {/*  <FormItem className={cs.select}>*/}
          {/*    <FormLabel>Trait type</FormLabel>*/}
          {/*    <Select*/}
          {/*      onValueChange={(value) => field.onChange(Number(value))}*/}
          {/*      value={field.value ? field.value.toString() : ""}*/}
          {/*    >*/}
          {/*      <FormControl>*/}
          {/*        <SelectTrigger>*/}
          {/*          <SelectValue placeholder="Select category" />*/}
          {/*        </SelectTrigger>*/}
          {/*      </FormControl>*/}
          {/*      <SelectContent>*/}
          {/*        {typesOfTraits.map((option) => (*/}
          {/*          <SelectItem*/}
          {/*            key={option.traitTypeId}*/}
          {/*            value={option.traitTypeId.toString()}*/}
          {/*          >*/}
          {/*            <div>{option.traitTypeName}</div>*/}
          {/*          </SelectItem>*/}
          {/*        ))}*/}
          {/*      </SelectContent>*/}
          {/*    </Select>*/}
          {/*  </FormItem>*/}
          {/*</SheForm>*/}
        </div>
      </SheProductCard>
    </div>
  );
}
