import { api } from './client'
import type { CreateOrderPayload, Order } from '../types/order'

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const { data } = await api.post<Order>('/api/orders', payload)
  return data
}
