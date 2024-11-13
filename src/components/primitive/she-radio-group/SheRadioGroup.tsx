import cs from "./SheRadioGroup.module.scss";
import { RadioGroup } from "@/components/ui/radio-group";

export default function SheRadioGroup() {
  return (
    <RadioGroup
      className={cs.SheRadioGroup}
      defaultValue="option-one"
    ></RadioGroup>
  );
}
