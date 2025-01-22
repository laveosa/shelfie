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
import cs from "./CreateProductCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";

export default function CreateProductCard({ onAction, ...props }) {
  return (
    <div>
      <SheProductCard
        title="Create Product"
        showToggleButton={true}
        className={cs.createProductCard}
        {...props}
      >
        <div className={cs.createProductItems}>
          <div
            className={cs.createProductItem}
            onClick={() => onAction("basicData")}
          >
            <div className={cs.itemIconText}>
              <FileText />
              <div>Basic Data</div>
            </div>
          </div>
          <div
            className={cs.createProductItem}
            onClick={() => onAction("gallery")}
          >
            <div className={cs.itemIconText}>
              <ImagesIcon />
              <div>Gallery</div>
            </div>
            <Badge className={cs.itemBadge}>0</Badge>
          </div>
          <div
            className={cs.createProductItem}
            onClick={() => onAction("variants")}
          >
            <div className={cs.itemIconText}>
              <Layers2 />
              <div>Variants</div>
            </div>
            <Badge className={cs.itemBadge}>0</Badge>
          </div>
          <div
            className={cs.createProductItem}
            onClick={() => onAction("attributes")}
          >
            <div className={cs.itemIconText}>
              <SlidersHorizontal />
              <div>Attributes</div>
            </div>
            <Badge className={cs.itemBadge}>0</Badge>
          </div>
          <div
            className={cs.createProductItem}
            onClick={() => onAction("sizeChart")}
          >
            <div className={cs.itemIconText}>
              <Ruler />
              <div>Size Chart</div>
            </div>
          </div>
          <div
            className={cs.createProductItem}
            onClick={() => onAction("purchase")}
          >
            <div className={cs.itemIconText}>
              <ReceiptEuroIcon />
              <div>Purchase</div>
            </div>
          </div>
        </div>
      </SheProductCard>
    </div>
  );
}
