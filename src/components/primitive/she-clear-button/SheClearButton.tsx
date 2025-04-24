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
  showClearBtn,
  disabled,
  isLoading,
  ariaDescribedbyId,
  onClear,
}: ISheClearButton): JSX.Element {
  return (
    <>
      {showClearBtn && (
        <SheSkeleton
          className={`${cs.sheClearButtonWrapper} ${className}`}
          style={style}
          isLoading={isLoading}
        >
          <SheButton
            className={cs.sheClearButton}
            variant="ghost"
            size="icon"
            icon={X}
            aria-describedby={ariaDescribedbyId}
            disabled={
              !value || value.toString().length === 0 || disabled || isLoading
            }
            onClick={onClear}
          />
        </SheSkeleton>
      )}
    </>
  );
}
