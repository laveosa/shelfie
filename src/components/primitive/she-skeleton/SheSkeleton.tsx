import React, { JSX } from "react";

import cs from "./SheSkeleton.module.scss";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { ISheSkeleton } from "@/const/interfaces/primitive-components/ISheSkeleton.ts";

export default function SheSkeleton({
  className = "",
  style,
  skeletonClassName = "",
  skeletonStyle,
  color,
  isLoading,
  animationDelay = 0,
  minWidth,
  maxWidth,
  fullWidth,
  children,
}: ISheSkeleton): JSX.Element {
  return (
    <div
      className={`${cs.sheSkeletonWrapper} ${className} ${fullWidth ? cs.fullWidth : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
    >
      {isLoading ? (
        <Skeleton
          className={`${cs.sheSkeleton} ${skeletonClassName}`}
          style={{
            ...skeletonStyle,
            animationDelay: `${animationDelay}ms`,
            backgroundColor: `${color}`,
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
