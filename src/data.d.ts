export type NavigationItem = { name: string; to: string };

export type Advertisement = { src: string; alt: string; href: string };

export type Event = { title: string; description: string };

export type Vorstand = { name: string; funktion: string };

export interface CartItem {
  article: string;
  description?: string;
  price?: number;
  quantity?: number;
}

export interface CartItemWithQuantity extends CartItem {
  quantity: number;
}

export type CheckoutFormData = {
  vorname: string;
  name: string;
  adresse: string;
  plz: number;
  ort: string;
  email: string;
  phone: string;
};
