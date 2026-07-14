export type CustomerDetails = {
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  city: string
  postalCode: string
}

export type ShippingMethod = 'pickup' | 'courier' | 'packeta'

export type ShippingOption = {
  id: ShippingMethod
  label: string
  description: string
  priceInCents: number
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'pickup',
    label: 'Osobní odběr',
    description: 'Zdarma — vyzvednutí na prodejně do 2 dnů',
    priceInCents: 0,
  },
  {
    id: 'packeta',
    label: 'Zásilkovna',
    description: 'Doručení na výdejní místo do 3 pracovních dnů',
    priceInCents: 6900,
  },
  {
    id: 'courier',
    label: 'Kurýr',
    description: 'Doručení na adresu do 2 pracovních dnů',
    priceInCents: 9900,
  },
]

export const EMPTY_CUSTOMER: CustomerDetails = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  postalCode: '',
}

export function getShippingOption(id: ShippingMethod): ShippingOption {
  return SHIPPING_OPTIONS.find((option) => option.id === id) ?? SHIPPING_OPTIONS[0]
}
