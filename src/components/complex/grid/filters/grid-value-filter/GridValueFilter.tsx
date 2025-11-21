import React from "react";

import { useGridContext } from "@/state/context/grid-context.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

interface GridValueFilterProps {
  fieldKey: string;
  icon: Partial<ISheIcon> | string | React.FC<any>;
  placeholder: string;
}

export function GridValueFilter({
  fieldKey,
  icon,
  placeholder,
}: GridValueFilterProps) {
  const { gridRequestModel, onGridRequestChange } = useGridContext();

  return (
    <SheInput
      icon={icon}
      placeholder={placeholder}
      maxWidth="200px"
      showClearBtn
      type="number"
      onDelay={(value) => {
        /*onGridRequestChange?.({
          ...gridRequestModel,
          currentPage: 0,
          filter: {
            ...gridRequestModel?.filter,
            [fieldKey]: value,
          },
        });*/
      }}
      onClear={() => {
        /*onGridRequestChange?.({
          ...gridRequestModel,
          currentPage: 0,
          filter: {
            ...gridRequestModel?.filter,
            [fieldKey]: null,
          },
        });*/
      }}
    />
  );
}
