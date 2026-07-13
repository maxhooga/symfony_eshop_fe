import { api } from './client'
import type { Cart } from '../types/cart'

export async function getCart(): Promise<Cart> {
  const { data } = await api.get<Cart>('/api/cart')
  return data
}

export async function setCartItem(productId: number, quantity: number): Promise<Cart> {
  const { data } = await api.post<Cart>('/api/cart/items', { productId, quantity })
  return data
}

export async function addProductToCart(productId: number, quantityToAdd: number): Promise<Cart> {
  const cart = await getCart()
  const existing = cart.items.find((item) => item.productId === productId)
  const quantity = (existing?.quantity ?? 0) + quantityToAdd

  return setCartItem(productId, quantity)
}

export async function updateCartItemQuantity(productId: number, quantity: number): Promise<Cart> {
  return setCartItem(productId, quantity)
}

export async function removeCartItem(productId: number): Promise<Cart> {
  return setCartItem(productId, 0)
}
