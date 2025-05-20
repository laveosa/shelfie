import cs from "@/components/primitive/she-loading/SheLoading.module.scss";

type SheLoadingProps = {
  style?: React.CSSProperties;
};

export default function SheLoading({ style }: SheLoadingProps) {
  return (
    <div className={cs.loaderContainer} style={style}>
      <div className={cs.loadingBar}>
        <div className={cs.shimmer}></div>
      </div>
    </div>
  );
}
