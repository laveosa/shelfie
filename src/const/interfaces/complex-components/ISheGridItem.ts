import React, { ComponentPropsWithRef } from "react";
import { Row } from "@tanstack/react-table";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

export interface ISheGridItem<TData extends DataWithId>
  extends ComponentPropsWithRef<any> {
  id?: number | string;
  className?: string;
  row: Row<TData>;
  loadingRows?: Set<string>;
  isDragDisabled?: boolean;
  enableDnd?: boolean;
  enableExpansion?: boolean;
  totalColumns?: number;
  renderExpandedContent?: (
    row: any,
    expandableItem: any,
    expandableIndex: number,
  ) => React.ReactNode;
}
