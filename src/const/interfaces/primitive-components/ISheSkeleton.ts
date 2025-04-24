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
