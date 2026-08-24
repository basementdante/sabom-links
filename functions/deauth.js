// Meta Threads 앱 검수용 '제거 콜백'. 사용자가 앱 연결을 끊으면 Meta가 POST한다. 저장하는 사용자 데이터가 없으니 200만 돌려준다.
export const onRequestPost = () => new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json' } });
