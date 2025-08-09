import React, { JSX, useEffect, useState } from "react";
import _ from "lodash";

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
  // ==================================================================== STATE MANAGEMENT
  const [_loading, setLoading] = useState<boolean>(null);

  // ==================================================================== UTILITIES
  const isEmpty =
    clearBtnValue === undefined ||
    clearBtnValue === null ||
    (typeof clearBtnValue === "string" && clearBtnValue.trim().length === 0) ||
    (Array.isArray(clearBtnValue) && clearBtnValue.length === 0);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (
      !_.isNil(isLoading) &&
      typeof isLoading === "boolean" &&
      isLoading !== _loading
    )
      setLoading(isLoading);

    if (
      clearBtnProps &&
      !_.isNil(clearBtnProps.isLoading) &&
      clearBtnProps.isLoading !== _loading
    )
      setTimeout(() => setLoading(clearBtnProps.isLoading));
  }, [isLoading, clearBtnProps]);

  // ==================================================================== EVENT HANDLERS
  function onClearHandler(event: React.MouseEvent | React.KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    onClear?.(event);
  }

  // ==================================================================== LAYOUT
  if (!showClearBtn) return null;

  return (
    <div className={`${cs.sheClearButtonWrapper} ${clearBtnClassName}`}>
      <SheSkeleton
        skeletonClassName={`${cs.sheClearButtonSkeleton}`}
        skeletonStyle={clearBtnStyle}
        isLoading={_loading}
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
          disabled={isEmpty || disabled || _loading}
          onClick={onClearHandler}
          {...clearBtnProps}
          isLoading={false}
        />
      </SheSkeleton>
    </div>
  );
}
