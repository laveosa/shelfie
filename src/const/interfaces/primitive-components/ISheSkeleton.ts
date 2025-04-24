import React, { ComponentPropsWithRef } from "react";

export interface ISheSkeleton extends ComponentPropsWithRef<any> {
  isLoading: boolean;
  style?: React.CSSProperties;
  skeletonClassName?: string;
  skeletonStyle?: React.CSSProperties;
  animationDelay?: number;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
}
