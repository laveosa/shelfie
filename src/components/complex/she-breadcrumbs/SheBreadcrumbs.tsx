import cs from "./SheBreadcrumbs.module.scss";
import useBreadcrumbs from "@/utils/hooks/useBreadcrumbs.ts";

export default function SheBreadcrumbs() {
  const { crumbs } = useBreadcrumbs();

  return (
    <div className={cs.sheBreadcrumbs}>
      {crumbs.map((item, index) => (
        <div key={index} className={cs.sheBreadcrumbsItem}>
          {item}
          <span>{`${--crumbs.length < index ? "/" : ""}`}</span>
        </div>
      ))}
    </div>
  );
}
