import React from "react";
import {
  FileText,
  ImagesIcon,
  Layers2,
  ReceiptEuroIcon,
  Ruler,
  SlidersHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge.tsx";
import cs from "./ProductMenuCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { IProductMenuCard } from "@/const/interfaces/complex-components/custom-cards/IProductMenuCard.ts";

export default function ProductMenuCard({
  title,
  productId,
  productCounter,
  onAction,
  ...props
}: IProductMenuCard) {
  return (
    <div>
      <SheProductCard
        title={title}
        showToggleButton={true}
        className={cs.productMenuCard}
        {...props}
      >
        <div className={cs.createProductItems}>
          <div
            className={cs.createProductItem}
            onClick={() => onAction("basicData")}
          >
            <div className={cs.iconContainer}>
              <FileText />
            </div>
            <div className={cs.textContainer}>
              <span className="she-text">Basic Data</span>
            </div>
          </div>
          <div
            className={
              productId
                ? cs.createProductItem
                : `${cs.createProductItem} ${cs.disabled}`
            }
            onClick={() => onAction("gallery")}
          >
            <div className={cs.iconContainer}>
              <ImagesIcon />
            </div>
            <div className={cs.textContainer}>
              <span className="she-text">Gallery</span>
              <Badge className={cs.itemBadge}>
                {productCounter?.gallery ?? 0}
              </Badge>
            </div>
          </div>
          <div
            className={
              productId
                ? cs.createProductItem
                : `${cs.createProductItem} ${cs.disabled}`
            }
            onClick={() => onAction("variants")}
          >
            <div className={cs.iconContainer}>
              <Layers2 />
            </div>
            <div className={cs.textContainer}>
              <span className="she-text">Variants</span>
              <Badge className={cs.itemBadge}>
                {productCounter?.variants ?? 0}
              </Badge>
            </div>
          </div>
          <div
            className={
              productId
                ? cs.createProductItem
                : `${cs.createProductItem} ${cs.disabled}`
            }
            onClick={() => onAction("attributes")}
          >
            <div className={cs.iconContainer}>
              <SlidersHorizontal />
            </div>
            <div className={cs.textContainer}>
              <span className="she-text">Attributes</span>
              <Badge className={cs.itemBadge}>
                {productCounter?.attributes ?? 0}
              </Badge>
            </div>
          </div>
          <div
            className={
              productId
                ? cs.createProductItem
                : `${cs.createProductItem} ${cs.disabled}`
            }
            onClick={() => onAction("sizeChart")}
          >
            <div className={cs.iconContainer}>
              <Ruler />
            </div>
            <div className={cs.textContainer}>
              <span className="she-text">Size Chart</span>
            </div>
          </div>
          <div
            className={
              productId
                ? cs.createProductItem
                : `${cs.createProductItem} ${cs.disabled}`
            }
            onClick={() => onAction("purchase")}
          >
            <div className={cs.iconContainer}>
              <ReceiptEuroIcon />
            </div>
            <div className={cs.textContainer}>
              <span className="she-text">Purchase</span>
            </div>
          </div>
        </div>
      </SheProductCard>
    </div>
  );
}
