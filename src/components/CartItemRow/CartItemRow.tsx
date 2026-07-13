import type { CartItem } from '../../types/cart'
import { formatPrice } from '../../utils/formatPrice'
import './CartItemRow.css'

type CartItemRowProps = {
  item: CartItem
}

export function CartItemRow({ item }: CartItemRowProps) {
  return (
    <tr className="cart-item-row">
      <td className="cart-item-row__name">
        <div className="cart-item-row__name-inner">
          <span className="cart-item-row__title">{item.name}</span>
          <span className="cart-item-row__sku">#{item.productId}</span>
        </div>
      </td>
      <td className="cart-item-row__price">{formatPrice(item.price)}</td>
      <td className="cart-item-row__qty">{item.quantity} ks</td>
      <td className="cart-item-row__subtotal">{formatPrice(item.subtotalInCents)}</td>
    </tr>
  )
}
