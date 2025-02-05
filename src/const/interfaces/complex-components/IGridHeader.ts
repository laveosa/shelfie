import { Table } from "@tanstack/react-table";
import { PropsWithChildren } from "react";

export interface IGridHeader<TData> extends PropsWithChildren {
  table?: Table<TData>;
}
