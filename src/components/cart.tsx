import { useStore } from '@nanostores/preact';
import { cartItemCount } from 'src/cartStore';
import { isHidden } from 'src/navigationStore';
import { ShoppingCart } from './icons';

const Cart = () => {
  const $isHidden = useStore(isHidden);
  const $cartItemCount = useStore(cartItemCount);

  return $cartItemCount > 0 && !$isHidden ? (
    <a href="/checkout" className="relative mx-4 lg:mx-8 duration-200 md:hover:scale-125">
      <ShoppingCart />
      <span className="absolute inset-0 -mt-3 -mr-5">
        <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-semibold leading-4 bg-pgl-blue text-white">
          {$cartItemCount}
        </div>
      </span>
    </a>
  ) : null;
};

export default Cart;
