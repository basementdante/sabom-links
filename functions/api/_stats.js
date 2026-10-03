// 클릭·검색 집계 공통. 날짜는 KST 기준 YYYY-MM-DD, 저장은 날짜별 횟수 upsert만 한다(개인 식별 정보 없음).
const ALLOWED_HOST_SUFFIX = 'sabom-picks.pages.dev';
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const MAX_BODY_BYTES = 512;

export function kstDay(now = Date.now()) {
  return new Date(now + KST_OFFSET_MS).toISOString().slice(0, 10);
}

// 다른 사이트에서 보낸 요청은 버린다. Origin이 없는 요청(일부 비콘)은 받는다.
export function isAllowedOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    return host === ALLOWED_HOST_SUFFIX || host.endsWith(`.${ALLOWED_HOST_SUFFIX}`);
  } catch { return false; }
}

export async function readJson(request) {
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return null;
  try { return JSON.parse(text); } catch { return null; }
}

export const noContent = () => new Response(null, { status: 204 });
export const badRequest = () => new Response(null, { status: 400 });
