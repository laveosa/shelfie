import React from "react";

export interface ISheSkeleton {
  children?: any;
  skeletonClassName?: string;
  skeletonStyle?: React.CSSProperties;
  skeletonColor?: string;
  isLoading?: boolean;
  animationDelay?: number;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
}

export const SheSkeletonDefaultModel: ISheSkeleton = {
  skeletonClassName: undefined,
  skeletonStyle: undefined,
  skeletonColor: undefined,
  isLoading: undefined,
  animationDelay: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  fullWidth: undefined,
};
