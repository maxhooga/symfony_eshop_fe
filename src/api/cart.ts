import { api } from './client'
import type { Cart } from '../types/cart'

export async function getCart(): Promise<Cart> {
  const { data } = await api.get<Cart>('/api/cart')
  return data
}
