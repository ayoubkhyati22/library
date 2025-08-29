export function generateWhatsAppURL(
  phone: string,
  productTitle: string,
  productId: string,
  price: number,
  message?: string
): string {
  const defaultMessage = message || `Bonjour, je suis intéressé(e) par ce livre: ${productTitle} (${productId}) - Prix: ${price} MAD`;
  const encodedMessage = encodeURIComponent(defaultMessage);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

export function openWhatsApp(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}