import { ISheMultiSelectTrigger } from "@/const/interfaces/primitive-components/ISheMultiSelectTrigger.ts";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";

export interface ISheMultiSelect extends ISheMultiSelectTrigger {
  options?: ISheMultiSelectItem[];
  selectedValues?: string[];
  isModalPopover?: boolean;
  isOpen?: boolean;
  onIsOpen?: (value: any) => void;
  onClear?: (value: any) => void;
  onValueChange?: (values: any[]) => void;
}
