import React, { useEffect, useRef, useState } from "react";

import cs from "./SheContextSidebar.module.scss";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import PageSidebarMenu from "@/components/complex/page-sidebar-menu/PageSidebarMenu.tsx";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
} from "@/components/ui/carousel.tsx";
import { ISheContextSidebar } from "@/const/interfaces/complex-components/ISheContextSidebar.ts";
import {
  IItemsCardItem,
  IItemsCardItemOption,
} from "@/const/interfaces/complex-components/custom-cards/IItemsCard.ts";
import { useSidebar } from "@/components/ui/sidebar.tsx";
import PageSidebarMenuMobile from "@/components/complex/page-sidebar-menu-mobile/PageSidebarMenuMobile.tsx";

export default function SheContextSidebar({
  className = "",
  style,
  children,
  activeTab,
  listTitle,
  listItems,
  showListItems,
  hideSidebarBlock,
  selectedId,
  isListLoading,
  menuTitle,
  menuCollectionType,
  counter,
  itemId,
  activeCards,
  skeletonQuantity,
  isMouseWheelHorizontalScroll,
  onAction,
}: ISheContextSidebar) {
  // ==================================================================== STATE MANAGEMENT
  const [_listItems, setListItems] = useState<IItemsCardItem[]>([]);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>(null);

  // ==================================================================== REF
  const prevCardsCount = useRef(activeCards?.length || 0);

  // ==================================================================== UTILITIES
  const { isMobile } = useSidebar();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (listItems && listItems.length > 0)
      setListItems(_listItemsConvertor(listItems));
  }, [listItems]);

  useEffect(() => {
    if (!isMobile && carouselApi) {
      const currentCount = activeCards?.length || 0;
      const cardsAdded = currentCount > prevCardsCount.current;

      requestAnimationFrame(() => {
        carouselApi.reInit();

        if (cardsAdded) {
          requestAnimationFrame(() => {
            const lastIndex = carouselApi.scrollSnapList().length - 1;
            carouselApi.scrollTo(lastIndex, true);
          });
        }
      });

      prevCardsCount.current = currentCount;
    }
  }, [activeCards, children, carouselApi]);

  useEffect(() => {
    if (!isMobile && isMouseWheelHorizontalScroll && carouselApi) {
      const container = carouselApi.containerNode();

      const handleWheel = (e: WheelEvent) => {
        const target = e.target as HTMLElement;
        let scrollableElement: HTMLElement | null = null;
        let currentElement = target;

        while (currentElement && currentElement !== container) {
          const hasOverflow =
            currentElement.scrollHeight > currentElement.clientHeight;
          const isScrollable =
            window.getComputedStyle(currentElement).overflowY !== "hidden";

          if (hasOverflow && isScrollable) {
            scrollableElement = currentElement;
            break;
          }

          currentElement = currentElement.parentElement;
        }

        if (scrollableElement) {
          const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
          const isAtTop = scrollTop <= 1;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

          if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
            return;
          }
        }

        e.preventDefault();
        setTimeout(() => {
          carouselApi.scrollTo(
            carouselApi.selectedScrollSnap() + (e.deltaY > 0 ? 1 : -1),
            false,
          );
        });
      };

      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, [carouselApi]);

  // ==================================================================== LOGIC

  // ==================================================================== PRIVATE
  function _listItemsConvertor(items: any[]): IItemsCardItem[] {
    switch (activeTab) {
      case "products":
        return _itemsCardItemsConvertor(items, {
          idKey: "productId",
          nameKey: "productName",
          imageKeyPath: "image.thumbnailUrl",
          type: "product",
        });
      case "variants":
        return _itemsCardItemsConvertor(items, {
          idKey: "variantId",
          nameKey: "variantName",
          imageKeyPath: "photo.thumbnailUrl",
          type: "variant",
        });
      default:
        return null;
    }
  }

  function _itemsCardItemsConvertor(
    items: any[],
    options: IItemsCardItemOption,
  ): IItemsCardItem[] {
    const { idKey, nameKey, imageKeyPath, type } = options;

    return items?.map((item) => ({
      id: Number(item[idKey]),
      name: item[nameKey],
      type,
      imageUrl:
        imageKeyPath &&
        imageKeyPath.split(".").reduce((acc, key) => acc?.[key], item),
      originalItem: item,
    }));
  }

  // ==================================================================== LAYOUT
  return (
    <div
      className={`${cs.sheContextSidebar} ${className} ${hideSidebarBlock ? cs.sheContextSidebarNoSideBar : ""} ${isMobile ? cs.isMobile : ""}`}
      style={{ ...style }}
    >
      {!hideSidebarBlock && (
        <div className={cs.sheContextSidebarMenuAndListContainer}>
          {!isMobile && showListItems && (
            <div className={cs.sheContextSidebarList}>
              <ItemsCard
                isLoading={isListLoading}
                title={listTitle ? listTitle : activeTab.toString()}
                items={_listItems}
                selectedId={selectedId}
                skeletonQuantity={skeletonQuantity}
                onAction={onAction}
              />
            </div>
          )}
          <div className={cs.sheContextSidebarMenu}>
            {!isMobile ? (
              <PageSidebarMenu
                title={menuTitle}
                itemsCollection={menuCollectionType}
                counter={counter}
                itemId={itemId}
                activeCards={activeCards}
              />
            ) : (
              <PageSidebarMenuMobile
                itemsCollection={menuCollectionType}
                counter={counter}
                itemId={itemId}
                activeCards={activeCards}
              />
            )}
          </div>
        </div>
      )}
      <div className={cs.sheContextSidebarContextContainer}>
        {!isMobile ? (
          <Carousel
            setApi={setCarouselApi}
            className={cs.carouselContainer}
            opts={{
              align: "start",
              dragFree: true,
              slidesToScroll: "auto",
            }}
          >
            <CarouselContent className={cs.carouselContent}>
              {children}
            </CarouselContent>
          </Carousel>
        ) : (
          <>{children}</>
        )}
      </div>
    </div>
  );
}
