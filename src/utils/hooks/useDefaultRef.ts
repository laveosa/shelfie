import { RefObject, useRef } from "react";

export default function useDefaultRef<T>(
  externalRef?: RefObject<T>,
): RefObject<T> {
  const defaultRef = useRef<T>(null);
  return externalRef || defaultRef;
}
