import React, { JSX } from "react";

import cs from "./SheClearButton.module.scss";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { X } from "lucide-react";

export default function SheClearButton({
  clearBtnClassName = "",
  clearBtnStyle,
  clearBtnValue,
  clearBtnValueColor,
  clearBtnBackgroundColor,
  clearBtnIcon = X,
  showClearBtn,
  disabled,
  isLoading,
  ariaDescribedbyId,
  clearBtnPosition = "in",
  clearBtnProps,
  onClear,
}: ISheClearButton): JSX.Element {
  const isEmpty =
    clearBtnValue === undefined ||
    clearBtnValue === null ||
    (typeof clearBtnValue === "string" && clearBtnValue.trim().length === 0) ||
    (Array.isArray(clearBtnValue) && clearBtnValue.length === 0);

  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT
  if (!showClearBtn) return null;

  return (
    <div className={`${cs.sheClearButtonWrapper} ${clearBtnClassName}`}>
      <SheSkeleton
        skeletonClassName={`${cs.sheClearButtonSkeleton}`}
        skeletonStyle={clearBtnStyle}
        isLoading={isLoading}
      >
        <SheButton
          className={cs.sheClearButton}
          title="Clear"
          aria-label="Clear"
          variant="ghost"
          icon={clearBtnIcon}
          txtColor={clearBtnValueColor}
          bgColor={clearBtnBackgroundColor}
          aria-describedby={ariaDescribedbyId}
          disabled={isEmpty || disabled || isLoading}
          onClick={onClear}
          {...clearBtnProps}
        />
      </SheSkeleton>
    </div>
  );
}
