export interface GridSortingModel {
  description?: string;
  value?: string;
}

export const DEFAULT_SORTING_OPTIONS: GridSortingModel[] = [
  {
    description: "Newest",
    value: "Newest",
  },
  {
    description: "Latest",
    value: "Latest",
  },
] as const;
