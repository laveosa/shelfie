import {
  ISheSelectItem,
  ISheSelectItemConvertorConfig,
} from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export function convertToSelectItems<L, T>(
  list: L[],
  config: ISheSelectItemConvertorConfig,
  common?: (item: L) => ISheSelectItem<T>,
): ISheSelectItem<T>[] {
  if (!list || list.length === 0) return null;

  if (common) return list.map(common);

  if (!config) {
    console.error("ERROR Convert To Select Items: no 'config' model!");
    return null;
  }

  return list.map(
    (item: L): ISheSelectItem<T> => ({
      id: item[config.id],
      text: item[config.text],
      description: item[config.description],
      icon: item[config.icon],
      value: item[config.value],
      colors: item[config.colors],
      sideText: item[config.sideText],
      sideDescription: item[config.sideDescription],
      isSelected: item[config.isSelected],
    }),
  );
}
