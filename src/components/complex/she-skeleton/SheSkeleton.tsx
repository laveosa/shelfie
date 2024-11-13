import cs from "./SheSkeleton.module.scss";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function SheSkeleton() {
  return <Skeleton className={cs.SheSkeleton} />;
}
