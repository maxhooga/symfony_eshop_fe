import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { getCart, removeCartItem, updateCartItemQuantity } from '../api/cart'
import type { Cart } from '../types/cart'

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingProductId, setUpdatingProductId] = useState<number | null>(null)

  const loadCart = useCallback(async () => {
    const data = await getCart()
    setCart(data)
    return data
  }, [])

  useEffect(() => {
    let cancelled = false

    loadCart()
      .catch((err: unknown) => {
        if (!cancelled) {
          if (axios.isAxiosError(err)) {
            setError('Nepodařilo se načíst košík. Běží backend?')
          } else {
            setError('Něco se pokazilo.')
          }
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [loadCart])

  const handleCartUpdate = async (productId: number, action: () => Promise<Cart>) => {
    setUpdatingProductId(productId)
    setError(null)

    try {
      const updated = await action()
      setCart(updated)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError('Nepodařilo se upravit košík.')
      } else {
        setError('Něco se pokazilo.')
      }
    } finally {
      setUpdatingProductId(null)
    }
  }

  const increaseQuantity = (productId: number) => {
    const item = cart?.items.find((entry) => entry.productId === productId)
    if (!item) return
    void handleCartUpdate(productId, () => updateCartItemQuantity(productId, item.quantity + 1))
  }

  const decreaseQuantity = (productId: number) => {
    const item = cart?.items.find((entry) => entry.productId === productId)
    if (!item) return

    if (item.quantity <= 1) {
      void handleCartUpdate(productId, () => removeCartItem(productId))
      return
    }

    void handleCartUpdate(productId, () => updateCartItemQuantity(productId, item.quantity - 1))
  }

  const removeItem = (productId: number) => {
    void handleCartUpdate(productId, () => removeCartItem(productId))
  }

  return {
    cart,
    loading,
    error,
    updatingProductId,
    reloadCart: loadCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  }
}
