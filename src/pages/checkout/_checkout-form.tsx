import { useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';

import { clearCart } from 'src/cartStore';
import Button from 'src/components/button';
import type { CartItemWithQuantity, CheckoutFormData } from 'src/data';

import { CustomerMessage, ShopMessage } from './_messages';

const CheckoutForm = (props: { items: CartItemWithQuantity[]; totalCost: number }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    vorname: '',
    name: '',
    adresse: '',
    plz: 0,
    ort: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const url = 'https://pgl-api.vercel.app/api/shop';
    const data = {
      ...formData,
      customerMessage: CustomerMessage(props.items, props.totalCost, formData.vorname),
      shopMessage: ShopMessage(props.items, props.totalCost, formData)
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify(data)
    };

    fetch(url, requestOptions).then(() => {
      setLoading(false);
      clearCart();
      window.location.href = '/checkout/thank-you';
    });
  };

  const formStyle =
    'w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none';

  return (
    <Fragment>
      <p>Bitte fülle das untenstehende Formular aus und teile uns mit, wie wir dich bei Fragen erreichen können.</p>
      <p>
        Sämtliche Produktpreise verstehen sich inkl. Verpackungs- und Versandspesen. Für den Versand ins Ausland können
        zusätzliche Kosten entstehen.
      </p>
      <p>Versand nur gegen Vorauszahlung. Unsere Bankverbindung lautet:</p>
      <p className="mb-0 font-bold">IBAN: CH55 0900 0000 6050 6507 7</p>
      <p className="my-0 font-bold">Guggenmusig Pilatusgeister</p>
      <p className="mt-0 font-bold">6500 Luzern</p>
      <p>Die Liste der bestellten Artikel sowie die Zahlungsinformationen stellen wir dir zusätzlich per Email zu.</p>
      <form className="-mx-2 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          <div className="mb-2 w-full px-2 md:w-1/2">
            <label htmlFor="vorname">Vorname*</label>
            <input id="vorname" name="vorname" type="text" required className={formStyle} onChange={handleChange} />
          </div>
          <div className="mb-2 w-full px-2 md:w-1/2">
            <label htmlFor="name">Name*</label>
            <input id="name" name="name" type="text" required className={formStyle} onChange={handleChange} />
          </div>
          <div className="mb-2 w-full px-2">
            <label htmlFor="adresse">Adresse*</label>
            <input id="adresse" name="adresse" type="text" required className={formStyle} onChange={handleChange} />
          </div>
          <div className="mb-2 w-full px-2 md:w-1/2">
            <label htmlFor="plz">PLZ*</label>
            <input id="plz" name="plz" type="number" required className={formStyle} onChange={handleChange} />
          </div>
          <div className="mb-2 w-full px-2 md:w-1/2">
            <label htmlFor="ort">Ort*</label>
            <input id="ort" name="ort" type="text" required className={formStyle} onChange={handleChange} />
          </div>
          <div className="mb-2 w-full px-2 md:w-1/2">
            <label htmlFor="email">Email*</label>
            <input id="email" name="email" type="email" required className={formStyle} onChange={handleChange} />
          </div>
          <div className="mb-2 w-full px-2 md:w-1/2">
            <label htmlFor="phone">Telefon</label>
            <input id="phone" name="phone" type="tel" className={formStyle} onChange={handleChange} />
          </div>
          <div className="ml-2 mt-4">
            <Button type="submit" loading={loading}>
              Bestellung abschicken
            </Button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default CheckoutForm;
