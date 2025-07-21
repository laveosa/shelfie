import { ColumnDef } from "@tanstack/react-table";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ImageModel } from "@/const/models/ImageModel.ts";
import placeholderImage from "@/assets/images/placeholder-image.png";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import cs from "./VariantGridColumns.module.scss";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { TrashIcon } from "lucide-react";

export function variantsGridColumns(
  onAction: any,
  onDelete: (data) => void,
): ColumnDef<any>[] {
  const statusClass = (status: string) => {
    if (status === "Available") {
      return cs.productStatusAvailable;
    } else if (status === "Not Available") {
      return cs.productStatusNotAvailable;
    } else {
      return "";
    }
  };

  return [
    {
      accessorKey: "variantId",
      header: "ID",
      size: 60,
      minSize: 60,
      maxSize: 60,
    },
    {
      accessorKey: "photo",
      header: "Image",
      size: 60,
      minSize: 60,
      maxSize: 60,
      cell: ({ row, table }) => {
        const image: ImageModel = row.getValue("photo");
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
            <span className={cs.variantCode}>
              {row.getValue("variantCode")}
            </span>
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
      cell: ({ row }) => {
        return (
          <SheTooltip delayDuration={200} text={row.getValue("variantName")}>
            <span className={cs.variantName}>
              {row.getValue("variantName")}
            </span>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "productCategory",
      header: "Category",
      size: 100,
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        const category: CategoryModel = row.getValue("productCategory");
        return (
          <SheTooltip
            delayDuration={200}
            text={category?.categoryName || "N/A"}
          >
            <div className={cs.productCategory}>
              {row.original.productCategory?.thumbnail && (
                <img
                  src={row.original.productCategory?.thumbnail}
                  alt={row.original.productCategory.categoryName}
                />
              )}
              <span>{category?.categoryName || "N/A"}</span>
            </div>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "brand",
      header: "Brand",
      size: 100,
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        const brand: BrandModel = row.getValue("brand");
        return (
          <SheTooltip delayDuration={200} text={brand?.brandName || "N/A"}>
            <div className={cs.productCategory}>
              {row.original.brand?.thumbnail && (
                <img
                  src={row.original.brand?.thumbnail}
                  alt={row.original.brand.brandName}
                />
              )}
              <span>{brand?.brandName || "N/A"}</span>
            </div>
          </SheTooltip>
        );
      },
    },
    {
      accessorKey: "traitOptions",
      header: "Details",
      size: 80,
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => {
        const traitOptions = row.original.traitOptions || [];

        const colorOptions = traitOptions.filter(
          (option) => option.traitTypeId === 2 && option.optionColor,
        );
        const sizeOptions = traitOptions.filter(
          (option) => option.traitTypeId === 1 && option.optionName,
        );

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              maxWidth: "50px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              verticalAlign: "middle",
            }}
          >
            {colorOptions.map((colorOpt, index) => (
              <div
                key={`color-${index}`}
                style={{
                  background: colorOpt.optionColor,
                  minWidth: "20px",
                  minHeight: "20px",
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                }}
              />
            ))}
            {sizeOptions.map((sizeOpt, index) => (
              <span key={`size-${index}`} style={{ fontSize: "0.875rem" }}>
                {sizeOpt.optionName}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status: string = row.getValue("status");
        return (
          <div className={`${cs.productStatus} ${statusClass(status)}`}>
            <span>{status}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "salePrice",
      header: "Price",
      size: 100,
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        const price: string = row.getValue("salePrice");
        return <span>{price ? price : "N/A"}</span>;
      },
    },
    {
      accessorKey: "stockAmount",
      header: "In Stock",
      size: 60,
      minSize: 60,
      maxSize: 60,
      cell: ({ row }) => {
        return <span>{`${row.getValue("stockAmount")} units`}</span>;
      },
    },
    // {
    //   accessorKey: "isActive",
    //   header: "Active",
    //   cell: ({ row, table }) => {
    //     const meta = table.options.meta as {
    //       setLoadingRow: (rowId: string, loading: boolean) => void;
    //       isRowLoading: (rowId: string) => boolean;
    //     };
    //
    //     return (
    //       <Switch
    //         disabled={meta?.isRowLoading(row.id)}
    //         checked={row.getValue("active")}
    //         onCheckedChange={() =>
    //           onAction("activateVariant", row.id, undefined, row.original)
    //         }
    //       />
    //     );
    //   },
    // },
    {
      id: "manage",
      header: "",
      minSize: 100,
      maxSize: 100,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        const handleManageClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          onAction("manageVariant", row.id, meta?.setLoadingRow, row.original);
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              onClick={handleManageClick}
              disabled={meta?.isRowLoading(row.id)}
            >
              Manage
            </SheButton>
          </div>
        );
      },
    },
    {
      id: "rowActions",
      header: "",
      minSize: 70,
      maxSize: 70,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };
        const handleDeleteClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          onDelete({ table, row });
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              icon={TrashIcon}
              variant="secondary"
              onClick={handleDeleteClick}
              disabled={meta?.isRowLoading(row.id)}
            />
          </div>
        );
      },
    },
  ];
}
