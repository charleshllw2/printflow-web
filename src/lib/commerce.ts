export type Money = { amount: string; currencyCode: string };
export type ProductImage = { url: string; altText: string | null; width: number; height: number };
export type Variant = { id: string; title: string; availableForSale: boolean; price: Money; compareAtPrice: Money | null; image: ProductImage | null; selectedOptions: { name: string; value: string }[] };
export type Product = { id: string; handle: string; title: string; description: string; productType: string; availableForSale: boolean; featuredImage: ProductImage | null; options: { name: string; values: string[] }[]; priceRange: { minVariantPrice: Money; maxVariantPrice: Money }; compareAtPriceRange: { minVariantPrice: Money }; seo: { title: string | null; description: string | null }; images: { nodes: ProductImage[] }; variants: { nodes: Variant[] } };
export type Catalog = { nodes: Product[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } };
export type Cart = { totalQuantity: number; cost: { subtotalAmount: Money }; lines: { nodes: { id: string; quantity: number; cost: { amountPerQuantity: Money; totalAmount: Money }; merchandise: Variant & { product: { handle: string; title: string } } }[] } };
export function formatMoney(value: Money) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: value.currencyCode }).format(Number(value.amount)); }
export function imageUrl(image: ProductImage, width: number) { const url = new URL(image.url); url.searchParams.set('width', String(width)); return url.href; }
export async function commerce<T>(resource: string, body?: object): Promise<T> {
  const response = await fetch(`/api/commerce${resource ? `?${resource}` : ''}`, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {});
  let data;
  try { data = await response.json(); } catch { throw new Error('Our shop is temporarily unavailable. Please try again shortly.'); }
  if (!response.ok) throw new Error(data.error || 'Please try again shortly.');
  return data;
}
export function cartChanged() { window.dispatchEvent(new Event('printflow-cart')); }
