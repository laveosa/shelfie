import cs from "@/components/primitive/she-loading/SheLoading.module.scss";
import React from "react";

type SheLoadingProps = {
  className?: string;
  style?: React.CSSProperties;
  isLoading?: boolean;
};

export default function SheLoading({
  className,
  style,
  isLoading,
}: SheLoadingProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={`${cs.loaderContainer} ${className}`} style={style}>
      <div className={cs.loadingBar}>
        <div className={cs.shimmer}></div>
      </div>
    </div>
  );
}
