import React, { ComponentPropsWithRef } from "react";

import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { ISheRadioItem } from "@/const/interfaces/primitive-components/ISheRadioItem.ts";
import { IShePrimitiveComponentWrapper } from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";

export interface ISheRadioGroup<T>
  extends IShePrimitiveComponentWrapper,
    ComponentPropsWithRef<any> {
  elemClassName?: string;
  elemStyle?: React.CSSProperties;
  direction?: "row" | "column";
  gap?: string;
  name?: string;
  selected?: T;
  items?: ISheRadioItem<T>[];
  itemsView?: ComponentViewEnum;
  skeletonQuantity?: number;
  noDataMessage?: string;
  noDataMessageTransKey?: string;
  onValueChange?(
    value: T,
    model?: IOutputEventModel<T, ISheRadioGroup<T>, React.MouseEvent>,
  ): void;
}

export const SheRadioGroupDefaultModel: ISheRadioGroup<any> = {
  elemClassName: undefined,
  elemStyle: undefined,
  direction: undefined,
  gap: undefined,
  name: undefined,
  selected: undefined,
  items: undefined,
  itemsView: undefined,
  skeletonQuantity: undefined,
  noDataMessage: undefined,
  noDataMessageTransKey: undefined,
  onValueChange: undefined,
};
