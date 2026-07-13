export type CartItem = {
  productId: number
  name: string
  price: number
  quantity: number
  subtotalInCents: number
}

export type Cart = {
  items: CartItem[]
  productCount: number
  itemCount: number
  totalInCents: number
}
