export const capitalizeAndTruncate = (text: string, maxLength: number): string => {
  const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
  if (capitalizedText.length > maxLength) {
    return capitalizedText.slice(0, maxLength) + " ...";
  }
  return capitalizedText;
};