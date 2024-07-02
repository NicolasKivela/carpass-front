function dateToIsoString(dateString: string | null | undefined): string {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Check if the date is invalid
    return '';
  }
  return date.toISOString();
}

function isoToDateString(isoString: string | null | undefined): string {
  if (!isoString) {
    return '';
  }
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    // Check if the date is invalid
    return '';
  }
  return date.toISOString().slice(0, 10); // Extracts 'YYYY-MM-DD'
}

export {isoToDateString, dateToIsoString};
