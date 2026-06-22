/**
 * Повертає поточну дату у вигляді рядка із розділювачем "-"
 * @param {'MM-DD-YYYY' | 'DD-MM-YYYY'} format
 * @returns {string}
 */
export function getTodayDateString(format = 'MM-DD-YYYY') {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  if (format === 'DD-MM-YYYY') {
    return `${day}-${month}-${year}`;
  }

  return `${month}-${day}-${year}`;
}

export function getCurrentMonth(monthsToShift = 0) {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + monthsToShift);

  return date.toLocaleDateString('en-US', { month: 'long' });
}
