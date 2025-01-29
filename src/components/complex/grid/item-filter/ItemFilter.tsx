import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

interface IItemFilter {
  data: [];
  filteredColumn: string;
}

export function ItemFilter({ filteredColumn, data }: IItemFilter) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheckedChange = (value: boolean, item: string) => {
    setSelectedItems((prev) =>
      value ? [...prev, item] : prev.filter((selected) => selected !== item),
    );
  };

  // const uniqueProductNames = Array.from(
  //   new Set(data.map((item: any) => item[filteredColumn])),
  // );

  // const filteredItems = uniqueProductNames.filter((item) =>
  //   item.toLowerCase().includes(searchTerm.toLowerCase()),
  // );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSearchTerm(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center">
          <SheButton variant="outline">
            <div className="flex items-center gap-2">
              {filteredColumn}
              <ChevronDown className="pt-1" />
            </div>
          </SheButton>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[200px]"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <div className="px-2 py-1.5">
          <DropdownMenuLabel className="pb-1.5">Select Items</DropdownMenuLabel>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className="w-full p-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-[200px] overflow-y-auto">
          {data.map((item) => (
            <DropdownMenuCheckboxItem
              key={item}
              className="capitalize"
              checked={selectedItems.includes(item)}
              onCheckedChange={(value) => handleCheckedChange(value, item)}
              onSelect={(event) => event.preventDefault()}
            >
              {item}
            </DropdownMenuCheckboxItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
