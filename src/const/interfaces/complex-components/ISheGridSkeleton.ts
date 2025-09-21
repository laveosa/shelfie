import React from "react";

export interface ISheGridSkeleton {
  gridSkeletonClassName?: string;
  gridSkeletonStyle?: React.CSSProperties;
  quantity?: number;
  isLoading?: boolean;
}
