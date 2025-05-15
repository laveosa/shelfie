export const STATUS_COLORS = {
  isGridItemError: "#FEE2E2",
  isGridItemSuccess: "#EBF9EF",
  isGridItemWarning: "#FEF3C7",
  isGridItemSelected: "#F3E8FF",
  default: "#FFFFFF",
} as const;

export interface IRowWithStatus {
  isGridItemError?: boolean;
  isGridItemSuccess?: boolean;
  isGridItemWarning?: boolean;
  isGridItemSelected?: boolean;

  [key: string]: any;
}

export const getRowBackgroundColor = (row: IRowWithStatus): string => {
  if (row.isGridItemError) return STATUS_COLORS.isGridItemError;
  if (row.isGridItemSuccess) return STATUS_COLORS.isGridItemSuccess;
  if (row.isGridItemWarning) return STATUS_COLORS.isGridItemWarning;
  if (row.isGridItemSelected) return STATUS_COLORS.isGridItemSelected;
  return STATUS_COLORS.default;
};

export const getRowStyle = (row: IRowWithStatus) => ({
  backgroundColor: getRowBackgroundColor(row),
  transition: "background-color 0.3s ease",
});
