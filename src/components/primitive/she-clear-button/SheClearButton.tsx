import React, { JSX } from "react";

import cs from "./SheClearButton.module.scss";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { X } from "lucide-react";

export function SheClearButton({
  className = "",
  style,
  value,
  color,
  showClearBtn,
  disabled,
  isLoading,
  ariaDescribedbyId,
  onClear,
}: ISheClearButton): JSX.Element {
  const isEmpty =
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim().length === 0) ||
    (Array.isArray(value) && value.length === 0);

  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT
  if (!showClearBtn) return null;

  return (
    <div className={`${cs.sheClearButtonWrapper} ${className}`}>
      <SheSkeleton
        className={`${cs.sheClearButtonSkeleton}`}
        style={style}
        isLoading={isLoading}
      >
        <SheButton
          className={cs.sheClearButton}
          title="Clear"
          aria-label="Clear"
          variant="ghost"
          icon={X}
          txtColor={color}
          aria-describedby={ariaDescribedbyId}
          disabled={isEmpty || disabled || isLoading}
          onClick={onClear}
        />
      </SheSkeleton>
    </div>
  );
}
