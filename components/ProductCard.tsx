'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { IProduct } from '@/lib/types'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: IProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCart()
  const discount = calculateDiscount(product.price, product.discountPrice)
  const mainImage = product.images[0] ?? ''
  const isOutOfStock = product.stock === 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isOutOfStock) return
    addItem({
      productId: String(product._id),
      name: product.name,
      price: product.discountPrice ?? product.price,
      image: mainImage,
      quantity: 1,
      stock: product.stock,
    })
    openCart()
  }

  return (
    <div className="group relative bg-ff-dark hover:bg-ff-mid/40 rounded-sm overflow-hidden transition-colors">
      <Link href={`/shop/${product._id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-ff-mid">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-12 h-12 text-ff-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
              </svg>
            </div>
          )}
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-ff-accent text-ff-black text-xs font-bold px-2 py-0.5">
              -{discount}%
            </span>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-ff-black/60 flex items-center justify-center">
              <span className="text-ff-light text-sm font-medium uppercase tracking-widest">Agotado</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-ff-accent/70 text-xs uppercase tracking-widest mb-1">{product.category}</p>
          <h3 className="text-ff-white text-sm font-medium leading-snug group-hover:text-ff-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            {product.discountPrice ? (
              <>
                <span className="text-ff-white font-semibold">
                  {formatPrice(product.discountPrice)}
                </span>
                <span className="text-ff-light/40 text-xs line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-ff-white font-semibold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-2 text-xs font-semibold uppercase tracking-widest transition-colors rounded-sm ${
            isOutOfStock
              ? 'bg-ff-mid text-ff-light/30 cursor-not-allowed'
              : 'bg-ff-accent text-ff-black hover:bg-ff-accent-dark'
          }`}
        >
          {isOutOfStock ? 'Sin stock' : 'Añadir al carrito'}
        </button>
      </div>
    </div>
  )
}
