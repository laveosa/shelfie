import { ArrowDown, ArrowUp, ChevronRight, FolderUp } from "lucide-react";
import React from "react";

import {
  GridSortingEnum,
  GridSortingEnumLabels
} from "@/const/enums/GridSortingEnum.ts";
import cs from "./DashboardPage.module.scss";
import useDashboardPageService
  from "@/pages/dashboard-page/useDashboardPageService.ts";
import { DesktopChart } from "@/components/complex/charts/DesktopChart.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { MobileChart } from "@/components/complex/charts/MobileChart.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import cardData
  from "@/assets/static-collections/dashboard/DashboardCardsCollections.json";
import productsData
  from "@/assets/static-collections/dashboard/TopSellingProductsCollection.json";
import { Progress } from "@/components/ui/progress.tsx";
import orderStatusesData
  from "@/assets/static-collections/dashboard/OrdersStatusesCollection.json";
import chartData
  from "@/assets/static-collections/dashboard/ChartDataCollections.json";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import {
  ordersListGridColumns
} from "@/components/complex/grid/custom-grids/orders-list-grid/OrdersListGridColumns.tsx";
import gridData
  from "@/assets/static-collections/dashboard/OrdersCollection.json";

export function DashboardPage() {
  const service = useDashboardPageService();
  const [selectedChart, setSelectedChart] = React.useState<string>("desktop");
  const sortingItems = Object.values(GridSortingEnum).map((value) => ({
    value,
    description: GridSortingEnumLabels[value],
  }));
  // ================================================================== STATE

  // ================================================================== EVENT HANDLERS

  // ================================================================== LOGIC
  // ================================================================== LAYOUT
  return (
    <div id={cs["DashboardPage"]}>
      <div className={cs.chartAndCardBlock}>
        <div className={cs.chartBlock}>
          <div className={cs.chartHeader}>
            <div className={cs.chartInfo}>
              <span className={`${cs.chartInfoTitle} she-title`}>
                Revenue Chart
              </span>
              <span className={`${cs.chartInfoDescription} she-text`}>
                Last year
              </span>
            </div>
            <div className={cs.chartButtons}>
              <SheButton
                className={`${cs.chartButton} ${selectedChart === "desktop" ? cs.buttonSelected : ""}`}
                variant="ghost"
                onClick={() => setSelectedChart("desktop")}
              >
                <div className={cs.chartButtonValue}>
                  <span className={`${cs.chartButtonValueText} she-text`}>
                    Desktop
                  </span>
                  <span className={`${cs.chartButtonValueNumber} she-title`}>
                    {chartData.desktop.reduce(
                      (acc, item) => acc + item.desktop,
                      0,
                    )}
                  </span>
                </div>
              </SheButton>
              <SheButton
                className={`${cs.chartButton} ${selectedChart === "mobile" ? cs.buttonSelected : ""}`}
                variant="ghost"
                onClick={() => setSelectedChart("mobile")}
              >
                <div className={cs.chartButtonValue}>
                  <span className={`${cs.chartButtonValueText} she-text`}>
                    Mobile
                  </span>
                  <span className={`${cs.chartButtonValueNumber} she-title`}>
                    {chartData.mobile.reduce(
                      (acc, item) => acc + item.mobile,
                      0,
                    )}
                  </span>
                </div>
              </SheButton>
            </div>
          </div>
          <div className={cs.chartBody}>
            {selectedChart === "desktop" ? <DesktopChart /> : <MobileChart />}
          </div>
        </div>
        <div className={cs.cardsWrapper}>
          {cardData.map((card, i) => {
            const icon = card.arrow === "ArrowUp" ? ArrowUp : ArrowDown;
            return (
              <div key={i} className={cs.card}>
                <span className={`${cs.cardTitle} she-title`}>
                  {card.title}
                </span>
                <span className={cs.cardSum}>{card.sum}</span>
                <div className={cs.descriptionBlock}>
                  <div className={cs.iconBlock}>
                    <SheIcon
                      icon={icon}
                      maxWidth="15px"
                      style={{ color: card.arrowColor }}
                    />
                    <span
                      className={cs.iconBlockText}
                      style={{ color: card.arrowColor }}
                    >
                      {card.percent}
                    </span>
                  </div>
                  <span className={`${cs.descriptionBlockText} she-text`}>
                    {card.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={cs.topSellingAndGridBlock}>
        <div className={cs.topProductsWrapper}>
          <div className={cs.topProductsHeader}>
            <div className={cs.topProductsHeaderTitleBlock}>
              <span className={`${cs.topProductsHeaderTitle} she-title`}>
                Best Selling Product
              </span>
              <span className={`${cs.topProductsHeaderDescription} she-text`}>
                Top-Selling Products at a Glance
              </span>
            </div>
            <SheButton icon={ChevronRight} variant="outline" />
          </div>
          <div className={cs.topProductsCardsList}>
            {productsData.map((card, i) => {
              return (
                <div key={i} className={cs.productCard}>
                  <div className={cs.productCardProduct}>
                    <div className={cs.productCardImage}>
                      <img src={card.photoUrl} alt={card.productName} />
                    </div>
                    <span className={`${cs.productCardTitle} she-title`}>
                      {card.productName}
                    </span>
                  </div>
                  <span className={`${cs.productCardItemsSold} she-text`}>
                    {`${card.itemsSold} items sold`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={cs.ordersGridWrapper}>
          <div className={cs.ordersGridHeader}>
            <div className={cs.ordersGridHeaderTitleBlock}>
              <div className={cs.ordersGridHeaderTitle}>
                <span className={`${cs.ordersGridHeaderTitleText} she-title`}>
                  Track Order Status
                </span>
                <span
                  className={`${cs.ordersGridHeaderTitleDescription} she-text`}
                >
                  Analyze growth and changes in visitor patterns
                </span>
              </div>
              <SheButton icon={FolderUp} variant="outline" value="Export" />
            </div>
            <div className={cs.ordersGridOrderStatusesBlock}>
              {orderStatusesData.map((card, i) => {
                const icon = card.arrow === "ArrowUp" ? ArrowUp : ArrowDown;
                return (
                  <div key={i} className={cs.ordersGridOrderStatusCard}>
                    <span className={cs.cardNumber}>{card.number}</span>
                    <div>
                      <div className={cs.cardIconBlockWrapper}>
                        <span className={cs.cardStatus}>{card.status}</span>
                        <div className={cs.cardIconBlock}>
                          <div className={cs.cardIcon}>
                            <SheIcon
                              icon={icon}
                              maxWidth="15px"
                              style={{ color: card.arrowColor }}
                            />
                          </div>
                          <span
                            className={cs.cardIconText}
                            style={{ color: card.arrowColor }}
                          >
                            {card.percent}
                          </span>
                        </div>
                      </div>
                      <Progress
                        className={`${cs.cardProgressbar} ${
                          card.progressBarColor === "#50A2FF"
                            ? cs.colorBlue
                            : card.progressBarColor === "#00D5BE"
                              ? cs.colorTeal
                              : card.progressBarColor === "#05DF72"
                                ? cs.colorGreen
                                : card.progressBarColor === "#FF8904"
                                  ? cs.colorOrange
                                  : ""
                        }`}
                        value={card.progress}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={cs.ordersGridBlock}>
            <SheGrid
              columns={ordersListGridColumns()}
              sortingItems={sortingItems}
              skeletonQuantity={10}
              data={gridData}
              showPagination={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
