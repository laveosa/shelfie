import React, { useState } from "react";

import { Plus } from "lucide-react";

import cs from "./SizeChartCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { GridDataTable } from "@/components/complex/grid/grid-data-table/GridDataTable.tsx";
import { SizeChartGridColumns } from "@/components/complex/grid/custom-grids/size-chart-grid/SizeChartGridColumns.tsx";

export default function SizeChartCard({
  onOpenCreateProductCategoryCard,
  data,
  ...props
}) {
  // ==================================================================== STATE MANAGEMENT
  const [selectedOption, setSelectedOption] = useState("");
  const [manageSizeChart, setManageSizeChart] = useState(false);

  // ==================================================================== EVENT HANDLERS
  function onSelectHandler() {
    console.log(`You selected: ${selectedOption}`);
    setManageSizeChart(true);
  }

  function onInputChangeHandler() {}

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.sizeChartCard}
      title="Size Chart"
      showCloseButton
      showPrimaryButton={manageSizeChart}
      primaryButtonTitle="Save"
      showSecondaryButton={manageSizeChart}
      secondaryButtonTitle="Cancel"
      {...props}
    >
      <div className={cs.sizeChartCardContent}>
        {!manageSizeChart && (
          <>
            <div className={`${cs.sizeChartCardText} she-text`}>
              To manage the size chart you need to pick the product category
              first
            </div>
            <div className={cs.sizeChartCardSelectBlock}>
              <div className={cs.sizeChartCardSelect}>
                <SheSelect
                  label="Category"
                  placeholder="select category..."
                  items={[
                    { value: "option1", text: "Option 1" },
                    { value: "option2", text: "Option 2" },
                    { value: "option3", text: "Option 3" },
                    { value: "option4", text: "Option 4" },
                    { value: "option5", text: "Option 5" },
                  ]}
                  onSelect={setSelectedOption}
                />
                <SheButton
                  className={cs.formRowButton}
                  icon={Plus}
                  variant="outline"
                  onClick={onOpenCreateProductCategoryCard}
                />
              </div>
              <SheButton value="Set Category" onClick={onSelectHandler} />
            </div>
          </>
        )}
        {manageSizeChart && (
          <div className={cs.setSizeChartContainer}>
            <div className={cs.setSizeChart}>
              <span className={`${cs.setSizeChartText} she-text`}>
                Fill in the size options for the product
              </span>
            </div>
            <div className={cs.managePhotosGrid}>
              <GridDataTable
                showHeader={false}
                columns={SizeChartGridColumns(onInputChangeHandler)}
                data={data}
                gridRequestModel={data}
              />
            </div>
          </div>
        )}
      </div>
    </SheCard>
  );
}
