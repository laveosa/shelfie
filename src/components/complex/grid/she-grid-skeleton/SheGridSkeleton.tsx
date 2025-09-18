import { JSX } from "react";

import cs from "./SheGridSkeleton.module.scss";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { TableBody, TableCell, TableRow } from "@/components/ui/table.tsx";
import { ISheGridSkeleton } from "@/const/interfaces/complex-components/ISheGridSkeleton.ts";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";

export default function SheGridSkeleton({
  gridSkeletonClassName = "",
  gridSkeletonStyle,
  quantity = 5,
  isLoading,
}: ISheGridSkeleton): JSX.Element {
  // ==================================================================== PRIVATE
  function _createSkeletonArray(quantity: number): object[] {
    return Array.from({ length: quantity }, () => ({}));
  }

  // ==================================================================== LAYOUT
  if (!isLoading) {
    return null;
  }

  return (
    <TableBody
      className={`${gridSkeletonClassName} ${cs.sheGridSkeletonBody}`}
      style={{ ...gridSkeletonStyle }}
    >
      {/*<SheLoading isLoading={true} />*/}
      {_createSkeletonArray(quantity).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className={cs.sheGridSkeletonRound} />
          </TableCell>
          <TableCell className={cs.sheGridSkeletonBarsContainer}>
            <div className="space-y-1">
              <Skeleton className={cs.sheGridSkeletonLongBar} />
              <Skeleton className={cs.sheGridSkeletonShortBar} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
