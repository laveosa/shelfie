import React, { JSX } from "react";

import cs from "./SheSkeleton.module.scss";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { ISheSkeleton } from "@/const/interfaces/primitive-components/ISheSkeleton.ts";

export default function SheSkeleton({
  children,
  skeletonClassName = "",
  skeletonStyle,
  skeletonColor,
  isLoading,
  disabled,
  animationDelay = 0,
  minWidth,
  maxWidth,
  fullWidth,
}: ISheSkeleton): JSX.Element {
  // ==================================================================== LAYOUT
  return (
    <div
      className={`${cs.sheSkeletonWrapper} ${skeletonClassName} ${fullWidth ? cs.fullWidth : ""} ${disabled ? "disabled" : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...skeletonStyle,
      }}
    >
      {isLoading ? (
        <Skeleton
          className={`${cs.sheSkeleton}`}
          style={{
            animationDelay: `${animationDelay}ms`,
            backgroundColor: skeletonColor,
          }}
        >
          {children}
        </Skeleton>
      ) : (
        children
      )}
    </div>
  );
}
