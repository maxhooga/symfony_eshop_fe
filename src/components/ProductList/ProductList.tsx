import type { Product } from '../../types/product'
import { ProductCard } from '../ProductCard/ProductCard'
import './ProductList.css'

type ProductListProps = {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="product-list__empty">
        <p>Žádné produkty k zobrazení.</p>
      </div>
    )
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
