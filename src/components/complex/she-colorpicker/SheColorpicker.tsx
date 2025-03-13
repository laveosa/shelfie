import { useEffect, useMemo, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export default function SheColorPicker({
  disabled,
  value,
  onChange,
  onBlur,
  name,
  className,
  ...props
}: Omit<ButtonProps, "value" | "onChange" | "onBlur"> & ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [tempColor, setTempColor] = useState(value);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const parsedValue = useMemo(() => value || "#FFFFFF", [value]);

  useEffect(() => {
    setTempColor(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        if (tempColor !== value) {
          onChange(tempColor);
        }
        if (onBlur) onBlur();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, tempColor, value, onChange, onBlur]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && tempColor !== value) {
      onChange(tempColor);
      if (onBlur) onBlur();
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          {...props}
          ref={buttonRef}
          className={cn("block", className)}
          name={name}
          size="icon"
          style={{ backgroundColor: parsedValue }}
          variant="outline"
        />
      </PopoverTrigger>
      <PopoverContent ref={popoverRef} className="w-full">
        <div className="flex flex-col gap-2">
          <HexColorPicker color={tempColor} onChange={setTempColor} />
          <Input
            maxLength={7}
            value={tempColor}
            onChange={(e) => setTempColor(e.target.value)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
