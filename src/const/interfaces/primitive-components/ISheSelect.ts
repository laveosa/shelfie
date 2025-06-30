import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";
import { Select } from "@/components/ui/select.tsx";

export interface ISheSelect<T>
  extends ISheLabel,
    ISheClearButton,
    ComponentPropsWithRef<typeof Select> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  elemClassName?: string;
  elemStyle?: React.CSSProperties;
  triggerRef?: React.RefObject<any>;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  items?: ISheSelectItem<T>[];
  selected?: T;
  hideFirstOption?: boolean;
  placeholder?: string;
  placeholderTransKey?: string;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  required?: boolean;
  showSelectIcon?: boolean;
  selectedColor?: string;
  onOpenChange?(value: boolean): void;
  onSelect?(value: T): void;
  onSelectModel?(
    data: IOutputEventModel<T, ISheSelectItem<T>, React.MouseEvent>,
  ): void;
}
