import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { ImageModel } from "@/const/models/ImageModel.ts";
import placeholderImage from "@/assets/images/placeholder-image.png";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";

export function DashboardPage() {
  const { translate } = useAppTranslation();
  const service = useDashboardPageService();

  const [getTheProductsForGrid] =
    ProductsApiHooks.useGetTheProductsForGridMutation();

  const [isLoading, setIsLoading] = useState<boolean>(null);
  const [gridModel, setGridModel] = useState<GridRequestModel>(null);

  useEffect(() => {
    updateGridRequestModel({});
  }, []);

  // ================================================================== STATE

  // ================================================================== EVENT HANDLERS

  function updateGridRequestModel(model: GridRequestModel) {
    setIsLoading(true);
    getTheProductsForGrid(model).then((res) => {
      setIsLoading(false);

      if (res || res.data) {
        console.log(res.data);

        setGridModel(res.data);
      } else {
        console.log("RES: ", res);
      }
    });
  }

  // ================================================================== LOGIC

  function onAction(model: any) {
    console.log("MODEL: ", model);
  }

  function getGridColumns(callback: (model: any) => void): ColumnDef<any>[] {
    return [
      {
        accessorKey: "productId",
        header: "ID",
        size: 60,
        minSize: 60,
        maxSize: 60,
      },
      {
        accessorKey: "image",
        header: "Image",
        size: 60,
        minSize: 60,
        maxSize: 60,
        cell: ({ row, table }) => {
          const image: ImageModel = row.getValue("image");
          const meta = table.options.meta as {
            setLoadingRow: (rowId: string, loading: boolean) => void;
            isRowLoading: (rowId: string) => boolean;
          };

          return (
            <div
              className="relative w-12 h-12 cursor-pointer"
              onClick={() => onAction("image", row.id, meta?.setLoadingRow)}
            >
              <img
                src={image?.thumbnailUrl || placeholderImage}
                alt={row.getValue("variantName")}
                className="object-cover rounded-md w-full h-full"
                onError={(e) => {
                  e.currentTarget.src = placeholderImage;
                }}
              />
            </div>
          );
        },
      },
      {
        accessorKey: "variantCode",
        header: "Code",
        size: 60,
        minSize: 60,
        maxSize: 60,
        cell: ({ row }) => {
          return (
            <SheTooltip delayDuration={200} text={row.getValue("variantCode")}>
              <span>{row.getValue("variantCode")}</span>
            </SheTooltip>
          );
        },
      },
      {
        accessorKey: "variantName",
        header: "Variant Name",
        size: 150,
        minSize: 150,
        maxSize: 150,
        cell: ({ row }) => (
          <SheTooltip delayDuration={200} text={row.getValue("variantName")}>
            <span>{row.getValue("variantName")}</span>
          </SheTooltip>
        ),
      },
    ];
  }

  // ================================================================== LAYOUT
  return (
    <div id={cs["DashboardPage"]}>
      <h1>{translate("PageTitles.Dashboard")}</h1>
      <br />
      <br />
      <SheGrid
        className="p-5"
        isLoading={false}
        columns={getGridColumns(onAction)}
        gridRequestModel={gridModel}
      />
    </div>
  );
}
