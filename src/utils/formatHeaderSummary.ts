export const formatHeaderSummary = (header: string, summary?: string) => {
  if (!summary) return header;
  const cleanedSummary = summary.trimStart();

  if (cleanedSummary === header) return header;
  return `${header}\n${cleanedSummary}`;
};
