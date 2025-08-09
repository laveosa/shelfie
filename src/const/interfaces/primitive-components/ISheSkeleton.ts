import React from "react";

export interface ISheSkeleton {
  children?: any;
  skeletonClassName?: string;
  skeletonStyle?: React.CSSProperties;
  skeletonColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
  animationDelay?: number;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  skeletonProps?: ISheSkeleton;
}

export const SheSkeletonDefaultModel: ISheSkeleton = {
  skeletonClassName: undefined,
  skeletonStyle: undefined,
  skeletonColor: undefined,
  isLoading: undefined,
  disabled: undefined,
  animationDelay: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  fullWidth: undefined,
  skeletonProps: undefined,
};
