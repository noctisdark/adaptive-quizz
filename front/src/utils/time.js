export const secondsToTime = (seconds, format = "minutes") => {
  const date = new Date(seconds * 1000);
  const startIndex =
    format === "seconds"
      ? 17
      : format === "minutes"
      ? 14
      : format === "hours"
      ? 11
      : null;

  if (!startIndex)
    throw new Error("format must be in of 'seconds', 'minutes' or 'hours'");
  return date.toISOString().substring(startIndex, 19);
};
