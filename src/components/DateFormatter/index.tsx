function dateToIsoString(dateString: string | null | undefined): string | null {
  if (!dateString) {
    return null;
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Check if the date is invalid
    return null;
  }
  return date.toISOString();
}

function isoToDateString(
  isoString: string | null | undefined,
): string | null | undefined {
  if (!isoString) {
    return null;
  }
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    // Check if the date is invalid
    return null;
  }
  return date.toISOString().slice(0, 10); // Extracts 'YYYY-MM-DD'
}

export {isoToDateString, dateToIsoString};
