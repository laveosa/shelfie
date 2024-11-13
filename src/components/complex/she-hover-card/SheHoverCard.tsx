import cs from "./SheHoverCard.module.scss";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function SheHoverCard({ children }) {
  return (
    <div className={cs.SheHoverCard}>
      <HoverCard>
        <HoverCardTrigger>Hover</HoverCardTrigger>
        <HoverCardContent>{children}</HoverCardContent>
      </HoverCard>
    </div>
  );
}
