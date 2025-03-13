export const extractArrayInfo = (arr?: string[]) => {
  const [first, second, ...rest] = arr ?? [];

  return {
    first,
    second,
    restLength: rest.length,
  };
};
