import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/create-shop-checkout.js';
function response() { return { status(code) { this.code=code;return this; }, json(body) { this.body=body;return this; } }; }
test('checkout rejects unsupported methods',async()=>{ const res=response(); await handler({method:'GET'},res);assert.equal(res.code,405); });
test('checkout reports unavailable credentials without claiming success',async()=>{ const saved=process.env.STRIPE_SECRET_KEY;delete process.env.STRIPE_SECRET_KEY;try{const res=response();await handler({method:'POST',body:{productId:'PF-001',size:'M',color:'Black',quantity:1}},res);assert.equal(res.code,503);assert.ok(res.body.error);assert.equal(res.body.url,undefined);}finally{if(saved)process.env.STRIPE_SECRET_KEY=saved;} });
