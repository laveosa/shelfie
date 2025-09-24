import { useTranslation } from "react-i18next";
import { TFunction, TOptions } from "i18next";
import { any } from "zod";

export default function useAppTranslation() {
  const { t, i18n }: { t: TFunction; i18n: any } = useTranslation();

  function translate<Key extends string>(
    key: Key,
    options?: TOptions,
    defaultValue?: string,
  ): string | any {
    if (!key) return defaultValue ?? "";

    const opts: TOptions = {
      ...options,
      ...(defaultValue ? { defaultValue } : {}),
    };

    return t(key, opts as any);
  }

  return {
    translate,
    i18n,
  };
}
