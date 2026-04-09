'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

export default function ShoppingCart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ff-black/70 backdrop-blur-sm z-50"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-ff-dark border-l border-ff-mid/40 z-50 flex flex-col animate-slide-down">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ff-mid/40">
          <h2 className="text-ff-white font-display font-semibold text-lg">
            Carrito
            {totalItems > 0 && (
              <span className="ml-2 text-ff-accent text-sm font-normal">
                ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="text-ff-light/60 hover:text-ff-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg className="w-16 h-16 text-ff-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9Z" />
              </svg>
              <p className="text-ff-light/50 text-sm">Tu carrito está vacío</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="text-ff-accent text-sm hover:text-ff-accent-dark transition-colors"
              >
                Ir a la tienda →
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className="flex gap-4 items-start">
                <div className="relative w-16 h-16 flex-shrink-0 bg-ff-mid rounded-sm overflow-hidden">
                  {item.image && (
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-ff-white text-sm font-medium truncate">{item.name}</p>
                  <p className="text-ff-accent text-sm font-semibold mt-0.5">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-6 h-6 border border-ff-mid/60 text-ff-white text-sm flex items-center justify-center hover:border-ff-accent transition-colors rounded-sm"
                    >
                      −
                    </button>
                    <span className="text-ff-white text-sm w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="w-6 h-6 border border-ff-mid/60 text-ff-white text-sm flex items-center justify-center hover:border-ff-accent transition-colors rounded-sm disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.productId)}
                  aria-label="Eliminar"
                  className="text-ff-light/40 hover:text-red-400 transition-colors mt-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 7-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-ff-mid/40 space-y-3">
            <div className="flex items-center justify-between text-ff-white">
              <span className="text-sm font-medium">Total</span>
              <span className="font-display text-xl font-bold text-ff-accent">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <Link
              href="/shop/cart"
              onClick={closeCart}
              className="block w-full bg-ff-accent text-ff-black font-semibold text-sm text-center py-3 uppercase tracking-widest hover:bg-ff-accent-dark transition-colors rounded-sm"
            >
              Proceder al pago
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-ff-light/60 text-sm text-center hover:text-ff-white transition-colors py-1"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </>
  )
}
