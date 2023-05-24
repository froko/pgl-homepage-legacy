import { useStore } from '@nanostores/preact';
import { useEffect, useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';

import { cartItems } from 'src/cartStore';
import type { CartItem, CartItemWithQuantity } from 'src/data';

import Content from './_content';

const Checkout = () => {
  const $cartItems = useStore(cartItems);
  const [totalCost, setTotalCost] = useState(0);
  const [items, setItems] = useState<CartItemWithQuantity[]>([]);

  useEffect(() => {
    let cost = 0;
    let groupedItems: (CartItem & { quantity: number })[] = [];

    $cartItems.forEach((item) => {
      cost = cost + item.price!;
      const index = groupedItems.findIndex((i) => i.article === item.article);
      if (index >= 0) {
        groupedItems[index].quantity++;
      } else {
        groupedItems.push({ ...item, quantity: 1 });
      }
    });

    setTotalCost(cost);
    setItems(groupedItems);
  });

  return (
    <Fragment>
      <h1>Warenkorb</h1>
      {items.length === 0 && <p>Dein Warenkorb ist leer.</p>}
      {items.length > 0 && <Content items={items} totalCost={totalCost} />}
    </Fragment>
  );
};

export default Checkout;
