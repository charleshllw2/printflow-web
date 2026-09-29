import { imageUrl, formatMoney } from '../lib/commerce';
import type { ProductImage, Money } from '../lib/commerce';
export function ShopImage({ image, title, eager = false }: { image: ProductImage | null; title: string; eager?: boolean }) {
  return image ? <img src={imageUrl(image, 960)} srcSet={`${imageUrl(image, 400)} 400w, ${imageUrl(image, 640)} 640w, ${imageUrl(image, 960)} 960w`} sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw" alt={image.altText || title} loading={eager ? 'eager' : 'lazy'} width={image.width} height={image.height} /> : <div className="shop-no-image">Product Image Unvailable</div>;
}
export function Price({ price, compare }: { price: Money; compare?: Money | null }) { return <p className="shop-price"><strong>{formatMoney(price)}</strong>{compare && compare.currencyCode === price.currencyCode && Number(compare.amount) > Number(price.amount) && <> <del>{formatMoney(compare)}</del></>}</p>; }
export function ShopState({ error, loading, retry }: { error?: string; loading?: boolean; retry?: () => void }) { return <div className="shop-state" role={error ? 'alert' : 'status'}><p>{error || (loading ? 'Loading the shop…' : 'New designs are on the way. Please check back soon.')}</p>{error && retry && <button className="btn btn-outline" onClick={retry}>Try again</button>}</div>; }
