import React, { JSX } from "react";

import { X } from "lucide-react";
import cs from "./SheClearButton.module.scss";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";

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
  clearBtnProps,
  onClear,
}: ISheClearButton): JSX.Element {
  const isEmpty =
    clearBtnValue === undefined ||
    clearBtnValue === null ||
    (typeof clearBtnValue === "string" && clearBtnValue.trim().length === 0) ||
    (Array.isArray(clearBtnValue) && clearBtnValue.length === 0);

  // ==================================================================== EVENT

  function onClearHandler(event: React.MouseEvent | React.KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    onClear?.(event);
  }

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
          variant="secondary"
          size="small"
          icon={clearBtnIcon}
          txtColor={clearBtnValueColor}
          bgColor={clearBtnBackgroundColor}
          aria-describedby={ariaDescribedbyId}
          disabled={isEmpty || disabled || isLoading}
          onClick={onClearHandler}
          {...clearBtnProps}
        />
      </SheSkeleton>
    </div>
  );
}
