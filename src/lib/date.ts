export function isoDate(date: Date) {
  return date.toISOString().slice(0, 10)
}
