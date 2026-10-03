-- 링크 페이지 클릭·검색 집계. 개인 식별 정보(IP·UA)는 저장하지 않고 날짜별 횟수만 센다.
CREATE TABLE IF NOT EXISTS clicks (
  day TEXT NOT NULL,
  product_no INTEGER NOT NULL,
  origin TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, product_no, origin)
);
CREATE INDEX IF NOT EXISTS idx_clicks_product_no ON clicks (product_no);
CREATE TABLE IF NOT EXISTS searches (
  day TEXT NOT NULL,
  query TEXT NOT NULL,
  has_results INTEGER NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, query, has_results)
);
