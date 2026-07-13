export type Product = {
  id: number
  name: string
  /** Price in cents (haléře). */
  price: number
  /** Optional — backend will add this later. */
  imageUrl?: string | null
}
