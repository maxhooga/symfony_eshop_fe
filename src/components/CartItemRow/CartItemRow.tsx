import type { CartItem } from '../../types/cart'
import { formatPrice } from '../../utils/formatPrice'
import './CartItemRow.css'

type CartItemRowProps = {
  item: CartItem
  disabled: boolean
  onIncrease: (productId: number) => void
  onDecrease: (productId: number) => void
  onRemove: (productId: number) => void
}

export function CartItemRow({
  item,
  disabled,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemRowProps) {
  return (
    <tr className="cart-item-row">
      <td className="cart-item-row__name">
        <div className="cart-item-row__name-inner">
          <span className="cart-item-row__title">{item.name}</span>
          <span className="cart-item-row__sku">#{item.productId}</span>
        </div>
      </td>
      <td className="cart-item-row__price">{formatPrice(item.price)}</td>
      <td className="cart-item-row__qty">
        <div className="cart-item-row__qty-controls">
          <button
            type="button"
            onClick={() => onDecrease(item.productId)}
            disabled={disabled}
            aria-label="Snížit množství"
          >
            −
          </button>
          <span>{item.quantity} ks</span>
          <button
            type="button"
            onClick={() => onIncrease(item.productId)}
            disabled={disabled}
            aria-label="Zvýšit množství"
          >
            +
          </button>
        </div>
      </td>
      <td className="cart-item-row__actions">
        <span className="cart-item-row__subtotal">{formatPrice(item.subtotalInCents)}</span>
        <button
          type="button"
          className="cart-item-row__remove"
          onClick={() => onRemove(item.productId)}
          disabled={disabled}
        >
          Odebrat
        </button>
      </td>
    </tr>
  )
}
