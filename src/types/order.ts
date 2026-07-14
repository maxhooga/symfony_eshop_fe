import type { ShippingMethod } from './checkout'

export type OrderItem = {
  id: number
  productId: number | null
  productName: string
  unitPrice: number
  quantity: number
  subtotalInCents: number
}

export type Order = {
  id: number
  fullName: string
  email: string | null
  mobile: string
  street: string
  city: string
  postalCode: string
  shippingMethod: ShippingMethod
  shippingPriceInCents: number
  itemsSubtotalInCents: number
  totalInCents: number
  status: string
  createdAt: string
  items: OrderItem[]
}

export type CreateOrderPayload = {
  fullName: string
  mobile: string
  email?: string | null
  street: string
  city: string
  postalCode: string
  shippingMethod: ShippingMethod
}
