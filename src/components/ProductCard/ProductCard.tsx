import { useState } from 'react'
import axios from 'axios'
import { addProductToCart } from '../../api/cart'
import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import './ProductCard.css'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1))
  }

  const increaseQuantity = () => {
    setQuantity((current) => current + 1)
  }

  const handleAddToCart = async () => {
    setAdding(true)
    setError(null)
    setAdded(false)

    try {
      await addProductToCart(product.id, quantity)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError('Nepodařilo se přidat do košíku.')
      } else {
        setError('Něco se pokazilo.')
      }
    } finally {
      setAdding(false)
    }
  }

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
          />
        ) : (
          <div className="product-card__image-placeholder" aria-hidden="true">
            <ImagePlaceholderIcon />
            <span>Bez obrázku</span>
          </div>
        )}
      </div>

      <div className="product-card__body">
        <p className="product-card__sku">#{product.id}</p>
        <h2 className="product-card__name">{product.name}</h2>
        <p className="product-card__price">{formatPrice(product.price)}</p>
      </div>

      <div className="product-card__footer">
        <div className="product-card__qty">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={adding || quantity <= 1}
            aria-label="Snížit množství"
          >
            −
          </button>
          <span>{quantity} ks</span>
          <button
            type="button"
            onClick={increaseQuantity}
            disabled={adding}
            aria-label="Zvýšit množství"
          >
            +
          </button>
        </div>
        <button
          type="button"
          className={`product-card__cart-btn${added ? ' is-added' : ''}`}
          onClick={handleAddToCart}
          disabled={adding}
          aria-label="Do košíku"
        >
          {adding ? '…' : added ? '✓' : <CartIcon />}
        </button>
      </div>

      {error && <p className="product-card__error">{error}</p>}
    </article>
  )
}

function ImagePlaceholderIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <path d="m21 15-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6h15l-1.5 9h-12L6 6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6 6 5 3H2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" />
    </svg>
  )
}
