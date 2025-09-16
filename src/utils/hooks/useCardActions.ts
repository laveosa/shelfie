import { useDispatch, useSelector } from "react-redux";
import { useCallback, useRef } from "react";

import { RootState } from "@/state/store.ts";
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

  const handleMultipleCardActions = useCallback(
    (cardActions: Record<string, boolean>, overrideActiveCards?: string[]) => {
      const currentCards = overrideActiveCards ?? activeCards;
      let updatedCards = new Set(currentCards);
      let lastAddedCard: string | null = null;

      for (const [card, shouldOpen] of Object.entries(cardActions)) {
        if (shouldOpen) {
          if (!updatedCards.has(card)) {
            updatedCards.add(card);
            lastAddedCard = card;
          }
        } else {
          updatedCards.delete(card);
        }
      }

      const updatedCardsArray = Array.from(updatedCards);
      dispatch(refreshAction(updatedCardsArray));

      if (lastAddedCard) {
        setTimeout(() => {
          scrollToRefElement(cardRefs.current, lastAddedCard);
        }, 100);
      }
    },
    [activeCards, dispatch, refreshAction],
  );

  const keepOnlyCards = useCallback(
    (openCardIdentifiers: string[] = []) => {
      const cardActions: Record<string, boolean> = {};

      for (const card of activeCards) {
        cardActions[card] = openCardIdentifiers.includes(card);
      }

      for (const card of openCardIdentifiers) {
        if (!cardActions[card]) {
          cardActions[card] = true;
        }
      }

      handleMultipleCardActions(cardActions, []);
    },
    [activeCards, handleMultipleCardActions],
  );

  const createRefCallback = useCallback((identifier: string) => {
    return (el: HTMLElement | null) => {
      cardRefs.current[identifier] = el;
    };
  }, []);

  return {
    handleCardAction,
    handleMultipleCardActions,
    keepOnlyCards,
    cardRefs,
    createRefCallback,
  };
}
