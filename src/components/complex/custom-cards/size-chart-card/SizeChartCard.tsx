import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./SizeChartCard.module.scss";
import { Plus } from "lucide-react";
import { GridDataTable } from "@/components/complex/grid/grid-data-table/GridDataTable.tsx";
import { SizeChartGridColumns } from "@/components/complex/grid/size-chart-grid/SizeChartGridColumns.tsx";

export default function SizeChartCard({
  onOpenCreateProductCategoryCard,
  data,
  ...props
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [manageSizeChart, setManageSizeChart] = useState(false);

  const handleSelect = () => {
    console.log(`You selected: ${selectedOption}`);
    setManageSizeChart(true);
  };

  function handleInputChange() {}

  return (
    <div>
      <SheProductCard
        title="Size Chart"
        view="card"
        showPrimaryButton={manageSizeChart && true}
        primaryButtonTitle="Save"
        showSecondaryButton={manageSizeChart && true}
        secondaryButtonTitle="Cancel"
        className={cs.sizeChartCard}
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
                  <Select onValueChange={setSelectedOption}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                      <SelectItem value="option4">Option 4</SelectItem>
                      <SelectItem value="option5">Option 5</SelectItem>
                    </SelectContent>
                  </Select>
                  <SheButton
                    className={cs.formRowButton}
                    icon={Plus}
                    variant="outline"
                    onClick={onOpenCreateProductCategoryCard}
                  />
                </div>
                <SheButton onClick={handleSelect}>Set Category</SheButton>
              </div>
            </>
          )}
          {manageSizeChart && (
            <>
              <div className={cs.setSizeChart}>
                <div className={`${cs.setSizeChartText} she-text`}>
                  Fill in the size options for the product
                </div>
              </div>
              <div className={cs.managePhotosGrid}>
                <GridDataTable
                  showHeader={false}
                  columns={SizeChartGridColumns(handleInputChange)}
                  data={data}
                  gridModel={data}
                />
              </div>
            </>
          )}
        </div>
      </SheProductCard>
    </div>
  );
}
