export const getCustomProps = <T extends object, C>(
  props: T,
  model: C,
  noEmpty: boolean = true,
) => {
  if (!props || !model) return undefined;
  const keys = Object.keys(model) as (keyof C)[];
  return _pick<T, keyof C>(props, keys, noEmpty);
};

export function mergeComponentProps<T>(
  defaultProps: Partial<T>,
  overrideProps?: Partial<T>,
): Partial<T> {
  return {
    ...defaultProps,
    ...(overrideProps || {}),
  };
}

export function removeCustomProps<T extends object>(
  props: T,
  models: object | object[],
) {
  if (!props || !models) return undefined;

  const modelArr = Array.isArray(models) ? models : [models];
  const keySet = new Set<keyof T>();

  modelArr.forEach((model) =>
    (Object.keys(model) as (keyof T)[]).forEach((k) => keySet.add(k)),
  );

  return _omit<T, keyof T>(props, Array.from(keySet));
}

export const filterCustomProps = <
  TProps extends object,
  TDefaults extends object,
>(
  props: Partial<TProps>,
  defaultModels: TDefaults[],
): Partial<TProps> => {
  const keysToExtract = defaultModels.flatMap((model) =>
    Object.keys(model),
  ) as (keyof TProps)[];

  return keysToExtract.reduce((acc, key) => {
    if (key in props) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as Partial<TProps>);
};

// ================================================================== PRIVATE

function _pick<T extends object, K extends keyof T>(
  src: T,
  keys: readonly K[],
  noEmpty?: boolean,
): Partial<Pick<T, K>> {
  const out = {} as Partial<Pick<T, K>>;
  for (const k of keys) {
    const value: any = src[k];
    if (noEmpty) {
      const isEmpty =
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" &&
          !Array.isArray(value) &&
          Object.keys(value).length === 0);
      if (isEmpty) continue;
    }
    out[k] = value;
  }
  return out;
}

export function _omit<T extends object, K extends keyof T>(
  src: T,
  keys: readonly K[],
): Omit<T, K> {
  const out = { ...src };
  for (const k of keys) delete (out as any)[k];
  return out;
}
