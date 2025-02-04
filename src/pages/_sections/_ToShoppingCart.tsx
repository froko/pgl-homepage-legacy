import { ShoppingCart } from '@pgl/components/icons'
import type { CartItem } from '@pgl/data'
import { addToCart } from '@pgl/store'

const ToShoppingCart = (props: { item: CartItem }) => {
  const { item } = props
  return (
    <button
      id={item.article}
      value={JSON.stringify(item)}
      className="flex duration-300 md:hover:mr-2 md:hover:scale-110"
      onClick={() => addToCart(item)}>
      <ShoppingCart />
      <span className="ml-2 whitespace-nowrap text-sm font-semibold">
        In den Warenkorb
      </span>
    </button>
  )
}

export default ToShoppingCart
