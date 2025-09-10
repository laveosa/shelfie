import React, { PropsWithChildren } from "react";

import { RowData, Table } from "@tanstack/react-table";

export interface IGridHeader extends PropsWithChildren {
  gridHeaderClassName?: string;
  gridHeaderStyle?: React.CSSProperties;
  table?: Table<RowData>;
  showHeader?: boolean;
  isLoading?: boolean;
}
