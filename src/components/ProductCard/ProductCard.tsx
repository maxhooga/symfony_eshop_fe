import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import './ProductCard.css'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
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
        <div className="product-card__qty" aria-hidden="true">
          <button type="button" disabled>
            −
          </button>
          <span>1 ks</span>
          <button type="button" disabled>
            +
          </button>
        </div>
        <button type="button" className="product-card__cart-btn" disabled aria-label="Do košíku">
          <CartIcon />
        </button>
      </div>
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
