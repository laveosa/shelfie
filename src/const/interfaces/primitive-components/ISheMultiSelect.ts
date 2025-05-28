import { ISheMultiSelectTrigger } from "@/const/interfaces/primitive-components/ISheMultiSelectTrigger.ts";

export interface ISheMultiSelect extends ISheMultiSelectTrigger {
  isModalPopover?: boolean;
  isOpen?: boolean;
  onIsOpen?: (value: any) => void;
  onClear?: (value: any) => void;
  onValueChange?: (values: any[]) => void;
}
