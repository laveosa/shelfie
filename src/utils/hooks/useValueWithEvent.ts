import React from "react";

export default function useValueWithEvent<E, D>(
  callback: (value: D, event: E | null) => void,
) {
  const eventRef = React.useRef<E | null>(null);

  const eventHandler = (event: E) => {
    eventRef.current = event;
  };

  const valueHandler = (value: D) => {
    callback(value, eventRef?.current);
    eventRef.current = null;
  };

  return { eventHandler, valueHandler };
}
