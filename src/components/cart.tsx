import { useStore } from '@nanostores/preact';
import { cartItemCount, isHidden } from '@pgl/store';
import { ShoppingCart } from './icons';

const Cart = () => {
  const $isHidden = useStore(isHidden);
  const $cartItemCount = useStore(cartItemCount);

  return $cartItemCount > 0 && !$isHidden ? (
    <a href="/checkout" className="relative mx-4 duration-200 md:hover:scale-125 lg:mx-8">
      <ShoppingCart />
      <span className="absolute inset-0 -mr-5 -mt-3">
        <div className="inline-flex items-center rounded-full bg-pgl-blue px-1.5 py-0.5 text-xs font-semibold leading-4 text-white">
          {$cartItemCount}
        </div>
      </span>
    </a>
  ) : null;
};

export default Cart;
