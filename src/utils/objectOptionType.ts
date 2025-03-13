export type FunctionOptionType<T> = T extends (...args: any[]) => any
  ? T
  : never;

export type ObjectOptionType<T> = T extends object ? T : never;
