import cs from "./SheContextMenu.module.scss";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default function SheContextMenu() {
  return (
    <div className={cs.SheContextMenu}>
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem></ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
