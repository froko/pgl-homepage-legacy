import type { CartItemWithQuantity, CheckoutFormData } from '@pgl/data'

export const CustomerMessage = (
  items: CartItemWithQuantity[],
  totalCost: number,
  vorname: string,
) => {
  const articlesAsString = items
    .map(
      (item) =>
        `<li>${item.quantity}x ${item.article} (CHF ${item.price?.toFixed(2)})</li>`,
    )
    .toString()
    .replace(/,/g, '')

  return `
      Hallo ${vorname}<br /><br />
      Herzlichen Dank für deine Bestellung im PGL-Shop!<br />
      Du hast folgende Artikel bestellt:<br />
      <ul>${articlesAsString}</ul><br />
      <b>Total: CHF ${totalCost.toFixed(2)}</b><br /><br />
      Sämtliche Produktpreise verstehen sich inkl. Verpackungs- und Versandspesen.<br />
      Versand nur gegen Vorauszahlung. Für den Versand ins Ausland können zusätzliche Kosten entstehen.<br />
      Unsere Bankverbindung lautet:<br /><br />
      <b>IBAN: CH55 0900 0000 6050 6507 7</b><br />
      <b>Guggenmusig Pilatusgeister</b><br />
      <b>6000 Luzern</b><br /><br />
      Alternativ kannst du auch unseren QR-Einzahlungsschein im Anhang für die Zahlung verwenden.<br /><br /><br />
      Beste Grüsse,<br />
      Pilatusgeister Luzern<br />`
}

export const ShopMessage = (
  items: CartItemWithQuantity[],
  totalCost: number,
  formData: CheckoutFormData,
) => {
  const articlesAsString = items
    .map(
      (item) =>
        `<li>${item.quantity}x ${item.article} (CHF ${item.price?.toFixed(2)})</li>`,
    )
    .toString()
    .replace(/,/g, '')

  return `
      Hallo<br /><br />
      Folgende Artikel wurden eben über den PGL Webshop bestellt:
      <ul>${articlesAsString}</ul><br />
      <b>Total: CHF ${totalCost.toFixed(2)}</b><br /><br />
      Die Artikel sollen nach erfolgreichem Zahlungseingang an folgende Adresse geschickt werden:<br /><br />
      <b>${formData.vorname} ${formData.name}</b><br />
      <b>${formData.adresse}</b><br />
      <b>${formData.plz} ${formData.ort}</b><br /><br />
      Email: ${formData.email}<br />
      Telefonnummer: ${formData.phone ?? 'unbekannt'}`
}
