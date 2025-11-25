import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export default function CartContentGridColumnActions({ row, onAction }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SheButton
          variant="secondary"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </SheButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => onAction("manageProduct", row.productId)}
        >
          Manage Product
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction("manageVariant", row)}>
          Manage Variant
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction("stockChangeHistory", row)}>
          Stock Change History
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
