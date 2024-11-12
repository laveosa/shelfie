import { ChevronRight } from "lucide-react";
import cs from "./SheBreadcrumbs.module.scss";
import useBreadcrumbs from "@/utils/hooks/useBreadcrumbs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function SheBreadcrumbs() {
  const { crumbs } = useBreadcrumbs();

  return (
    <Breadcrumb className={cs.sheBreadcrumbs}>
      <BreadcrumbList className={cs.BreadcrumbList}>
        {crumbs.map((crumb: string, index: number) => {
          const isLast: boolean = index === crumbs.length - 1;

          return (
            <BreadcrumbItem key={index}>
              {isLast ? (
                <BreadcrumbPage className={cs.BreadcrumbPage}>
                  {crumb}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink href="#">{crumb}</BreadcrumbLink>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
