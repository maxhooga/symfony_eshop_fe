import { useEffect, useState } from 'react'
import axios from 'axios'
import { getProducts } from '../../api/products'
import type { Product } from '../../types/product'
import { ProductList } from '../../components/ProductList/ProductList'
import './HomePage.css'

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    getProducts()
      .then((data) => {
        if (!cancelled) {
          setProducts(data)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          if (axios.isAxiosError(err)) {
            setError('Nepodařilo se načíst produkty. Běží backend?')
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
  }, [])

  return (
    <main className="home-page">
      <div className="home-page__main">
        <div className="home-page__layout">
          <aside className="home-page__sidebar" aria-label="Kategorie">
            <h2>Kategorie</h2>
            <ul>
              <li className="is-active">Všechny produkty</li>
            </ul>
          </aside>

          <section className="home-page__content">
            <header className="home-page__heading">
              <h1>Produkty</h1>
              {!loading && !error && (
                <p>{products.length} {products.length === 1 ? 'produkt' : 'produktů'}</p>
              )}
            </header>

            {loading && <p className="home-page__status">Načítám produkty…</p>}
            {error && <p className="home-page__status home-page__status--error">{error}</p>}
            {!loading && !error && <ProductList products={products} />}
          </section>
        </div>
      </div>
    </main>
  )
}
