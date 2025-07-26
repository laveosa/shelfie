import React, { PropsWithChildren } from "react";

export interface ISheSkeleton extends PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  skeletonClassName?: string;
  skeletonStyle?: React.CSSProperties;
  color?: string;
  isLoading: boolean;
  animationDelay?: number;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
}

export const SheSkeletonDefaultModel: ISheSkeleton = {
  className: undefined,
  style: undefined,
  skeletonClassName: undefined,
  skeletonStyle: undefined,
  color: undefined,
  isLoading: undefined,
  animationDelay: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  fullWidth: undefined,
};
