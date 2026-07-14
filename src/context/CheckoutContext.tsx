import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CustomerDetails, ShippingMethod } from '../types/checkout'
import { EMPTY_CUSTOMER } from '../types/checkout'
import type { Order } from '../types/order'

type CheckoutContextValue = {
  customer: CustomerDetails
  updateCustomer: (patch: Partial<CustomerDetails>) => void
  shippingMethod: ShippingMethod | null
  setShippingMethod: (method: ShippingMethod) => void
  createdOrder: Order | null
  setCreatedOrder: (order: Order) => void
  resetCheckout: () => void
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<CustomerDetails>(EMPTY_CUSTOMER)
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null)
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null)

  const value = useMemo<CheckoutContextValue>(
    () => ({
      customer,
      updateCustomer: (patch) => setCustomer((current) => ({ ...current, ...patch })),
      shippingMethod,
      setShippingMethod,
      createdOrder,
      setCreatedOrder,
      resetCheckout: () => {
        setCustomer(EMPTY_CUSTOMER)
        setShippingMethod(null)
        setCreatedOrder(null)
      },
    }),
    [customer, shippingMethod, createdOrder],
  )

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error('useCheckout must be used within CheckoutProvider')
  }

  return context
}
