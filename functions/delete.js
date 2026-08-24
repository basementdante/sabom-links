// Meta Threads 앱 검수용 '데이터 삭제 콜백'. Meta 규격: {url, confirmation_code} 응답. 저장 데이터 없음 → 즉시 완료.
export const onRequestPost = async ({ request }) => {
  const code = `del-${Date.now().toString(36)}`;
  const url = new URL(request.url);
  return new Response(JSON.stringify({ url: `${url.origin}/privacy`, confirmation_code: code }), { headers: { 'content-type': 'application/json' } });
};
