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
  email: string | null
  mobile: string
  street: string
  city: string
  postalCode: string
  totalInCents: number
  status: string
  createdAt: string
  items: OrderItem[]
}

export type CreateOrderPayload = {
  mobile: string
  email?: string | null
  street: string
  city: string
  postalCode: string
}
