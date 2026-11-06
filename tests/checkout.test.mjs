import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/create-shop-checkout.js';
function response() { return { status(code) { this.code=code;return this; }, json(body) { this.body=body;return this; } }; }
test('checkout rejects unsupported methods',async()=>{ const res=response(); await handler({method:'GET'},res);assert.equal(res.code,405); });
test('checkout reports unavailable credentials without claiming success',async()=>{ const saved=process.env.STRIPE_SECRET_KEY;delete process.env.STRIPE_SECRET_KEY;try{const res=response();await handler({method:'POST',body:{productId:'PF-001',size:'M',color:'Black',quantity:1}},res);assert.equal(res.code,503);assert.ok(res.body.error);assert.equal(res.body.url,undefined);}finally{if(saved)process.env.STRIPE_SECRET_KEY=saved;} });

import { createShopCheckoutHandler } from '../api/create-shop-checkout.js';
async function checkout(body) {
 const previous = process.env.STRIPE_SECRET_KEY; process.env.STRIPE_SECRET_KEY = 'fixture';
 let params; const res = response();
 try { await createShopCheckoutHandler(() => ({checkout:{sessions:{create:async value=>{params=value;return {url:'https://checkout.stripe.com/fixture'};}}}}))({method:'POST',body:{productId:'PF-001',size:'M',color:'Black',quantity:1,...body}},res); }
 finally { if(previous === undefined) delete process.env.STRIPE_SECRET_KEY; else process.env.STRIPE_SECRET_KEY=previous; }
 return {params,res};
}
test('shipping is a server-set $5.99 per order even for multiple shirts',async()=>{
 const {params,res}=await checkout({quantity:3,deliveryMethod:'shipping',shippingAmount:0});
 assert.equal(res.code,200); assert.equal(params.shipping_options[0].shipping_rate_data.fixed_amount.amount,599);
 assert.equal(params.line_items[0].quantity,3); assert.equal(params.line_items[0].price_data.unit_amount,2799);
 assert.deepEqual(params.shipping_address_collection.allowed_countries,['US']);
 assert.equal(params.metadata.deliveryMethod,'shipping'); assert.equal(params.automatic_tax,undefined);
});
test('pickup has no shipping charge or shipping address requirement',async()=>{
 const {params,res}=await checkout({deliveryMethod:'pickup'});assert.equal(res.code,200);
 assert.equal(params.shipping_options,undefined); assert.equal(params.shipping_address_collection,undefined);
 assert.equal(params.metadata.deliveryMethod,'pickup');assert.match(params.custom_text.submit.message,/Free Chattanooga/);
});
test('unsupported delivery choices cannot create checkout sessions',async()=>{const {params,res}=await checkout({deliveryMethod:'free-shipping'});assert.equal(res.code,400);assert.equal(params,undefined);});
