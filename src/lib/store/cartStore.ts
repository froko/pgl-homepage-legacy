import { persistentAtom } from '@nanostores/persistent'
import type { CartItem } from '@pgl/data'

export const cartItems = persistentAtom<CartItem[]>('cartItems', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
})
export const cartItemCount = persistentAtom<number>('cartItemCount', 0, {
  encode: JSON.stringify,
  decode: JSON.parse,
})

export const addToCart = (item: CartItem) => {
  cartItems.set([...cartItems.get(), item])
  cartItemCount.set(cartItems.get().length)
}

export const removeFromCart = (item: CartItem) => {
  const basketCopy = [...cartItems.get()]
  const index = cartItems
    .get()
    .findIndex((cartItem) => cartItem.article === item.article)

  if (index >= 0) {
    basketCopy.splice(index, 1)
    cartItems.set(basketCopy)
    cartItemCount.set(cartItems.get().length)
  }
}

export const clearCart = () => {
  cartItems.set([])
  cartItemCount.set(0)
}
