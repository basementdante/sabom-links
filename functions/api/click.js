import { badRequest, isAllowedOrigin, kstDay, noContent, readJson } from './_stats.js';

const ORIGINS = new Set(['shelf', 'list', 'search']);
const MAX_PRODUCT_NO = 99999;

// 상품 카드 클릭 1회를 센다. 링크 자체는 쿠팡·네이버 주소 그대로이고, 페이지가 이 주소로 비콘만 보낸다.
export async function onRequestPost({ request, env }) {
  if (!isAllowedOrigin(request)) return badRequest();
  const body = await readJson(request);
  const productNo = Number(body?.no);
  const origin = String(body?.from || '');
  if (!Number.isInteger(productNo) || productNo < 1 || productNo > MAX_PRODUCT_NO || !ORIGINS.has(origin)) return badRequest();
  await env.STATS.prepare(
    'INSERT INTO clicks (day, product_no, origin, count) VALUES (?1, ?2, ?3, 1) ON CONFLICT (day, product_no, origin) DO UPDATE SET count = count + 1',
  ).bind(kstDay(), productNo, origin).run();
  return noContent();
}
