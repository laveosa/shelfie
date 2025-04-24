import React, { JSX } from "react";

import cs from "./SheSkeleton.module.scss";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { ISheSkeleton } from "@/const/interfaces/primitive-components/ISheSkeleton.ts";

export default function SheSkeleton({
  isLoading,
  children,
  className = "",
  style,
  skeletonClassName = "",
  skeletonStyle,
  animationDelay = 0,
  minWidth,
  maxWidth,
  fullWidth,
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
