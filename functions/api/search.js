import { badRequest, isAllowedOrigin, kstDay, noContent, readJson } from './_stats.js';

const MAX_QUERY_LENGTH = 40;

// 입력이 멈춘 검색어 1건을 센다. 결과 0건 검색어는 "찾는데 없는 상품" 후보로 쓴다.
export async function onRequestPost({ request, env }) {
  if (!isAllowedOrigin(request)) return badRequest();
  const body = await readJson(request);
  const query = String(body?.q || '').trim().toLocaleLowerCase('ko-KR').replace(/\s+/g, ' ');
  if (!query || query.length > MAX_QUERY_LENGTH || typeof body?.hasResults !== 'boolean') return badRequest();
  await env.STATS.prepare(
    'INSERT INTO searches (day, query, has_results, count) VALUES (?1, ?2, ?3, 1) ON CONFLICT (day, query, has_results) DO UPDATE SET count = count + 1',
  ).bind(kstDay(), query, body.hasResults ? 1 : 0).run();
  return noContent();
}
