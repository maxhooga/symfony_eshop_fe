const formatter = new Intl.NumberFormat('cs-CZ', {
  style: 'currency',
  currency: 'CZK',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

/** Converts cents from the API to a formatted CZK string. */
export function formatPrice(cents: number): string {
  return formatter.format(cents / 100)
}
