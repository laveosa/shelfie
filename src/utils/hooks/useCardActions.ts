import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store.ts";
import { useCallback, useRef } from "react";

import { scrollToRefElement } from "@/utils/helpers/quick-helper.ts";

export function useCardActions({
  selectActiveCards,
  refreshAction,
}: {
  selectActiveCards: (state: RootState) => string[];
  refreshAction: (cards: string[]) => any;
}) {
  const dispatch = useDispatch();
  const activeCards = useSelector(selectActiveCards);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const handleCardAction = useCallback(
    (
      identifier: string,
      forceOpen: boolean = false,
      overrideActiveCards?: string[],
    ) => {
      const currentCards = overrideActiveCards ?? activeCards;
      let updatedCards: string[];

      if (forceOpen) {
        if (!currentCards.includes(identifier)) {
          updatedCards = [...currentCards, identifier];
          dispatch(refreshAction(updatedCards));
          setTimeout(() => {
            scrollToRefElement(cardRefs.current, identifier);
          }, 100);
        } else {
          dispatch(refreshAction(currentCards));
        }
      } else {
        updatedCards = currentCards.filter((card) => card !== identifier);
        dispatch(refreshAction(updatedCards));
      }
    },
    [activeCards, dispatch, refreshAction],
  );

  const createRefCallback = useCallback((identifier: string) => {
    return (el: HTMLElement | null) => {
      cardRefs.current[identifier] = el;
    };
  }, []);

  return { handleCardAction, cardRefs, createRefCallback };
}
