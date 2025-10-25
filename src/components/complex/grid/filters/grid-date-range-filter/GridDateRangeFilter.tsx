import { CalendarRange } from "lucide-react";

import { useGridContext } from "@/state/context/grid-context.ts";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import { CalendarModeEnum } from "@/const/enums/CalendarModeEnum.ts";

export function GridDateRangeFilter() {
  const { gridRequestModel, onGridRequestChange } = useGridContext();

  return (
    <SheDatePicker
      mode={CalendarModeEnum.RANGE}
      icon={CalendarRange}
      placeholder="Pick range"
      maxWidth="200px"
      minWidth="200px"
      showClearBtn
      onSelectDate={(value) => {
        if (value) {
          onGridRequestChange?.({
            ...gridRequestModel,
            currentPage: 0,
            filter: {
              ...gridRequestModel?.filter,
              dateTo: value.to.toISOString(),
              dateFrom: value.from.toISOString(),
            },
          });
        } else {
          onGridRequestChange?.({
            ...gridRequestModel,
            currentPage: 0,
            filter: {
              ...gridRequestModel?.filter,
              dateTo: null,
              dateFrom: null,
            },
          });
        }
      }}
    />
  );
}
