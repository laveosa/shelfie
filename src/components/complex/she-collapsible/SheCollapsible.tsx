import cs from "./SheCollapsible.module.scss";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function SheCollapsible() {
  return (
    <Collapsible className={cs.SheCollapsible}>
      <CollapsibleTrigger></CollapsibleTrigger>
      <CollapsibleContent></CollapsibleContent>
    </Collapsible>
  );
}
