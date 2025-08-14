import cs from "@/components/primitive/she-loading/SheLoading.module.scss";
import React from "react";

type SheLoadingProps = {
  className?: string;
  style?: React.CSSProperties;
};

export default function SheLoading({ className, style }: SheLoadingProps) {
  return (
    <div className={`${cs.loaderContainer} ${className}`} style={style}>
      <div className={cs.loadingBar}>
        <div className={cs.shimmer}></div>
      </div>
    </div>
  );
}
