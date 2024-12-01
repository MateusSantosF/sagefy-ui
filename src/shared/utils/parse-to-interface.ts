export function parseToInterface<T>(
  obj: Record<string, unknown> | undefined,
  defaultValues: Partial<T> = {}
): T {
  if (!obj) return {} as T;

  const parsedObj = { ...defaultValues, ...obj } as T;

  for (const key in defaultValues) {
    if (
      obj.hasOwnProperty(key) &&
      typeof obj[key] !== typeof defaultValues[key as keyof T]
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (parsedObj as any)[key] = defaultValues[key];
    }
  }

  return parsedObj;
}
