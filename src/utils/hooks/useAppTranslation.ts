import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

export default function useAppTranslation() {
  const { t, i18n }: { t: TFunction; i18n: any } = useTranslation();

  function translate(key: any = "", defaultValue?: string): any {
    return defaultValue ? t(key, { defaultValue } as any) : (t(key) as string);
  }

  return {
    translate,
  };
}
